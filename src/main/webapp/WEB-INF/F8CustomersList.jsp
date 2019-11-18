<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Users List</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>
	<script src="/data-table/customers-list.js" type="text/javascript"></script>
	<style>
		input {
			margin-top: 13px;
		}

		textarea {
			margin-top: 13px;
		}

		label {
			margin-top: 10px;
		}

		.col-sm-4 {
			text-align: right;
		}

		.col-sm-3 {
			text-align: right;
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
											onclick="update(null)" data-target="#myModal">เพิ่มรายชื่อ</button>
										<!-- <button type="button" class="btn btn-primary"  onclick="sd()">TEST SWEET ALERT</button> -->
									</div>
								</div>
								<table id="customersList" class="table table-sm table-striped table-bordered"
									width="100%">
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

	<!-- The Modal Create-->
	<div class="modal fade" id="myModal">
		<div class="modal-dialog modal-lg" style="max-width: 1200px;">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<div id="myDIV1">
						<h4 class="modal-title">เปลี่ยนแปลงรายชื่อ</h4>
					</div>
					<div id="myDIV">
						<h4 class="modal-title">เพิ่มรายชื่อ</h4>
					</div>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<!-- Modal body -->
				<div class="card-body p-0">
					<!-- Nested Row within Card Body -->
					<div class="row" style="margin-top: 20px;">
						<div class="col-lg-7">
							<div class="p-3">
								<div class="form-group row">
									<div class="col-sm-4"><label>ประเภท</label></div>
									<div class="col-sm-8">

										<select class="form-control" id="companyType">
											<option value="">ประเภท</option>
											<option value="test01">test01</option>
											<option value="test02">test02</option>
										</select>
									</div>
									<div class="col-sm-4"><label>รหัสผู้ติดต่อ</label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="companyId"
											placeholder="รหัสผู้ติดต่อ">
									</div>
									<div class="col-sm-4"><label>ชื่อบริษัท</label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="companyName"
											placeholder="ชื่อบริษัท">
									</div>
									<div class="col-sm-4"><label>ที่อยู่</label></div>
									<div class="col-sm-8">
										<textarea class="form-control" id="address" style="height: 100px"
											placeholder="ที่อยู่"></textarea>
									</div>
									<div class="col-sm-4">
										<label>เลขประจำตัวผู้เสียภาษี</label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="taxId"
											placeholder="เลขประจำตัวผู้เสียภาษี">
									</div>
									<div class="col-sm-4"><label>สำนักงาน / สาขาที่</label></div>
									<div class="col-sm-8">
										<input type="radio" name="officeType" id="officeType1" onclick="CheckOffice(1)"
											value="1" style="margin-left: 10px" checked>
										สำนักงานใหญ่
										<input type="radio" name="officeType" id="officeType2" onclick="CheckOffice(2)"
											value="2" style="margin-left: 10px"> สาขาที่
										<!-- <input type="text" id="department"> -->
									</div>
									<div class="col-sm-4"></div>
									<div class="col-sm-8" id="officeTypeCheck">
										<div class="input-group input-group-sm mb-3">
											<input type="text" class="form-control" placeholder="รหัสสาขา"
												aria-describedby="inputGroup-sizing-sm">
											<input type="text" class="form-control" placeholder="ชื่อสาขา"
												aria-describedby="inputGroup-sizing-sm" id="department">
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-5">
							<div class="row p-3">
								<div class="form-group row">
									<di class="col-sm-12">
										<h6>รายละเอียดผู้ติดต่อ</h6>
									</di>
									<div class="col-sm-3" style="margin-top: 23px"><label>ชื่อผู้ติดต่อ</label></div>
									<div class="col-sm-9">
										<input type="text" style="max-width: 90%;margin-top: 25px" class="form-control form-control"
											id="customerName" placeholder="ชื่อผู้ติดต่อ">
									</div>
									<div class="col-sm-3"><label>E-mail</label></div>
									<div class="col-sm-9" style="max-width: 90%;">
										<input type="email" style="max-width: 90%;" class="form-control form-control"
											id="email" placeholder="E-mail">
									</div>
									<div class="col-sm-3"><label>เบอร์ติดต่อ</label></div>
									<div class="col-sm-9" style="max-width: 90%;">
										<input type="text" style="max-width: 90%;" OnKeyPress="return chkNumber(this)"
											class="form-control form-control" id="tel" maxlength="10"
											placeholder="เบอร์ติดต่อ">
									</div>
								</div>
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
	<!--End The Modal Create-->

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

		//กรอกได้เฉพราะ ตัวเลข
		function chkNumber(ele) {
			var vchar = String.fromCharCode(event.keyCode);
			if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
			ele.onKeyPress = vchar;
		}
	</script>

</body>

</html>