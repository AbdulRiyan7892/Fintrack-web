package com.example.expense_tracker.excel;

import com.example.expense_tracker.dto.TransactionResponse;
import com.example.expense_tracker.dto.response.MonthlyReportResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
@Slf4j
public class ExcelReportGenerator {

    public byte[] generate(MonthlyReportResponse report){

        try(
                Workbook workbook = new XSSFWorkbook();
                ByteArrayOutputStream output =
                        new ByteArrayOutputStream()
        ){

            Sheet summary =
                    workbook.createSheet("Summary");

            Sheet transactions =
                    workbook.createSheet("Transactions");

            CellStyle headerStyle =
                    workbook.createCellStyle();

            Font headerFont =
                    workbook.createFont();

            headerFont.setBold(true);

            headerStyle.setFont(headerFont);

            int rowNum = 0;

            Row row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("FinTrack Monthly Report");

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Month");
            row.createCell(1).setCellValue(report.getMonth());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Income");
            row.createCell(1).setCellValue(report.getTotalIncome().doubleValue());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Expense");
            row.createCell(1).setCellValue(report.getTotalExpense().doubleValue());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Savings");
            row.createCell(1).setCellValue(report.getTotalSavings().doubleValue());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Highest Expense");
            row.createCell(1).setCellValue(report.getHighestExpense().doubleValue());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Average Daily Expense");
            row.createCell(1).setCellValue(report.getAverageDailyExpense().doubleValue());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Top Category");
            row.createCell(1).setCellValue(report.getTopExpenseCategory());

            row = summary.createRow(rowNum++);
            row.createCell(0).setCellValue("Top Payment");
            row.createCell(1).setCellValue(report.getTopPaymentMethod());

            Row header =
                    transactions.createRow(0);

            String[] headers = {
                    "Date",
                    "Title",
                    "Type",
                    "Category",
                    "Payment",
                    "Amount"
            };

            for(int i=0;i<headers.length;i++){

                Cell cell =
                        header.createCell(i);

                cell.setCellValue(headers[i]);

                cell.setCellStyle(headerStyle);

            }

            int transactionRow = 1;

            for(TransactionResponse t
                    : report.getTransactions()){

                Row data =
                        transactions.createRow(transactionRow++);

                data.createCell(0)
                        .setCellValue(
                                t.getTransactionDate().toString());

                data.createCell(1)
                        .setCellValue(
                                t.getTitle());

                data.createCell(2)
                        .setCellValue(
                                t.getType().name());

                data.createCell(3)
                        .setCellValue(
                                t.getCategory().name());

                data.createCell(4)
                        .setCellValue(
                                t.getPaymentMethod().name());

                data.createCell(5)
                        .setCellValue(
                                t.getAmount().doubleValue());

            }

            for(int i=0;i<6;i++){

                transactions.autoSizeColumn(i);

            }

            workbook.write(output);

            log.info("Excel report generated.");

            return output.toByteArray();

        }

        catch(Exception ex){

            throw new RuntimeException(ex);

        }

    }

}