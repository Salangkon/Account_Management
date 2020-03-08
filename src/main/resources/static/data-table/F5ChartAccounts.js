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
    tabelAll(),
    jsonCharAccount(),
    hiddenCondition(),

);

function saveUpdate() {
    console.log($('#id').val(), $('#detail').val());
    var id = $('#id').val()
    var detail;
    if ($('#detail').val() == "") {
        detail = "ZEROOFNULL";
    } else {
        detail = $('#detail').val();
    }
    $.ajax({
        type: 'POST',
        url: '/api-chart-account/update/' + id + "/" + detail,
        success: function (result) {
            if (result == "Success") {
                swal("บันทึก!", "สำเร็จ!", "success")
            }
        }
    });
}

function saveCreate() {
    console.log($('#id').val());

    var insert = {
        id: $('#id').val(),
        passCode: $('#passCode').val(),
        text: $('#text').val(),
        detail: $('#detail').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/api-chart-account/create-file',
        data: JSON.stringify(insert),
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
                window.location.href = "/chart-accounts";
            });
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
    
}

function tabelAll() {
    tabelAll = $('#tabelAll').DataTable({
        // responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-chart-account/get-chartAccount-lv-all",
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "passCode",
                "className": "text-center",
                "sWidth": "15%"
            },
            {
                "mData": "text",
                "sWidth": "55%"
            },
            {
                "mData": "accountCategory",
                "sWidth": "30%"
            }
        ]
    });
    tabelAll = $('#tabelAllT2').DataTable({
        // responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-chart-account/get-chartAccount-lv-all-by/bc76ab41-13d1-4fd0-8c45-ef0e4ccf2873",
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "passCode",
                "className": "text-center",
                "sWidth": "15%"
            },
            {
                "mData": "text",
                "sWidth": "55%"
            },
            {
                "mData": "accountCategory",
                "sWidth": "30%"
            }
        ]
    });
    tabelAll = $('#tabelAllT3').DataTable({
        responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-chart-account/get-chartAccount-lv-all-by/1677d9a5-5fcd-4a4d-b31f-1ada25d51c83",
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "passCode",
                "className": "text-center",
                "sWidth": "15%"
            },
            {
                "mData": "text",
                "sWidth": "55%"
            },
            {
                "mData": "accountCategory",
                "sWidth": "30%"
            }
        ]
    });
    tabelAll = $('#tabelAllT4').DataTable({
        responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-chart-account/get-chartAccount-lv-all-by/f27a6462-b136-4285-ad06-ce7fd0c1ba27",
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "passCode",
                "className": "text-center",
                "sWidth": "15%"
            },
            {
                "mData": "text",
                "sWidth": "55%"
            },
            {
                "mData": "accountCategory",
                "sWidth": "30%"
            }
        ]
    });
    tabelAll = $('#tabelAllT5').DataTable({
        responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-chart-account/get-chartAccount-lv-all-by/b48f2ebe-1a18-4001-9999-754ffa1171da",
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "passCode",
                "className": "text-center",
                "sWidth": "15%"
            },
            {
                "mData": "text",
                "sWidth": "55%"
            },
            {
                "mData": "accountCategory",
                "sWidth": "30%"
            }
        ]
    });
    tabelAll = $('#tabelAllT6').DataTable({
        responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-chart-account/get-chartAccount-lv-all-by/c6e2cf4a-67bd-420e-a5f8-9d2c0c3a040d",
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "passCode",
                "className": "text-center",
                "sWidth": "15%"
            },
            {
                "mData": "text",
                "sWidth": "55%"
            },
            {
                "mData": "accountCategory",
                "sWidth": "30%"
            }
        ]
    });
}

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

                document.getElementById("save").hidden = true;
                document.getElementById("edit").hidden = true;
                if (r.length <= 1) {
                    $.ajax({
                        type: 'GET',
                        url: '/api-chart-account/get-by-id/' + id,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (res) {
                            if (res.icon == "fas fa-plus") {
                                $('#id').val(res.id),
                                    $('#passCode').val(""),
                                    $('#text').val(""),
                                    $('#detail').val("")
                                $('#textDisplay').text("")

                                document.getElementById("save").hidden = false;
                                document.getElementById("edit").hidden = true;
                                document.getElementById("passCode").disabled = false;
                                document.getElementById("text").disabled = false;
                                document.getElementById("detail").disabled = false;
                            } else {
                                $('#id').val(res.id),
                                    $('#text').val(res.text),
                                    $('#passCode').val(res.passCode),
                                    $('#detail').val(res.detail)
                                $('#textDisplay').text(res.text)

                                document.getElementById("save").hidden = true;
                                document.getElementById("edit").hidden = false;
                                document.getElementById("passCode").disabled = true;
                                document.getElementById("text").disabled = true;
                                document.getElementById("detail").disabled = false;
                            }
                        }
                    })
                } else {
                    $('#id').val(""),
                        $('#passCode').val(""),
                        $('#text').val(""),
                        $('#detail').val("")
                    $('#textDisplay').text("")
                    document.getElementById("save").hidden = true;
                    document.getElementById("edit").hidden = true;
                    document.getElementById("passCode").disabled = true;
                    document.getElementById("text").disabled = true;
                    document.getElementById("detail").disabled = true;
                }

            }).jstree({
                'core': {
                    'multiple': false,
                    // "animation": 0,
                    "check_callback": true,
                    // "themes": {
                    //     "stripes": true
                    // },
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