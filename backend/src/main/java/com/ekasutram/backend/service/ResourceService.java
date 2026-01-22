//package com.ekasutram.backend.service;
//
//import com.ekasutram.backend.config.SupabaseConfig;
//import com.ekasutram.backend.model.Resource;
//import com.ekasutram.backend.repository.ResourceRepository;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.net.URI;
//import java.net.http.HttpClient;
//import java.net.http.HttpRequest;
//import java.net.http.HttpResponse;
//import java.util.List;
//import java.util.UUID;
//
//@Service
//public class ResourceService {
//
//    private final ResourceRepository repository;
//    private final SupabaseConfig supabase;
//
//    public ResourceService(ResourceRepository repository, SupabaseConfig supabase) {
//        this.repository = repository;
//        this.supabase = supabase;
//    }
//
//    // =========================
//    // GET ALL RESOURCES
//    // =========================
//    public List<Resource> getAllResources() {
//        return repository.findAll();
//    }
//
//    // =========================
//    // GET BY SUBJECT
//    // =========================
//    public List<Resource> getResourcesBySubject(String subject) {
//        return repository.findBySubject(subject);
//    }
//
//    // =========================
//    // UPLOAD PDF → SUPABASE
//    // =========================
//    public Resource saveResource(String subject, String chapter, MultipartFile file)
//            throws IOException, InterruptedException {
//
//        if (file.isEmpty()) {
//            throw new IllegalArgumentException("File is empty");
//        }
//
//        // folder structure: subject/uuid-filename.pdf
//        String fileName =
//                subject + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();
//
//        String uploadUrl =
//                supabase.getSupabaseUrl() +
//                        "/storage/v1/object/" +
//                        supabase.getBucket() + "/" +
//                        fileName;
//
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create(uploadUrl))
//                .header("Authorization", "Bearer " + supabase.getServiceRoleKey())
//                .header("Content-Type", file.getContentType())
//                .PUT(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
//                .build();
//
//        HttpResponse<String> response =
//                HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
//
//        if (response.statusCode() != 200 && response.statusCode() != 201) {
//            throw new RuntimeException("Supabase upload failed: " + response.body());
//        }
//
//        // PUBLIC FILE URL
//        String publicUrl =
//                supabase.getSupabaseUrl() +
//                        "/storage/v1/object/public/" +
//                        supabase.getBucket() + "/" +
//                        fileName;
//
//        Resource resource = new Resource();
//        resource.setSubject(subject);
//        resource.setChapterName(chapter);
//        resource.setPdfUrl(publicUrl);
//
//        return repository.save(resource);
//    }
//
//    // =========================
//// DELETE RESOURCE (DB + SUPABASE)
//// =========================
//    public void deleteResource(Long id) throws IOException, InterruptedException {
//
//        Resource resource = repository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Resource not found"));
//
//        // Extract file path from public URL
//        // Example:
//        // https://xxx.supabase.co/storage/v1/object/public/resources/Maths/file.pdf
//        String publicUrl = resource.getPdfUrl();
//
//        String filePath = publicUrl.substring(
//                publicUrl.indexOf(supabase.getBucket()) + supabase.getBucket().length() + 1
//        );
//
//        String deleteUrl =
//                supabase.getSupabaseUrl() +
//                        "/storage/v1/object/" +
//                        supabase.getBucket() + "/" +
//                        filePath;
//
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create(deleteUrl))
//                .header("Authorization", "Bearer " + supabase.getServiceRoleKey())
//                .DELETE()
//                .build();
//
//        HttpResponse<String> response =
//                HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
//
//        if (response.statusCode() != 200 && response.statusCode() != 204) {
//            throw new RuntimeException("Failed to delete file from Supabase");
//        }
//
//        // Delete DB record
//        repository.deleteById(id);
//    }
//}


package com.ekasutram.backend.service;

import com.ekasutram.backend.config.SupabaseConfig;
import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils; // Use Spring's UriUtils for encoding

import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

@Service
public class ResourceService {

    private final ResourceRepository repository;
    private final SupabaseConfig supabase;

    public ResourceService(ResourceRepository repository, SupabaseConfig supabase) {
        this.repository = repository;
        this.supabase = supabase;
    }

    public List<Resource> getAllResources() {
        return repository.findAll();
    }

    public List<Resource> getResourcesBySubject(String subject) {
        return repository.findBySubject(subject);
    }

    // =========================
    // UPLOAD PDF → SUPABASE
    // =========================
    public Resource saveResource(String subject, String chapter, MultipartFile file)
            throws IOException, InterruptedException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // 1. Sanitize and create a safe file path
        String originalName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file.pdf";
        String pathInsideBucket = subject + "/" + UUID.randomUUID() + "-" + originalName;

        // 2. ENCODE THE PATH (Fixes the "Illegal character" space error)
        String encodedPath = UriUtils.encodePath(pathInsideBucket, StandardCharsets.UTF_8);

        String uploadUrl = supabase.getSupabaseUrl() + "/storage/v1/object/" +
                supabase.getBucket() + "/" + encodedPath;

        // 3. STREAM THE FILE (Fixes the 89MB memory/OOM error)
        // Using ofInputStream avoids loading the whole byte[] into heap memory
        // 3. STREAM THE FILE
// We use a lambda block to handle the potential IOException from getInputStream
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl))
                .header("Authorization", "Bearer " + supabase.getServiceRoleKey())
                .header("Content-Type", file.getContentType())
                .PUT(HttpRequest.BodyPublishers.ofInputStream(() -> {
                    try {
                        return file.getInputStream();
                    } catch (IOException e) {
                        throw new UncheckedIOException(e); // Convert to unchecked so the publisher can use it
                    }
                }))
                .build();

        HttpResponse<String> response =
                HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200 && response.statusCode() != 201) {
            throw new RuntimeException("Supabase upload failed (Status: " + response.statusCode() + "): " + response.body());
        }

        // 4. Generate Public URL for DB (Ensuring this is also encoded)
        String publicUrl = supabase.getSupabaseUrl() + "/storage/v1/object/public/" +
                supabase.getBucket() + "/" + encodedPath;

        Resource resource = new Resource();
        resource.setSubject(subject);
        resource.setChapterName(chapter);
        resource.setPdfUrl(publicUrl);

        return repository.save(resource);
    }

    // =========================
    // DELETE RESOURCE (DB + SUPABASE)
    // =========================
    public void deleteResource(Long id) throws IOException, InterruptedException {
        Resource resource = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        String publicUrl = resource.getPdfUrl();

        // Extract the path after /public/bucket_name/
        String marker = "/public/" + supabase.getBucket() + "/";
        int index = publicUrl.indexOf(marker);
        if (index == -1) throw new RuntimeException("Could not parse file path from URL");

        String filePath = publicUrl.substring(index + marker.length());

        // Re-construct delete URL using encoded filePath
        String deleteUrl = supabase.getSupabaseUrl() + "/storage/v1/object/" +
                supabase.getBucket() + "/" + filePath;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(deleteUrl))
                .header("Authorization", "Bearer " + supabase.getServiceRoleKey())
                .DELETE()
                .build();

        HttpResponse<String> response =
                HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200 && response.statusCode() != 204) {
            throw new RuntimeException("Failed to delete file from Supabase: " + response.body());
        }

        repository.deleteById(id);
    }
}