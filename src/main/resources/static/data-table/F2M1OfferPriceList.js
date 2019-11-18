$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker1').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker2').datepicker({
    uiLibrary: 'bootstrap4'
});

$(document).ready(function () {
    var table = $('#example').DataTable({
        lengthChange: true,
        searching: true,
        // dom: 'Bfrtip',
        // buttons: ['copy', 'excel', 'pdf', 'colvis']
        "aoColumns": [{
                "sWidth": "5%",
            },
            {
                "sWidth": "12%",
            },
            {
                "sWidth": "12%",
            },
            {
                "sWidth": "35%",
            },
            {
                "sWidth": "12%",
            },
            {
                "sWidth": "12%",
            },
            {
                "sWidth": "12%",
            }
        ]
    });

    var tableSelect = $('#example1').DataTable({
        lengthChange: false,
        searching: false,
        // lengthChange: false,
        // dom: 'lrtip',
        "bAutoWidth": false,
        "aoColumns": [
            {
                sWidth: "5px",
            },
            {
                sWidth: "55%",
            },
            {
                sWidth: "10%",
            },
            {
                sWidth: "20%",
            },
            {
                sWidth: "10%",
            }
        ]
    });


    // $('#Add').click(function () {
    // 	var datas = table.rows('.selected').data();
    // 	tableSelect.rows.add(datas).draw(false);
    // });

    var counter = 1;
    $('#Add').click(function() {
        tableSelect.row.add([
            '<div style="text-align: center">'+counter+'</div>',
            '<div><input type="text" style="width: 100%;"></div>',
            '<div><input type="number" style="text-align: center;"></div>',
            '<div><input type="number" style="text-align: center;"></div>',
            '100.00',
        ]).draw(false);
        counter++;
    });

    // Automatically add a first row of data
//    $('#Add').click();

});