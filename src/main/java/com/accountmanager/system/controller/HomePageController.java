package com.accountmanager.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {

	@RequestMapping("/home-pages")
	public String HomePages() {
		return "F1HomePages";
	}

	@RequestMapping("/loginOld")
	public String login() {
		return "login";
	}

	@RequestMapping("/")
	public String loginNew() {
		return "loginNew";
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

	@RequestMapping("/receive-report")
	public String productList() {
		return "F3M2ReceiveReport";
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
	/* สมุดรายวัน สมุดรายวันทั่วไป */
	@RequestMapping("/general-journal")
	public String generalJournal() {
		return "F6M1GeneralJournal";
	}
	/* สมุดรายวัน  สมุดรายวันซื้อ*/
	@RequestMapping("/bought-day-book")
	public String boughtDayBook() {
		return "F6M2BoughtDayBook";
	}
	/* สมุดรายวัน สมุดรายวันขาย */
	@RequestMapping("/sales-journal")
	public String salesJournal() {
		return "F6M3SalesJournal";
	}
	/* สมุดรายวัน สมุดรายวันจ่าย */
	@RequestMapping("/cash-disbursement-journal")
	public String cashDisbursementJournal() {
		return "F6M4CashDisbursementJournal";
	}
	/* สมุดรายวัน สมุดรายวันรับ */
	@RequestMapping("/cash-receipts-journal")
	public String cashReceiptsJournal() {
		return "F6M5CashReceiptsJournal";
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

	@RequestMapping("/setting-user")
	public String settingUser() {
		return "F9SettingUser";
	}
}
