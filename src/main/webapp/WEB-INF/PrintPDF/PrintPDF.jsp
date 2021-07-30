<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="page">
	<div class="subpage">
		<div id="printThis">

			<table style="width: 100%;">
				<tr style="height: 1150px;">
					<th style="vertical-align: top">
						<table style="width: 100%; text-align: center;">
							<tr>
								<th style="width: 60%;padding-top: 50px; text-align: left;"><%=user.getCompanys().getCompanyName()%></th>
								<th style="width: 35%;">
									<h4 style="color: purple;">
										<b>ใบเสนอราคา</b>
									</h4>
									<hr>
								</th>
								<th style="width: 5%;">
									<h4 style="color: purple;">
										<div class="triangle"></div>
									</h4>
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
								<td style="width: 60%;"><%=user.getCompanys().getAddress()%></td>
								<td style="width: 15%; color: purple;">เลขที่</td>
								<td style="width: 35%;" id="departmentIdPrint"></td>
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
								<td style="width: 60%;">เลขประจำตัวผู้เสียภาษี <%=user.getCompanys().getTaxId()%></td>
								<td style="width: 15%; color: purple;">วันที่</td>
								<td style="width: 35%;" id="datePrint"></td>
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
								<th style="width: 60%;"></th>
								<td style="width: 15%; color: purple;">วันครบกำหนด</td>
								<td style="width: 35%;" id="dateEndPrint"></td>
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
								<th style="width: 57%; color: orangered;">ลูกค้า</th>
								<td style="width: 34%;"><hr></td>
								<td style="width: 9%;"></td>
							</tr>
						</table>
						<table style="width: 100%;">
							<tr>
								<td style="width: 60%;" id="customersPrint"></td>
								<td style="width: 35%;">
									
								</td>
								<td style="width: 5%;">
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
						<table class="table table-sm" id="tablePrintPDFDisplay" style="margin-top: 15px;">
							<tr>
								<th style="width: 5%;text-align: center;">ลำดับ</th style="width: 100%;">
								<th style="width: 45%;text-align: center">รายละเอียด</th style="width: 100%;">
								<th style="width: 10%;text-align: center">จำนวน</th style="width: 100%;">
								<th style="width: 20%;text-align: center">ราคาต่อหน่วย</th style="width: 100%;">
								<th style="width: 20%;text-align: center">รวมยอด</th style="width: 100%;">
							</tr>
						</table>
						<hr>
						<!-- ไม่รวมภาษี -->
						<div id="statusVatPrint1">
							<table style="width: 100%;margin-top: 15px;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">รวมเป็นเงิน</td>
									<td style="width: 15%;text-align: right;" id="priceDisplayPrint">0</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr>
									<td style="width: 80%;text-align: right; color: orangered;">ส่วนลด</td>
									<td style="width: 5%;text-align: right;" id="discountPrint">0</td>
									<td style="width: 15%;text-align: right;" id="discountPricePrint">0</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">
										จำนวนเงินหลังหักส่วนลด
									<td>
									<td style="width: 15%;text-align: right;" id="discountProductPricePrint">0</td>
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
									<td style="width: 85%;text-align: right; color: orangered;">จำนวนเงินทั้งสิ้น
									</td>
									<td style="width: 15%;text-align: right;" id="productPriceAllPrint">0</td>
								</tr>
							</table>
							<table>
								<tr>
									<td style="max-width: 50%;"></td>
									<td style="max-width: 50%;" id="priceDisplayPrintTh"></td>
								</tr>
							</table>
						</div>
						<!-- รวมภาษี -->
						<div id="statusVatPrint2">
							<table style="width: 100%;margin-top: 15px;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">รวมเป็นเงิน</td>
									<td style="width: 15%;text-align: right;" id="priceDisplayPrint1">0</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr>
									<td style="width: 80%;text-align: right; color: orangered;">ส่วนลด</td>
									<td style="width: 5%;text-align: right;" id="discountPrint1">0</td>
									<td style="width: 15%;text-align: right;" id="discountPricePrint1">0</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">
										จำนวนเงินหลังหักส่วนลด
									<td>
									<td style="width: 15%;text-align: right;" id="discountProductPricePrint1">0</td>
								</tr>
							</table>
							<table style="width: 100%;margin-top: 20px;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">ภาษีมูลค่าเพิ่ม 7%
									<td>
									<td style="width: 15%;text-align: right;" id="vatPrint1">0</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">ราคาไม่รวมภาษี</td>
									<td style="width: 15%;text-align: right;" id="productPriceAllPrint1">0</td>
								</tr>
							</table>
							<table style="width: 100%;">
								<tr>
									<td style="width: 85%;text-align: right; color: orangered;">จำนวนเงินทั้งสิ้น
									</td>
									<td style="width: 15%;text-align: right;" id="sumPricePrint1">0</td>
								</tr>
							</table>
							<table>
								<tr>
									<td style="max-width: 50%;"></td>
									<td style="max-width: 50%;" id="priceDisplayPrintTh1"></td>
								</tr>
							</table>
						</div>
						<!-- หมายเหตุ -->
						<table id="noteFlg">
							<tr>
								<td style="width: 50%;"><label style="color: orangered;">หมายเหตุ</label></td>
								<td style="width: 50%;"><label></label></td>
							</tr>
						</table>
						<table>
							<tr>
								<td style="width: 50%;" id="notePrint"></td>
								<td style="width: 50%;"></td>
							</tr>
						</table>
					</th>
				</tr>
				<tr style="vertical-align: bottom;">
					<th>
						<table style="width: 100%;">
							<tr style="text-align: center;">
								<td style="width: 25%;">(...........................................)<br>ผู้ขาย</td>
								<td style="width: 25%;">(...........................................)<br>วันที่</td>
								<td style="width: 25%;">(...........................................)<br>ผู้อนุมัติ</td>
								<td style="width: 25%;">(...........................................)<br>วันที่</td>
							</tr>
						</table>
					</th>
				</tr>
			</table>

		</div>
	</div>
</div>