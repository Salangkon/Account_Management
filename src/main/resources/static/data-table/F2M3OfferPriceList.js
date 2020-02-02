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
$('#tableCreateTaxInvoiceDisplay').on('keyup', 'input', function () {
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
    $('#priceDisplay').text(parseFloat(sum).toFixed(2));
    myFunction();
});

$(document).ready(function () {

    tableTaxInvoice();
    dataCustomer(null);
    tableCreateTaxInvoice1(null);
}); // end document

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
    switch (type) {
        case "0":
            updateStatus(id, "0");
            break;
        case "2":
            updateStatus(id, "2");
            break;
        case "3":
            updateStatus(id, "3");
            break;
    }
} // end update status

// update Quotation
function updateQuotation(id, Receipt) {
    console.log("test :: ", id + Receipt);
    if (id == null || Receipt == "false") {
        Receipt = false;
    } else {
        Receipt = true;
    }
    if (Receipt) {
        document.getElementById("ReceiptFlg").style.display = "none";
        document.getElementById("ReceiptFlgDefault").style.display = "block";
        document.getElementById("saveReceiptFlg").style.display = "none";
        document.getElementById("saveReceiptFlgDefault").style.display = "block";
    } else {
        document.getElementById("ReceiptFlg").style.display = "block";
        document.getElementById("ReceiptFlgDefault").style.display = "none";
        document.getElementById("saveReceiptFlg").style.display = "block";
        document.getElementById("saveReceiptFlgDefault").style.display = "none";
    }
    if (id != null) {
        $.ajax({
            type: "GET",
            url: "/api-f2/get-by-id/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $('#id').val(msg.id), //เลขที่เอกสาร
                    $('#departmentId').val(msg.departmentId), //เลขที่เอกสาร
                    $('#status').val(msg.type), //สถานะ
                    $('#status').val(msg.status), //สถานะ
                    $('#price').text(msg.price), //รวมเป็นเงิน
                    $('#priceDisplay').text(msg.price);
                $('#productPriceAll').text(msg.productPriceAll), //ราคาสินค้าทั้งหมด
                    $('#discount').val(msg.discount), //ส่วนลด
                    $('#discountPrice').text(msg.discountPrice), //ราคาหักส่วนลด
                    $('#discountProductPrice').text(msg.discountProductPrice), //
                    $('#vat').text(msg.vat), //ภาษีมูลค่าเพิ่ม
                    $('#note').val(msg.note), //หมาบเหตุ
                    $('#date').val(msg.date), //วันที่
                    $('#dateEnd').val(msg.dateEnd) //วันที่_ครบกำหนด
                if (msg.vat == null || msg.vat == 0) {
                    document.getElementById("myCheck").checked = false;
                } else {
                    document.getElementById("myCheck").checked = true;
                }
                dataCustomer(msg.companyId)
                tableCreateTaxInvoice1(msg.id);
            }
        })
    } else {
        tableCreateTaxInvoice1(null);
        dataCustomer(null)

        $('#id').val(""), //เลขที่เอกสาร
            $('#departmentId').val(""), //เลขที่เอกสาร
            $('#price').text(""), //รวมเป็นเงิน
            $('#priceDisplay').text("");
        $('#productPriceAll').text(""), //ราคาสินค้าทั้งหมด
            $('#discount').val(""), //ส่วนลด
            $('#discountPrice').text(""), //ราคาหักส่วนลด
            $('#discountProductPrice').text(""), //
            $('#vat').text(""), //ภาษีมูลค่าเพิ่ม
            $('#note').val(""), //หมาบเหตุ
            $('#date').val(document.getElementById('date').value), //วันที่
            $('#dateEnd').val("") //วันที่_ครบกำหนด
        document.getElementById("myCheck").checked = false;
    }
    $('#myModal').modal('show');
} // end update Quotation

