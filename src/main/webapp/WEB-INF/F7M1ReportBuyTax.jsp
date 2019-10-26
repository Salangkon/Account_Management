<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Report Buy Tax</title>

	<%@include file="/WEB-INF/Extensions/css.jsp" %>	
	<%@include file="/WEB-INF/Extensions/js.jsp" %>

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
					<!-- <p>รายงานภาษี / รายงานภาษีซื้อ</p> -->
					<!-- Content Row -->
					<div class="row"></div>

					<div class="card shadow mb-4">
						<div class="card-header py-3">
							<h4 class="m-0 font-weight-bold text-primary">รายงานภาษี / รายงานภาษีซื้อ</h4>
						</div>
						<div class="card-body">
							<div class="table-responsive col-sm-12">
								<div class="row" style="margin-bottom: 10px;">
									<div class="col-sm-7"></div>
									<div class="col-sm-2"><label>เริ่มต้น : </label><input id="datepicker"/> </div>
									<div class="col-sm-2"><label>ถึง : </label><input id="datepicker1" /> </div>
									<div class="col-sm-1"><button class="btn btn-primary" type="button" style="margin-top: 33px"> ค้นหา <i class="fas fa-fw fa-search"></i> </button></div>
								</div>
								<table id="" class="table table-striped table-bordered" width="100%">
									<thead class="bg-gradient-primary" style="color: white;">
										<tr>
											<th>วันที่</th>
											<th>เลขที่เอกสาร</th>
											<th>ชื่อลูกค้า</th>
											<th>จำนวนเงิน</th>
											<th>ภาษี</th>
											<th>รวม</th>
											<th>ตัวเลือก</th>
										</tr>
									</thead>
									<tbody>
										<tr> 
											<td colspan="7" align="center">No date</td> 
										</tr>
									</tbody>	 				
								</table>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	
	<script>
		$('#datepicker').datepicker({
			uiLibrary: 'bootstrap4'
		});
		$('#datepicker1').datepicker({
			uiLibrary: 'bootstrap4'
		});
	</script>
</body>
</html>