<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Users List</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>
	<script src="/data-table/customers-list.js" type="text/javascript"></script>
	
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

					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">สมุดรายชื่อ</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="row">
									<div class="col-sm-8"></div>
									<div class="col-sm-2"></div>
									<div class="col-sm-2" style="text-align: right;">
										<button type="button" class="btn btn-primary" data-toggle="modal"
											data-target="#myModal">เพิ่มรายชื่อ</button>
										<!-- <button type="button" class="btn btn-primary"  onclick="sd()">TEST SWEET ALERT</button> -->
									</div>
								</div>
								<table id="customersList" class="table table-striped table-bordered" width="100%">
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
											<label>ประเภท</label>
											<select class="form-control" id="companyType">
												<option value="">ประเภท</option>
												<option value="test01">test01</option>
												<option value="test02">test02</option>
											</select>
										</div>
										<div class="col-sm-6">
											<label>เลขประจำตัวผู้เสียภาษี</label><input type="password"
												class="form-control form-control" id="taxId"
												placeholder="เลขประจำตัวผู้เสียภาษี">
										</div>
									</div>
									<div class="form-group row">
										<div class="col-sm-6 mb-3 mb-sm-0">
											<label>รหัสผู้ติดต่อ</label><input type="text"
												class="form-control form-control" id="companyId"
												placeholder="รหัสผู้ติดต่อ">
										</div>
										<div class="col-sm-6">
											<label>ชื่อบริษัท</label><input type="text"
												class="form-control form-control" id="companyName"
												placeholder="ชื่อบริษัท">
										</div>
									</div>
									<div class="form-group row">
										<div class="col-sm-12 mb-3 mb-sm-0">
											<label>สำนักงาน / สาขาที่</label>
											<input type="radio" name="">
											สำนักงานใหญ่
											<input type="radio" name=""> สาขาที่
											<input type="text" id="department">
										</div>
									</div>
									<div class="form-group">
										<label>ที่อยู่</label>
										<textarea class="form-control" id="address" style="height: 100px"
											placeholder="ที่อยู่"></textarea>
									</div>
									<div class="form-group row">
										<div class="col-sm-6 mb-3 mb-sm-0">
											<label>ชื่อผู้ติดต่อ</label><input type="text"
												class="form-control form-control" id="customerName"
												placeholder="ชื่อผู้ติดต่อ">
										</div>
										<div class="col-sm-6">
											<label>E-mail</label><input type="email" class="form-control form-control"
												id="email" placeholder="E-mail">
										</div>
									</div>
									<div class="form-group row">
										<div class="col-sm-6">
											<label>เบอร์ติดต่อ</label><input type="tel"
												class="form-control form-control" id="tel" placeholder="เบอร์ติดต่อ">
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
					<button type="button" class="btn btn-success" id="save">บันทึก</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
				</div>

			</div>
		</div>
	</div>
	<!--End The Modal -->

	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp" %>
	<script>
		function sd() {
			swal({
				title: "บันทึก สำเร็จ",
				type: "success",
				confirmButtonClass: "btn-success",
				confirmButtonText: "ตกลง",
			},
				function () {
					window.location.href = "/customers-list";
				});
		}
	</script>

</body>
</html>