package com.accountmanager.system.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.accountmanager.system.model.ReportTex;
import com.accountmanager.system.service.PurchaseTaxService;
import com.accountmanager.system.service.SalesTaxService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * ReportController
 */
@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    SalesTaxService salesTaxService;

    @Autowired
    PurchaseTaxService purchaseTaxService;

    @GetMapping(value = "/type/reportSaleTax/userid/{userid}/startDate/{startDate}/endDate/{endDate}/{header}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public void getSalesTaxPDF(HttpServletResponse response,@PathVariable String userid,@PathVariable String startDate,@PathVariable String endDate,@PathVariable String header)
            throws Exception {
    salesTaxService.genSalesTaxPDF(response, "ReportSaleTax", userid, startDate, endDate);
    }

    @GetMapping(value = "/type/reportBuyTax/userid/{userid}/startDate/{startDate}/endDate/{endDate}/{header}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public void genReportSaleTaxPDF(HttpServletResponse response,@PathVariable  String userid,@PathVariable  String startDate,@PathVariable String endDate,@PathVariable String header)
            throws Exception {
                salesTaxService.genReportBuyTaxPDF(response, "ReportBuyTax", userid, startDate, endDate);;
    }

    @GetMapping(value = "/purchasetax", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public void getPurchaseTaxPDF(HttpServletResponse response)
            throws Exception {
    purchaseTaxService.genPurchaseTaxPDF(response);
    }

    @GetMapping(value = "/data/salestax", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public List<ReportTex> getreportsTex()
            throws Exception {
               return salesTaxService.reportsTex("ReportBuyTax", "s1", "0", "0");
    }
}