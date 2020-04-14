<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="page">
    <div class="subpage">
        <div id="printThis">
            <div>
                <table>
                    <tr>
                        <th style="color: purple;">
                            <h5><b>สมุดรายวันทั่วไป</b></h4>
                                <label>Joumal voucher</label>
                        </th>
                    </tr>
                </table>
                <table style="width: 100%;margin-top: 10px;">
                    <tr>
                        <td style="width: 60%;">บริษัท โฟลว์แอคเคาน์ กำจัด</td>
                        <td style="width: 15%; color: purple;">เลขที่/Voucher</td>
                        <td style="width: 25%;" id="departmentIdPrint"></td>
                    </tr>
                </table>
                <table style="width: 100%;">
                    <tr>
                        <td style="width: 60%;"></td>
                        <td style="width: 15%; color: purple;">วันที่/Date</td>
                        <td style="width: 25%;" id="datePrint"></td>
                    </tr>
                </table>
                <table style="width: 100%;">
                    <tr>
                        <th style="width: 60%;"></th>
                        <td style="width: 15%; color: purple;">อ้างอิง/Reference</td>
                        <td style="width: 32%;" id="dateEndPrint"></td>
                    </tr>
                </table>
                <table style="width: 100%;">
                    <tr>
                        <td style="width: 60%;">เลขประจำตัวผู้เสียภาษี</td>
                        <td style="width: 15%; color: purple;">ผู้จัดทำ/Preparer</td>
                        <td style="width: 25%;"></td>
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
                        <td style="width: 50%;color: purple;"><b>คำอธิบาย/Description</b></td>
                    </tr>
                </table>
                <table class="table table-bordered" id="tablePrintPDFDisplay" style="margin-top: 15px;">
                    <tr>
                        <td style="width: 15%;text-align: center;">รหัสบัญชี<br>Code</td>
                        <td style="width: 45%;text-align: center">ชื่อบัญชี<br>Account Name</td>
                        <td style="width: 20%;text-align: center">เดบิค<br>Debit</td>
                        <td style="width: 20%;text-align: center">เครดิต<br>Credit</td>
                    </tr>
                    <tr style="height: 500px;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style="height: 10px;">
                        <td></td>
                        <td style="text-align: right;">รวมทั้งสิ้น/Grand total</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style="height: 10px;">
                        <td colspan="4">หมายเหตุ/Remark </td>
                    </tr>
                </table>
                <table class="table table-bordered" id="tablePrintPDFDisplay">
                    <tr style="height: 60px;">
                        <td style="width: 35%;text-align: center;">
                            ผู้จัดทำ/Preparer<br><br><br><br>(.................................................................)<br>วันที่/Date:
                        </td>
                        <td style="width: 40%;text-align: center">ผู้สอบทาน/Review
                            by<br><br><br><br>(.................................................................)<br>วันที่/Date:</td>
                        <td style="width: 35%;text-align: center">ผู้อนุมัติ/Approve
                            by<br><br><br><br>(.................................................................)<br>วันที่/Date:</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>