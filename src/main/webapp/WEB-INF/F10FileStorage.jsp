<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>File storage</title>

	<%@include file="/WEB-INF/Extensions/css.jsp"%>
	<style>
		.file {
			visibility: hidden;
			position: absolute;
		}
	</style>
</head>

<body id="page-top">
	<div id="wrapper">
		<%@include file="TabBar.jsp"%>
		<div id="content-wrapper" class="d-flex flex-column">

			<div id="content">
				<%@include file="Topbar.jsp"%>
				<div class="container-fluid">
					<div class="row">

						<div class="col-lg-6">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<div class="row">
										<div class="col-sm-6">
											<h4 class="m-0 font-weight-bold text-primary">Folders</h4>
										</div>
										<div class="col-sm-6" style="text-align: right;">
											<a data-toggle="modal" data-target="#exampleModalCenter"
												style="cursor: pointer;"><i
													class="fas fa-folder-plus fa-2x text-gray-500"
													onclick="updateFile(null)"></i></a>
										</div>
									</div>
								</div>
								<div class="card-body" style="height: 730px;">

									<table id="directory" style="width: 100%;">
										<thead>
											<tr>
												<th>Create Date</th>
												<th>Folder Name</th>
												<th></th>
											</tr>
										</thead>
									</table>

								</div>
							</div>
						</div>

						<div class="col-lg-6">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<div class="row">
										<div class="col-sm-6">
											<h4 class="m-0 font-weight-bold text-primary">Files</h4>
										</div>
										<div class="col-sm-6" style="text-align: right;" id="addFile">
											<a data-toggle="modal" data-target="#exampleModalAddFiles"
												style="cursor: pointer;"><i class="fas fa-file-alt fa-2x text-gray-500"
													onclick="addFiles(null)"></i></a>
										</div>
									</div>
								</div>
								<div class="card-body" style="height: 730px;">
									<a data-toggle="modal" data-target="#" style="cursor: pointer;"><i
											class="fas fa-folder-file fa-2x text-gray-500" onclick=""></i></a>

									<table id="filesTable" style="width: 100%;">
										<thead>
											<tr>
												<th>Create Date</th>
												<th>Folder Name</th>
												<th></th>
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

	<!-- Modal -->
	<div class="modal fade" id="exampleModalAddFiles" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalCenterTitle">Add File
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-sm-10">
							<input id="singleFileUploadInput" type="file" name="img[]" class="file" accept="image/*">
							<div class="input-group my-3">
								<div class="input-group-append">
									<button type="button" class="browse btn btn-primary">Browse…</button>
								</div>
								<input type="text" class="form-control" disabled placeholder="Upload File" id="file">
							</div>
						</div>
						<div class="col-sm-2">
							<button type="button" class="btn btn-primary" style="margin-top: 16px;" onclick="AddFiles()">เพิ่ม</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalCenterTitle">Add Folder
					</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-sm-10">
							<input class="form-control" id="folder" placeholder="Folder Name">
						</div>
						<div class="col-sm-2">
							<button type="button" id="save" class="btn btn-primary" onclick="AddFolder()">เพิ่ม</button>
							<button type="button" id="edit" class="btn btn-primary"
								onclick="updateFolder()">แก้ไข</button>
						</div>
					</div>
					<p style="color: red;margin-top: 10px;">*ห้ามอักษร \ | / : * ? " <> .</p>
				</div>
			</div>
		</div>
	</div>
	<!-- script -->
	<%@include file="/WEB-INF/Extensions/js.jsp"%>
	<script src="\data-table\F10FileStorage.js" type="text/javascript"></script>
</body>

</html>