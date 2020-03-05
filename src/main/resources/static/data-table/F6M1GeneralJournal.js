$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker1').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#date').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
});

$(document).ready(function () {

    dataCustomer(null);

    var table = $('#example').DataTable({
        lengthChange: true,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        // data: jQuery.parseJSON(),
        "sAjaxDataProp": "",
        "aoColumns": [{
                'data': '',
                "className": "text-center",
                "sWidth": "10%",
            },
            {
                'data': '',
                "sWidth": "15%",
            },
            {
                'data': '',
                "sWidth": "35%",
            },
            {
                'data': '',
                "sWidth": "15%",
            },
            {
                'data': '',
                "className": "text-center",
                "sWidth": "15%",
            },
            {
                'data': '',
                "className": "text-center",
                "sWidth": "15%",
            }
        ],
    });

    var table = $('#example1').DataTable({
        // lengthChange: false,
        // dom: 'lrtip',
    });

    var counter = 1;

    table.buttons().container().appendTo('#example_wrapper .col-md-6:eq(0)');

}); // end Document

function dataCustomer(companyId) {
    $.ajax({
        type: "GET",
        url: "/api/customers-list",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (companyId != null) {
                for (var i = 0; i < msg.length; i++) {
                    $('#customers').append('<option value="' + companyId + '">' + companyId + '</option>');
                }
            } else {
                for (var i = 0; i < msg.length; i++) {
                    $('#customers').append('<option value="' + msg[i].companyId + '">' + msg[i].companyName + '</option>');
                }
            }
        }
    });
}