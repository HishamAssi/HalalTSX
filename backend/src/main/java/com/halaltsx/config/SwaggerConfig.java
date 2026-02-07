package com.halaltsx.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Value("${server.port:8080}")
    private String serverPort;

    @Bean
    public OpenAPI halalTsxOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("HalalTSX API")
                        .description("Halal Stock Screener for the Toronto Stock Exchange. " +
                                "This API provides endpoints for retrieving TSX stocks with Halal compliance " +
                                "screening based on AAOIFI standards.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("HalalTSX Team")
                                .email("support@halaltsx.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:" + serverPort)
                                .description("Local Development Server")))
                .tags(List.of(
                        new Tag()
                                .name("Stocks")
                                .description("Stock listing and detail endpoints"),
                        new Tag()
                                .name("Compliance")
                                .description("Halal compliance screening endpoints"),
                        new Tag()
                                .name("Education")
                                .description("Educational content about Halal screening criteria"),
                        new Tag()
                                .name("Configuration")
                                .description("Application configuration endpoints"),
                        new Tag()
                                .name("Health")
                                .description("Health check endpoints")));
    }
}
