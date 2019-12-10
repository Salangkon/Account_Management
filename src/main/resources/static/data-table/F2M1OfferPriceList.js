$('#fromDate').datepicker({
	uiLibrary: 'bootstrap4',
	format:'yyyy-mm-dd',
	startDate: '-3d'
});
$('#toDate').datepicker({
	uiLibrary: 'bootstrap4',
	format:'yyyy-mm-dd',
	startDate: '-3d'
});
$('#date').datepicker({
	uiLibrary: 'bootstrap4',
	format: 'yyyy-mm-dd',
    startDate: '-3d'
});
$('#dateEnd').datepicker({
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

var discountPrice = 0;
$('#tableCreateQuotationDisplay').on('keyup', 'input', function () {
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
    discountPrice = parseFloat(sum);
    $('#price').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/ );

    myFunction();
});

function myFunction() {
    var productPriceAll = 0;
    var discount = document.getElementById("discount").value;
    $('#discountPrice').text(parseFloat(discountPrice * discount / 100).toFixed(2));
    productPriceAll = discountPrice - (discountPrice * discount / 100)
    $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));

    var checkBox = document.getElementById("myCheck");
    // Get the output text
    if (checkBox.checked == true) {
        $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
        $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
    } else {
        $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
        $('#vat').text("00.00");
    }
}

// update status
function changeFunc($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    console.log(type, " :: ", id, " :: ", $i);
    switch (type) {
        case "0":
            updateStatus(id, "0");
            break;
        case "1":
            $('#myModal').modal('show');
            break;
        case "2":
            updateStatus(id, "2");
            break;
        case "3":
            updateStatus(id, "3");
            break;
    }
} // end update status

function updateStatus(id, status) {
    $.ajax({
        type: 'POST',
        url: '/api-f2/update-status/' + id + "/" + status,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/offer-price-list";
        }
    });
}

function searchDate() {
    var searchStatus = null;
    var fromDate = 0;
    var toDate = 0;
    if (document.getElementById('searchStatus').value != '') {
        searchStatus = document.getElementById('searchStatus').value;
    }
    if (document.getElementById('fromDate').value != '') {
        fromDate = document.getElementById('fromDate').value
    }
    if (document.getElementById('toDate').value != '') {
        toDate = document.getElementById('toDate').value;
    }

    $.ajax({
        type: "GET",
        url: "/api-f2/get-by/Quotation/" + searchStatus + "/" + fromDate + "/" + toDate,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // console.log("customer :: " + JSON.stringify(msg))
            // table seve offer price
            var tableQuotation = $('#tableQuotation').DataTable({
                paging: false,
                searching: false,
                "bDestroy": true,
                // "sAjaxSource": searchDate(),
                data: jQuery.parseJSON(JSON.stringify(msg)),
                "sAjaxDataProp": "",
                "aoColumns": [{
                        'data': 'date',
                        "className": "text-center",
                        "sWidth": "8%",
                    },
                    {
                        'data': 'departmentId',
                        "sWidth": "16%",
                    },
                    {
                        'data': 'companyId',
                        "sWidth": "40%",
                    },
                    {
                        'data': '',
                        "sWidth": "16%",
                        "mRender": function (data,
                            type, row, index, full) {
                            return row.productPriceAll.toFixed(2);
                        }
                    },
                    {
                        'data': '',
                        "className": "text-center",
                        "sWidth": "10%",
                        "mRender": function (data, type, row, index) {
                            if (row.status == 'รอพิจารณา') {
                                return '<p style="color: black">รอพิจารณา</p>';
                            } else if (row.status == 'ผ่านการตวจสอบ') {
                                return '<p style="color: green">ผ่านการตวจสอบ</p>';
                            } else if (row.status == 'ยกเลิก') {
                                return '<p style="color: red">ยกเลิก</p>';
                            }
                        }
                    },
                    {
                        'data': '',
                        "sWidth": "10%",
                        "mRender": function (data, type, row, index, full) {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)">\n\
                                    <option value="">ตัวเลือก</option/>\n\
                                    <option value="0' + row.id + '">รอพิจารณา</option/>\n\
                                    <option value="1' + row.id + '">อัพเดท</option/>\n\
                                    <option value="2' + row.id + '">ผ่านการตวจสอบ</option/>\n\
                                    <option value="3' + row.id + '">ยกเลิก</option/>\n\
                                </select>';
                        }
                    },
                ]
            }); // END tableQuotation
        }
    });
};

