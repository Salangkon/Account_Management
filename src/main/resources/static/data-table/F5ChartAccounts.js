function Add() {
    var insertQuotation = {
        text: $('#text').val(), //
        icon: "jstree-file", //
        step1: 0, //
        step2: 0, //
        step3: 3, //
    }
    console.log("test", JSON.stringify(insertQuotation));
    $.ajax({
        type: 'POST',
        url: '/api-chart-account/add-update',
        data: JSON.stringify(insertQuotation),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/chart-accounts";
        }
    });
};

$(document).ready(

    function jsonCharAccount() {
        $.ajax({
            type: 'GET',
            url: '/api-chart-account/get-all',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#data').on("changed.jstree", function (e, data) {
                    console.log(data);

                    if (data.selected.length) {
                        alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
                    }
                }).jstree({
                    'core': {
                        "animation": 0,
                        "check_callback": true,
                        "themes": {
                            "stripes": true
                        },
                        'data': result
                    }
                });
            }
        });
    },

    function () {
        var table = $('#example').DataTable({
            lengthChange: true,
            // dom: 'Bfrtip',
            buttons: ['copy', 'excel', 'pdf', 'colvis']
        });

        var table = $('#example1').DataTable({
            // lengthChange: false,
            // dom: 'lrtip',
        });

        var counter = 1;

        table.buttons().container().appendTo(
            '#example_wrapper .col-md-6:eq(0)');
    });