package com.WayneRagsac.PassionProjectReactionTimeBackend;

import io.github.cdimascio.dotenv.Dotenv;

public class DotEnvLoader {
    static {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("DB_NAME", dotenv.get("DB_NAME"));
        System.setProperty("DB_USER", dotenv.get("DB_USER"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("DB_HOST", dotenv.get("DB_HOST"));
        System.setProperty("DB_PORT", dotenv.get("DB_PORT"));
    }
}