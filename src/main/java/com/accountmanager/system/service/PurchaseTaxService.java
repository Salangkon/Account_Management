package com.accountmanager.system.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.core.ApplicationContext;
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

/**
 * PurchaseTaxService
 */
@Service
public class PurchaseTaxService {

    @Autowired
    private org.springframework.context.ApplicationContext context;

    public void genPurchaseTaxPDF(HttpServletResponse response) {

        Resource resource = context.getResource("classpath:reports/PurchaseTax.jrxml");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            JasperReport report = JasperCompileManager.compileReport(inputStream);

            Map<String, Object> params = new HashMap<>();
            // FundLoanDataReport reportSource =  getFundLoanDataReport(empid,docNo);
            // List<FundLoanItemModel> dataset = getFundLoanItems(empid,docNo);
            // List<FundLoanItemModel> data = new ArrayList<>();
            
            params.put("reportSource",null);
            JRDataSource dataSource = null;
            // if(data!=null && data.size()>0){
            // dataSource = new JRBeanCollectionDataSource(null);
            // }else {
                dataSource = new JREmptyDataSource();
            // }

            JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=FUND_"+".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (IOException e) {
            System.out.println(e);
        } catch (JRException e) {
            System.out.println(e);
        }finally {
            if(inputStream!=null){
                try {
                    inputStream.close();
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        }
        
    }
    public void textPDF(HttpServletResponse response) {

        Resource resource = context.getResource("classpath:reports/reportBuyTax.jrxml");
        InputStream inputStream = null;
        try {
            inputStream = resource.getInputStream();
            JasperReport report = JasperCompileManager.compileReport(inputStream);

            Map<String, Object> params = new HashMap<>();
//            params.put("reportSource",null);
            params.put("dateform","8 สิงหาคม ปี 2564");
            params.put("companyName","companyName");
            params.put("address","address");
            params.put("taxId","taxId");
            params.put("sumPrice","sumPrice");
            params.put("sumPriceVat","sumPriceVat");
            params.put("countNo","countNo");
            params.put("sumProductPriceAll","sumProductPriceAll");

            JRDataSource dataSource = null;
            dataSource = new JREmptyDataSource();
            JasperPrint jasperPrint = JasperFillManager.fillReport(report, params, dataSource);
            response.setContentType(MediaType.APPLICATION_PDF_VALUE);
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=FUND_"+".pdf");
            JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
        } catch (IOException e) {
            System.out.println(e);
        } catch (JRException e) {
            System.out.println(e);
        }finally {
            if(inputStream!=null){
                try {
                    inputStream.close();
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        }

    }
}