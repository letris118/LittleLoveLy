package com.vtcorp.store.services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailSenderService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailSenderService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmailAsync(String toEmail, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending HTML email: " + e.getMessage());
        }
    }

    @Async
    public void sendWelcomeEmailAsync(String toEmail, String userName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("profilePageLink", "http://localhost:3000/profile");
            String htmlContent = templateEngine.process("welcomeMail.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Welcome to LittleLoveLy");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending welcome email: " + e.getMessage());
        }
    }
}
