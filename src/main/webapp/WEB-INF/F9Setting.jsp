<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<title>setting</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>
	<style>
		.file {
			visibility: hidden;
			position: absolute;
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
					<p>ตั้งค่า</p>
					<div class="row">
						<div class="col-lg-4">
							<h3>ตั้งค่าธุระกิจ</h3>
						</div>
						<div class="col-lg-1">
							<button type="button" style="margin-left: 30px;" class="btn btn btn-primary" onclick="update()" 
								id="save">บันทึก</button>
						</div>
						<div class="col-lg-7"></div>
					</div>
					<!-- Content Row -->
					<div class="row" style="margin-top: 10px;">
						<div class="col-lg-5">
							<div class="p-3">
								<div class="form-group row">
									<div class="col-sm-4"><label>ประเภทธุระกิจ : </label></div>
									<div class="col-sm-8">
										<select class="form-control" id="companyType">
											<option value="0">บริษัท</option>
											<option value="1">ห้างหุ้นส่วนจำกัด</option>
											<option value="2">บุคคลธรรมดา/ฟรีแลนซ์</option>
										</select>
										<p class="hide" id="error-companyType"></p>
									</div>
									<div class="col-sm-4"><label>ชื่อธุระกิจ : </label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="company">
										<p class="hide" id="error-companyId"></p>
									</div>
									<div class="col-sm-4"><label>ที่อยู่ : </label></div>
									<div class="col-sm-8">
										<textarea class="form-control" id="address" style="height: 100px"></textarea>
										<p class="hide" id="error-address"></p>
									</div>
									<div class="col-sm-4">
										<label>เลขประจำตัวผู้เสียภาษี</label></div>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control" id="taxId" OnKeyPress="return chkNumber(this)"
											placeholder="เลขประจำตัวผู้เสียภาษี" maxlength="13">
										<p class="hide" id="error-taxId"></p>
									</div>
									<div class="col-sm-4"><label>สำนักงาน / สาขาที่</label></div>
									<div class="col-sm-8">
										<div>
											<input type="radio" name="officeType" id="department1"
												onclick="CheckOffice(1)" value="1" style="margin-left: 10px" checked>
											สำนักงานใหญ่
											<input type="radio" name="officeType" id="department2"
												onclick="CheckOffice(2)" value="2" style="margin-left: 10px"> สาขาที่
										</div>
										<div id="department">
											<div class="input-group input-group-sm mb-3">
												<input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm" id="departmentName" placeholder="รหัสสาขา">
												<input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm" id="departmentPass" placeholder="ชื่อสาขา">
											</div>
											<p class="hide" id="error-department"></p>
										</div>
									</div>
									<div class="col-sm-4"><label>เบอร์ติดต่อ : </label></div>
									<div class="col-sm-8">
										<input type="text" OnKeyPress="return chkNumber(this)" class="form-control form-control" id="tel" maxlength="10">
										<p class="hide" id="error-tel"></p>
									</div>
									<div class="col-sm-4"><label>โลโก้บริษัท : </label></div>
									<div class=" col-sm-8">
										<!-- <form method="post" id="image-form"> -->
											<input id="singleFileUploadInput" type="file" name="img[]" class="file" accept="image/*">
											<div class="input-group my-3">
												<div class="input-group-append">
													<button type="button"
														class="browse btn btn-primary">Browse…</button>
												</div>
												<input type="text" class="form-control" disabled
													placeholder="Upload File" id="file">
											</div>
										<!-- </form> -->
										<div class="ml-2 col-sm-6">
											<img src="https://placehold.it/80x80" id="preview" class="img-thumbnail">
										</div>
									</div>

								</div>
							</div>
						</div>
						<div class="col-lg-6"></div>
						<div class="col-lg-1"></div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- script -->
	<script src="/data-table/F9Setting.js" type="text/javascript"></script>

	<%@include file="/WEB-INF/Extensions/js.jsp" %>

</body>

</html>