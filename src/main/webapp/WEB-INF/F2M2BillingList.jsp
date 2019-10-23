<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Billing List</title>

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
					<p>เอกสารขาย / ใบวางบิล</p>
					<!-- Content Row -->
					<div class="row" style="margin-top: 50px"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>