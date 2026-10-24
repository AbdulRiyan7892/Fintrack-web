package com.example.expense_tracker.email;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;


    @Override

    public void sendMonthlyReport(
            String email,
            String name,
            int month,
            int year,
            byte[] pdf,
            byte[] excel
    ) {

        try {




            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(email);

            helper.setSubject(
                    "FinTrack Monthly Report - " + month + "/" + year
            );

            helper.setText(
                    """
                    Hello %s,
                    
                    Please find attached your monthly financial report.
                    
                    Attachments:
                    
                    • MonthlyReport.pdf
                    
                    • MonthlyReport.xlsx
                    
                    Thank you for using FinTrack.
                    
                    Regards,
                    FinTrack Team
                    """.formatted(name)
            );

            helper.addAttachment(
                    "MonthlyReport.pdf",
                    new ByteArrayResource(pdf)
            );

            helper.addAttachment(
                    "MonthlyReport.xlsx",
                    new ByteArrayResource(excel)
            );

            mailSender.send(message);

            log.info(
                    "Monthly report emailed successfully to {}",
                    email
            );

        }
        catch (Exception ex){

            throw new RuntimeException(
                    "Failed to send email.",
                    ex
            );

        }

    }
}