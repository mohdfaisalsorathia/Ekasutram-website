package com.ekasutram.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Inject your live frontend URL from application.properties or .env
    @Value("${frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // Use origin patterns to allow any subdomain of your vercel project
                .allowedOriginPatterns(
                        "https://*.vercel.app", // Catch any Vercel domain
                        "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Use a relative path for hosting compatibility instead of a hardcoded C: drive
        // path
        // On Railway/Render, this will create an 'uploads' folder in the app root
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}