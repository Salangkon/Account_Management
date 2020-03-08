<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>Chart Accounts</title>

	<%@include file="/WEB-INF/Extensions/css.jsp"%>
	<style>
		#card {
			padding: 20px;
			padding-left: 35px;
			padding-right: 35px;
			background-color: purple;
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
					<!-- <p>ผังบัญชี</p> -->
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary" id="taxtTitle"></h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="row" style="margin-bottom: 20px;">
									<div class="col-sm-10">
										<button type="button" class="btn btn-outline-primary"
											onclick="hiddenCondition('')">หมวดหมู่ทั้งหมด</button>
										<button type="button" class="btn btn-outline-secondary"
											onclick="hiddenCondition('สินทรัพย์')">สินทรัพย์</button>
										<button type="button" class="btn btn-outline-success"
											onclick="hiddenCondition('หนี้สิน')">หนี้สิน</button>
										<button type="button" class="btn btn-outline-danger"
											onclick="hiddenCondition('ส่วนของผู้ถือหุ้น')">ส่วนของผู้ถือหุ้น</button>
										<button type="button" class="btn btn-outline-info"
											onclick="hiddenCondition('รายได้')">รายได้</button>
										<button type="button" class="btn btn-outline-dark"
											onclick="hiddenCondition('ค่าใช้จ่าย')">ค่าใช้จ่าย</button>
									</div>
									<div class="col-sm-2" style="text-align: right;">
										<button type="button" class="btn btn-primary" data-toggle="modal"
											data-target="#myModal">บริหารผังบัญชี</button>
									</div>
								</div>
							</div>

							<div id="T1">
								<table id="tabelAll" class="table table-sm dataTable no-footer" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>รหัสบัญชี</th>
											<th>ชื่อบัญชี</th>
											<th>หมวดหมู่</th>
										</tr>
									</thead>
								</table>
							</div>
							<div id="T2">
								<table id="tabelAllT2" class="table table-sm dataTable no-footer" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>รหัสบัญชี</th>
											<th>ชื่อบัญชี</th>
											<th>หมวดหมู่</th>
										</tr>
									</thead>
								</table>
							</div>
							<div id="T3">
								<table id="tabelAllT3" class="table table-sm dataTable no-footer" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>รหัสบัญชี</th>
											<th>ชื่อบัญชี</th>
											<th>หมวดหมู่</th>
										</tr>
									</thead>
								</table>
							</div>
							<div id="T4">
								<table id="tabelAllT4" class="table table-sm dataTable no-footer" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>รหัสบัญชี</th>
											<th>ชื่อบัญชี</th>
											<th>หมวดหมู่</th>
										</tr>
									</thead>
								</table>
							</div>
							<div id="T5">
								<table id="tabelAllT5" class="table table-sm dataTable no-footer" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>รหัสบัญชี</th>
											<th>ชื่อบัญชี</th>
											<th>หมวดหมู่</th>
										</tr>
									</thead>
								</table>
							</div>
							<div id="T6">
								<table id="tabelAllT6" class="table table-sm dataTable no-footer" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>รหัสบัญชี</th>
											<th>ชื่อบัญชี</th>
											<th>หมวดหมู่</th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>

					<!-- The Modal -->
					<div class="modal fade" id="myModal">
						<div class="modal-dialog modal-lg" style="max-width: 1200px; margin-top: 100px;">
							<div class="modal-content">
								<div class="card-body p-0">
									<div class="card-body p-0">
										<div class="row">
											<div class="col-lg-6 border overflow-auto"
												style="background-color: aliceblue; height: 700px; padding: 20px">
												<div id="dataJSTree" class="demo"></div>
											</div>
											<div class="col-lg-6 overflow-auto" style="height: 700px; padding: 20px">
												<div class="row p-3">
													<div class="form-group row">
														<div class="col-sm-12" ma>
															<h4 style="color: blueviolet;"><b>แก้ไขผังบัญชี</b></h4>
															<label id="textDisplay"></label>
															<input id="id" hidden>
														</div>
														<div class="col-sm-3"
															style="margin-top: 23px;text-align: right;">
															<label>รหัสบัญชี:
															</label><label style="color: red;">
																*</label></div>
														<div class="col-sm-9">
															<input type="text" style="max-width: 90%;margin-top: 25px"
																class="form-control" id="passCode"
																placeholder="รหัสบัญชี">
														</div>
														<div class="col-sm-3"
															style="margin-top: 23px;text-align: right;">
															<label>ชื่อบัญชี: </label> <label style="color: red;">
																*</label>
														</div>
														<div class="col-sm-9">
															<input type="text" style="max-width: 90%;margin-top: 25px"
																class="form-control" id="text" placeholder="ชื่อบัญชี">
														</div>
														<div class="col-sm-3"
															style="margin-top: 23px;text-align: right;">
															<label>คำอธิบายบัญชี: </label></div>
														<div class="col-sm-9">
															<textarea class="form-control" id="detail"
																style="height: 80px;width: 90%;margin-top: 20px;"
																placeholder="คำอธิบายบัญชี"></textarea>
														</div>
													</div>
												</div>

												<div class="modal-footer">
													<button type="button" class="btn btn-success"
														onclick="saveCreate()" id="save">บันทึก</button>
													<button type="button" class="btn btn-success"
														onclick="saveUpdate()" id="edit">แก้ไข</button>
													<button type="button" class="btn btn-secondary"
														data-dismiss="modal">ยกเลิก</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--End The Modal -->


					<!-- script -->
					<%@include file="/WEB-INF/Extensions/js.jsp"%>
					<script src="/data-table/F5ChartAccounts.js" type="text/javascript"></script>
</body>

</html>