package com.accountmanager.system.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import javax.persistence.Column;
import javax.servlet.http.HttpServletResponse;

import com.accountmanager.system.api.controller.F8CustomersController;
import com.accountmanager.system.api.controller.TaxReportController;
import com.accountmanager.system.model.Company;
import com.accountmanager.system.model.ReportTex;
import com.accountmanager.system.model.TaxReport;
import com.accountmanager.system.model.User;
import com.accountmanager.system.pojo.TaxReportDTO;
import com.accountmanager.system.repository.TaxReportRepository;
import com.accountmanager.system.repository.UserRepository;

import org.apache.catalina.core.ApplicationContext;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
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
    TaxReportController taxReportController;

    @Autowired
    F8CustomersController customersContro;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

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
            String monthTH ="";
            String dateForm="";
            String branch ="[ ] สำนักงานใหญ่ [ ] สาขา";
            if (endDate!=null && endDate.length()>0){
                LocalDate date = LocalDate.parse(endDate);
                 monthTH = setMontrTh(date.getMonthValue());
                dateForm =date.getDayOfMonth() +" "+monthTH+" ปี "+(date.getYear()+543);
            }
            params.put("dateform",dateForm);
            params.put("companyName",reportSource.getCompanys().getCompanyName());
            params.put("address",reportSource.getCompanys().getAddress());
            params.put("taxId",reportSource.getCompanys().getTaxId());
            if (reportSource.getCompanys().getCompanyType().equals("1")){
                branch ="[/] สำนักงานใหญ่ [ ] สาขา";
            }else if(reportSource.getCompanys().getCompanyType().equals("2")){
                branch="[ ] สำนักงานใหญ่ [/] สาขา";
            }
            params.put("branch",branch);
            params.put("sumPrice","1000.0");
            params.put("sumPriceVat","100");
            params.put("countNo","100");
            params.put("sumProductPriceAll","100");


            System.out.println(type);
            List<TaxReportDTO> dateTex = dataReport(type, userId, startDate, endDate);

//            params.put("reportSource", reportSource);
             JRDataSource dataSource = null;
//            dataSource = new JRBeanCollectionDataSource(dateTex);
//            JRDataSource dataSource = null;
//            dataSource = new JREmptyDataSource();
            if(dateTex!=null && dateTex.size()>0){
                dataSource = new JRBeanCollectionDataSource(dateTex);
            }else {
                dataSource = new JREmptyDataSource();
            }
            JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=ReportBuyTax" + ".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (IOException e) {
            System.out.println(e);
        } catch (JRException e) {
            System.out.println(e);
        } catch (Exception e) {
            e.printStackTrace();
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

    public List<TaxReportDTO> dataReport(String type, String userId, String startDate, String endDate) throws Exception{
        List<TaxReport> reports = new ArrayList<>();
        List<TaxReportDTO> dtos = new ArrayList<>();
        try {

            StringBuilder sb =new StringBuilder();
            sb.append(" SELECT * FROM tax_report ");
            if (startDate!=null&&endDate!=null){
                sb.append(" AND date BETWEEN '"+startDate+"' AND '"+endDate+"'");
            }
            reports = jdbcTemplate.query(
                    sb.toString(),
                    new BeanPropertyRowMapper(TaxReport.class));
            for (TaxReport report:reports) {
                TaxReportDTO dto = new TaxReportDTO();

                dto.setId(report.getId());
                dto.setDateStr(dateFormat.format(report.getDate()));
                dto.setDepartmentId(report.getDepartmentId());
                dto.setPrice(report.getPrice());
                dto.setPriceVat(report.getPriceVat());
                dto.setProductPriceAll(report.getProductPriceAll());
                dto.setReferenceDocument(report.getReferenceDocument());
                dto.setType(report.getType());
                dto.setCreateBy(report.getCreateBy());
                dto.setCreateDate(report.getCreateDate());
                dto.setUpdateBy(report.getUpdateBy());
                dto.setUpdateDate(report.getUpdateDate());
                dto.setCompany(report.getCompany());
                dto.setF2Id(report.getF2Id());
                dtos.add(dto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dtos;
    }
    public String setMontrTh(Integer montr) {
        String dateSet = "";
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "มกราคม");
        map.put(2, "กุมภาพันธ์");
        map.put(3, "มีนาคม");
        map.put(4, "มษายน");
        map.put(5, "พฤษภาคม");
        map.put(6, "มิถุนายน");
        map.put(7, "กรกฎาคม");
        map.put(8, "สิงหาคม");
        map.put(9, "กันยายน");
        map.put(10, "ตุลาคม");
        map.put(11, "พฤศจิกายน");
        map.put(12, "ธันวาคม ");

        dateSet = (map.get(montr));
        return dateSet;
    }
}
