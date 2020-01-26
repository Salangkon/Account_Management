<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="page">
	<div class="subpage">
		<div id="printThis">
			<div>
				<table style="width: 100%; text-align: center;">
					<tr>
						<th style="width: 50%;"></th>
						<th style="width: 40%;">
							<h4 style="color: purple;">
								<b>ใบเสนอราคา</b>
							</h4>
							<hr>
						</th>
						<th style="width: 10%;">
							<h4 style="color: purple;">
								<div class="triangle"></div>
							</h4>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 50%;"></td>
						<td style="width: 15%; color: purple;">เลขที่</td>
						<td style="width: 35%;" id="departmentIdPrint"></td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 50%;"></td>
						<td style="width: 15%; color: purple;">วันที่</td>
						<td style="width: 35%;" id="datePrint"></td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<th style="width: 50%;">Manager Account</th>
						<td style="width: 15%; color: purple;">วันครบกำหนด</td>
						<td style="width: 35%;" id="dateEndPrint"></td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<th style="width: 50%; color: orangered;">ลูกค้า</th>
						<td style=" width: 15%; color: purple;">ผู้ขาย</td>
						<td style="width: 35%;">Management Account</td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 50%;" id="customersPrint"></td>
						<td style="width: 40%;">
							<hr>
						</td>
						<td style="width: 10%;">
						</td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 50%;" id="customersNamePrint"></td>
						<td style="width: 50%;"></td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 50%;" id="taxIdPrint"></td>
						<td style="width: 50%;"></td>
					</tr>
				</table>
				<table class="table table-bordered table-striped" id="tablePrintPDFDisplay" style="margin-top: 15px;">
					<tr>
						<th>ลำดับ</th>
						<th>รายละเอียด</th>
						<th>จำนวน</th>
						<th>ราคาต่อหน่วย</th>
						<th>รวมยอด</th>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 85%;text-align: right; color: orangered;">รวมเป็นเงิน</td>
						<td style="width: 15%;text-align: right;" id="priceDisplayPrint">0</td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 85%;text-align: right; color: orangered;">ส่วนลด</td>
						<td style="width: 15%;text-align: right;" id="discountPrint">0</td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 85%;text-align: right; color: orangered;">จำนวนเงินหลังหักส่วนลด
						<td>
						<td style="width: 15%;text-align: right;" id="discountPricePrint">0</td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 85%;text-align: right; color: orangered;">ภาษีมูลค่าเพิ่ม 7%
						<td>
						<td style="width: 15%;text-align: right;" id="vatPrint">0</td>
					</tr>
				</table>
				<table style="width: 100%;">
					<tr>
						<td style="width: 85%;text-align: right; color: orangered;">จำนวนเงินทั้งสิ้น</td>
						<td style="width: 15%;text-align: right;" id="productPriceAllPrint">0</td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="max-width: 50%;"></td>
						<td style="max-width: 50%;" id="priceDisplayPrintTh"></td>
					</tr>
				</table>
				<table>
					<tr>
						<td style="max-width: 50%;"><label style="color: orangered;">หมายเหตุ</label><br><label
								style="margin-left: 20px;" id="notePrint"></label></td>
						<td style="max-width: 50%;"><label></label></td>
					</tr>
				</table>
				<!-- <table style="margin-top: 420px;width: 100%;">
					<tr>
						<td style="width: 75%;"></td>
						<td style="width: 25%;">
							<label>ผู้ขาย</label>
							<hr>
							<label>วันที่</label>
							<hr>
							<label>ผู้อนุมัติ</label>
							<hr>
							<label>วันที่</label>
							<hr>
						</td>
					</tr>
				</table> -->
			</div>
		</div>
	</div>
</div>