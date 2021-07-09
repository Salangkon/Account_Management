<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.accountmanager.system.model.User"%>
<%@page import="com.accountmanager.system.model.CustomersList"%>
<%@ page import="java.util.List"%>

<%
	User user = null;
	List<CustomersList> customers = null;
%>
<%
	user = (User) request.getSession().getAttribute("user");
	customers = (List<CustomersList>) request.getSession().getAttribute("customers");
%>
<nav
	class="navbar navbar-expand navbar-light topbar mb-4 static-top shadow"
	style="background-color: purple;">

	<!-- Sidebar Toggle (Topbar) -->
	<button id="sidebarToggleTop"
		class="btn btn-link d-md-none rounded-circle mr-3">
		<i class="fa fa-bars"></i>
	</button>

	<!-- Topbar Navbar -->
	<ul class="navbar-nav ml-auto">

		<!-- Nav Item - Search Dropdown (Visible Only XS) -->
		<li class="nav-item dropdown no-arrow d-sm-none"><a
			class="nav-link dropdown-toggle" href="#" id="searchDropdown"
			role="button" data-toggle="dropdown" aria-haspopup="true"
			aria-expanded="false"> <i class="fas fa-search fa-fw"></i>
		</a> <!-- Dropdown - Messages -->
			<div
				class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
				aria-labelledby="searchDropdown">
				<form class="form-inline mr-auto w-100 navbar-search">
					<div class="input-group">
						<input type="text" class="form-control bg-light border-0 small"
							placeholder="Search for..." aria-label="Search"
							aria-describedby="basic-addon2">
						<div class="input-group-append">
							<button class="btn btn-primary" type="button">
								<i class="fas fa-search fa-sm"></i>
							</button>
						</div>
					</div>
				</form>
			</div></li>

		<input type="text" id="positionLog" value="<%=user.getPosition()%>" hidden>
		<input id="id" value="<%=user.getId()%>" hidden>
		<input id="password" value="<%=user.getPassword()%>" hidden>
		<input id="fName" value="<%=user.getfName()%>" hidden>
		<input id="lName" value="<%=user.getlName()%>" hidden>
		<input id="email" value="<%=user.getEmail()%>" hidden>
		<input id="position" value="<%=user.getPosition()%>" hidden>
		<input id="status" value="<%=user.getStatus()%>" hidden>
		<input id="createBy" value="<%=user.getId()%>" hidden>
		<input id="setCompanyId"
			value="<%=user.getCompanys().getCompanyId()%>" hidden>

		<div class="topbar-divider d-none d-sm-block"></div>

		<!-- Nav Item - User Information -->
		<li class="nav-item dropdown no-arrow"><a
			class="nav-link dropdown-toggle" href="#" id="userDropdown"
			role="button" data-toggle="dropdown" aria-haspopup="true"
			aria-expanded="false"> <span
				class="mr-2 d-none d-lg-inline text-gray-600 small"><%=user.getfName()%>
					<%=user.getlName()%></span> <img class="img-profile rounded-circle"
				id="myImg">
		</a> <!-- Dropdown - User Information -->
			<div
				class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
				aria-labelledby="userDropdown">
				<a class="dropdown-item"> <i
					class="fas fa-building fa-sm fa-fw mr-2 text-gray-400"></i><b>
						<%=user.getCompanys().getCompanyName()%></b></a> <a class="dropdown-item">
					<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> <%=user.getPosition()%></a>
				<a class="dropdown-item"> <i
					class="fas fa-envelope fa-sm fa-fw mr-2 text-gray-400"></i> <%=user.getEmail()%></a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="/" data-toggle="modal"
					data-target="#logoutModal"> <i
					class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
					Logout
				</a>
			</div></li>
	</ul>
</nav>


<script>
	$(document).ready(function() {
		login();
	});
	function login() {
		var login = {
			id : $('#id').val(),
			password : $('#password').val(),
		}
		console.log(JSON.stringify(login))
		$.ajax({
			type : 'POST',
			url : '/api-login/seting',
			data : JSON.stringify(login),
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function(msg) {
				console.log(JSON.stringify(msg));

				document.getElementById("myImg").src = "\\img\\"
						+ msg.companys.logo;
			}
		});
	}
</script>