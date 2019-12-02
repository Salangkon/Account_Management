$('#datepicker').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#datepicker1').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#date').datepicker({
    uiLibrary: 'bootstrap4'
});
$('#dateEnd').datepicker({
    uiLibrary: 'bootstrap4'
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
    // document.getElementById('date').value = today;

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
    var tableQuotation = $('#tableQuotation').DataTable({
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

    var tableCreateQuotation = $('#tableCreateQuotationDisplay').DataTable({
        lengthChange: false,
        searching: false,
        responsive: true,
        // lengthChange: false,
        // dom: 'lrtip',
        "bAutoWidth": false,
        "sAjaxDataProp": "",
        "aoColumns": [{
                "mData": "companyId",
                className: 'select-checkbox',
                "mRender": function (data,
                    type, row, index) {
                    return '';
                }
            },
            {
                "mData": "",
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
                    return '<div style="text-align:center"><a class="fas fa-trash" style="cursor: pointer;"></a></div>';
                }
            }
        ]
    });

    $('#tableCreateQuotationDisplay').on('click', 'a', function () {
        tableCreateQuotation.row($(this).parents('tr')).remove().draw();
        // var num = $('#tableCreateQuotation').DataTable().rows().data().length;

        // set allowenceSumTotal
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
    });

    $('#Add').click(function () {
        tableCreateQuotation.row.add([tableCreateQuotation.data]).draw(false);
    });
    $('#tableCreateQuotationDisplay').on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });
    $('#remove').click(function () {
        tableCreateQuotation.rows('.selected').remove().draw();
    });

    $('#saveCreateQuotation').click(function () {
        
        var insertQuotation = {
            customersId: $('#customers').val(), //ลูกค้า
            departmentId: $('#departmentId').val(), //เลขที่เอกสาร
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
    });

}); // end document