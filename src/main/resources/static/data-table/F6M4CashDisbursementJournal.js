$('#fromDate').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
});
$('#toDate').datepicker({
    uiLibrary: 'bootstrap4',
    format: 'yyyy-mm-dd',
    startDate: '-3d'
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

function disabledInput(event) {
    var row = event.target.getAttribute('rownumber');
    row += '';
    if (event.target.name == 'debit') {
        $('#credit' + row).attr('disabled', 'disabled');
        $('#debit' + row).removeAttr('disabled');
        $('#credit' + row).val(null);
    } else {
        $('#debit' + row).attr('disabled', 'disabled');
        $('#credit' + row).removeAttr('disabled');
        $('#debit' + row).val(null);
    }
    if (event.target.value == 0) {
        $('#debit' + row).removeAttr('disabled');
        $('#credit' + row).val(null);
        $('#credit' + row).removeAttr('disabled');
        $('#debit' + row).val(null);
    }
}

$(document).ready(function () {
    $('#myModal').on('hidden.bs.modal', function (e) {
        tableJournal();
    });

    dataCustomer(null);
    tableCreateJournal(null);
    tableJournal();
    tableJournal
    $('#select1').selectpicker();

    getSeleteChartAccountItem();

}); // end Document

//selete-chart-account API
var SeleteChartAccountItem = [];

function getSeleteChartAccountItem() {
    $.ajax({
        type: "GET",
        url: "/api-chart-account/selete-chart-account",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            SeleteChartAccountItem = msg;
            console.log('getSeleteChartAccountItem', msg);
        }
    });
}
//End


function tableJournal() {
    var fromDate = 0;
    var toDate = 0;
    if (document.getElementById('fromDate').value != '') {
        fromDate = document.getElementById('fromDate').value
    }
    if (document.getElementById('toDate').value != '') {
        toDate = document.getElementById('toDate').value;
    }
    $.ajax({
        type: "GET",
        url: "/api-journal/get-all/PV/" + fromDate + "/" + toDate,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // table seve offer price
            var tableJournal = $('#tableJournal').DataTable({
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
                    "mRender": function (data,
                        type, row, index, full) {
                        return '<a style="cursor: pointer;color: blue;" onclick="createUpdate(' + "'" + row.id + "','" + true + "'" + ')">' + row.documentCode + '</a>';
                    }
                },
                {
                    'data': 'description',
                    "sWidth": "45%",
                },
                {
                    'data': 'sumCredit',
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
                            return '<div class="form-control form-control-sm" style="background-color: greenyellow;color: green;text-align: center;">อนุมัติเเล้ว</div>';
                        } else if (row.status == '2') {
                            return '<div class="form-control form-control-sm" style="background-color: red;color: white;text-align: center;">ยกเลิก</div>';
                            // return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: red">\n\
                            // <option value=:"" style="color: red">ยกเลิก</option/>\n\
                            // </select>';
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
            createUpdate(id, false);
            break;
        case "5":
            deleteId(id);
            break;
    }
}


function createUpdate(id, checkSaveFlg) {
    if (checkSaveFlg) {
        document.getElementById("checkSaveFlg").hidden = true;
    } else {
        document.getElementById("checkSaveFlg").hidden = false;
    }
    if (id != null) {
        $.ajax({
            type: "GET",
            url: "/api-journal/get-by/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                console.log('msg', msg);
                console.log('msg.companyId', msg.companyId);
                $('#id').val(msg.id),
                    $('#customers').val(msg.companyId),
                    $('#type').val(msg.documentCode),
                    $('#date').val(msg.date),
                    $('#description').val(msg.description),
                    $('#referenceDocument').val(msg.referenceDocument),
                    $('#sumDebit').text(parseFloat(msg.sumDebit).toFixed(2)),
                    $('#sumCredit').text(parseFloat(msg.sumCredit).toFixed(2))
                tableCreateJournal(msg.journalLists);
                $('.selectpicker').selectpicker();
                for (let index = 0; index < msg.journalLists.length; index++) {
                    $('#chartAccountId' + index).val(msg.journalLists[index].chartAccountId);
                    $('#chartAccountId' + index).selectpicker('refresh');
                }
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
    $('.selectpicker').selectpicker();
    console.log('selectpicker');
    $('#myModal').modal('show');

}

function updateStatus(id, status) {
    $.ajax({
        type: 'POST',
        url: '/api-journal/update-status/' + id + "/" + status,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/cash-disbursement-journal";
        }
    });
} // end update status

var tablegeneraJournal

function tableCreateJournal(data) {
    console.log(data);
    tablegeneraJournal = $('#tablegeneraJournalDisplay').DataTable({
        lengthChange: false,
        "paging": false,
        searching: false,
        responsive: true,
        "bDestroy": true,
        data: jQuery.parseJSON(JSON.stringify(data)),
        "bAutoWidth": false,
        "sAjaxDataProp": "",
        "order": [
            [0, "desc"]
        ],
        "aoColumns": [{
            'data': '',
            "sWidth": "20%",
            "mRender": function (data,
                type, row, index) {
                var selectItem = '';

                SeleteChartAccountItem.forEach(item => {
                    selectItem += '<optgroup label="' + item.title + '">';
                    item.seleteChartAccountList.forEach(item2 => {
                        selectItem += '<option value="' + item2.id + '">' + item2.name + '</option>';
                    });
                    selectItem += '</optgroup>';
                })
                return '<select id="chartAccountId' + index.row + '" class="selectpicker" data-hide-disabled="true" data-live-search="true">\n\
                       ' + selectItem + '\n\
                      </select>';
            }
        },
        {
            'data': '',
            "sWidth": "50%",
            "mRender": function (data,
                type, row, index) {
                if (row.detail == null) {
                    return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="detail' +
                        index.row +
                        '" value=""/>';
                } else {
                    return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" id="detail' +
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
                    return '<input class="form-control number2" style="width: 100%;height: 7mm" onkeyup="disabledInput(event)" name="debit" type="number" rownumber="' + index.row + '" id="debit' +
                        index.row +
                        '" value=""/>';
                } else {
                    return '<input class="form-control number2" style="width: 100%;height: 7mm" onkeyup="disabledInput(event)"  name="debit" type="number" rownumber="' + index.row + '" id="debit' +
                        index.row +
                        '" value="' + row.debit + '"/>';
                }
            }
        },
        {
            'data': '',
            "sWidth": "13%",
            "mRender": function (data,
                type, row, index) {
                if (row.debit == null) {
                    return '<input class="form-control number2" style="width: 100%;height: 7mm"  onkeyup="disabledInput(event)" name="credit" type="number" rownumber="' + index.row + '" id="credit' +
                        index.row +
                        '" value=""/>';
                } else {
                    return '<input class="form-control number2" style="width: 100%;height: 7mm"  onkeyup="disabledInput(event)" name="credit" type="number" rownumber="' + index.row + '" id="credit' +
                        index.row +
                        '" value="' + row.credit + '"/>';
                }
            }
        },
        {
            "mData": "",
            "sWidth": "4px",
            "mRender": function (data,
                type, row, index) {
                return '<div style="text-align:center"><i class="fas fa-trash" style="cursor: pointer;color: red"></i></div>';
            }
        }
        ],
    });

    $('#tablegeneraJournalDisplay').on('click', 'i', function () {
        tablegeneraJournal.row($(this).parents('tr')).remove().draw();
    });

    $('#tablegeneraJournalDisplay').on('click', 'a', function () {
        // tablegeneraJournal.row($(this).parents('tr')).remove().draw();

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
    });
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
    $('.selectpicker').selectpicker();

}

function remove() {
    tablegeneraJournal.rows('.selected').remove().draw();
    console.log('remove');
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
                        window.location.href = "/cash-disbursement-journal";
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

function validateSave() {
    var validateStatus = false;
    var validateStatusCustomers = false;
    var validateStatusDate = false;
    var validateStatusReferenceDocument = false;
    var validateStatusSum = false;
    var sumCredit = $('#sumCredit').text();
    var sumDebit = $('#sumDebit').text();
    var customers = $('#customers').val();
    var date = $('#date').val();
    var referenceDocument = $('#referenceDocument').val();
    customers == '' ? ($('#invalid-customers').removeAttr('hidden'), validateStatusCustomers = false) : ($('#invalid-customers').hide(), validateStatusCustomers = true);
    date == '' ? ($('#invalid-date').removeAttr('hidden'), validateStatusDate = false) : ($('#invalid-date').hide(), validateStatusDate = true);
    referenceDocument == '' ? ($('#invalid-referenceDocument').removeAttr('hidden'), validateStatusReferenceDocument = false) : ($('#invalid-referenceDocument').hide(), validateStatusReferenceDocument = true);
    sumDebit != sumCredit ? ($('#invalid-sumDebitCredit').removeAttr('hidden'), validateStatusSum = false) : ($('#invalid-sumDebitCredit').hide(), validateStatusSum = true);

    // !validateStatusCustomers || !validateStatusDate || !validateStatusReferenceDocument || validateStatusSum ? (validateStatus = false, alert("false")) : (validateStatus = true, alert("true"));

    !validateStatusCustomers || !validateStatusDate || !validateStatusReferenceDocument || !validateStatusSum ? validateStatus = false : validateStatus = true;

    if (!validateStatus) {
        alert("ไม่สามารถบันทึกได้ เนื่องจากข้อมูลไม่ถูกต้องไม่ครบถ้วน \n" +
            "1.กรุณาระบุคำอธบิายรายการ\n" +
            "2.กรุณาตรวจสอบยอดเคดิต และเดบิต")
        return false;
    }
    return true;
}

function saveCreate() {
    var pass = true;
    var validate = validateSave();
    if (!validate) {
        return;
    }
    $.ajax({
        type: "GET",
        url: "/api-journal/generate-dep/PV",
        success: function (msg) {
            if (pass) {
                var insert = {
                    id: $('#id').val(), //ลูกค้า
                    companyId: $('#customers').val(), //ลูกค้า
                    documentCode: msg, //เลขที่เอกสาร
                    type: "PV", //ประเภท
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
                        window.location.href = "/cash-disbursement-journal";
                    }
                });
            }
        }
    })

}