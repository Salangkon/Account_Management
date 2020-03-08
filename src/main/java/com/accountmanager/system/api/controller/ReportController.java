package com.accountmanager.system.api.controller;

import javax.servlet.http.HttpServletResponse;

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

    @GetMapping(value = "/salestax", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public void getSalesTaxPDF(HttpServletResponse response)
            throws Exception {
    salesTaxService.genSalesTaxPDF(response);
    }

    @GetMapping(value = "/purchasetax", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public void getPurchaseTaxPDF(HttpServletResponse response)
            throws Exception {
    purchaseTaxService.genPurchaseTaxPDF(response);
    }
}