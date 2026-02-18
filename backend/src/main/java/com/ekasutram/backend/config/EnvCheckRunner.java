package com.ekasutram.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class EnvCheckRunner implements CommandLineRunner {
    @Value("${supabase.url:MISSING}")
    private String url;

    @Value("${admin.password:MISSING}")
    private String pass;

    @Override
    public void run(String... args) {
        System.out.println("======= ENV CHECK =======");
        System.out.println("Supabase URL: " + url);
        System.out.println("Admin Pass: " + pass);
        System.out.println("=========================");
    }
}