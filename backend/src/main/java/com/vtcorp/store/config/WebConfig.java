package com.vtcorp.store.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/products/**")
                .addResourceLocations("file:src/main/resources/static/images/products/");
        registry.addResourceHandler("/images/brands/**")
                .addResourceLocations("file:src/main/resources/static/images/brands/");
        registry.addResourceHandler("/images/gifts/**")
                .addResourceLocations("file:src/main/resources/static/images/gifts/");
        registry.addResourceHandler("/images/articles/**")
                .addResourceLocations("file:src/main/resources/static/images/articles/");
    }

}
