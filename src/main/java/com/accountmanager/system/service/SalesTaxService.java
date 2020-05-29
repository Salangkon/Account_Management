package com.accountmanager.system.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.accountmanager.system.api.controller.F8CustomersController;
import com.accountmanager.system.model.Company;
import com.accountmanager.system.model.ReportTex;
import com.accountmanager.system.model.TaxReport;
import com.accountmanager.system.model.User;
import com.accountmanager.system.repository.TaxReportRepository;
import com.accountmanager.system.repository.UserRepository;
import com.ibm.icu.text.SimpleDateFormat;

import org.apache.catalina.core.ApplicationContext;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

/**
 * SalesTaxService
 */
@Service
public class SalesTaxService {

    @Autowired
    private org.springframework.context.ApplicationContext context;

    @Autowired
    UserRepository userRepo;

    @Autowired
    TaxReportRepository taxReportRepo;

    @Autowired
    F8CustomersController customersContro;

    public void genSalesTaxPDF(HttpServletResponse response,String type, String userId, String startDate, String endDate) {

        Resource resource = context.getResource("classpath:reports/reportSaleTax.jrxml");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            JasperReport report = JasperCompileManager.compileReport(inputStream);

            Map<String, Object> params = new HashMap<>();
            User reportSource = userRepo.findOne(userId);
            // List<FundLoanItemModel> dataset = getFundLoanItems(empid,docNo);
            System.out.println(type);
            List<ReportTex> dateTex = reportsTex(type, userId, startDate, endDate);
            JRDataSource dataSource = new JRBeanCollectionDataSource(dateTex);
            params.put("reportSource", reportSource);
            // JRDataSource dataSource = null;

            JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=SalesTax" + ".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (IOException e) {
            System.out.println(e);
        } catch (JRException e) {
            System.out.println(e);
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        }

    }

    public void genReportBuyTaxPDF(HttpServletResponse response,String type, String userId, String startDate, String endDate) {

        Resource resource = context.getResource("classpath:reports/reportBuyTax.jrxml");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            JasperReport report = JasperCompileManager.compileReport(inputStream);

            Map<String, Object> params = new HashMap<>();
            User reportSource = userRepo.findOne(userId);
            // List<FundLoanItemModel> dataset = getFundLoanItems(empid,docNo);
            System.out.println(type);
            List<ReportTex> dateTex = reportsTex(type, userId, startDate, endDate);
            JRDataSource dataSource = new JRBeanCollectionDataSource(dateTex);
            params.put("reportSource", reportSource);
            // JRDataSource dataSource = null;

            JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=ReportBuyTax" + ".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (IOException e) {
            System.out.println(e);
        } catch (JRException e) {
            System.out.println(e);
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        }

    }

    public List<ReportTex> reportsTex(String type, String userId, String startDate, String endDate) {

        List<TaxReport> reports = new ArrayList<TaxReport>();
        List<ReportTex> TaxReportByUser = new ArrayList<ReportTex>();
        try {
            if (type.equalsIgnoreCase("ReportSaleTax")) {
                switch (startDate) {
                    case "0":
                        switch (endDate) {
                            case "0":
                                reports = taxReportRepo.findByType("ReportSaleTax");
                                break;
                            default:
                                reports = taxReportRepo.findByTypeAndEndDate("ReportSaleTax", endDate);
                                break;
                        }
                        break;
                    default:
                        switch (endDate) {
                            case "0":
                                reports = taxReportRepo.findByTypeAndStartDate("ReportSaleTax", startDate);
                                break;
                            default:
                                reports = taxReportRepo.findByTypeAndStartDateAndEndDate("ReportSaleTax", startDate,
                                        endDate);
                                break;
                        }
                        break;
                }
            } else {
                switch (startDate) {
                    case "0":
                        switch (endDate) {
                            case "0":
                                reports = taxReportRepo.findByType("ReportBuyTax");
                                break;
                            default:
                                reports = taxReportRepo.findByTypeAndEndDate("ReportBuyTax", endDate);
                                break;
                        }
                        break;
                    default:
                        switch (endDate) {
                            case "0":
                                reports = taxReportRepo.findByTypeAndStartDate("ReportBuyTax", startDate);
                                break;
                            default:
                                reports = taxReportRepo.findByTypeAndStartDateAndEndDate("ReportBuyTax", startDate,
                                        endDate);
                                break;
                        }
                        break;
                }
            }

            for (TaxReport taxReport : reports) {
                TaxReport report = new TaxReport();
                report = taxReport;
                report.setCompany(customersContro.customersList(taxReport.getCompany()).getCompanyName());
            }

            User user = userRepo.findOne(userId);
            Company company = user.getCompanys();

            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.US);

            for (User us : company.getUsers()) {
                float sumPrice = 0;
                float sumPriceVat = 0;
                float sumProductPriceAll = 0;
                for (TaxReport taxReport : reports) {
                    if (us.getId().equals(taxReport.getCreateBy())) {

                        sumPrice += taxReport.getPrice();
                        sumPriceVat += taxReport.getPriceVat();
                        sumProductPriceAll += taxReport.getProductPriceAll();
                        ReportTex reportTex = new ReportTex();

                        reportTex.setSumPrice(String.valueOf(sumPrice));
                        reportTex.setSumPriceVat(String.valueOf(sumPriceVat));
                        reportTex.setSumProductPriceAll(String.valueOf(sumProductPriceAll));

                        reportTex.setId(taxReport.getId());
                        reportTex.setDate(simpleDateFormat.format(taxReport.getDate()));
                        reportTex.setDepartmentId(taxReport.getDepartmentId());
                        reportTex.setPrice(String.valueOf(taxReport.getPrice()));
                        reportTex.setPriceVat(String.valueOf(taxReport.getPriceVat()));
                        reportTex.setProductPriceAll(String.valueOf(taxReport.getProductPriceAll()));
                        reportTex.setReferenceDocument(taxReport.getReferenceDocument());
                        reportTex.setType(taxReport.getType());
                        ;
                        reportTex.setCreateBy(taxReport.getCreateBy());
                        reportTex.setCreateDate(String.valueOf(taxReport.getCreateDate()));
                        reportTex.setUpdateBy(taxReport.getUpdateBy());
                        reportTex.setUpdateDate(String.valueOf(taxReport.getUpdateDate()));
                        reportTex.setCompany(taxReport.getCompany());
                        reportTex.setF2Id(taxReport.getF2Id());

                        TaxReportByUser.add(reportTex);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return TaxReportByUser;

    }
}
