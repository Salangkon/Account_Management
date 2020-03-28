<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>File storage</title>

	<%@include file="/WEB-INF/Extensions/css.jsp"%>
	<link rel="stylesheet" href="/css/main.css" />

	<style>
		.update-content {
			box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
			background-color: white;

		}

		.table-file {
			padding: 40px;
		}
	</style>
</head>

<body id="page-top">

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
					<div class="row" style="margin-bottom: 10px;margin-left: 3px;">/ จัดเก็บไฟล์เอกสาร</div>
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">จัดเก็บไฟล์เอกสาร</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="table-responsive col-sm-12">
									<div class="row">
										<div class="col-sm-12 text-right">
											<button type="button" class="btn btn-primary" data-toggle="modal"
												data-target="#myModal" onclick="createUpdate(null)">Upload File</button>
										</div>
									</div>
									<table id="tablegeneraJournalDisplay" class="table table-sm table-striped"
										width="100%">
										<thead class="bg-gradient-primary" style="color: white;">
											<tr>
												<th class="text-center">ชื่อไฟล์เอกสาร</th>
												<th>Download</th>
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
	</div>
	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp"%>
	<script src="\data-table\F10FileStorage.js" type="text/javascript"></script>
	<script src="/js/main.js"></script>
</body>

</html>