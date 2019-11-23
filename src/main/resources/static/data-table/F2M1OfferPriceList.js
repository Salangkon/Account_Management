$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker1').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker2').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker3').datepicker({
    uiLibrary: 'bootstrap4'
});

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}

$('#example1').on('keyup', 'input', function () {
    var sum1 = $(this).parent().parent().find('td')[4];
    var number1 = $(this).parent().parent().find('td')[2];
    var number2 = $(this).parent().parent().find('td')[3];

    var num1 = $(number1).find('input.number1').val();
    var num2 = $(number2).find('input.number2').val();

    if ('' != num1 && '' != num2) {
        var total = (num1) * (num2);
        $(sum1).find('input').val(total);
    } else {
        $(sum1).find('input').val(0);
    }

    // set allowenceSumTotal
    var sumvalues = $("[name='rentDateSum']");
    var sum = 0;
    for (var i = 0; i < sumvalues.length; i++) {
        if ($(sumvalues[i]).val() != "") {
            sum = sum + parseFloat($(sumvalues[i]).val());
        }
    }
    $('#rentDateSumTotal').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/ );
});


$(document).ready(function () {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    document.getElementById('datepicker2').value = today;

    //data customer
    $.ajax({
        type: "GET",
        url: "/api/customers-list",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // console.log("customer list :: " + JSON.stringify(msg))
            for (var i = 0; i < msg.length; i++) {
                $('#customers').append('<option value="' + msg[i].companyId + '">' + msg[i].companyName + '</option>');
            }
        }
    });
    $('#customers').change(function () {
        console.log($('#customers').val());
        if ($('#customers').val() != "") {
            $.ajax({
                type: "GET",
                url: "/api/customers-list/" + $('#customers').val(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    console.log("customer :: " + JSON.stringify(msg))
                    $('#address').val(msg.address);
                    $('#taxId').val(msg.taxId);
                    if (msg.officeType == 1) {
                        document.getElementById("officeType1").checked = true;
                    } else {
                        document.getElementById("officeType2").checked = true;
                    }
                }
            });
        } else {
            $('#address').val("");
            $('#taxId').val("");
            document.getElementById("officeType1").checked = false;
            document.getElementById("officeType2").checked = false;
        }
    });
    // table seve offer price
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
        "aoColumns": [{
                sWidth: "5px",
            },
            {
                sWidth: "60%",
            },
            {
                sWidth: "10%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="allowence' +
                        index.row +
                        '" value=""/>';
                }
            },
            {
                sWidth: "10%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="allowence' +
                        index.row +
                        '" value=""/>';
                }
            },
            {
                "mData": "rentDateSum",
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control sum1" style="width: 120px;height: 7mm;text-align: center" type="text" name="rentDateSum" id="rentDateSum' +
                        index.row +
                        '" disabled/>';
                }
            },
            {
                "mData": "",
                "sWidth": "5px",
                "mRender": function (data,
                    type, row, index) {
                    return '<div style="text-align:center"><a class="fas fa-trash" style="cursor: pointer;"></a></div>';
                }
            }
        ]
    });


    $('#example1').on('click', 'a', function () {
        tableSelect.row($(this).parents('tr')).remove().draw();
        var num = $('#example1').DataTable().rows().data().length;
        counter--;
        // set allowenceSumTotal
        var sumvalues = $("[name='rentDateSum']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        $('#rentDateSumTotal').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/ );
    });
    // counter column
    var counter = 1;
    $('#Add').click(function () {
        tableSelect.row.add([
            '<div style="text-align: center">' + counter + '</div>',
            '<div><input type="text" style="width: 100%;"></div>',
            '',
            '',
            // '<div><input class="number1" type="number" style="text-align: center;"></div>',
            // '<div><input class="number2" type="number" style="text-align: center;"></div>',
            '',
            '',
        ]).draw(false);
        counter++;
    });

});