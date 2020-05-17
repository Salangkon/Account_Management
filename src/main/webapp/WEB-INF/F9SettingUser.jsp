<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>setting user</title>

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
					<p>ตั้งค่า/ตั้งค่าผู้ใช้งาน</p>
					<div class="row">
						<div class="col-lg-4">
							<h4>ตั้งค่าผู้ใช้งาน</h4>
						</div>
						<div class="col-lg-1">
							<!-- <button type="button" style="margin-left: 30px;" class="btn btn btn-primary"
								onclick="update()" id="save">บันทึก</button> -->
						</div>
						<div class="col-lg-7"></div>
						<div class="col-lg-11">
							<h5>แก้ไขข้อมูลส่วนตัว</h5>
						</div>
						<div class="col-lg-1" style="margin-left: -25px;">
							<button type="button" class="btn btn-primary" data-toggle="modal" onclick="update()"
								data-target="#myModal">เพิ่มรายชื่อ</button>
						</div>
					</div>

					<!-- Content Row -->
					<div class="row" style="margin-top: 10px;">
						<!-- <div class="col-lg-5">
							<div class="p-3">
								<div class="form-group row">
									<div class="col-sm-4"><label>ชื่อ : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="fNameUser">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>นามสกุล : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="lNameUser">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>เบอร์ติดต่อ : </label></div>
									<div class="col-sm-8">
										<input type="text" OnKeyPress="return chkNumber(this)" class="form-control form-con
											trol" id="tel" maxlength="10">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>อีเมลล์(ผู้ใช้งาน) : </label></div>
									<div class="col-sm-8">
										<input type="email" class="form-control form-control" id="emailUser">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>ตำแหน่ง : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="positionUser" disabled>
										<p class="hide" id=""></p>
									</div>

									<div class="col-sm-12"><label><b>แก้ไขรหัสผ่าน</b></label></div>
									<div class="col-sm-4"><label>รหัสผ่านเดิม : </label></div>
									<div class="col-sm-8">
										<input type="password" class="form-control form-control" id="passwordUser"
											disabled>
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>รหัสผ่านใหม่ : </label></div>
									<div class="col-sm-8">
										<input type="password" class="form-control form-control" id="passwordNew">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>ยืนยันรหัสผ่าน : </label></div>
									<div class="col-sm-8">
										<input type="password" class="form-control form-control" id="passwordNew2">
										<p class="hide" id=""></p>
									</div>
								</div>
							</div>
						</div> -->
						<div class="col-lg-12">
							<div class="card-body">
								<div class="table-responsive col-sm-12">
									<table id="tableSetingPersanol" class="table table-sm table-hover" width="100%">
										<thead class="bg-gradient-primary" style="color: white;">
											<tr>
												<th>ชื่อ-สกุล</th>
												<th>ตำแหน่ง</th>
												<th>เบอร์ติดต่อ</th>
												<th>อีเมลล์</th>
												<th>ที่อยู่</th>
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
	</div>

	<!-- script -->
	<script src="/data-table/F9SettingUser.js" type="text/javascript"></script>

	<%@include file="/WEB-INF/Extensions/js.jsp" %>

</body>

</html>