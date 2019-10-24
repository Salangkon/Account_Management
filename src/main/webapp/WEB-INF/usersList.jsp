<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Users List</title>

	<%@include file="/WEB-INF/AllExtensions/css.jsp" %>	
	<%@include file="/WEB-INF/AllExtensions/js.jsp" %>

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
					<p>สมุดรายชื่อ</p>
					<!-- Content Row -->
					<div class="container">
						<div class="row">
						  <div class="col-sm-8">
							1 of 3
						  </div>
						  <div class="col-sm-8">
							2 of 3
						  </div>
						  <div class="col-sm-8">
							<button type="button" class="btn btn-primary" data-toggle="modal"
							data-target="#myModal">เพิ่มรายชื่อ</button>
						  </div>
						</div>
					  </div>
					<div style="margin-top: 10px">
						<table id="customersList" class="table table-striped table-bordered" style="width: 100%">
							<thead>
								<tr>
									<th>ชื่อบริษัท</th>
									<th>เบอร์ติดต่อ</th>
									<th>E-mail</th>
									<th>ประเภท</th>
									<th>ตัวเลือก</th>
								</tr>
							</thead>
						</table>
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
					<h4 class="modal-title">เพิ่มรายชื่อ</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<!-- Modal body -->
				<div class="card-body p-0">
					<!-- Nested Row within Card Body -->
					<div class="row">
						<div class="col-lg-12">
							<div class="p-5">
								<form class="user">
									<div class="form-group row">
										<div class="col-sm-6 mb-3 mb-sm-0">
											<label>ประเภท</label> <select class="form-control">
												<option value="">ประเภท</option>
												<option value="">test01</option>
												<option value="">test02</option>
											</select>
										</div>
										<div class="col-sm-6">
											<label>เลขประจำตัวผู้เสียภาษี</label><input type="password"
												class="form-control form-control" id=""
												placeholder="เลขประจำตัวผู้เสียภาษี">
										</div>
									</div>
									<div class="form-group row">
										<div class="col-sm-6 mb-3 mb-sm-0">
											<label>รหัสผู้ติดต่อ</label><input type="text"
												class="form-control form-control" id=""
												placeholder="รหัสผู้ติดต่อ">
										</div>
										<div class="col-sm-6">
											<label>ชื่อบริษัท</label><input type="text"
												class="form-control form-control" id=""
												placeholder="ชื่อบริษัท">
										</div>
									</div>
									<div class="form-group row">
										<div class="col-sm-12 mb-3 mb-sm-0">
											<label>สำนักงาน / สาขาที่</label> <input type="radio" name="">
											สำนักงานใหญ่ <input type="radio" name=""> สาขาที่ <input
												type="text">
										</div>
									</div>
									<div class="form-group">
										<label>ที่อยู่</label>
										<textarea class="form-control" id="" style="height: 100px"
											placeholder="ที่อยู่"></textarea>
									</div>
									<div class="form-group row">
										<div class="col-sm-6 mb-3 mb-sm-0">
											<label>ชื่อผู้ติดต่อ</label><input type="text"
												class="form-control form-control" id=""
												placeholder="ชื่อผู้ติดต่อ">
										</div>
										<div class="col-sm-6">
											<label>E-mail</label><input type="email"
												class="form-control form-control" id="" placeholder="E-mail">
										</div>
									</div>
									<div class="form-group row">
										<div class="col-sm-6">
											<label>เบอร์ติดต่อ</label><input type="tel"
												class="form-control form-control" id=""
												placeholder="เบอร์ติดต่อ">
										</div>
										<div class="col-sm-6"></div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<!-- Modal footer -->
				<div class="modal-footer">
					<button type="button" class="btn btn-success">บันทึก</button>
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">ยกเลิก</button>
				</div>

			</div>
		</div>
	</div>
	<!--End The Modal -->

	<script type="text/javascript">
	$(document).ready(
			function() {				
				var table = $('#customersList').DataTable({
					lengthChange : false,
					buttons : [ 'copy', 'excel', 'pdf', 'colvis' ],
					"order": [[ 0, 'desc' ]],
					"sAjaxSource" : "/api/customers-list",
					"iDisplayLength": 10,
					"sAjaxDataProp" : "",
					dom: 'Bfrtip',
					buttons: [
						'copy', 'csv', 'excel', 'pdf', 'print'
					],
					"aoColumns" : [{
						"mData" : "companyName",
						"sWidth" : "260px" 
					},
					{
						"mData" : "tel",
						"sWidth" : "60px" 
					},{
						"mData" : "email",
						"sWidth" : "60px" 
					},{
						"mData" : "officeType",
						"sWidth" : "60px" 
					},{
						"mData" : "officeType",
						"sWidth" : "60px",
						"mRender": function (data, type, full) {
							return '<div align="center"><button class="btn btn-danger w3-padding-small">' + ' หยุดใช้งาน ' + '</button></div>';						
						} 
					},]
				});
					
				table.buttons().container().appendTo(
						'#example_wrapper .col-md-6:eq(0)');
			});
	</script>
</body>
</html>