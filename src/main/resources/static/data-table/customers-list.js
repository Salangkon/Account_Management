$(document).ready(
	function() {				
		var table = $('#customersList').DataTable({
			lengthChange : false,
			"order": [[ 4, 'desc' ]],
			"sAjaxSource" : "/api/customers-list",
			"iDisplayLength": 10,
			"sAjaxDataProp" : "",
			dom: 'Blfrtip',
			buttons : [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
			// buttons: [
			// 	'copy', 'csv', 'excel', 'pdf', 'print'
			// ],
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
				"mData" : "created_date",
				"sWidth" : "60px" 
			},{
				"sWidth" : "60px",
				"mRender": function (data, type, full) {
					return '<div align="center">'
					+'<button type="button" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button> '
					+'<button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.companyId + "'" + ')"><i class="fas fa-trash"></i></button></div>'						
				} 
			}]
		});
			
		table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');
		
		$('#save').click(function(){
			console.log("");
			var customers = {
					companyId    : $('#companyId').val(),
					address 	 : $('#address').val(),
					companyName  : $('#companyName').val(),
					companyType  : $('#companyType').val(),	
					customerName : $('#customerName').val(),
					department	 : $('#department').val(),
					email        : $('#email').val(),
					officeType   : $('#officeType').val(),
					taxId        : $('#taxId').val(),
					tel			 : $('#taxId').val(),
			}
			console.log(JSON.stringify(customers));	
			$.ajax({
			    type: "POST",
			    url: "/api/add-update-customers-list",
			    // The key needs to match your method's input parameter (case-sensitive).
			    data: JSON.stringify(customers),
			    contentType: "application/json; charset=utf-8",
			    dataType: "json",
			    success: function(data){
			    	swal({
			  		  title: "บันทึก สำเร็จ",
			  		  type: "success",
			  		  confirmButtonClass: "btn-success",
			  		  confirmButtonText: "ตกลง",
			  		},
			  		function(){
			  			window.location.href = "/customers-list";
			  		});
			    },
			    failure: function(errMsg) {
			        alert(errMsg);
			    }
			});
			
		});// and save
		
	});


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
		function(){
			$.ajax({
			    url: '/api/delete-customers-list/'+companyId,
			    type: 'DELETE',
			    success: function(result) {
			        if (result == "Success") {
			        	 window.location.href = "/customers-list";
					} else {
						alert("Delete Fail!!!");
					}
			    }
			});
		});
    }//end delete
