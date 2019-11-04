<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

	<!-- Sidebar - Brand -->
	<a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
		<div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div>
		<div class="sidebar-brand-text mx-3">
			Account<sup> Management</sup>
		</div>
	</a>

	<!-- Divider -->
	<hr class="sidebar-divider my-0">

	<!-- Nav Item - Dashboard -->
	<li class="nav-item "> <!-- active -->
		<a class="nav-link" href="/">
			<i class="fas fa-fw fa-home"></i> <span>หน้าแรก</span>
		</a>
	</li>

	<!-- เอกสารขาย -->
	<li class="nav-item">
		<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
			aria-controls="collapseOne">
			<i class="fas fa-fw fa-dollar-sign"></i> <span>เอกสารขาย</span>
		</a>
		<div id="collapseOne" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/offer-price-list">ใบเสนอราคา</a>
				<a class="collapse-item" href="/billing-list">ใบวางบิล</a>
				<a class="collapse-item" href="/tax-invoice-list">ใบกำกับภาษี</a>
				<a class="collapse-item" href="/receipt-list">ใบเสร็จรับเงิน</a>
			</div>
		</div>
	</li>

	<li class="nav-item">
		<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
			aria-controls="collapseTwo">
			<i class="fas fa-fw fa-shopping-cart"></i> <span>เอกสารซื้อ</span>
		</a>
		<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/purchase-order-list">ใบสั่งซื้อ</a>
				<a class="collapse-item" href="/product-list">ใบรับสินค้า</a>
			</div>
		</div>
	</li>

	<!-- ค่าใช้จ่าย -->
	<li class="nav-item"><a class="nav-link" href="/expenses">
		<i class="fas fa-fw fa-chart-line"></i> <span>ค่าใช้จ่าย</span></a>
	</li>

	<!-- ผังบัญชี  -->
	<li class="nav-item"><a class="nav-link" href="/chart-accounts">
			<i class="fas fa-fw fa-chart-bar"></i> <span>ผังบัญชี</span></a>
	</li>

	<!-- สมุดรายวัน -->
	<li class="nav-item"><a class="nav-link" href="/report-quotidia">
			<i class="fas fa-fw fa-book"></i> <span>สมุดรายวัน</span></a>
	</li>

	<!-- รายงานภาษี -->
	<li class="nav-item">
		<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true"
			aria-controls="collapseSeven">
			<i class="fas fa-fw fa-file-alt"></i> <span>รายงานภาษี</span>
		</a>
		<div id="collapseSeven" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/report-buy-tax">รายงานภาษีซื้อ</a>
				<a class="collapse-item" href="/report-sale-tax">รายงานภาษีขาย</a>
			</div>
		</div>
	</li>
	
	<!-- สมุดรายชื่อ -->
	<li class="nav-item"><a class="nav-link" href="/customers-list">
			<i class="fas fa-fw fa-address-book"></i> <span>สมุดรายชื่อ</span></a>
	</li>

	<!-- ตั้งค่า -->
	<li class="nav-item"><a class="nav-link" href="/setting">
			<i class="fas fa-fw fa-cog"></i> <span>ตั้งค่า</span></a>
	</li>

	<!-- Sidebar Toggler (Sidebar) -->
	<div class="text-center d-none d-md-inline">
		<button class="rounded-circle border-0" id="sidebarToggle"></button>
	</div>
</ul>