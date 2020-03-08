$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker1').datepicker({
    uiLibrary: 'bootstrap4'
});

$(document).ready(function () {
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

    table.buttons().container()
        .appendTo('#example_wrapper .col-md-6:eq(0)');
});