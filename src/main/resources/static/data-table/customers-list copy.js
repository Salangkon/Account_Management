$(document).ready(
	function() {				
		var table = $('#customersList').DataTable({
			lengthChange : false,
			buttons : [ 'copy', 'excel', 'pdf', 'colvis' ],
			"order": [[ 5, 'desc' ]],
			"sAjaxSource" : "/api/customers-list",
			"iDisplayLength": 10,
			"sAjaxDataProp" : "",
			dom: 'Bfrtip',
			buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			],
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
				"mData" : "officeType",
				"sWidth" : "60px",
				"mRender": function (data, type, full) {
					return '<div align="center">หยุดใช้งาน</div>';						
				} 
			},{
				"mData" : "created_date",
				"sWidth" : "60px" 
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
			    	swal('Deleted!','Your file has been deleted.','success');
			    		window.location.href = "/customers-list";

			    	},
			    failure: function(errMsg) {
			        alert(errMsg);
			    }
			});
			
		});// and
		
	});