function updateStatus(id, status) {
    $.ajax({
        type: 'POST',
        url: '/api-f2/update-status/' + id + "/" + status,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.location.href = "/tax-invoice-list";
        }
    });
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
                    $.ajax({
                        type: "GET",
                        url: "/api/customers-list/" + companyId,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            $('#customersPrint').text(msg.companyId);
                            $('#taxIdPrint').text("เลขประจำาตัวผู้เสียภาษี  " + msg.taxId);

                            $('#customers').val(msg.companyId);
                            $('#address').val(msg.address);
                            $('#taxId').val(msg.taxId);
                            if (msg.officeType == 1) {
                                $('#customersNamePrint').text(msg.customerName + " ( สำนักงานใหญ่ )");
                                document.getElementById("officeType1").checked = true;
                            } else {
                                $('#customersNamePrint').text(msg.customerName + " ( " + msg.department + " )");
                                document.getElementById("officeType2").checked = true;
                            }
                        }
                    });
                }
            } else {
                $('#customers').val("");
                $('#address').val("");
                $('#taxId').val("");
                document.getElementById("officeType1").checked = false;
                document.getElementById("officeType2").checked = false;
                for (var i = 0; i < msg.length; i++) {
                    $('#customers').append('<option value="' + msg[i].companyId + '">' + msg[i].companyName + '</option>');
                }
                $('#customers').change(function () {
                    if ($('#customers').val() != "") {
                        $.ajax({
                            type: "GET",
                            url: "/api/customers-list/" + $('#customers').val(),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
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
            }
        }
    });
}

var tableCreateQuotation

function tableCreateTaxInvoice1(id) {
    tableCreateTaxInvoice = $('#tableCreateTaxInvoiceDisplay').DataTable({
        lengthChange: false,
        searching: false,
        responsive: true,
        "bDestroy": true,
        "sAjaxSource": "/api-f2/get-f2ListRepo-by-id/" + id,
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
                    if (row.product != null && row.productDetail != null) {
                        return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value="' + row.product + '"/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า">' + row.productDetail + ' </textarea></div>';
                    } else if (row.product != null) {
                        return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value="' + row.product + '"/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า"></textarea></div>';
                    } else if (row.productDetail != null) {
                        return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value=""/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า">' + row.productDetail + '</textarea></div>';
                    } else {
                        return '<div><input class="form-control" style="height: 7mm" type="text" name="" id="product' + index.row + '" value=""/></div>\n\
                        <div><textarea class="form-control" id="productDetail' + index.row + '" style="height: 40px" placeholder="เพิ่มรายละเอียดสินค้า"></textarea></div>';
                    }

                }
            },
            {
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    if (row.productNumber != null) {
                        return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productNumber' +
                            index.row +
                            '" value="' + row.productNumber + '"/>';
                    } else {
                        return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productNumber' +
                            index.row +
                            '" value="1"/>';
                    }
                }
            },
            {
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    if (row.productPrice != null) {
                        return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productPrice' +
                            index.row +
                            '" value="' + row.productPrice + '"/>';
                    } else {
                        return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 7mm" type="text" name="allowence" id="productPrice' +
                            index.row +
                            '" value=""/>';
                    }
                }
            },
            {
                "mData": "",
                "sWidth": "10%",
                "mRender": function (data,
                    type, row, index) {
                    if (row.productSumPrice != null) {
                        return '<input class="form-control sum1" style="width: 120px;height: 7mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                            index.row +
                            '" value="' + row.productSumPrice + '" disabled/>';
                    } else {
                        return '<input class="form-control sum1" style="width: 120px;height: 7mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                            index.row +
                            '" value="" disabled/>';
                    }
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

    $('#tableCreateTaxInvoiceDisplay').on('click', 'a', function () {
        tableCreateTaxInvoice.row($(this).parents('tr')).remove().draw();

        var sumvalues = $("[name='rentDateSum']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        discountPrice = parseFloat(sum);
        $('#price').text(parseFloat(sum).toFixed(2));
        $('#priceDisplay').text(parseFloat(sum).toFixed(2));
        var productPriceAll = 0;
        var discount = document.getElementById("discount").value;
        $('#discountPrice').text(parseFloat(sum * discount / 100).toFixed(2));
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
    }); // end table
}

function Add() {
    tableCreateTaxInvoice.row.add([tableCreateTaxInvoice.data]).draw(false);
}

function remove() {
    tableCreateTaxInvoice.rows('.selected').remove().draw();
}

function saveCreateQuotation() {
    var pass = true;
    pass = validateInput();

    if (pass) {
        var insertTaxInvoice = {
            id: $('#id').val(), //ลูกค้า
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
            date: $('#date').val(), //วันที่
            dateEnd: $('#dateEnd').val(), //วันที่_ครบกำหนด
            f2ListModels: [],
        }
        var data = tableCreateTaxInvoice.data();
        for (let i = 0; i < data.length; i++) {
            var d = {};
            d.product = $("#product" + i).val(); //สินค้า
            d.productDetail = $("#productDetail" + i).val(); //รายละเอียดสินค้า
            d.productNumber = $("#productNumber" + i).val(); //จำนวนสินค้า
            d.productPrice = $("#productPrice" + i).val(); //ราคาสินค้า
            d.productSumPrice = $("#productSumPrice" + i).val(); //รวมยอดสินค้า
            insertTaxInvoice.f2ListModels.push(d)
        }

        console.log(JSON.stringify(insertTaxInvoice));

        $.ajax({
            type: 'POST',
            url: '/api-f2/add-update',
            data: JSON.stringify(insertTaxInvoice),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.location.href = "/tax-invoice-list";
            }
        });
    }
}

function saveCreateQuotationReceipt() {
    var pass = true;
    pass = validateInput();

    if (pass) {
        var insertTaxInvoice = {
            // id: $('#id').val(), //ลูกค้า
            companyId: $('#customers').val(), //ลูกค้า
            departmentId: $('#departmentId').val(), //เลขที่เอกสาร
            type: "Receipt", //ประเภท
            status: "รอพิจารณา", //สถานะ
            price: $('#price').text(), //รวมเป็นเงิน
            productPriceAll: $('#productPriceAll').text(), //ราคาสินค้าทั้งหมด
            discount: $('#discount').val(), //ส่วนลด
            discountPrice: $('#discountPrice').text(), //ราคาหักส่วนลด
            discountProductPrice: $('#discountProductPrice').text(), //
            vat: $('#vat').text(), //ภาษีมูลค่าเพิ่ม
            note: $('#note').val(), //หมาบเหตุ
            date: $('#date').val(), //วันที่
            dateEnd: $('#dateEnd').val(), //วันที่_ครบกำหนด
            f2ListModels: [],
        }
        var data = tableCreateTaxInvoice.data();
        for (let i = 0; i < data.length; i++) {
            var d = {};
            d.product = $("#product" + i).val(); //สินค้า
            d.productDetail = $("#productDetail" + i).val(); //รายละเอียดสินค้า
            d.productNumber = $("#productNumber" + i).val(); //จำนวนสินค้า
            d.productPrice = $("#productPrice" + i).val(); //ราคาสินค้า
            d.productSumPrice = $("#productSumPrice" + i).val(); //รวมยอดสินค้า
            insertTaxInvoice.f2ListModels.push(d)
        }

        console.log(JSON.stringify(insertTaxInvoice));

        $.ajax({
            type: 'POST',
            url: '/api-f2/add-update',
            data: JSON.stringify(insertTaxInvoice),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.location.href = "/receipt-list";
            }
        });
    }
}

