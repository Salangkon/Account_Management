<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<ul class="navbar-nav sidebar w3-light-grey accordion" id="accordionSidebar" style="background-color: silver;">

	<!-- Sidebar - Brand -->
	<a class="sidebar-brand d-flex align-items-center justify-content-center" href="/"
		style="background-color: purple;">
		<div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink" style="color: white;"></i></div>
		<div class="sidebar-brand-text mx-3" style="color: white;">
			Account<sup> Management</sup>
		</div>
	</a>

	<!-- Divider -->
	<hr class="sidebar-divider my-0">

	<!-- Nav Item - Dashboard -->
	<li class="nav-item">
		<!-- active -->
		<a class="nav-link icon-color" href="/home-pages">
			<i class="fas fa-fw fa-home"></i> <span>หน้าแรก</span>
		</a>
	</li>

	<!-- เอกสารขาย -->
	<li class="nav-item">
		<a class="nav-link collapsed icon-color" href="#" data-toggle="collapse" data-target="#collapseOne"
			aria-expanded="true" aria-controls="collapseOne">
			<i class="fas fa-fw fa-dollar-sign"></i> <span>เอกสารขาย</span>
		</a>
		<div id="collapseOne" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/offer-price-list" style="color: purple;">ใบเสนอราคา</a>
				<a class="collapse-item" href="/billing-list" style="color: purple;">ใบวางบิล</a>
				<a class="collapse-item" href="/tax-invoice-list" style="color: purple;">ใบกำกับภาษี</a>
				<a class="collapse-item" href="/receipt-list" style="color: purple;">ใบเสร็จรับเงิน</a>
			</div>
		</div>
	</li>

	<li class="nav-item">
		<a class="nav-link collapsed icon-color" href="#" data-toggle="collapse" data-target="#collapseTwo"
			aria-expanded="true" aria-controls="collapseTwo">
			<i class="fas fa-fw fa-shopping-cart"></i> <span>เอกสารซื้อ</span>
		</a>
		<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/purchase-order-list" style="color: purple;">ใบสั่งซื้อ</a>
				<a class="collapse-item" href="/receive-report" style="color: purple;">ใบรับสินค้า</a>
			</div>
		</div>
	</li>

	<!-- ค่าใช้จ่าย -->
	<li class="nav-item"><a class="nav-link icon-color" href="/expenses">
			<i class="fas fa-fw fa-chart-line"></i> <span>ค่าใช้จ่าย</span></a>
	</li>

	<!-- ผังบัญชี  -->
	<li class="nav-item"><a class="nav-link icon-color" href="/chart-accounts">
			<i class="fas fa-fw fa-chart-bar icon-color"></i> <span>ผังบัญชี</span></a>
	</li>

	<!-- สมุดรายวัน -->
	<!-- <li class="nav-item"><a class="nav-link icon-color" href="/report-quotidia">
			<i class="fas fa-fw fa-book"></i> <span>สมุดรายวัน</span></a>
	</li> -->
	<li class="nav-item">
		<a class="nav-link collapsed icon-color" href="#" data-toggle="collapse" data-target="#collapseSix"
			aria-expanded="true" aria-controls="collapseSeven">
			<i class="fas fa-fw fa-file-alt"></i> <span>สมุดรายวัน</span>
		</a>
		<div id="collapseSix" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/general-journal" style="color: purple;">สมุดรายวันทั่วไป</a>
				<a class="collapse-item" href="/bought-day-book" style="color: purple;">สมุดรายวันซื้อ</a>
				<a class="collapse-item" href="/sales-journal" style="color: purple;">สมุดรายวันขาย</a>
				<a class="collapse-item" href="/cash-disbursement-journal" style="color: purple;">สมุดรายวันจ่าย</a>
				<a class="collapse-item" href="/cash-receipts-journal" style="color: purple;">สมุดรายวันรับ</a>
			</div>
		</div>
	</li>

	<!-- รายงานภาษี -->
	<li class="nav-item">
		<a class="nav-link collapsed icon-color" href="#" data-toggle="collapse" data-target="#collapseSeven"
			aria-expanded="true" aria-controls="collapseSeven">
			<i class="fas fa-fw fa-file-alt"></i> <span>รายงานภาษี</span>
		</a>
		<div id="collapseSeven" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/report-buy-tax" style="color: purple;">รายงานภาษีซื้อ</a>
				<a class="collapse-item" href="/report-sale-tax" style="color: purple;">รายงานภาษีขาย</a>
			</div>
		</div>
	</li>

	<!-- สมุดรายชื่อ -->
	<li class="nav-item"><a class="nav-link icon-color" href="/customers-list">
			<i class="fas fa-fw fa-address-book"></i> <span>สมุดรายชื่อ</span></a>
	</li>

	<!-- จัดเก็ยไฟล์ -->
	<!-- <li class="nav-item"><a class="nav-link icon-color" href="/file-storage">
			<i class="fas fa-fw fa-address-book"></i> <span>จัดเก็บไฟล์เอกสาร</span></a>
	</li> -->

	<!-- ตั้งค่า -->
	<li class="nav-item" id="statusTabBar">
		<a class="nav-link collapsed icon-color" href="#" data-toggle="collapse" data-target="#collapseNine"
			aria-expanded="true" aria-controls="collapseNine">
			<i class="fas fa-fw fa-cog"></i> <span>ตั้งค่า</span>
		</a>
		<div id="collapseNine" class="collapse" aria-labelledby="headingTwo" data-parent="#collapseNine">
			<div class="bg-white py-2 collapse-inner rounded">
				<a class="collapse-item" href="/setting" style="color: purple;">ตั้งค่าธุระกิจ</a>
				<a class="collapse-item" href="/setting-user" style="color: purple;">ตั้งค่าผู้ใช้งาน</a>
			</div>
		</div>
	</li>

	<!-- Sidebar Toggler (Sidebar) -->
	<div class="text-center d-none d-md-inline">
		<button class="rounded-circle border-0" id="sidebarToggle"></button>
	</div>
</ul>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
	aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">ออกจากระบบ</h5>
				<button class="close" type="button" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<div class="modal-body">คุณแน่ใจหรือไม่ว่าคุณต้องการออกจากระบบ</div>
			<div class="modal-footer">
				<button class="btn btn-secondary" type="button" data-dismiss="modal">ยกเลิก</button>
				<a class="btn btn-primary" href="/">ออกจากระบบ</a>
			</div>
		</div>
	</div>
</div>

<script>
	$(document).ready(function () {
		if ($('#position').val() === 'เจ้าของธุระกิจ') {
			document.getElementById("statusTabBar").hidden = false;
		} else {
			document.getElementById("statusTabBar").hidden = true;
		}
	})
</script>