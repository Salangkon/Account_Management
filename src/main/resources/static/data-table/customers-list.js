$(document).ready(
	function () {
		var table = $('#customersList').DataTable({
			lengthChange: false,
			"order": [
				[4, 'desc']
			],
			"sAjaxSource": "/api/customers-list",
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
					"sWidth": "60px"
				}, {
					"mData": "email",
					"sWidth": "60px"
				}, {
					"mData": "officeType",
					"sWidth": "60px"
				}, {
					"mData": "created_date",
					"sWidth": "60px"
				}, {
					"sWidth": "60px",
					"mRender": function (data, type, full) {
						return '<div align="center">' +
							'<button type="button" class="btn btn-warning btn-sm"data-toggle="modal" data-target="#myModal" onclick="update(' + "'" + full.companyId + "'" + ')"><i class="fas fa-edit"></i></button> ' +
							'<button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.companyId + "'" + ')"><i class="fas fa-trash"></i></button></div>'
					}
				}
			]
		});

		table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');

		$("#officeType1").change(function () {
			officeType = 1;
		});
		$("#officeType2").change(function () {
			officeType = 2;
		});

		$('#save').click(function () {
			console.log("");
			var customers = {
				companyId: $('#companyId').val(),
				address: $('#address').val(),
				companyName: $('#companyName').val(),
				companyType: $('#companyType').val(),
				customerName: $('#customerName').val(),
				department: $('#department').val(),
				email: $('#email').val(),
				officeType: officeType,
				taxId: $('#taxId').val(),
				tel: $('#tel').val(),
			}
			console.log(JSON.stringify(customers));
			$.ajax({
				type: "POST",
				url: "/api/add-update-customers-list",
				// The key needs to match your method's input parameter (case-sensitive).
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

		}); // and save

	});

function CheckOffice(officeType) {
	if (officeType == 1) {
		document.getElementById("officeTypeCheck").hidden = true;
	} else {
		document.getElementById("officeTypeCheck").hidden = false;
	}
	console.log("CheckOffice :: "+officeType);
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
						alert("Delete Fail!!!");
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
		$('#companyType').val("");
		$('#department').val("");
		$('#customerName').val("");
		$('#address').val("");
		$('#email').val("");
		$('#officeType1').val("");
		$('#officeType2').val("");
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
				console.log("CheckOffice :: "+msg.officeType);

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
				$('#email').val(msg.email);
				if (msg.officeType == 1) {
					document.getElementById("officeType1").checked = true;
				} else {
					document.getElementById("officeType2").checked = true;
				}

				$('#taxId').val(msg.taxId);
				$('#tel').val(msg.tel);
			}
		});
	}

}; // update