<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Account Management Online</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>

</head>

<body id="page-top">

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
				<!-- End of Topbar -->
				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- Content Row1 -->
					<div class="row" style="margin-top: 50px">
						<!-- ใบเสนอราคา -->
						<div class="col-sm-12"><label>เอกสารขาย</label></div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ใบเสนอราคา</div>
										</div>
										<div class="col-auto">
											<a href="/offer-price-list"><i
													class="fas fa-file-alt fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- ใบวางบิล -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-success shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
												Earnings
												(Annual)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ใบวางบิล</div>
										</div>
										<div class="col-auto">
											<a href="/billing-list"><i
													class="fas fa-file-alt fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- ใบกำกับภาษี -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-info shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
											</div>
											<div class="row no-gutters align-items-center">
												<div class="col-auto">
													<div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">ใบกำกับภาษี
													</div>
												</div>
											</div>
										</div>
										<div class="col-auto">
											<a href="/tax-invoice-list"><i
													class="fas fa-file-alt fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- ใบเสร็จรับเงิน -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-warning shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Pending
												Requests</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ใบเสร็จรับเงิน</div>
										</div>
										<div class="col-auto">
											<a href="/receipt-list"><i
													class="fas fa-file-alt fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!--Content Row2 -->
					<div class="row">
						<div class="col-sm-12"><label>เอกสารซื้อ</label></div>
						<!-- ใบสั่งซื้อ -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings
												(Monthly)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ใบสั่งซื้อ</div>
										</div>
										<div class="col-auto">
											<a href="/purchase-order-list"><i
													class="fas fa-clipboard fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- ใบรับสินค้า -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-success shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
												Earnings
												(Annual)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ใบรับสินค้า</div>
										</div>
										<div class="col-auto">
											<a href="/receive-report"><i
													class="fas fa-clipboard fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-xl-3 col-md-6 mb-4"></div>

						<div class="col-xl-3 col-md-6 mb-4"></div>
					</div>

					<!--Content Row3 -->
					<div class="row">
						<div class="col-sm-12"><label>ค่าใช้จ่าย</label></div>
						<!-- ค่าใช้จ่าย -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-info shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
											</div>
											<div class="row no-gutters align-items-center">
												<div class="col-auto">
													<div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">ค่าใช้จ่าย
													</div>
												</div>
											</div>
										</div>
										<div class="col-auto">
											<a href="/expenses"><i
													class="fas fa-chart-line fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4"></div>

						<div class="col-xl-3 col-md-6 mb-4"></div>

						<div class="col-xl-3 col-md-6 mb-4"></div>
					</div>

					<!--Content Row3-->
					<div class="row">
						<div class="col-sm-12"><label>ผังบัญชี</label></div>
						<!-- ผังบัญชี -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-warning shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Pending
												Requests</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ผังบัญชี</div>
										</div>
										<div class="col-auto">
											<a href="/chart-accounts"><i
													class="fas fa-chart-bar fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4"></div>

						<div class="col-xl-3 col-md-6 mb-4"></div>
					</div>

					<!--Content Row4 -->
					<div class="row">
						<div class="col-sm-12"><label>สมุดรายวัน</label></div>
						<!-- สมุดรายวัน -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings
												(Monthly)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">สมุดรายวันทั่วไป</div>
										</div>
										<div class="col-auto">
											<a href="/general-journal"><i
													class="fas fa-book fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings
												(Monthly)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">สมุดรายวันซื้อ</div>
										</div>
										<div class="col-auto">
											<a href="/bought-day-book"><i
													class="fas fa-book fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings
												(Monthly)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">สมุดรายวันขาย</div>
										</div>
										<div class="col-auto">
											<a href="/sales-journal"><i class="fas fa-book fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings
												(Monthly)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">สมุดรายวันจ่าย</div>
										</div>
										<div class="col-auto">
											<a href="/cash-disbursement-journal"><i
													class="fas fa-book fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings
												(Monthly)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">สมุดรายวันรับ</div>
										</div>
										<div class="col-auto">
											<a href="/cash-receipts-journal"><i
													class="fas fa-book fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!--Content Row5 -->
					<div class="row">
						<div class="col-sm-12"><label>รายงานภาษี</label></div>
						<!-- รายงานภาษีซื้อ -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-success shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
												Earnings
												(Annual)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">รายงานภาษีซื้อ</div>
										</div>
										<div class="col-auto">
											<a href="/report-buy-tax"><i
													class="fas fa-balance-scale fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- รายงานภาษีขาย -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-info shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
											</div>
											<div class="row no-gutters align-items-center">
												<div class="col-auto">
													<div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
														รายงานภาษีขาย
													</div>
												</div>
											</div>
										</div>
										<div class="col-auto">
											<a href="/report-sale-tax"><i
													class="fas fa-balance-scale fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!--Content Row6 -->
					<div class="row">
						<div class="col-sm-12"><label>สมุดรายชื่อ</label></div>
						<!-- สมุดรายชื่อ -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-warning shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Pending
												Requests</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">สมุดรายชื่อ</div>
										</div>
										<div class="col-auto">
											<a href="/customers-list"><i
													class="fas fa-address-book fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Content Row7 -->
					<!-- <div class="row">
						<div class="col-sm-12"><label>จัดเก็บไฟล์เอกสาร</label></div> -->
						<!-- ตั่งค่า -->
						<!-- <div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">จัดเก็บไฟล์เอกสาร</div>
										</div>
										<div class="col-auto">
											<a href="/file-storage"><i class="fas fa-upload fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> -->

					<!-- Content Row8 -->
					<div class="row" id="statusSetting">
						<div class="col-sm-12"><label>ตั้งค่า</label></div>
						<!-- ตั่งค่า -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ตั้งค่าธุระกิจ</div>
										</div>
										<div class="col-auto">
											<a href="/setting"><i class="fas fa-cog fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- ตั่งค่า -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">ตั้งค่าผู้ใช้งาน</div>
										</div>
										<div class="col-auto">
											<a href="/setting-user"><i class="fas fa-cog fa-3x text-gray-500"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
		<!-- /.container-fluid -->

	</div>
	<!-- End of Main Content -->

	<!-- Footer -->
	<footer class="sticky-footer bg-white">
		<div class="container my-auto">
			<div class="copyright text-center my-auto">
				<span>Copyright &copy; Your Website 2019</span>
			</div>
		</div>
	</footer>
	<!-- End of Footer -->

	</div>
	<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

	<!-- Scroll to Top Button-->
	<a class="scroll-to-top rounded" href="#page-top"> <i class="fas fa-angle-up"></i>
	</a>

	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp" %>

	<script>
		$(document).ready(function () {
			if ($('#position').val() === 'เจ้าของธุระกิจ') {
				document.getElementById("statusSetting").hidden = false;
			} else {
				document.getElementById("statusSetting").hidden = true;
			}
		})
	</script>
</body>

</html>