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

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}

$(document).ready(function () {
    $('#myModal').on('hidden.bs.modal', function (e) {
        exampleTable();
    });
    dataCustomer(null);
    tableCreateJournal(null);
    exampleTable();


}); // end Document


function exampleTable() {
    $.ajax({
        type: "GET",
        url: "/api-journal/get-all",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // table seve offer price
            var tableQuotation = $('#example').DataTable({
                lengthChange: true,
                paging: false,
                searching: false,
                "bDestroy": true,
                // "sAjaxSource": searchDate(),
                data: jQuery.parseJSON(JSON.stringify(msg)),
                "sAjaxDataProp": "",

                "aoColumns": [{
                        'data': 'date',
                        "className": "text-center",
                        "sWidth": "10%",
                    },
                    {
                        'data': 'documentCode',
                        "className": "text-center",
                        "sWidth": "15%",
                    },
                    {
                        'data': 'description',
                        "sWidth": "45%",
                    },
                    {
                        'data': 'referenceDocument',
                        "sWidth": "10%",
                    },
                    {
                        'data': 'date',
                        "className": "text-center",
                        "sWidth": "10%",
                        "mRender": function (data, type, row, index, full) {
                            if (row.status == '0') {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                            <option value="" style="color: black">รอดำเนินการ</option/>\n\
                            <option value="1' + row.id + '" style="color: green">อนุมัติ</option/>\n\
                            </select>';
                            } else if (row.status == '1') {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: green">\n\
                            <option style="color: green">อนุมัติเเล้ว</option/>\n\
                            <option value="2' + row.id + '" style="color: red">ยกเลิก</option/>\n\
                            </select>';
                            } else if (row.status == '2') {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: red">\n\
                            <option value=:"" style="color: red">ยกเลิก</option/>\n\
                            </select>';
                            }
                        }
                    },
                    {
                        'data': 'date',
                        "className": "text-center",
                        "sWidth": "10%",
                        "mRender": function (data, type, row, index, full) {
                            if (row.status == '0') {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                            <option value="" style="color: black">ตัวเลือก</option/>\n\
                            <option value="9' + row.id + '" style="color: green">แก้ไขเอกสาร</option/>\n\
                            <option value="6' + row.id + '" style="color: blue">พิมพ์เอกสาร</option/>\n\
                            <option value="7' + row.id + '" style="color: blue">ดาวน์โหลด</option/>\n\
                            <option value="5' + row.id + '" style="color: red">ลบเอกสาร</option/>\n\
                            </select>';
                            } else {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                            <option value="" style="color: black">ตัวเลือก</option/>\n\
                            <option value="6' + row.id + '" style="color: blue">พิมพ์เอกสาร</option/>\n\
                            <option value="7' + row.id + '" style="color: blue">ดาวน์โหลด</option/>\n\
                            </select>';
                            }
                        }
                    },
                ],
            });
        }
    });
}

// update status
function changeFunc($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    console.log(type, id);

    switch (type) {
        case "1":
            updateStatus(id, "1");
            break;
        case "2":
            updateStatus(id, "2");
            break;
        case "0":
            updateStatus(id, "0");
            break;
        case "9":
            createUpdate(id);
            break;
        case "5":
            deleteId(id);
            break;
    }
}

function createUpdate(id) {
    if (id != null) {
        $.ajax({
            type: "GET",
            url: "/api-journal/get-by/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $('#id').val(msg.id),
                    $('#customers').val(msg.companyId),
                    $('#type').val(msg.documentCode),
                    $('#date').val(msg.date),
                    $('#description').val(msg.description),
                    $('#referenceDocument').val(msg.referenceDocument),
                    $('#sumDebit').text(parseFloat(msg.sumDebit).toFixed(2)),
                    $('#sumCredit').text(parseFloat(msg.sumCredit).toFixed(2))
                tableCreateJournal(msg.journalLists);
            }
        })
    } else {
        $('#id').val("")
        $('#customers').val("")
        $('#type').val("")
        $('#date').val("")
        $('#description').val("")
        $('#referenceDocument').val("")
        $('#sumDebit').text("00.00")
        $('#sumCredit').text("00.00")
        tableCreateJournal(null);

    }

    $('#myModal').modal('show');

}

function updateStatus(id, status) {
    $.ajax({
        type: 'POST',
        url: '/api-journal/update-status/' + id + "/" + status,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/general-journal";
        }
    });
} // end update status

var tablegeneraJournal

