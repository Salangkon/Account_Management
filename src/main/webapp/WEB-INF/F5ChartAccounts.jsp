<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>Chart Accounts</title>

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
					<!-- <p>ผังบัญชี</p> -->
					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">ผังบัญชี</h4>
						</div>
						<div class="card-body">
							<table id="example" class="table table-sm table-striped table-bordered" width="100%">
								<thead class="bg-gradient-primary" style="color: white;">
									<tr>
										<th>ชื่อบริษัท</th>
										<th>เบอร์ติดต่อ</th>
										<th>E-mail</th>
										<th>ประเภท</th>
										<th>create</th>
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

	<script type="text/javascript">
		$(document).ready(function () {
			var table = $('#example').DataTable({
				lengthChange: false,
				dom: 'Bfrtip',
				buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
				"sAjaxSource": "/api/customers-list",
				"sAjaxDataProp": "",
				"aoColumns": [{
					"mData": "companyName",
					"sWidth": "260px"
				},
				{
					"mData": "tel",
					"sWidth": "60px"
				}, {
					"mData": "email",
					"sWidth": "60px"
				}, {
					"mData": "officeType",
					"sWidth": "60px"
				}, {
					"mData": "created_date",
					"sWidth": "60px"
				}, {
					"sWidth": "60px",
					"mRender": function (data, type, full) {
						return '<div align="center">'
							+ '<button type="button" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button> '
							+ '<button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.companyId + "'" + ')"><i class="fas fa-trash"></i></button></div>'
					}
				}],
			});
		});
	</script>
	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp" %>
</body>

</html>