$(document).ready(function () {

    // วันปัจจุบัน
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
    var today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').value = today;

    searchDate();

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

    var tableCreateQuotation = $('#tableCreateQuotationDisplay').DataTable({
        lengthChange: false,
        searching: false,
        responsive: true,
        // lengthChange: false,
        // dom: 'lrtip',
        "bAutoWidth": false,
        "sAjaxDataProp": "",
        "aoColumns": [{
                "sWidth": "5%",
                "mRender": function (data,
                    type, row, index) {
                    index.row++;
                    return '<div style="text-align: center"> ' + index.row + '</div>';
                }
            }, {
                "sWidth": "60%",
                "mRender": function (data,
                    type, row, index) {
                    return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' +
                        index.row +
                        '" value=""/></div><div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า"></textarea></div>';
                }
            },
            {
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productNumber' +
                        index.row +
                        '" value="1"/>';
                }
            },
            {
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productPrice' +
                        index.row +
                        '" value=""/>';
                }
            },
            {
                "mData": "",
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    return '<input class="form-control sum1" style="width: 120px;height: 7mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                        index.row +
                        '" disabled/>';
                }
            },
            {
                "mData": "",
                "sWidth": "5px",
                "mRender": function (data,
                    type, row, index) {
                    return '<div style="text-align:center"><a class="fas fa-trash" style="cursor: pointer;color: red"></a></div>';
                }
            }
        ]
    });

    $('#tableCreateQuotationDisplay').on('click', 'a', function () {
        tableCreateQuotation.row($(this).parents('tr')).remove().draw();

        var sumvalues = $("[name='rentDateSum']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        discountPrice = parseFloat(sum);
        $('#price').text(parseFloat(sum).toFixed(2));

        var productPriceAll = 0;
        var discount = document.getElementById("discount").value;
        // console.log(discountPrice + " :: " + discount);
        $('#discountPrice').text(parseFloat(sum * discount / 100).toFixed(2));
        productPriceAll = discountPrice - (discountPrice * discount / 100)
        // console.log("discount :: " + sumAllPer);
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));

        var checkBox = document.getElementById("myCheck");
        // Get the output text
        if (checkBox.checked == true) {
            $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
            $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
            $('#vat').text("00.00");
        }
    }); // end table

    $('#Add').click(function () {
        tableCreateQuotation.row.add([tableCreateQuotation.data]).draw(false);
    });

    $('#remove').click(function () {
        tableCreateQuotation.rows('.selected').remove().draw();
    });

    $('#saveCreateQuotation').click(function () {
        var pass = true;
        pass = validateInput();

        console.log($('#date').val());
        if (pass) {
            var insertQuotation = {
                companyId: $('#customers').val(), //ลูกค้า
                departmentId: $('#departmentId').val(), //เลขที่เอกสาร
                type: $('#type').val(), //ประเภท
                status: $('#status').val(), //สถานะ
                price: $('#price').text(), //รวมเป็นเงิน
                productPriceAll: $('#productPriceAll').text(), //ราคาสินค้าทั้งหมด
                discount: $('#discount').val(), //ส่วนลด
                discountPrice: $('#discountPrice').text(), //ราคาหักส่วนลด
                discountProductPrice: $('#discountProductPrice').text(), //
                vat: $('#vat').text(), //ภาษีมูลค่าเพิ่ม
                note: $('#note').val(), //หมาบเหตุ
                // date: new Date($('#date').val()), //วันที่
                // dateEnd: new Date($('#dateEnd').val()), //วันที่_ครบกำหนด
                date: $('#date').val(), //วันที่
                dateEnd: $('#dateEnd').val(), //วันที่_ครบกำหนด
                f2ListModels: [],
            }
            var data = tableCreateQuotation.data();
            for (let i = 0; i < data.length; i++) {
                var d = {};
                d.product = $("#product" + i).val(); //สินค้า
                d.productDetail = $("#productDetail" + i).val(); //รายละเอียดสินค้า
                d.productNumber = $("#productNumber" + i).val(); //จำนวนสินค้า
                d.productPrice = $("#productPrice" + i).val(); //ราคาสินค้า
                d.productSumPrice = $("#productSumPrice" + i).val(); //รวมยอดสินค้า
                insertQuotation.f2ListModels.push(d)
            }
            console.log(JSON.stringify(insertQuotation));

            $.ajax({
                type: 'POST',
                url: '/api-f2/add-update',
                data: JSON.stringify(insertQuotation),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    window.location.href = "/offer-price-list";
                }
            });
        }
    }); // save

    // validate
    function validateInput() {
        var pass = true;

        if ('' == $('#dateEnd').val()) {
            dateEnd.focus()
            $('#error-dateEnd').removeClass("hide")
            pass = false;
        } else {
            $('#error-dateEnd').addClass("hide")
        }

        if ('' == $('#date').val()) {
            date.focus()
            $('#error-date').removeClass("hide")
            pass = false;
        } else {
            $('#error-date').addClass("hide")
        }

        if ('' == $('#customers').val()) {
            customers.focus()
            $('#error-customers').removeClass("hide")
            pass = false;
        } else {
            $('#error-customers').addClass("hide")
        }

        return pass;
    } // end validate

}); // end document