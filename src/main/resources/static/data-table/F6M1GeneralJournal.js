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

    dataCustomer(null);
    tableCreateQuotationDisplay1(null);

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

}); // end Document

var tablegeneraJournal

function tableCreateQuotationDisplay1(id) {
    tablegeneraJournal = $('#tablegeneraJournalDisplay').DataTable({
        lengthChange: false,
        "paging": false,
        searching: false,
        responsive: true,
        "bDestroy": true,
        // "sAjaxSource": "/api-f2/get-f2ListRepo-by-id/" + id,
        "bAutoWidth": false,
        "sAjaxDataProp": "",
        "aoColumns": [{
                'data': '',
                "sWidth": "20%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number2" style="width: 100%;height: 7mm" type="text" name="" id="' +
                        index.row +
                        '" value=""/>';
                }
            },
            {
                'data': '',
                "sWidth": "50%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control" style="width: 100%;height: 7mm" type="text" name="" id=" value="">'
                }
            },
            {
                'data': '',
                "sWidth": "13%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="" id="' +
                        index.row +
                        '" value=""/>';
                }
            },
            {
                'data': '',
                "sWidth": "13%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="" id="' +
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

    $('#tablegeneraJournalDisplay').on('click', 'a', function () {
        tablegeneraJournal.row($(this).parents('tr')).remove().draw();
    }); // end table
}

function Add() {
    tablegeneraJournal.row.add([tablegeneraJournal.data]).draw(false);
}

function remove() {
    tablegeneraJournal.rows('.selected').remove().draw();
}

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