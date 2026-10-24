package com.example.expense_tracker.scheduler;

import com.example.expense_tracker.email.EmailService;
import com.example.expense_tracker.entity.User;
import com.example.expense_tracker.enums.EmailFrequency;
import com.example.expense_tracker.repository.UserRepository;
import com.example.expense_tracker.serviceImpl.ReportServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class MonthlyReportScheduler {

    private final UserRepository userRepository;
    private final ReportServiceImpl reportService;

    private final EmailService emailService;

    // TEST CRON
    @Scheduled(cron = "0 0 9 1 * *")
    public void sendMonthlyReports() {

        log.info("Monthly Scheduler Started...");

        LocalDate previousMonth = LocalDate.now().minusMonths(1);

        int month = previousMonth.getMonthValue();

        int year = previousMonth.getYear();

        List<User> users =
                userRepository.findByEmailFrequency(
                        EmailFrequency.MONTHLY
                );

        for (User user : users) {

            if (user.getEmailFrequency() != EmailFrequency.MONTHLY) {
                continue;
            }

            try {

                byte[] pdf =
                        reportService.generateMonthlyPdf(
                                user,
                                month,
                                year
                        );

                byte[] excel =
                        reportService.generateMonthlyExcel(
                                user,
                                month,
                                year
                        );

                emailService.sendMonthlyReport(
                        user.getEmail(),
                        user.getName(),
                        month,
                        year,
                        pdf,
                        excel
                );

                log.info(
                        "Monthly report sent to {}",
                        user.getEmail()
                );

            } catch (Exception ex) {

                log.error(
                        "Failed to send report to {}",
                        user.getEmail(),
                        ex
                );

            }

        }

        log.info("Monthly Scheduler Finished.");

    }

}