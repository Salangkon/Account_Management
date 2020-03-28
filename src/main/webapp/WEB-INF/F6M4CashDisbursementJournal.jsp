<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>Report Quotidia</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>

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
					<!-- <p>สมุดรายวัน</p> -->
					<div class="row" style="margin-bottom: 10px;margin-left: 3px;">สมุดรายวัน / สมุดรายวันจ่าย</div>
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">สมุดรายวันจ่าย</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="table-responsive col-sm-12">
									<div class="row">
										<div class="col-sm-10"></div>
										<div class="col-sm-1"></div>
										<div class="col-sm-1">
											<button type="button" class="btn btn-primary" data-toggle="modal"
												data-target="#myModal">สร้างใหม่</button>
										</div>
									</div>
									<div class="row" style="margin-bottom: 10px;">
										<div class="col-sm-7"></div>
										<div class="col-sm-2"><label>เริ่มต้น : </label><input id="datepicker" /> </div>
										<div class="col-sm-2"><label>ถึง : </label><input id="datepicker1" /> </div>
										<div class="col-sm-1">
											<button class="btn btn-primary" type="button"
												style="margin-top: 32px;width: 87px;"> ค้นหา <i
													class="fas fa-fw fa-search"></i></button>
										</div>
									</div>
									<table id="example" class="table table-sm table-hover"
										width="100%">
										<thead class="bg-gradient-primary" style="color: white;">
											<tr>
												<th>วันที่</th>
												<th>เลขที่เอกสาร</th>
												<th>คำอธิบาย</th>
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
			<div class="modal-dialog modal-lg">
				<div class="modal-content">

					<!-- Modal Header -->
					<div class="modal-header">
						<h4 class="modal-title">สร้างสมุดรายวัน</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<!-- Modal body -->
					<div class="card-body p-0">
						<!-- Nested Row within Card Body -->
						<div class="row">
							<div class="col-lg-12">
								<div class="p-3">
									<form class="user">
										<div class="form-group row">
											<div class="col-sm-12" style="text-align: right;">
												<a href="#"><i class="fas fa-2x fa-print"
														style="margin-right: 10px;"></i></a>
												<a href="#"><i class="fas fa-2x fa-download"></i></a>
											</div>
											<div class="col-sm-12">
												<label>สมุดรายวัน</label>
												<select class="form-control" id="companyType" style="width: 200px;">
													<option value="สมุดรายวันขาย">สมุดรายวันขาย</option>
													<option value="สมุดรายวันซื้อ">สมุดรายวันซื้อ</option>
												</select>
											</div>

											<div class="col-sm-7 mb-3 mb-sm-0">
												<div>
													<label>ชื่อลูกค้า</label><input class="form-control" id=""
														placeholder="ชื่อลูกค้า">
												</div>
												<div>
													<label>คำอธิบาย</label>
													<textarea class="form-control" style="height: 110px"></textarea>
												</div>
											</div>
											<div class="col-sm-5">

												<div>
													<label>เลขประจำตัวผู้เสียภาษี</label><input type="password"
														class="form-control form-control" id="taxId"
														placeholder="เลขประจำตัวผู้เสียภาษี">
												</div>
												<div>
													<label>เลขที่เอกสาร</label><input class="form-control" id=""
														placeholder="เลขที่เอกสาร">
												</div>
												<div>
													<label>เอกสารอ้างอิง</label><input class="form-control" id=""
														placeholder="เอกสารอ้างอิง">
												</div>
											</div>

											<div class="table-responsive col-sm-12" style="margin-top: 12px;">
												<table id="example1" class="table table-sm table-hover"
													width="100%">
													<thead class="bg-gradient-primary" style="color: white;">
														<tr>
															<th style="text-align: center;"><input type="checkbox"></th>
															<th>รหัสบัญชี</th>
															<th>ชื่อบัญชี</th>
															<th>รายละเอียด</th>
															<th>เดบิต</th>
															<th>เครดิต</th>
														</tr>
													</thead>
													<tfoot>
														<tr>
															<th style="text-align: center;"><a href="#"><i
																		class="fas fa-trash"></i></a></th>
															<th colspan="2"><i class="fas fa-plus"
																	style="color: red;"></i> <a href="#">เพิ่มรายการ</a>
															</th>
															<th style="text-align: right;"><label>รวม</label></th>
															<th>00.00</th>
															<th>00.00</th>
														</tr>
													</tfoot>
												</table>
											</div>

										</div>
									</form>
								</div>
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
		<script src="\data-table\F6M4CashDisbursementJournal.js" type="text/javascript"></script>

</body>

</html>