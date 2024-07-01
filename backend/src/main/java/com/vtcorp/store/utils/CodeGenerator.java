package com.vtcorp.store.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class CodeGenerator {

    public static String generateRandomCode(int length) {
        Random random = new Random();
        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(allowedChars.length());
            sb.append(allowedChars.charAt(randomIndex));
        }
        return sb.toString();
    }

    public static String generateOrderID() {
        String prefix = "ORD";
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        String randomStr = generateRandomCode(6);
        return prefix + dateStr + randomStr;
    }

    public static String generateUsername() {
        String prefix = "CUS";
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
        String randomStr = generateRandomCode(6);
        return prefix + dateStr + randomStr;
    }
}