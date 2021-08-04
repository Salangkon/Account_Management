$(document).ready(function () {
	var table = $('#customersList').DataTable({
		lengthChange: false,
		"order": [
			[4, 'desc']
		],
		"sAjaxSource": "/api/customers-list/name/" + $('#setCompanyId').val(),
		"iDisplayLength": 10,
		"sAjaxDataProp": "",
		// dom: 'Blfrtip',
		// buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
		// buttons: [
		// 	'copy', 'csv', 'excel', 'pdf', 'print'
		// ],
		"aoColumns": [{
			"mData": "type",
			"sWidth": "80px",
			"mRender": function (data, type, row, index, full) {
				if (row.type == '1') {
					return '<b style="color: green;"> ลูกค้า </b>';
				} else if (row.type == '2') {
					return '<b style="color: red;"> ผู้จำหน่าย </b>';
				}
			}
		}, {
			"mData": "companyName",
			"sWidth": "260px"
		},
		{
			"mData": "tel",
			"className": "text-center",
			"sWidth": "60px"
		}, {
			"mData": "email",
			"sWidth": "60px"
		}, {
			"mData": "",
			"sWidth": "60px",
			"mRender": function (data, type, row, index, full) {
				if (row.companyType == '0') {
					return '';
				} else if (row.companyType == '1') {
					return '<b style="color: blueviolet;"> นิติบุุคล </b>';
				} else if (row.companyType == '2') {
					return '<b style="color: darkgreen;"> บุคคลธรรมดา </b>';
				}
			}
		}, {
			"mData": "created_date",
			"className": "text-center",
			"sWidth": "70px",
			"mRender": function (data, type, full) {
				return '<div align="center" style="color: blue;"> ' + new Date(full.created_date).toLocaleString("th-TH") + '</div>'
			}
		}, {
			"sWidth": "60px",
			"className": "text-center",
			"mRender": function (data, type, full) {
				return '<div align="center">' +
					'<button type="button" class="btn btn-warning btn-sm"data-toggle="modal" data-target="#myModal" onclick="update(' + "'" + full.companyId + "'" + ')"><i class="fas fa-edit"></i></button> ' +
					'<button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.companyId + "'" + ')"><i class="fas fa-trash"></i></button></div>'
			}
		}
		]
	});

	var officeType;
	$("#officeType1").change(function () {
		officeType = 1;
	});
	$("#officeType2").change(function () {
		officeType = 2;
	});
	$('#save').click(function () {
		var pass = true;
		pass = validateInput();
		console.log("pass :: ", pass);
		if (pass) {

			if (officeType == 1) {
				departmentPass = "";
				departmentName = "";
			} else {
				departmentPass = $('#departmentPass').val();
				departmentName = $('#departmentName').val();
			}

			var customers = {
				companyId: $('#companyId').val(),
				address: $('#address').val(),
				companyName: $('#companyName').val(),
				type: $('#type').val(),
				companyType: $('#companyType').val(),
				customerName: $('#customerName').val(),
				departmentPass: departmentPass,
				departmentName: departmentName,
				email: $('#emailCus').val(),
				officeType: officeType,
				taxId: $('#taxId').val(),
				tel: $('#tel').val(),
				createBy: $('#createBy').val(), //สร้างโดย
				company: $('#setCompanyId').val(),
			}

			console.log(JSON.stringify(customers));
			$.ajax({
				type: 'GET',
				url: "/api/customers-list/check-company-name/" + $('#companyName').val() + "/" + $('#setCompanyId').val(),
				success: function (res) {
					if (res == "S") {
						var r = confirm("ชื่อบริษัทซ้ำ ต้องบันทึกหรือไม่?");
						if (r == true) {
							$.ajax({
								type: "POST",
								url: "/api/add-update-customers-list",
								data: JSON.stringify(customers),
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function (data) {
									swal({
										title: "บันทึก สำเร็จ",
										type: "success",
										confirmButtonClass: "btn-success",
										confirmButtonText: "ตกลง",
									},
										function () {
											window.location.href = "/customers-list";
										});
								},
								failure: function (errMsg) {
									alert(errMsg);
								}
							});
						}
					} else {
						$.ajax({
							type: "POST",
							url: "/api/add-update-customers-list",
							data: JSON.stringify(customers),
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function (data) {
								swal({
									title: "บันทึก สำเร็จ",
									type: "success",
									confirmButtonClass: "btn-success",
									confirmButtonText: "ตกลง",
								},
									function () {
										window.location.href = "/customers-list";
									});
							},
							failure: function (errMsg) {
								alert(errMsg);
							}
						});
					}
				}
			})

		}
	}); // and save

	// validate
	function validateInput() {
		var pass = true;
		// if ('' == $('#tel').val()) {
		// 	tel.focus()
		// 	$('#error-tel').removeClass("hide")
		// 	pass = false;
		// } else {
		// 	$('#error-tel').addClass("hide")
		// }

		// if ('' == $('#emailCus').val()) {
		// 	emailCus.focus()
		// 	$('#error-emailCus').removeClass("hide")
		// 	pass = false;
		// } else {
		// 	$('#error-emailCus').addClass("hide")
		// }

		// if ('' == $('#customerName').val()) {
		// 	customerName.focus()
		// 	$('#error-customerName').removeClass("hide")
		// 	pass = false;
		// } else {
		// 	$('#error-customerName').addClass("hide")
		// }

		if ('2' == officeType) {
			if ('' == $('#departmentPass').val()) {
				departmentPass.focus()
				$('#error-departmentPass').removeClass("hide")
				pass = false;
			} else {
				$('#error-departmentPass').addClass("hide")
			}

			if ('' == $('#departmentName').val()) {
				departmentName.focus()
				$('#error-departmentName').removeClass("hide")
				pass = false;
			} else {
				$('#error-departmentName').addClass("hide")
			}
		}

		if ('' == $('#taxId').val()) {
			taxId.focus()
			$('#error-taxId').removeClass("hide")
			pass = false;
		} else {
			if ($('#taxId').val().length < 13) {
				taxId.focus()
				$('#error-taxId-length').removeClass("hide")
				pass = false;
			} else {
				$('#error-taxId-length').addClass("hide")
			}
			$('#error-taxId').addClass("hide")
		}

		if ('' == $('#address').val()) {
			address.focus()
			$('#error-address').removeClass("hide")
			pass = false;
		} else {
			$('#error-address').addClass("hide")
		}

		if ('' == $('#companyName').val()) {
			companyName.focus()
			$('#error-companyName').removeClass("hide")
			pass = false;
		} else {
			$('#error-companyName').addClass("hide")
		}

		if ('' == $('#companyId').val()) {
			companyId.focus()
			$('#error-companyId').removeClass("hide")
			pass = false;
		} else {
			$('#error-companyId').addClass("hide")
		}

		if ('0' == $('#companyType').val()) {
			companyType.focus()
			$('#error-companyType').removeClass("hide")
			pass = false;
		} else {
			$('#error-companyType').addClass("hide")
		}

		if ('0' == $('#type').val()) {
			companyType.focus()
			$('#error-type').removeClass("hide")
			pass = false;
		} else {
			$('#error-type').addClass("hide")
		}

		return pass;
	} // end validate
});

