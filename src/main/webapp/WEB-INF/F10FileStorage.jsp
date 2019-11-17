<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>File storage</title>

<%@include file="/WEB-INF/Extensions/css.jsp"%>
<link rel="stylesheet" href="/css/main.css" />
</head>

<body id="page-top">

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
				<!-- End of Topbar -->
				<!-- Begin Page Content -->
				<div class="container-fluid">
					<noscript>
						<h2>Sorry! Your browser doesn't support Javascript</h2>
					</noscript>
					<div class="upload-container">
						<div class="upload-header">
							<h2>Spring Boot File Upload / Download Rest API Example</h2>
						</div>
						<div class="upload-content">
							<div class="single-upload">
								<h3>Upload Single File</h3>
								<form id="singleUploadForm" name="singleUploadForm">
									<input id="singleFileUploadInput" type="file" name="file"
										class="file-input" required />
									<button type="submit" class="primary submit-btn">Submit</button>
								</form>
								<div class="upload-response">
									<div id="singleFileUploadError"></div>
									<div id="singleFileUploadSuccess"></div>
								</div>
							</div>
							<div class="multiple-upload">
								<h3>Upload Multiple Files</h3>
								<form id="multipleUploadForm" name="multipleUploadForm">
									<input id="multipleFileUploadInput" type="file" name="files"
										class="file-input" multiple required />
									<button type="submit" class="primary submit-btn">Submit</button>
								</form>
								<div class="upload-response">
									<div id="multipleFileUploadError"></div>
									<div id="multipleFileUploadSuccess"></div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<!-- /.container-fluid -->

			</div>
			<!-- End of Main Content -->

			<!-- Footer -->
			<footer class="sticky-footer bg-white">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright &copy; Your Website 2019</span>
					</div>
				</div>
			</footer>
			<!-- End of Footer -->

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

	<!-- Scroll to Top Button-->
	<a class="scroll-to-top rounded" href="#page-top"> <i
		class="fas fa-angle-up"></i>
	</a>

	<!-- Logout Modal-->
	<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
					<button class="close" type="button" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">Select "Logout" below if you are ready
					to end your current session.</div>
				<div class="modal-footer">
					<button class="btn btn-secondary" type="button"
						data-dismiss="modal">Cancel</button>
					<a class="btn btn-primary" href="login.html">Logout</a>
				</div>
			</div>
		</div>
	</div>

	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp"%>
	<script src="/js/main.js"></script>
</body>
</html>