<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>Bought Day Book</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>
	<style>
		.col-sm-4,
		.col-sm-8 {
			text-align: right;
			margin-top: 20px;
		}
		.invalid{
			color: red;
		}
		[x-placement=bottom-start] {
			position: relative !important;
			top: -37px !important; 
			margin-top: -40px !important;
		}
		/* .dropdown-menu.show:first-of-type {
			position: relative !important;
			top: 2.5rem !important; 
			margin-top: -40px !important;
		} */
		[x-placement=top-start] {
			position: relative !important;
			top: 2.5rem !important; 
			margin-top: -40px !important;
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
					<!-- <p>สมุดรายวัน</p> -->
					<div class="row" style="margin-bottom: 10px;margin-left: 3px;">สมุดรายวัน / สมุดรายวันซื้อ</div>
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">สมุดรายวันซื้อ</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="table-responsive col-sm-12">
									<div class="row">
										<div class="col-sm-10"></div>
										<div class="col-sm-1"></div>
										<div class="col-sm-1">
											<button type="button" class="btn btn-primary" data-toggle="modal"
												data-target="#myModal" onclick="createUpdate(null)">สร้างใหม่</button>
										</div>
									</div>
									<div class="row" style="margin-bottom: 10px;">
										<div class="col-sm-7"></div>
										<div class="col-sm-2"><label>เริ่มต้น : </label><input id="fromDate" /> </div>
										<div class="col-sm-2"><label>ถึง : </label><input id="toDate" /> </div>
										<div class="col-sm-1">
											<button class="btn btn-primary" type="button" onclick="tableJournal()"
												style="margin-top: 32px;width: 87px;"> ค้นหา <i
													class="fas fa-fw fa-search"></i></button>
										</div>
									</div>
									</form>
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
			<div class="modal-dialog modal-lg" style="max-width: 1600px;">
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
								<div class="p-3" style="margin-right: 30px">
									<form class="user">
										<div class="form-group row">
											<div class="col-sm-12" style="text-align: right;margin-bottom: 20px;">
												<a href="#" onclick="saveCreate()"><i class="fas fa-2x fa-print"
														style="margin-right: 10px;"></i></a>
												<a href="#" onclick="saveCreate()"><i class="fas fa-2x fa-download"></i></a>
											</div>
											<input id="id" hidden>
											<div class="col-sm-5 mb-3 mb-sm-0">
												<div class="form-group row">
													<div class="col-sm-4">
														<label>ชื่อลูกค้า* : </label>
													</div>
													<div class="col-sm-8">
														<select class="form-control" placeholder="ใส่ชื่อลูกค้า"
															id="customers">
															<option value=""> ใส่ชื่อลูกค้าที่ต้องการออกใบเสร็จรับเงิน
															</option>
														</select>
														<div hidden class="invalid" id="invalid-customers">
															กรุณาระบุเลขที่เอกสาร
														</div>
													</div>
													<div class="col-sm-4">
														<label>คำอธิบาย : </label>
													</div>
													<div class="col-sm-8">
														<textarea class="form-control" id="description"
															style="height: 110px"></textarea>

													</div>
												</div>

											</div>
											<div class="col-sm-3"></div>
											<div class="col-sm-4">
												<div class="form-group row">
													<div class="col-sm-4">
														<label>วันที่* : </label>
													</div>
													<div class="col-sm-8">
														<input id="date" />
														<div hidden class="invalid" id="invalid-date">
															กรุณาระบุวันที่
														</div>
													</div>
													<div class="col-sm-4">
														<label>เลขที่เอกสาร* : </label>
													</div>
													<div class="col-sm-8">
														<input class="form-control" id="referenceDocument"
															placeholder="เลขที่เอกสาร">
															<div hidden class="invalid" id="invalid-referenceDocument">
																กรุณาระบุเลขที่เอกสาร
															</div>
													</div>
												</div>
											</div>

											<div class="table-responsive col-sm-12" style="margin-top: 12px;">
												<table id="example1" class="table table-sm table-hover"
													width="100%">
													<thead class="bg-gradient-primary" style="color: white;">
														<tr>
															<th>รหัสบัญชี / ชื่อบัญชี</th>
															<th>รายละเอียด</th>
															<th>เดบิต</th>
															<th>เครดิต</th>
															<th></th>
														</tr>
													</thead>
													<tfoot>
														<tr>
															<th>
																<button type="button" class="btn btn-default btn-sm"
																	onclick="Add()">
																	<i class="fas fa-plus" style="color: red"></i>
																	เพิ่มรายการ
																</button>
															</th>
															<th style="text-align: right;"><span hidden class="invalid" id="invalid-sumDebitCredit">
																กรุณาตรวจสอบยอดเคดิต และเดบิต
															</span> รวม </th>
															<th><label id="sumDebit">00.00</label></th>
															<th><label id="sumCredit">00.00</label></th>
															<th></th>
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
						<button type="button" class="btn btn-success" id="checkSaveFlg" onclick="saveCreate()">บันทึก</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
					</div>

				</div>
			</div>
		</div>
		<!--End The Modal -->

		<!-- script -->
		<%@include file="/WEB-INF/Extensions/js.jsp" %>
		<script src="\data-table\F6M2BoughtDayBook.js" type="text/javascript"></script>
		<!-- select -->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>

</body>

</html>