function tableCreateJournal(data) {
    console.log(JSON.stringify(data));
    if (data != null) {
        tablegeneraJournal = $('#tablegeneraJournalDisplay').DataTable({
            lengthChange: false,
            "paging": false,
            searching: false,
            responsive: true,
            "bDestroy": true,
            data: jQuery.parseJSON(JSON.stringify(data)),
            "bAutoWidth": false,
            "sAjaxDataProp": "",
            "aoColumns": [{
                    'data': '',
                    "sWidth": "20%",
                    "mRender": function (data,
                        type, row, index) {
                        if (row.chartAccountId == null) {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value=""/>';
                        } else {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value="' + row.chartAccountId + '"/>';
                        }

                    }
                },
                {
                    'data': '',
                    "sWidth": "50%",
                    "mRender": function (data,
                        type, row, index) {
                        if (row.detail == null) {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value=""/>';
                        } else {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value="' + row.detail + '"/>';
                        }
                    }
                },
                {
                    'data': '',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index) {
                        if (row.credit == null) {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value=""/>';
                        } else {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value="' + row.credit + '"/>';
                        }
                    }
                },
                {
                    'data': '',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index) {
                        if (row.debit == null) {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value=""/>';
                        } else {
                            return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                                index.row +
                                '" value="' + row.debit + '"/>';
                        }
                    }
                },
                {
                    "mData": "",
                    "sWidth": "4px",
                    "mRender": function (data,
                        type, row, index) {
                        return '<div style="text-align:center"><a class="fas fa-trash" style="cursor: pointer;color: red"></a></div>';
                    }
                }
            ],
        });
    } else {
        tablegeneraJournal = $('#tablegeneraJournalDisplay').DataTable({
            lengthChange: false,
            "paging": false,
            searching: false,
            responsive: true,
            "bDestroy": true,
            // data: jQuery.parseJSON(JSON.stringify(data)),
            "bAutoWidth": false,
            "sAjaxDataProp": "",
            "aoColumns": [{
                    'data': '',
                    "sWidth": "20%",
                    "mRender": function (data,
                        type, row, index) {
                        return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="chartAccountId' +
                            index.row +
                            '" value=""/>';
                    }
                },
                {
                    'data': '',
                    "sWidth": "50%",
                    "mRender": function (data,
                        type, row, index) {
                        return '<input class="form-control" style="width: 100%;height: 7mm" type="text" id="detail' +
                            index.row +
                            '" value=""/>';
                    }
                },
                {
                    'data': '',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index) {
                        return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="height: 7mm" type="text" name="credit" id="credit' +
                            index.row +
                            '" value=""/>';
                    }
                },
                {
                    'data': '',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index) {
                        return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="height: 7mm" type="text" name="debit" id="debit' +
                            index.row +
                            '" value=""/>';
                    }
                },
                {
                    "mData": "",
                    "sWidth": "4px",
                    "mRender": function (data,
                        type, row, index) {
                        return '<div style="text-align:center"><a class="fas fa-trash" style="cursor: pointer;color: red"></a></div>';
                    }
                }
            ],
        });
    }


    $('#tablegeneraJournalDisplay').on('click', 'a', function () {
        tablegeneraJournal.row($(this).parents('tr')).remove().draw();

        var sumvalues = $("[name='credit']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        $('#credit').text(parseFloat(sum).toFixed(2));

        var sumvalues = $("[name='debit']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        $('#debit').text(parseFloat(sum).toFixed(2));
    }); // end table
}

$('#tablegeneraJournalDisplay').on('keyup', 'input', function () {
    var sumvalues = $("[name='credit']");
    var sum = 0;
    for (var i = 0; i < sumvalues.length; i++) {
        if ($(sumvalues[i]).val() != "") {
            sum = sum + parseFloat($(sumvalues[i]).val());
        }
    }
    $('#sumCredit').text(parseFloat(sum).toFixed(2));

    var sumvalues = $("[name='debit']");
    var sum = 0;
    for (var i = 0; i < sumvalues.length; i++) {
        if ($(sumvalues[i]).val() != "") {
            sum = sum + parseFloat($(sumvalues[i]).val());
        }
    }
    $('#sumDebit').text(parseFloat(sum).toFixed(2));

});

function Add() {
    tablegeneraJournal.row.add([tablegeneraJournal.data]).draw(false);
}

function remove() {
    tablegeneraJournal.rows('.selected').remove().draw();
}

function deleteId(id) {
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
                url: '/api-journal/delete/' + id,
                type: 'DELETE',
                success: function (result) {
                    if (result) {
                        window.location.href = "/general-journal";
                    } else {
                        alert("Delete Fail!!!");
                    }
                }
            });
        });
} //end delete

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

function saveCreate() {
    var pass = true;
    // pass = validateInput();

    $.ajax({
        type: "GET",
        url: "/api-journal/generate-dep/JV",
        success: function (msg) {
            if (pass) {
                var insert = {
                    id: $('#id').val(), //ลูกค้า
                    companyId: $('#customers').val(), //ลูกค้า
                    documentCode: msg, //เลขที่เอกสาร
                    type: "JV", //ประเภท
                    status: "0", //สถานะ
                    date: $('#date').val(), //วันที่
                    description: $('#description').val(), // คำอธิบาย
                    referenceDocument: $('#referenceDocument').val(), //เอกสารอ้างอิง
                    // เดบิต เครดิต
                    sumDebit: $('#sumDebit').text(), //เดบิต
                    sumCredit: $('#sumCredit').text(), //เครดิต
                    journalLists: [],
                }
                var data = tablegeneraJournal.data();
                for (let i = 0; i < data.length; i++) {
                    var d = {};
                    d.chartAccountId = $("#chartAccountId" + i).val(); //แผนบัญชี
                    d.detail = $("#detail" + i).val(); //รายละเอียด
                    d.debit = $("#debit" + i).val(); //เดบิต
                    d.credit = $("#credit" + i).val(); //เครดิต
                    insert.journalLists.push(d)
                }

                console.log(JSON.stringify(insert));

                $.ajax({
                    type: 'POST',
                    url: '/api-journal/add-update',
                    data: JSON.stringify(insert),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        window.location.href = "/general-journal";
                    }
                });
            }
        }
    })
}