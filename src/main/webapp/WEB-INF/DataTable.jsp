<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Data Table</title>
	<%@include file="/WEB-INF/Extensions/css.jsp" %>	
	<%@include file="/WEB-INF/Extensions/js.jsp" %>
</head>
<body>
	<div style="margin-top: 10px">
		<table id="example" class="table table-striped table-bordered"
			style="width: 100%">
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
	<script type="text/javascript">
		$(document).ready(
				function() {
					var table = $('#example').DataTable({
						lengthChange : false,
						"order": [[ 0, 'desc' ]],
						"sAjaxSource" : "/api/customers-list",
						"iDisplayLength": 10,
						dom: 'Bfrtip',
						buttons: [
							'copy', 'csv', 'excel', 'pdf', 'print'
						],
						"sAjaxDataProp" : "",
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
						},], 
					});
					
					table.buttons().container().appendTo(
							'#example_wrapper .col-md-6:eq(0)');
				});
	</script>
</body>
</html>