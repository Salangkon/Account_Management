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
						</div>
						<div class="col-lg-7"></div>
						<div class="col-lg-11">
							<h5>แก้ไขข้อมูลส่วนตัว</h5>
						</div>
						<div class="col-lg-1" style="margin-left: -25px;">
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
								onclick="add(null)">เพิ่มผู้ใช้งาน</button>
						</div>
					</div>

					<!-- Content Row -->
					<div class="row" style="margin-top: 10px;">
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

	<!-- The Modal Create-->
	<div class="modal fade" id="myModal">
		<div class="modal-dialog modal-lg" style="max-width: 1200px;">
			<div class="modal-content">

				<!-- Modal Header -->
				<div class="modal-header">
					<div id="myDIV1">
						<h4 class="modal-title">เปลี่ยนแปลงผู้ใช้งาน</h4>
					</div>
					<div id="myDIV">
						<h4 class="modal-title">เพิ่มรายผู้ใช้งาน</h4>
					</div>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>

				<!-- Modal body -->
				<div class="card-body p-0" style="margin-left: 50px;">
					<!-- Nested Row within Card Body -->
					<div class="row" style="margin-top: 20px;">
						<div class="col-lg-7">
							<div class="p-3">
								<div class="form-group row">
									<div class="col-sm-4"><label>Username : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="idAdd"
											placeholder="Username">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>Password : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="passwordAdd"
											placeholder="Password">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>ชื่อ : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="fNameAdd"
											placeholder="ชื่อ">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>นามสกุล : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="lNameAdd"
											placeholder="นามสกุล">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>อีเมลล์(ผู้ใช้งาน) : </label></div>
									<div class="col-sm-8">
										<input type="email" class="form-control form-control" id="emailAdd"
											placeholder="อีเมลล์">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>ตำแหน่ง : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="positionAdd" disabled>
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>เบอร์ติดต่อ</label></div>
									<div class="col-sm-8">
										<input type="text" OnKeyPress="return chkNumber(this)" class="form-control form-con
											trol" id="telAdd" maxlength="10" placeholder="เบอร์ติดต่อ">
										<p class="hide" id=""></p>
									</div>
									<div class="col-sm-4"><label>ที่อยู่</label></div>
									<div class="col-sm-8">
										<textarea class="form-control" id="addressAdd" placeholder="ที่อยู่"
											style="height: 100px"></textarea>
										<p class="hide" id=""></p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-5">
					</div>
				</div>

				<!-- Modal footer -->
				<div class="modal-footer">
					<button type="button" class="btn btn-success" id="save" onclick="update()">บันทึก</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
				</div>

			</div>
		</div>
	</div>

	<!-- script -->
	<script src="/data-table/F9SettingUser.js" type="text/javascript"></script>

	<%@include file="/WEB-INF/Extensions/js.jsp" %>

</body>

</html>