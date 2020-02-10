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
							<h4 class="m-0 font-weight-bold text-primary">ผังบัญชี</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="table-responsive col-sm-12">
									<div class="row" style="margin-bottom: 20px;">
										<div class="col-sm-9"></div>
										<div class="col-sm-2"></div>
										<div class="col-sm-1">
											<button type="button" class="btn btn-primary" data-toggle="modal"
												data-target="#myModal">สร้างใหม่</button>
										</div>
									</div>
								</div>
							</div>
							<table id="example" class="table table-sm" width="100%">
								<thead class="bg-gradient-primary" style="color: white;">
									<tr>
										<th style="text-align: center;">วันที่</th>
										<th>เลขที่เอกสาร</th>
										<th>ชื่อลูกค้า</th>
										<th>จำนวนเงิน</th>
										<th style="text-align: center;">สถานะ</th>
										<th style="text-align: center;">ตัวเลือก</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>

					<!-- The Modal -->
					<div class="modal fade" id="myModal">
						<div class="modal-dialog modal-lg" style="max-width: 1200px;margin-top: 100px;">
							<div class="modal-content">
								<div class="card-body p-0">
									<div class="card-body p-0">
										<div class="row">
											<div class="col-lg-6 border overflow-auto"
												style=" background-color: aliceblue;height:700px;padding: 20px">
												<div id="data" class="demo"></div>
											</div>
											<div class="col-lg-6 overflow-auto" style="height: 700px;padding: 20px">
												<button type="button" class="btn btn-default btn-sm" onclick="Add()">
													<i class="fas fa-plus" style="color: red"></i>
													เพิ่มรายการ
												</button>
												<div>
													<input id="text">
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