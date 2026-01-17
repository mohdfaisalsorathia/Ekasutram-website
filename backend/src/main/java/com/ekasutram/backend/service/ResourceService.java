package com.ekasutram.backend.service;

import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    @Value("${file.upload-dir}")
    private String uploadRoot;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public List<Resource> getResourcesBySubject(String subject) {
        return resourceRepository.findBySubject(subject);
    }

    public Resource saveResource(String subject, String chapterName, MultipartFile file)
            throws IOException {

        // ✅ Absolute subject directory
        File subjectDir = new File(uploadRoot + "/" + subject);
        if (!subjectDir.exists()) {
            subjectDir.mkdirs();
        }

        // ✅ Absolute file path
        File destination = new File(subjectDir, file.getOriginalFilename());
        file.transferTo(destination);

        // ✅ Save DB entry
        Resource resource = new Resource();
        resource.setSubject(subject);
        resource.setChapterName(chapterName);
        resource.setPdfUrl("/uploads/" + subject + "/" + file.getOriginalFilename());

        return resourceRepository.save(resource);
    }
}