function CheckOffice(officeType) {
	if (officeType == 1) {
		document.getElementById("officeTypeCheck").hidden = true;
	} else {
		document.getElementById("officeTypeCheck").hidden = false;
	}
	console.log("CheckOffice :: " + officeType);
}

function deleteId(companyId) {
	console.log(companyId);
	swal({
		title: "ยืนยันการลบข้อมูล",
		text: "คุณกำลังลบข้อมูล, ต้องการดำเนินต่อหรือไม่?",
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: "btn-danger",
		confirmButtonText: "ลบข้อมูล",
		cancelButtonText: "ปิด",
		closeOnConfirm: false
	},
		function () {
			$.ajax({
				url: '/api/delete-customers-list/' + companyId,
				type: 'DELETE',
				success: function (result) {
					if (result == "Success") {
						window.location.href = "/customers-list";
					} else {
						alert("มีเอกสาร ที่เกี่ยวข้องกับหน่วยงานนี้!!!");
					}
				}
			});
		});
} //end delete

function update(companyId) {
	console.log("id :: " + companyId);
	if (companyId == null) {
		console.log("null");
		document.getElementById("officeTypeCheck").hidden = true;

		var x = document.getElementById("myDIV1");
		x.style.display = "none"
		var x = document.getElementById("myDIV");
		x.style.display = "block"

		$('#companyId').val("");
		document.getElementById("companyId").disabled = false;
		$('#companyName').val("");
		$('#type').val("0");
		$('#companyType').val("0");
		$('#departmentPass').val("");
		$('#departmentName').val("");
		$('#customerName').val("");
		$('#address').val("");
		$('#emailCus').val("");
		document.getElementById("officeType1").checked = true;
		$('#taxId').val("");
		$('#tel').val("");

	} else {
		$.ajax({
			type: "GET",
			url: "/api/customers-list/" + companyId,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (msg) {
				console.log(JSON.stringify(msg));
				document.getElementById("officeTypeCheck").hidden = false;
				if (msg.officeType == 1) {
					document.getElementById("officeTypeCheck").hidden = true;
				}
				console.log("CheckOffice :: " + msg.officeType);

				var x = document.getElementById("myDIV1");
				x.style.display = "block"
				var x = document.getElementById("myDIV");
				x.style.display = "none"

				$('#companyId').val(msg.companyId);
				document.getElementById("companyId").disabled = true;
				$('#companyName').val(msg.companyName);
				$('#type').val(msg.type);
				$('#companyType').val(msg.companyType);
				$('#departmentPass').val(msg.departmentPass);
				$('#departmentName').val(msg.departmentName);
				$('#customerName').val(msg.customerName);
				$('#address').val(msg.address);
				$('#emailCus').val(msg.email);
				if (msg.officeType == 1) {
					document.getElementById("officeType1").checked = true;
					$("#officeType1").val("1")
				} else {
					document.getElementById("officeType2").checked = true;
					$("#officeType2").val("2")
				}

				$('#taxId').val(msg.taxId);
				$('#tel').val(msg.tel);
			}
		});
	}
}; // update