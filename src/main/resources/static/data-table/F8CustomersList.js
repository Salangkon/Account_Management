$(document).ready(function () {
	var table = $('#customersList').DataTable({
		lengthChange: false,
		"order": [
			[4, 'desc']
		],
		"sAjaxSource": "/api/customers-list/name/" + $('#setCompanyId').val(),
		"iDisplayLength": 10,
		"sAjaxDataProp": "",
		dom: 'Blfrtip',
		buttons: ['copy', 'excel', 'pdf', 'print', 'colvis'],
		// buttons: [
		// 	'copy', 'csv', 'excel', 'pdf', 'print'
		// ],
		"aoColumns": [{
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
						return 'นิติบุุคล';
					} else if (row.companyType == '2') {
						return 'บุคคลธรรมดา';
					}
				}
			}, {
				"mData": "created_date",
				"className": "text-center",
				"sWidth": "60px",
				"mRender": function (data, type, full) {
					return '<div align="center"> ' + new Date(full.created_date).toLocaleDateString("en-US") + '</div>'
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

	var officeType = 1;
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
			var customers = {
				companyId: $('#companyId').val(),
				address: $('#address').val(),
				companyName: $('#companyName').val(),
				companyType: $('#companyType').val(),
				customerName: $('#customerName').val(),
				department: $('#department').val(),
				email: $('#emailCus').val(),
				officeType: officeType,
				taxId: $('#taxId').val(),
				tel: $('#tel').val(),
				createBy: $('#createBy').val(), //สร้างโดย
				company: $('#setCompanyId').val(),				
			}

			console.log(JSON.stringify(customers));
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
	}); // and save

	// validate
	function validateInput() {
		var pass = true;

		if ('' == $('#tel').val()) {
			tel.focus()
			$('#error-tel').removeClass("hide")
			pass = false;
		} else {
			$('#error-tel').addClass("hide")
		}

		if ('' == $('#emailCus').val()) {
			emailCus.focus()
			$('#error-emailCus').removeClass("hide")
			pass = false;
		} else {
			$('#error-emailCus').addClass("hide")
		}

		if ('' == $('#customerName').val()) {
			customerName.focus()
			$('#error-customerName').removeClass("hide")
			pass = false;
		} else {
			$('#error-customerName').addClass("hide")
		}

		if ('2' == officeType) {
			if ('' == $('#department').val()) {
				department.focus()
				$('#error-department').removeClass("hide")
				pass = false;
			} else {
				$('#error-department').addClass("hide")
			}
		}

		if ('' == $('#taxId').val()) {
			taxId.focus()
			$('#error-taxId').removeClass("hide")
			pass = false;
		} else {
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
			title: "Are you sure?",
			text: "Your will not be able to recover this imaginary file!",
			type: "warning",
			showCancelButton: true,
			confirmButtonClass: "btn-danger",
			confirmButtonText: "Yes, delete it!",
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
		$('#companyType').val("0");
		$('#department').val("");
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
				$('#companyType').val(msg.companyType);
				$('#department').val(msg.department);
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