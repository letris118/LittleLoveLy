package com.vtcorp.store.utils;

import java.time.Instant;
import java.util.Random;

public class CodeGenerator {

    public static String generateRandomCode(int totalLength) {
        Random random = new Random();
        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        long timestamp = Instant.now().getEpochSecond();
        int length = totalLength - String.valueOf(timestamp).length();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(allowedChars.length());
            sb.append(allowedChars.charAt(randomIndex));
        }
        return timestamp + sb.toString();
    }
}