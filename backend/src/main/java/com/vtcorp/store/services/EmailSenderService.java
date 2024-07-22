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

    @Value("${frontend.base.url}")
    private String frontendBaseUrl;

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
            context.setVariable("loginPageLink", frontendBaseUrl + "/login");
            String htmlContent = templateEngine.process("welcomeMail.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Chào mừng đến với LittleLoveLy");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending welcome email: " + e.getMessage());
        }
    }

    @Async
    public void sendForgotPasswordEmailAsync(String toEmail, String userName, String linkWithToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("linkWithToken", linkWithToken);
            String htmlContent = templateEngine.process("resetPassword.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Khôi phục mật khẩu");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending forgot password email: " + e.getMessage());
        }
    }

    @Async
    public void sendSuccessResetPasswordEmailAsync(String toEmail, String userName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("name", userName);
            String htmlContent = templateEngine.process("passwordResetSuccess.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Đổi mật khẩu thành công");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending success reset password email: " + e.getMessage());
        }
    }

    @Async
    public void sendChangeEmailAsync(String toEmail, String userName, String linkWithToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("linkWithToken", linkWithToken);
            String htmlContent = templateEngine.process("changeEmail.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Xác nhận thay đổi email");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending change email email: " + e.getMessage());
        }
    }

    @Async
    public void sendSuccessChangeEmailAsync(String toEmail, String userName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("name", userName);
            String htmlContent = templateEngine.process("emailResetSuccess.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Đổi email thành công");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending success change email email: " + e.getMessage());
        }
    }

    @Async
    public void sendOrderPlacedEmailAsync(String toEmail, String orderId) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("orderId", orderId);
            context.setVariable("orderPageLink", frontendBaseUrl + "/order?id=" + orderId);
            String htmlContent = templateEngine.process("orderSuccess.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Xác nhận đặt hàng");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending order placed email: " + e.getMessage());
        }
    }

    @Async
    public void sendOrderConfirmedEmailAsync(String toEmail, String orderId, String trackingCode) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context();
            context.setVariable("orderId", orderId);
            context.setVariable("trackingCode", trackingCode);
            context.setVariable("shippingLink", "https://tracking.ghn.dev/");
            String htmlContent = templateEngine.process("orderConfirmed.html", context);

            helper.setFrom(fromEmail, "LittleLoveLy");
            helper.setTo(toEmail);
            helper.setSubject("Xác nhận đơn hàng");
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Error sending order confirmed email: " + e.getMessage());
        }
    }
}
