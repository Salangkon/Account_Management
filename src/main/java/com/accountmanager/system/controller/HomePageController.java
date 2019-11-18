package com.accountmanager.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {

	@RequestMapping("/")
	public String HomePages() {
		return "F1HomePages";
	}

	@RequestMapping("/login")
	public String login() {
		return "login";
	}

	@RequestMapping("/register")
	public String register() {
		return "register";
	}
	
	/* เอกสารขาย */
	@RequestMapping("/offer-price-list")
	public String offerPriceList() {
		return "F2M1OfferPriceList";
	}

	@RequestMapping("/billing-list")
	public String billingList() {
		return "F2M2BillingList";
	}

	@RequestMapping("/tax-invoice-list")
	public String taxInvoiceList() {
		return "F2M3TaxInvoiceList";
	}

	@RequestMapping("/receipt-list")
	public String receiptList() {
		return "F2M4ReceiptList";
	}

	/* เอกสารซื้อ */
	@RequestMapping("/purchase-order-list")
	public String purchaseOrderList() {
		return "F3M1PurchaseOrderList";
	}

	@RequestMapping("/product-list")
	public String productList() {
		return "F3M2ProductList";
	}
	
	/* ค่าใช้จ่าย */
	@RequestMapping("/expenses")
	public String expenses() {
		return "F4Expenses";
	}

	/* ผังบัญชี */
	@RequestMapping("/chart-accounts")
	public String chartAccounts() {
		return "F5ChartAccounts";
	}
	
	/* สมุดรายวัน */
	@RequestMapping("/report-quotidia")
	public String reportQuotidia() {
		return "F6ReportQuotidia";
	}
	
	/* รายงานภาษี */
	@RequestMapping("/report-buy-tax")
	public String reportBuyTax() {
		return "F7M1ReportBuyTax";
	}

	@RequestMapping("/report-sale-tax")
	public String reportSaleTax() {
		return "F7M2ReportSaleTax";
	}
	
	/* สมุดรายชื่อ */
	@RequestMapping("/customers-list")
	public String usersList() {
		return "F8CustomersList";
	}
	
	/* จัดเก็บไฟล์  ขอเพิ่มจาก  user*/
	@RequestMapping("/file-storage")
	public String fileStorage() {
		return "F10FileStorage";
	}

	/* ตั้งค่า */
	@RequestMapping("/setting")
	public String setting() {
		return "F9Setting";
	}
}
