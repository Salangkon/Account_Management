<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="ISO-8859-1">
		<title>Report Sale Tax</title>

		<%@include file="/WEB-INF/Extensions/css.jsp" %>

	</head>

	<body>
		<!-- Page Wrapper -->
		<div id="wrapper">

			<!-- Sidebar -->
			<%@include file="TabBar.jsp" %>
				<!-- End of Sidebar -->
				<!-- Content Wrapper -->
				<div id="content-wrapper" class="d-flex flex-column">

					<!-- Main Content -->
					<div id="content">
						<!-- Topbar -->
						<%@include file="Topbar.jsp" %>
							<!-- Begin Page Content -->
							<div class="container-fluid">
								<!-- Content Row -->
								<div class="row"></div>

								<div class="card shadow mb-4">
									<div class="card-header py-3">
										<h4 class="m-0 font-weight-bold text-primary">รายงานภาษี / รายงานภาษีขาย</h4>
									</div>
									<div class="card-body">
										<div class="table-responsive col-sm-12">
											<div class="row" style="margin-bottom: 10px;">
												<div class="col-sm-7"><button class="btn btn-success" type="button"
														onclick="reportSaleTaxPrint()" style="margin-top: 32px"> <i
															class="fas fa-fw fa-print"></i> พิมพ์รายงาน
													</button></div>
												<div class="col-sm-2"><label>เริ่มต้น : </label><input id="fromDate" />
												</div>
												<div class="col-sm-2"><label>ถึง : </label><input id="toDate" /> </div>
												<div class="col-sm-1"><button class="btn btn-primary" type="button"
														onclick="reportSaleTax()" style="margin-top: 32px"> ค้นหา <i
															class="fas fa-fw fa-search"></i>
													</button></div>
											</div>
											<table id="tableReportSaleTax" class="table table-sm table-hover"
												width="100%">
												<thead class="bg-gradient-primary" style="color: white;">
													<tr>
														<th>วันที่</th>
														<th>เลขที่ใบกำกับภาษี</th>
														<th>เลขที่เอกสาร</th>
														<th>ชื่อลูกค้า</th>
														<th>มูลค่าสินค้า/บริการ</th>
														<th>ภาษีมูลค่าเพิ่ม</th>
														<th>รวม</th>
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

		<!-- script -->
		<%@include file="/WEB-INF/Extensions/js.jsp" %>
			<script src="/data-table/F7M2ReportSaleTax.js" type="text/javascript"></script>

	</body>

	</html>