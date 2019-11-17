<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>Offer Price List</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>
	<style>
		label,
		select,
		textarea,
		.input-top {
			margin-top: 10px;
		}

		.col-sm-3,
		.col-sm-4 {
			text-align: right;
		}
	</style>
</head>

<body>
	<!-- Page Wrapper -->
	<div id="wrapper">

		<!-- Sidebar -->
		<%@include file="TabBar.jsp"%>
		<!-- End of Sidebar -->
		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">
				<!-- Topbar -->
				<%@include file="Topbar.jsp"%>
				<!-- Begin Page Content -->
				<div class="container-fluid">
					<!-- <p>เอกสารขาย / ใบเสนอราคา</p> -->
					<!-- Content Row -->

					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">เอกสารขาย / ใบเสนอราคา (Quotation)</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="table-responsive col-sm-12">
									<div class="row" style="margin-bottom: 10px;">
										<div class="col-sm-9"></div>
										<div class="col-sm-2">
											<select class="form-control">
												<option value="">ทุกสถานะ</option>
												<option value="">สถานะที่ 1</option>
												<option value="">สถานะที่ 2</option>
											</select>
										</div>
										<div class="col-sm-1">
											<button type="button" class="btn btn-primary" style="margin-top: 10px"
												data-toggle="modal" data-target="#myModal">สร้างใหม่</button>
										</div>
									</div>
									<div class="row" style="margin-bottom: 10px;">
										<div class="col-sm-7"></div>
										<div class="col-sm-2"><label>เริ่มต้น : </label><input id="datepicker" /> </div>
										<div class="col-sm-2"><label>ถึง : </label><input id="datepicker1" /> </div>
										<div class="col-sm-1">
											<button class="btn btn-primary" type="button"
												style="margin-top: 42px;width: 87px;"> ค้นหา <i
													class="fas fa-fw fa-search"></i></button>
										</div>
									</div>
									<table id="example" class="table table-sm table-striped table-bordered"
										width="100%">
										<thead class="bg-gradient-primary" style="color: white;">
											<tr>
												<th style="text-align: center;"><input type="checkbox"></th>
												<th>วันที่</th>
												<th>เลขที่เอกสาร</th>
												<th>ชื่อลูกค้า</th>
												<th>จำนวนเงิน</th>
												<th>สถานะ</th>
												<th>ตัวเลือก</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>


		<!-- The Modal -->
		<div class="modal fade" id="myModal">
			<div class="modal-dialog modal-lg" style="max-width: 1400px;">
				<div class="modal-content">

					<!-- Modal Header -->
					<div class="modal-header">
						<h4 class="modal-title">สร้างใบเสนอราคา</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<!-- Modal body -->
					<div class="card-body p-0">
						<div class="row">
							<div class="col-sm-11"></div>
							<div class="col-sm-1">
								<div class="p-1">
									<div class="form-group row">
										<a href="#"><i class="fas fa-2x fa-print" style="margin-right: 10px;"></i></a>
										<a href="#"><i class="fas fa-2x fa-download"></i></a>
									</div>
								</div>
							</div>
							<div class="col-lg-5">
								<div class="p-3">
									<div class="form-group row">
										<div class="col-sm-4"><label>ชื่อลูกค้า</label></div>
										<div class="col-sm-8">
											<select class="form-control" id="companyType"
												placeholder="ใส่ชื่อลูกค้าที่ต้องการออกใบเสร็จรับเงิน">
												<option value="สมุดรายวันขาย">TEST 01</option>
												<option value="สมุดรายวันซื้อ">TEST 01</option>
											</select>
										</div>
										<div class="col-sm-4"><label>ที่อยู่</label></div>
										<div class="col-sm-8">
											<textarea class="form-control" style="height: 110px"></textarea>
										</div>
										<div class="col-sm-4"><label>เลขประจำตัวผู้เสียภาษี</label></div>
										<div class="col-sm-8">
											<input type="text" style="margin-top: 10px;"
												class="form-control form-control" id="taxId"
												placeholder="เลขประจำตัวผู้เสียภาษี">
										</div>
										<div class="col-sm-4"><label>สำนักงาน / สาขาที่ </label></div>
										<div class="col-sm-8" style="margin-top: 6px;">
											<input style="margin-top: 10px;" type="radio" name=""> สำนักงานใหญ่
											<input style="margin-top: 10px;" type="radio" name=""> สาขาที่
											<!-- <input type="text" id="department"> -->
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-3"></div>
							<div class="col-lg-4">
								<div class="p-3">
									<div class="form-group row">
										<div class="col-sm-3"><label>วันที่</label></div>
										<div class="col-sm-9">
											<input id="datepicker2" />
										</div>
										<div class="col-sm-3"><label>เลขที่เอกสาร</label></div>
										<div class="col-sm-9">
											<input class="form-control" style="margin-top: 10px;" id=""
												placeholder="เลขที่เอกสาร">
										</div>
										<div class="col-sm-3"><label>ครบกำหนด</label></div>
										<div class="col-sm-9">
											<select class="form-control" id="companyType" placeholder="ครบกำหนด">
												<option value="สมุดรายวันขาย">TEST 01</option>
												<option value="สมุดรายวันซื้อ">TEST 01</option>
											</select>
										</div>
										<div class="col-sm-3"><label>เลขอ้างอิง</label></div>
										<div class="col-sm-9">
											<input class="form-control" style="margin-top: 10px;" id=""
												placeholder="เลขอ้างอิง">
										</div>
										<div class="col-sm-3"><label>ราคาสินค้า</label></div>
										<div class="col-sm-9">
											<select class="form-control" id="companyType" placeholder="ราคาไม่รวมภาษี">
												<option value="สมุดรายวันขาย">TEST 01</option>
												<option value="สมุดรายวันซื้อ">TEST 01</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<!-- table -->

							<div class="table-responsive col-sm-12" style="margin-top: 12px;">
								<div style="margin-left: 2%;width: 97%;">
									<div class="card">
										<div class="card-body">
											<table id="example1" class="table table-sm table-striped table-bordered">
												<thead class="bg-gradient-primary" style="color: white;">
													<tr>
														<th>ลำดับ</th>
														<th>รายละเอียด</th>
														<th>จำนวน</th>
														<th>ราคาต่อหน่วย</th>
														<th>ราคารวม</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th style="text-align: center;"><a href="#"><i
																	class="fas fa-trash"></i></a></th>
														<th><i class="fas fa-plus" style="color: red;"></i><a href="#"
																id="Add">เพิ่มรายการ</a></th>
														<th style="text-align: right;"><p>รวม</p></th>
														<th>00.00</th>
														<th>00.00</th>
													</tr>
												</tfoot>
											</table>
											<div class="form-group row" style="margin-top: 30px;">
												<div class="col-sm-4">
													<p style="text-align: left;">หมายเหตุ</p>
													<textarea class="form-control" style="height: 80px"></textarea>
												</div>
												<div class="col-sm-5"></div>
												<div class="col-sm-3">
													<div class="form-group row">
														<div class="col-sm-6 text-primary">รวมเป็นเงิน</div>
														<div class="col-sm-6">100.00</div>

														<div class="col-sm-6 text-primary">ส่วนลด <input type="number" style="width: 63px;">%</div>
														<div class="col-sm-6">0.00</div>

														<div class="col-sm-6 text-primary">ราคาหลังหักส่วนลด</div>
														<div class="col-sm-6">100.00</div>

														<div class="col-sm-6 text-primary"><input type="checkbox"> ภาษีมูลค่าเพิ่ม 7%</div>
														<div class="col-sm-6">7.00</div>

														<div class="col-sm-6 text-primary">จำนวนเงินทั้งสิ้น</div>
														<div class="col-sm-6">107.00</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!--end table -->

						</div>
					</div>
				</div>
				<!-- Modal footer -->
				<div class="modal-footer">
					<button type="button" class="btn btn-success" id="save">บันทึก</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
				</div>

			</div>
		</div>
	</div>
	<!--End The Modal -->

	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp" %>
	<script src="/data-table/F2M1OfferPriceList.js" type="text/javascript"></script>

</body>

</html>