function tableTaxInvoice() {
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
        url: "/api-f2/get-by/TaxInvoice/" + searchStatus + "/" + fromDate + "/" + toDate,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // table seve offer price
            var tableTaxInvoice = $('#tableTaxInvoice').DataTable({
                paging: false,
                searching: false,
                "bDestroy": true,
                // "sAjaxSource": searchDate(),
                data: jQuery.parseJSON(JSON.stringify(msg)),
                "sAjaxDataProp": "",
                "order": [
                    [0, "desc"]
                ],
                "aoColumns": [{
                        'data': 'updateDate',
                        "className": "text-center",
                        "sWidth": "8%",
                        "mRender": function (data,
                            type, row, index, full) {
                            return row.date;
                        }
                    },
                    {
                        'data': 'departmentId',
                        "sWidth": "13%",
                    },
                    {
                        'data': 'companyId',
                        "sWidth": "40%",
                    },
                    {
                        'data': '',
                        "sWidth": "13%",
                        "mRender": function (data,
                            type, row, index, full) {
                            return row.productPriceAll.toFixed(2);
                        }
                    },
                    {
                        'data': '',
                        "className": "text-center",
                        "sWidth": "13%",
                        "mRender": function (data, type, row, index, full) {
                            if (row.status == 'รอพิจารณา') {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                                    <option value="0' + row.id + '" style="color: black">รอพิจารณา</option/>\n\
                                    <option value="2' + row.id + '" style="color: black">ผ่านการตวจสอบ</option/>\n\
                                    <option value="3' + row.id + '" style="color: black">ยกเลิก</option/>\n\
                                    </select>';
                            } else if (row.status == 'ผ่านการตวจสอบ') {
                                return '<label style="color: green">ผ่านการตวจสอบ</label>';
                            } else if (row.status == 'ยกเลิก') {
                                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: red">\n\
                                    <option value="3' + row.id + '" style="color: black">ยกเลิก</option/>\n\
                                    <option value="0' + row.id + '" style="color: black">คืนสภาพ</option/>\n\
                                    </select>';
                            }
                        }
                    },
                    {
                        'data': '',
                        "className": "text-center",
                        "sWidth": "13%",
                        "mRender": function (data, type, full) {
                            if (full.status == 'ยกเลิก') {
                                return '<button hidden type="button" class="btn btn-warning btn-sm" onclick="updateQuotation(' + "'" + full.id + "','" + false + "'" + ')"><i  class="fas fa-edit"></i></button>\n\
                                       <button type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.id + "'" + ')"><i class="fas fa-trash"></i></button></div>\n\
                                       <button hidden type="button" class="btn btn-primary btn-sm" onclick="><i  class="fas fa-print"></i></button></div>';
                            } else if (full.status == 'ผ่านการตวจสอบ') {
                                return '<button hidden type="button" class="btn btn-warning btn-sm" onclick="updateQuotation(' + "'" + full.id + "','" + false + "'" + ')"><i class="fas fa-edit"></i></button>\n\
                                <button hidden type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.id + "'" + ')><i  class="fas fa-trash"></i></button></div>\n\
                                <button type="button" class="btn btn-primary btn-sm" onclick="printPDF(' + "'" + full.id + "'" + ')" data-toggle="modal" data-target="#MyModalPrintPDF"><i class="fas fa-print"></i></button></div>\n\
                                <button type="button" class="btn btn-info btn-sm" onclick="updateQuotation(' + "'" + full.id + "','" + true + "'" + ')">ใบเสร็จรับเงิน</button></div>';
                            } else if (full.status == 'รอพิจารณา') {
                                return '<button type="button" class="btn btn-warning btn-sm" onclick="updateQuotation(' + "'" + full.id + "','" + false + "'" + ')""><i class="fas fa-edit"></i></button>\n\
                                <button hidden type="button" class="btn btn-danger btn-sm" onclick="deleteId(' + "'" + full.id + "'" + ')><i  class="fas fa-trash"></i></button></div>\n\
                                <button hidden type="button" class="btn btn-primary btn-sm" onclick="><i  class="fas fa-print"></i></button></div>';
                            }
                        }
                    }
                ]
            });
        }
    });
}; // END tableTaxInvoice

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
                url: '/api-f2/delete-f2/' + id,
                type: 'DELETE',
                success: function (result) {
                    if (result == "Success") {
                        window.location.href = "/tax-invoice-list";
                    } else {
                        alert("Delete Fail!!!");
                    }
                }
            });
        });
} //end delete

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