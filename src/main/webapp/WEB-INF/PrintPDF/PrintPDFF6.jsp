<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="page">
    <div class="subpage">
        <div id="printThis">
            <div>
                <table>
                    <tr>
                        <th style="color: purple;">
                            <h4><b id="titleTHPrint"></b></h4>
                            <b id="titleENPrint"></b>
                        </th>
                    </tr>
                </table>
                <table style="width: 100%">
                    <tr>
                        <td style="width: 60%;text-align: start;">
                            <table style="width: 100%">
                                <tr>
                                    <td style="width: 100%;"><%=user.getCompanys().getCompanyName()%></td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 100%;"><%=user.getAddress() %></td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 100%;">เลขประจำาตัวผู้เสียภาษี/Tax ID: <%=user.getCompanys().getTaxId() %></td>
                                </tr>
                            </table>
                        </td>
                        <td style="width: 40%">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 35%; color: purple;">เลขที่/Voucher</td>
                                    <td style="width: 65%;" id="documentCodePrint"></td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 35%; color: purple;">วันที่/Date</td>
                                    <td style="width: 65%;" id="datePrint"></td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 35%; color: purple;">อ้างอิง/Reference</td>
                                    <td style="width: 65%;" id="referenceDocumentPrint"></td>
                                </tr>
                            </table>
                            <table style="width: 100%;">
                                <tr>
                                    <td style="width: 35%; color: purple;">ผู้จัดทำ/Preparer</td>
                                    <td style="width: 65%;" id="nameF6PDF"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%;margin-top: 15px;">
                    <tr>
                        <td style="width: 50%;color: purple;">ผู้ติดต่อ/Contact</td>
                        <td style="width: 50%;"></td>
                    </tr>
                </table>
                <table style="width: 100%;margin-top: 20px;">
                    <tr>
                        <td><b style="color: purple;">คำอธิบาย/Description</b>
                            <p style="margin-left: 20px;" id="descriptionPrint"></p>
                        </td>
                    </tr>
                </table>
                <table style="width: 100%;">
                    <tr>
                        <td style="width: 15%;border: 1px solid black">รหัสบัญชี<br>Code</td>
                        <td style="width: 45%;border: 1px solid black">ชื่อบัญชี<br>Account Name</td>
                        <td style="width: 20%;text-align: right;border: 1px solid black">เดบิค<br>Debit</td>
                        <td style="width: 20%;text-align: right;border: 1px solid black">เครดิต<br>Credit</td>
                    </tr>
                    <tr style="height: 500px;">
                        <td style="border: 1px solid black;vertical-align: top;"><table id="tablePrintPDFPassCode"></table></td>
                        <td style="border: 1px solid black;vertical-align: top;"><table id="tablePrintPDFText"></table></td>
                        <td style="border: 1px solid black;vertical-align: top;"><table id="tablePrintPDFDebit"></table></td>
                        <td style="border: 1px solid black;vertical-align: top;"><table id="tablePrintPDFCredit"></table></td>
                    </tr>
                    <tr style="height: 10px;">
                        <td style="border: 1px solid black"></td>
                        <td style="text-align: right;border: 1px solid black">รวมทั้งสิ้น/Grand total</td>
                        <td style="border: 1px solid black" id="sumDebitPDF"></td>
                        <td style="border: 1px solid black" id="sumCreditPDF"></td>
                    </tr>
                    <tr style="height: 10px;">
                        <td colspan="4" style="border: 1px solid black">หมายเหตุ/Remark </td>
                    </tr>
                </table>
                <table id="">
                    <tr style="height: 60px;">
                        <td style="width: 35%;text-align: center;border: 1px solid black">
                            ผู้จัดทำ/Preparer<br><br><br><br>(.................................................................)<br>วันที่/Date:
                        </td>
                        <td style="width: 40%;text-align: center;border: 1px solid black">ผู้สอบทาน/Review
                            by<br><br><br><br>(.................................................................)<br>วันที่/Date:
                        </td>
                        <td style="width: 35%;text-align: center;border: 1px solid black">ผู้อนุมัติ/Approve
                            by<br><br><br><br>(.................................................................)<br>วันที่/Date:
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>