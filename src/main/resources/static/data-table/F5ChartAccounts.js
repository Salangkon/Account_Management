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

    jsonCharAccount(),
    hiddenCondition(),

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

function jsonCharAccount() {

    $.ajax({
        type: 'GET',
        url: '/api-chart-account/get-all-new',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('#dataJSTree').on('changed.jstree', function (e, data) {
                var i, j, r = [];
                var id;
                for (i = 0, j = data.selected.length; i < j; i++) {
                    r.push(data.instance.get_node(data.selected[i]).text);
                    $('#id').val(data.instance.get_node(data.selected[i]).id);
                    id = data.instance.get_node(data.selected[i]).id;
                }

                if (r.length <= 1) {
                    $.ajax({
                        type: 'GET',
                        url: '/api-chart-account/get-by-id/'+ id,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (res) {
                            $('#id').val(res.id), 
                            $('#text').val(res.text),
                            $('#passCode').val(res.passCode),
                            $('#detail').val(res.detail)
                        }
                    })
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
}; // jsonCharAccount

function hiddenCondition(Text) {
    var taxtTitle = "";
    taxtTitle = Text;

    // Text
    switch (taxtTitle) {
        case "สินทรัพย์":
            document.getElementById("T1").hidden = true;
            document.getElementById("T2").hidden = false;
            document.getElementById("T3").hidden = true;
            document.getElementById("T4").hidden = true;
            document.getElementById("T5").hidden = true;
            document.getElementById("T6").hidden = true;
            $('#taxtTitle').text("ผังบัญชี - สินทรัพย์");
            break;
        case "หนี้สิน":
            document.getElementById("T1").hidden = true;
            document.getElementById("T2").hidden = true;
            document.getElementById("T3").hidden = false;
            document.getElementById("T4").hidden = true;
            document.getElementById("T6").hidden = true;
            $('#taxtTitle').text("ผังบัญชี - หนี้สิน");
            break;
        case "ส่วนของผู้ถือหุ้น":
            document.getElementById("T1").hidden = true;
            document.getElementById("T2").hidden = true;
            document.getElementById("T3").hidden = true;
            document.getElementById("T4").hidden = false;
            document.getElementById("T5").hidden = true;
            document.getElementById("T6").hidden = true;
            $('#taxtTitle').text("ผังบัญชี - ส่วนของผู้ถือหุ้น");
            break;
        case "รายได้":
            document.getElementById("T1").hidden = true;
            document.getElementById("T2").hidden = true;
            document.getElementById("T3").hidden = true;
            document.getElementById("T4").hidden = true;
            document.getElementById("T5").hidden = false;
            document.getElementById("T6").hidden = true;
            $('#taxtTitle').text("ผังบัญชี - รายได้");
            break;
        case "ค่าใช้จ่าย":
            document.getElementById("T1").hidden = true;
            document.getElementById("T2").hidden = true;
            document.getElementById("T3").hidden = true;
            document.getElementById("T4").hidden = true;
            document.getElementById("T5").hidden = true;
            document.getElementById("T6").hidden = false;
            $('#taxtTitle').text("ผังบัญชี - ค่าใช้จ่าย");
            break;
        default:
            document.getElementById("T1").hidden = false;
            document.getElementById("T2").hidden = true;
            document.getElementById("T3").hidden = true;
            document.getElementById("T4").hidden = true;
            document.getElementById("T5").hidden = true;
            document.getElementById("T6").hidden = true;
            $('#taxtTitle').text("ผังบัญชี");
            break;
    }
}; // end hiddenCondition