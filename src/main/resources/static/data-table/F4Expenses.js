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
var discountFlg;
$('#tableCreateQuotationDisplay').on('keyup', 'input', function () {
    var sum1 = $(this).parent().parent().find('td')[5];
    var number1 = $(this).parent().parent().find('td')[3];
    var number2 = $(this).parent().parent().find('td')[4];

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
    $('#price').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/);
    $('#priceDisplay').text(parseFloat(sum).toFixed(2));

    discountPrice1 = parseFloat(sum);
    $('#price1').text(parseFloat(sum).toFixed(2) /*.replace("," ,"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")*/);
    $('#priceDisplay1').text(parseFloat(sum).toFixed(2));

    var discount = document.getElementById("discount").value;
    if (discount == '') {
        document.getElementById("discount").value = 0;
    }
    if (discountFlg = '') {
        discountFlg = '1';
    }
    myFunction();
});

$(document).ready(function () {
    $('#myModal').on('hidden.bs.modal', function (e) {
        tableQuotation();
    })
    $('#MyModalPrintPDF').on('hidden.bs.modal', function (e) {
        tableQuotation();
    })
    tableQuotation();
    // dataCustomer(null);
    tableCreateQuotationDisplay1(null);
    getSeleteChartAccountItem();
    $('.selectpicker').selectpicker();
}); // end document

function myDiscountFlg(flg) {
    console.log("discountFlg: " + flg);
    if (flg == "1") {
        var discount = document.getElementById("discount").value;
        if (discount == '') {
            document.getElementById("discount").value = '';
        }
        document.getElementById("discountFlgT").hidden = true;
        document.getElementById("discountFlgF").hidden = false;
        discountFlg = "1";
    } else {
        var discount = document.getElementById("discount").value;
        if (discount == '') {
            document.getElementById("discount").value = '';
        }
        document.getElementById("discountFlgT").hidden = false;
        document.getElementById("discountFlgF").hidden = true;
        discountFlg = "2";
    }
    myFunction();
}

function myDiscountFlg1(flg) {
    console.log("discountFlg1: " + flg);
    if (flg == "1") {
        var discount = document.getElementById("discount").value;
        if (discount == '') {
            document.getElementById("discount").value = '';
        }
        document.getElementById("discountFlgT1").hidden = true;
        document.getElementById("discountFlgF1").hidden = false;
        discountFlg = "1";
    } else {
        var discount = document.getElementById("discount").value;
        if (discount == '') {
            document.getElementById("discount").value = '';
        }
        document.getElementById("discountFlgT1").hidden = false;
        document.getElementById("discountFlgF1").hidden = true;
        discountFlg = "2";
    }
    myFunction();
}

var expense_dropdownItem = [];

function getSeleteChartAccountItem() {
    $.ajax({
        type: "GET",
        url: "/api-expense/get-dropdown",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            expense_dropdownItem = msg;
        }
    });
}

function myFunction() {
    // ไม่รวมภาษี
    var productPriceAll = 0;
    var discount = document.getElementById("discount").value;
    console.log("discount:" + discount);
    console.log("discountPrice T :" + discountFlg);
    if (discountFlg == '1') {
        if (discount == "") {
            discount = 0;
        }
        $('#discountPrice').text(parseFloat(discount).toFixed(2));
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));
        productPriceAll = discountPrice - discount;
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));
        $('#discountProductPriceSum').text(parseFloat(productPriceAll).toFixed(2));
        var checkBox1 = document.getElementById("myCheck1");
        // Get the output text
        if (checkBox1.checked == true) {
            $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
            $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
            $('#vat').text("00.00");
        }
    } else {
        $('#discountPrice').text(parseFloat(discountPrice * discount / 100).toFixed(2));
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));
        productPriceAll = discountPrice - (discountPrice * discount / 100)
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));
        $('#discountProductPriceSum').text(parseFloat(productPriceAll).toFixed(2));
        var checkBox1 = document.getElementById("myCheck1");
        // Get the output text
        if (checkBox1.checked == true) {
            $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
            $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
            $('#vat').text("00.00");
        }
    }
    // รวมภาษี
    var productPriceAll1 = 0;
    var discount1 = document.getElementById("discount1").value;
    console.log("price1: " + $('#price1').text());
    console.log("discount1: " + discount1);
    if ($('#price1').text() != 0) {
        if (discountFlg == '1') {
            if (discount1 == "") {
                discount1 = 0;
            }
            $('#discountPrice1').text(parseFloat(discount1).toFixed(2));
            productPriceAll1 = discountPrice1 - discount1;
            $('#discountProductPrice1').text(parseFloat(productPriceAll1).toFixed(2));
            $('#discountProductPriceSum1').text(parseFloat(productPriceAll1).toFixed(2));
            var checkBox2 = document.getElementById("myCheck2");
            // Get the output text
            if (checkBox2.checked == true) {
                $('#productPriceAll1').text(parseFloat(productPriceAll1 - (productPriceAll1 * 7 / 100)).toFixed(2));
                $('#vat1').text(parseFloat(productPriceAll1 * 7 / 100).toFixed(2));
            } else {
                $('#productPriceAll1').text(parseFloat(productPriceAll1).toFixed(2));
                $('#vat1').text("00.00");
            }
        } else {
            $('#discountPrice1').text(parseFloat(discountPrice1 * discount1 / 100).toFixed(2));
            productPriceAll1 = discountPrice1 - (discountPrice1 * discount1 / 100)
            $('#discountProductPrice1').text(parseFloat(productPriceAll1).toFixed(2));
            $('#discountProductPriceSum1').text(parseFloat(productPriceAll1).toFixed(2));
            var checkBox2 = document.getElementById("myCheck2");
            // Get the output text
            if (checkBox2.checked == true) {
                $('#productPriceAll1').text(parseFloat(productPriceAll1 - (productPriceAll1 * 7 / 100)).toFixed(2));
                $('#vat1').text(parseFloat(productPriceAll1 * 7 / 100).toFixed(2));
            } else {
                $('#productPriceAll1').text(parseFloat(productPriceAll1).toFixed(2));
                $('#vat1').text("00.00");
            }
        }
    }
}
// update status vat
function statusVatFlg($i) {
    switch ($i) {
        case "1":
            document.getElementById("statusVat2").hidden = true;
            document.getElementById("statusVat1").hidden = false;
            break;
        case "2":
            document.getElementById("statusVat1").hidden = true;
            document.getElementById("statusVat2").hidden = false;
            break;
    }
    if (discountFlg == '') {
        discountFlg = '1';
    }
    myDiscountFlg(discountFlg);
    myDiscountFlg1(discountFlg);
} // end update status vat

// update status
function changeFunc($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    switch (type) {
        case "0":
            updateStatus(id, "0");
            break;
        case "6":
            updateStatus(id, "6");
            break;
        case "7":
            updateStatus(id, "7");
            break;
        // case "4":
        //     $('#myModal').modal('show');
        //     break;
    }
} // end update status

var fileFlg = true;
// update Quotation
function updateQuotation(id, expensesFlg) {
    console.log("expenses flg :: " + expensesFlg);
    if (expensesFlg == "expensesFlg") {
        document.getElementById("saveExpensesFlg").hidden = true;
        fileFlg = true;
    } else {
        document.getElementById("saveExpensesFlg").hidden = false;
        fileFlg = false;
    }
    if (id != null) {
        $.ajax({
            type: "GET",
            url: "/api-f2/get-by-id/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                getFile(msg.departmentId);

                $('#id').val(msg.id); //เลขที่เอกสาร
                $('#departmentId').val(msg.departmentId); //เลขที่เอกสาร
                $('#status').val(msg.type); //สถานะ
                $('#status').val(msg.status); //สถานะ
                $('#statusVat').val(msg.statusVat); //สถานะ ภาษี

                //ข้อมูลลูกค้า
                $('#customers').val(msg.customerName); //ชื่อบริษัทลูกค้า
                $('#departmentPass').val(msg.departmentPass); //รหัสสาขา
                $('#departmentName').val(msg.departmentName); //ชื่อสาขา
                $('#address').val(msg.address);
                $('#taxId').val(msg.taxId); //ที่อยู่

                // ไม่รวมภาษี
                $('#discount').val(msg.discount); //ส่วนลด
                $('#price').text(parseFloat(msg.price).toFixed(2)); //รวมเป็นเงิน
                $('#priceDisplay').text(parseFloat(msg.price).toFixed(2)); //รวมเป็นเงิน
                $('#productPriceAll').text(parseFloat(msg.productPriceAll).toFixed(2)); //ราคาสินค้าทั้งหมด
                $('#discountPrice').text(parseFloat(msg.discountPrice).toFixed(2)); //ราคาหักส่วนลด
                $('#discountProductPrice').text(parseFloat(msg.discountProductPrice).toFixed(2)); //
                $('#vat').text(parseFloat(msg.vat).toFixed(2)); //ภาษีมูลค่าเพิ่ม

                // รวมภาษี
                $('#discount1').val(msg.discount1); //ส่วนลด
                $('#price1').text(parseFloat(msg.price1).toFixed(2)); //รวมเป็นเงิน
                $('#priceDisplay1').text(parseFloat(msg.price1).toFixed(2)); //รวมเป็นเงิน
                $('#productPriceAll1').text(parseFloat(msg.productPriceAll1).toFixed(2)); //ราคาสินค้าทั้งหมด
                $('#discountPrice1').text(parseFloat(msg.discountPrice1).toFixed(2)); //ราคาหักส่วนลด
                $('#discountProductPrice1').text(parseFloat(msg.discountProductPrice1).toFixed(2)); //
                $('#discountProductPriceSum1').text(parseFloat(msg.discountProductPrice1).toFixed(2)); //
                $('#vat1').text(parseFloat(msg.vat1).toFixed(2)); //ภาษีมูลค่าเพิ่ม

                $('#note').val(msg.note); //หมาบเหตุ
                $('#date').val(msg.date); //วันที่
                $('#dateEnd').val(msg.dateEnd); //วันที่_ครบกำหนด
                $('#referenceDocument').val(msg.referenceDocument); //เลขที่เอกสาร
                $('#statusVat').val(msg.statusVat)
                if (msg.statusVat == 1) {
                    document.getElementById("statusVat1").hidden = false;
                    document.getElementById("statusVat2").hidden = true;
                } else {
                    document.getElementById("statusVat1").hidden = true;
                    document.getElementById("statusVat2").hidden = false;
                }
                if (msg.officeType == 1) {
                    document.getElementById("officeType1").checked = true;
                    CheckOffice("1");
                } else {
                    document.getElementById("officeType2").checked = true;
                    CheckOffice("2");
                }
                if (msg.discountFlg == "1") {
                    document.getElementById("discountFlgT").hidden = true;
                    document.getElementById("discountFlgF").hidden = false;
                    document.getElementById("discountFlgT1").hidden = true;
                    document.getElementById("discountFlgF1").hidden = false;
                } else {
                    document.getElementById("discountFlgT").hidden = false;
                    document.getElementById("discountFlgF").hidden = true;
                    document.getElementById("discountFlgT1").hidden = false;
                    document.getElementById("discountFlgF1").hidden = true;
                }
                switch (msg.vat) {
                    case 0:
                        document.getElementById("myCheck1").checked = false;
                        break;
                    default:
                        document.getElementById("myCheck1").checked = true;
                        break;
                }
                switch (msg.vat1) {
                    case 0:
                        document.getElementById("myCheck2").checked = false;
                        break;
                    default:
                        document.getElementById("myCheck2").checked = true;
                        break;
                }

                // dataCustomer(msg.companyId)
                tableCreateQuotationDisplay1(msg.id);

            }
        })
    } else {
        genDepartment();
        tableCreateQuotationDisplay1(null);
        dataCustomer(null);

        $('#id').val(""); //เลขที่เอกสาร
        // $('#departmentId').val(""); //เลขที่เอกสาร
        $('#price').text(""); //รวมเป็นเงิน
        $('#priceDisplay').text(""); //รวมเป็นเงิน
        $('#productPriceAll').text(""); //ราคาสินค้าทั้งหมด
        $('#discount').val(""); //ส่วนลด
        $('#discountPrice').text(""); //ราคาหักส่วนลด
        $('#discountProductPrice').text(""); //
        $('#vat').text(""); //ภาษีมูลค่าเพิ่ม
        $('#note').val(""); //หมาบเหตุ
        $('#date').val(document.getElementById('date').value); //วันที่
        $('#dateEnd').val(""); //วันที่_ครบกำหนด
        $('#referenceDocument').val(""); //เลขที่เอกสาร
        $('#statusVat').val("1")
        document.getElementById("statusVat2").hidden = true;

        //ข้อมูลลูกค้า
        $('#customers').val(""); //ชื่อบริษัทลูกค้า
        $('#departmentPass').val("");//รหัสสาขา
        $('#departmentName').val(""); //ชื่อสาขา
        $('#officeType').val(""); //สาขา
        $('#address').val(""); //ที่อยู่
        $('#taxId').val(""); //ที่อยู่

        // ไม่รวมภาษี
        $('#discount').val(); //ส่วนลด
        $('#discountPrice').text(parseFloat(0).toFixed(2));
        $('#discountProductPrice').text(parseFloat(0).toFixed(2));
        $('#vat').text(parseFloat(0).toFixed(2));
        $('#price').text(parseFloat(0).toFixed(2));
        $('#productPriceAll').text(parseFloat(0).toFixed(2));
        // รวมภาษี
        $('#discount1').val(); //ส่วนลด
        $('#discountPrice1').text(parseFloat(0).toFixed(2));
        $('#discountProductPrice1').text(parseFloat(0).toFixed(2));
        $('#discountProductPriceSum1').text(parseFloat(0).toFixed(2)); //
        $('#vat1').text(parseFloat(0).toFixed(2));
        $('#price1').text(parseFloat(0).toFixed(2));
        $('#productPriceAll1').text(parseFloat(0).toFixed(2));

        discountFlg = "1";
        document.getElementById("discountFlgT").hidden = false;
        document.getElementById("discountFlgF").hidden = true;
        document.getElementById("discountFlgT1").hidden = false;
        document.getElementById("discountFlgF1").hidden = true;
        
        CheckOffice("1");
        document.getElementById("myCheck1").checked = true;
        document.getElementById("myCheck2").checked = true;
    }
    $('#myModal').modal('show');
} // end update Quotation

function setSelectpicker(msg) {
    $('.selectpicker').selectpicker();
    for (let index = 0; index < msg.length; index++) {
        $('#groupExpense' + index).val(msg[index].groupExpense);
        $('#groupExpense' + index).selectpicker('refresh');
    }
}

var directoryFlg;
function genDepartment() {
    $.ajax({
        type: "GET",
        url: "/api-f2/generate-dep/E",
        success: function (msg) {
            console.log("dd" + msg)
            $('#departmentId').val(msg) //เลขที่เอกสาร
            AddFolder(msg);
            directoryFlg = msg;
        }
    })
}

//////////////////////////////START UPLOAD FILE///////////////////////////////////////
function AddFolder(createFolder) {
    console.log(createFolder);
    $.ajax({
        url: '/create-directory/' + createFolder + "/" + $('#createBy').val(),
        type: 'GET',
        success: function (result) {
            getFile(createFolder);
        }
    });
}
var setFile;
function getFile(id) {
    setFile = id;
    console.log("Get File :: " + id);
    if (id == null) {
        filesDataTable("");
    } else {
        $.ajax({
            type: "GET",
            url: "/file-by/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                filesDataTable(msg);
                console.log(JSON.stringify(msg));
            }
        });
    }
}
function filesDataTable(data) {
    $('#filesDataTableDisplay').empty().append("");;
    var filesDataTable = [];
    if (data != "") {
        var i = 0;
        data.forEach(value => {
            i++;
            if (fileFlg) {
                document.getElementById("fileBrowseFlg").hidden = true;
                filesDataTable.push('<div class="fa fa-download" style="cursor: pointer;color: blue" onclick="getDownload(' + "'" + value.id + "'" + ')"></div> ' + i + ". " + value.name + '<br>');
            } else {
                document.getElementById("fileBrowseFlg").hidden = false;
                filesDataTable.push('<div class="fa fa-download" style="cursor: pointer;color: blue" onclick="getDownload(' + "'" + value.id + "'" + ')"></div><div class="fas fa-trash-alt" style="cursor: pointer;color: red" onclick="deleteFile(' + "'" + value.id + "'" + ')"></div> ' + i + ". " + value.name + '<br>');
            }
        });
        $('#filesDataTableDisplay').append(filesDataTable);
    } else {
        document.getElementById("fileBrowseFlg").hidden = false;
    }
}
function getDownload(id) {
    window.open("http://localhost:8080/download/" + id)
}
function deleteFile(id) {
    $.ajax({
        url: '/delete-file/' + id,
        type: 'DELETE',
        success: function (result) {
            if (result) {
                getFile(setFile);
                console.log("Delete Success");
            } else {
                alert("Delete Fail!!!");
            }
        }
    });
}
var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
$(document).on("click", ".browse", function () {
    var file = $(this).parents().find(".file");
    file.trigger("click");
});
$('input[type="file"]').change(function (event) {
    var input = event.target;
    var fileName = event.target.files[0].name;
    $("#file").val(fileName);
    var reader = new FileReader();
    reader.onloadstart = function () {
        reader.abort();
    };
    reader.onloadend = function () {
        console.log(reader.error.message);
    };
    reader.readAsDataURL(input.files[0]);
    ///Add File///
    console.log("directoryFlg: " + directoryFlg);
    $.ajax({
        type: "GET",
        url: "/file-by/" + directoryFlg,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 9) {
                alert("จำกัดจำนวน 10 ไฟล์");
            } else {
                AddFiles();
            }
        }
    });
});
function AddFiles() {
    var files = singleFileUploadInput.files;
    if (singleFileUploadInput.files.length > 0) {
        uploadSingleFile(files[0]);
        logo = files[0].name;
    }
}
function uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
        url: "/fileUpload/" + setFile + "/" + $('#createBy').val(),
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function (data) {
            getFile(setFile);
        }
    });
}
//////////////////////////////END UPLOAD FILE///////////////////////////////////////

function updateStatus(id, status) {
    $.ajax({
        type: 'POST',
        url: '/api-f2/update-status/' + id + "/" + status,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (status == "0") {
                $.ajax({
                    url: '/api-journal/deleteReset/' + id,
                    type: 'DELETE',
                    success: function (result) {
                        window.location.href = "/expenses";
                    }
                });
            } else {
                window.location.href = "/expenses";
            }
        }
    });
}

function CheckOffice(officeType) {
    if (officeType == 1) {
        document.getElementById("officeTypeCheck").hidden = true;
    } else {
        document.getElementById("officeTypeCheck").hidden = false;
    }
    console.log("CheckOffice :: " + officeType);
}

function dataCustomer(companyId) {
    $.ajax({
        type: "GET",
        url: "/api/customers-list/name/" + $('#setCompanyId').val(),
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
                                CheckOffice("1");
                            } else {
                                $('#customersNamePrint').text(msg.customerName + " ( " + msg.department + " )");
                                document.getElementById("officeType2").checked = true;
                                CheckOffice("2");
                            }
                        }
                    });
                }
            } else {
                CheckOffice("1");
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

var tableCreateQuotation;

function expense(expenseValue, row, groupExpense) {
    var expenseDropdown = [];
    var expenseDropdown1 = [];
    alert('expense');
    if (expenseValue != null) {
        $.ajax({
            type: "GET",
            url: "/api-expense/get-dropdown",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                expenseDropdown.push('<select class="form-control form-control-sm" style="height: 8 mm" placeholder="กรุณากรอก" id="' + groupExpense + '" value="' + groupExpense + '">')
                expenseDropdown.push("<option>กรุณากรอก</option>");
                for (const iterator of msg) {
                    $('#expenseDropdown').append('<option value="' + expenseValue + '">' + expenseValue + '</option>');
                    expenseDropdown.push("<option value=" + iterator.name + ">" + iterator.name + "</option>")
                }
                expenseDropdown.push("</select>")
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: "/api-expense/get-dropdown",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                expenseDropdown.push('<select class="form-control form-control-sm" style="height: 8 mm" placeholder="กรุณากรอก" id="groupExpense' + row + '">')
                expenseDropdown.push("<option>กรุณากรอก</option>");
                for (const iterator of msg) {
                    expenseDropdown.push('<option value="' + iterator.name + '">' + iterator.name + '</option>')
                    // $('#expenseDropdown').append('<option value="' + iterator.name + '">' + iterator.name + '</option>');
                }
                expenseDropdown.push('</select>')
            }
        });
    }
    console.log(JSON.stringify(expenseDropdown));
    console.log(expenseDropdown);



    return expenseDropdown;
}

function tableCreateQuotationDisplay1(id) {
    $.ajax({
        type: "GET",
        url: "/api-f2/get-f2ListRepo-by-id/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            tableCreateQuotationDisplay1_UpdateByKO(msg);
            setSelectpicker(msg);
        }
    });
}

function tableCreateQuotationDisplay1_UpdateByKO(msg) {

    tableCreateQuotation = $('#tableCreateQuotationDisplay').DataTable({
        lengthChange: false,
        searching: false,
        responsive: true,
        "bDestroy": true,
        data: msg,
        //"sAjaxSource": "/api-f2/get-f2ListRepo-by-id/" + id,
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
            "sWidth": "50%",
            "mRender": function (data,
                type, row, index) {
                if (row.product != null) {
                    return '<input class="form-control" style="height: 8mm" type="text" placeholder="รายละเอียด" name="" id="product' + index.row + '" value="' + row.product + '"/> \n\
                     <p class="hide error-product" id="error-product' + index.row + '">กรุณากรอกรายละเอียด</p>';
                } else {
                    return '<input class="form-control" style="height: 8mm" type="text" placeholder="รายละเอียด" name="" id="product' + index.row + '" value=""/> \n\
                        	<p class="hide error-product"  id="error-product' + index.row + '">กรุณากรอกรายละเอียด</p>';
                }
            }
        },
        {
            "sWidth": "20%",
            "mRender": function (data,
                type, row, index) {
                var selectItem = '';
                expense_dropdownItem.forEach(item => {
                    selectItem += '<option value="' + item.row + '">' + item.name + '</option>';
                })
                return '<select id="groupExpense' + index.row + '" class="selectpicker" data-hide-disabled="true" data-live-search="true">\n\
                           ' + selectItem + '\n\
                          </select>';
            }
        }, {
            "sWidth": "7%",
            "mRender": function (data,
                type, row, index) {
                if (row.productNumber != null) {
                    return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 8mm" type="text" name="allowence" id="productNumber' +
                        index.row +
                        '" value="' + row.productNumber + '"/>';
                } else {
                    return '<input class="form-control number1" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 8mm" type="text" name="allowence" id="productNumber' +
                        index.row +
                        '" value="1"/>';
                }
            }
        },
        {
            "sWidth": "7%",
            "mRender": function (data,
                type, row, index) {
                if (row.productPrice != null) {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 8mm" type="text" name="allowence" id="productPrice' +
                        index.row +
                        '" value="' + row.productPrice + '"/>';
                } else {
                    return '<input class="form-control number2" OnKeyPress="return chkNumber(this)" style="width: 120px;height: 8mm" type="text" name="allowence" id="productPrice' +
                        index.row +
                        '" value=""/>';
                }
            }
        },
        {
            "mData": "",
            "sWidth": "8%",
            "mRender": function (data,
                type, row, index) {
                if (row.productSumPrice != null) {
                    return '<input class="form-control sum1" style="width: 120px;height: 8mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                        index.row +
                        '" value="' + row.productSumPrice + '" disabled/>';
                } else {
                    return '<input class="form-control sum1" style="width: 120px;height: 8mm;text-align: center" type="text" name="rentDateSum" id="productSumPrice' +
                        index.row +
                        '" value="" disabled/>';
                }
            }
        },
        {
            "mData": "",
            "sWidth": "3px",
            "mRender": function (data,
                type, row, index) {
                return '<div style="text-align:center"><i class="fas fa-trash" style="cursor: pointer;color: red"></i></div>';
            }
        }
        ]
    });
    $('#tableCreateQuotationDisplay').on('click', 'i', function () {
        tableCreateQuotation.row($(this).parents('tr')).remove().draw();
    });
    $('#tableCreateQuotationDisplay').on('click', 'a', function () {
        //   tableCreateQuotation.row($(this).parents('tr')).remove().draw();

        var sumvalues = $("[name='rentDateSum']");
        var sum = 0;
        for (var i = 0; i < sumvalues.length; i++) {
            if ($(sumvalues[i]).val() != "") {
                sum = sum + parseFloat($(sumvalues[i]).val());
            }
        }
        // ไม่รวมภาษี
        var productPriceAll = 0;
        var discount = document.getElementById("discount").value;
        productPriceAll = discountPrice - (discountPrice * discount / 100)
        $('#discountPrice').text(parseFloat(discountPrice * discount / 100).toFixed(2));
        $('#discountProductPrice').text(parseFloat(productPriceAll).toFixed(2));

        var checkBox1 = document.getElementById("myCheck1");
        // Get the output text
        if (checkBox1.checked == true) {
            $('#productPriceAll').text(parseFloat(productPriceAll + (productPriceAll * 7 / 100)).toFixed(2));
            $('#vat').text(parseFloat(productPriceAll * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll').text(parseFloat(productPriceAll).toFixed(2));
            $('#vat').text("00.00");
        }

        // รวมภาษี
        var productPriceAll1 = 0;
        var discount1 = document.getElementById("discount1").value;
        productPriceAll1 = discountPrice1 - (discountPrice1 * discount1 / 100)
        $('#discountProductPrice1').text(parseFloat(productPriceAll1).toFixed(2));
        $('#discountProductPriceSum1').text(parseFloat(productPriceAll1).toFixed(2));
        $('#discountPrice1').text(parseFloat(discountPrice1 * discount1 / 100).toFixed(2));
        var checkBox2 = document.getElementById("myCheck2");
        // Get the output text
        if (checkBox2.checked == true) {
            $('#productPriceAll1').text(parseFloat(productPriceAll1 - (productPriceAll1 * 7 / 100)).toFixed(2));
            $('#vat1').text(parseFloat(productPriceAll1 * 7 / 100).toFixed(2));
        } else {
            $('#productPriceAll1').text(parseFloat(productPriceAll1).toFixed(2));
            $('#vat1').text("00.00");
        }
    }); // end table
}

function Add() {
    tableCreateQuotation.row.add([tableCreateQuotation.data]).draw(false);
    $('.selectpicker').selectpicker();
}

function remove() {
    tableCreateQuotation.rows('.selected').remove().draw();
}

var officeType;
$("#officeType1").change(function () {
    officeType = 1;
});
$("#officeType2").change(function () {
    officeType = 2;
});

function saveCreateQuotation() {
    var pass = true;

    pass = validateInput();
    // alert(pass);
    if (pass) {
        var insertQuotation = {
            //ข้อมูลลูกค้า
            customerName: $('#customers').val(), //ชื่อบริษัทลูกค้า
            departmentPass: $('#departmentPass').val(), //รหัสสาขา
            departmentName: $('#departmentName').val(), //ชื่อสาขา
            officeType: officeType, //สาขา
            address: $('#address').val(), //ที่อยู่
            taxId: $('#taxId').val(), //ที่อยู่

            id: $('#id').val(), //ลูกค้า
            companyId: $('#customers').val(), //ลูกค้า
            departmentId: $('#departmentId').val(), //เลขที่เอกสาร
            type: "Expenses", //ประเภท
            status: "รออนุมัติ", //สถานะ
            statusVat: $('#statusVat').val(), //สถานะ ภาษี

            //ข้อมูลลูกค้า
            customerName: $('#customers').val(), //ชื่อบริษัทลูกค้า
            departmentPass: $('#departmentPass').val(), //รหัสสาขา
            departmentName: $('#departmentName').val(), //ชื่อสาขา
            officeType: officeType, //สาขา
            address: $('#address').val(), //ที่อยู่
            taxId: $('#taxId').val(), //ที่อยู่

            // ไม่รวมภาษี
            price: $('#price').text(), //รวมเป็นเงิน
            productPriceAll: $('#productPriceAll').text(), //ราคาสินค้าทั้งหมด
            discount: $('#discount').val(), //ส่วนลด
            discountPrice: $('#discountPrice').text(), //ราคาหักส่วนลด
            discountProductPrice: $('#discountProductPrice').text(), //
            vat: $('#vat').text(), //ภาษีมูลค่าเพิ่ม

            // รวมภาษี
            price1: $('#price1').text(), //รวมเป็นเงิน
            productPriceAll1: $('#productPriceAll1').text(), //ราคาสินค้าทั้งหมด
            discount1: $('#discount1').val(), //ส่วนลด
            discountPrice1: $('#discountPrice1').text(), //ราคาหักส่วนลด
            discountProductPrice1: $('#discountProductPrice1').text(), //
            vat1: $('#vat1').text(), //ภาษีมูลค่าเพิ่ม
            note: $('#note').val(), //หมาบเหตุ
            date: $('#date').val(), //วันที่
            dateEnd: $('#dateEnd').val(), //วันที่_ครบกำหนด
            referenceDocument: $('#referenceDocument').val(), //เลขที่เอกสาร
            createBy: $('#createBy').val(), //สร้างโดย
            f2ListModels: [],
        }
        var data = tableCreateQuotation.data();
        for (let i = 0; i < data.length; i++) {
            var d = {};
            d.product = $("#product" + i).val(); //สินค้า
            d.productDetail = $("#productDetail" + i).val(); //รายละเอียดสินค้า
            d.productNumber = $("#productNumber" + i).val(); //จำนวนสินค้า
            d.groupExpense = $("#groupExpense" + i).val();
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
                console.log("F4 ADD UPDATE : " + JSON.stringify(result));
                if (result != null || result != '') {
                    $.ajax({
                        type: 'POST',
                        url: '/TaxReport/add-update/TaxReport',
                        data: JSON.stringify(result),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result != null || result != '') {
                                window.location.href = "/expenses";
                            } else {
                                alert('Save expenses False!!')
                            }
                        }
                    });
                    window.location.href = "/expenses";
                } else {
                    alert('Save expenses False!!')
                }
            }
        });
    }
}

function tableQuotation() {
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
        url: "/api-f2/get-by/Expenses/" + $('#createBy').val() + "/" + searchStatus + "/" + fromDate + "/" + toDate,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // table seve offer price
            var tableQuotation = $('#tableQuotation').DataTable({
                paging: false,
                searching: false,
                "bDestroy": true,
                // "sAjaxSource": searchDate(),
                data: jQuery.parseJSON(JSON.stringify(msg)),
                "sAjaxDataProp": "",
                // "order": [
                //     [0, "desc"]
                // ],
                "aoColumns": [{
                    'data': 'date',
                    "className": "text-center",
                    "sWidth": "8%",
                },
                {
                    'data': 'departmentId',
                    "sWidth": "13%",
                    "mRender": function (data,
                        type, row, index, full) {
                        return '<a style="cursor: pointer;color: blue;" onclick="updateQuotation(' + "'" + row.id + "','expensesFlg'" + ')">' + row.departmentId + '</a>';
                    }
                },
                {
                    'data': 'customerName',
                    "sWidth": "43%",
                },
                {
                    'data': '',
                    "sWidth": "13%",
                    "className": "text-right",
                    "mRender": function (data,
                        type, row, index, full) {
                        return '<div style="margin-right: 30px;">' + parseFloat(row.productPriceAll).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</div>';
                    }
                },
                {
                    'data': '',
                    "className": "text-center",
                    "sWidth": "10%",
                    "mRender": function (data, type, row, index, full) {
                        if (row.status == 'รออนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                                    <option value="0' + row.id + '" style="color: black">รอดำเนินการ</option/>\n\
                                    <option value="6' + row.id + '" style="color: black">ชำระเงินแล้ว</option/>\n\
                                    <option value="7' + row.id + '" style="color: black">ยกเลิก</option/>\n\
                                    </select>';
                        } else if (row.status == 'อนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                                    <option style="color: black">ดำเนินการเเล้ว</option/>\n\
                                    <option value="0' + row.id + '" style="color: red">ยกเลิก</option/>\n\
                                    </select>';
                        } else if (row.status == 'ชำระเงินแล้ว') {
                            return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                                        <option style="color: black">ชำระเงินแล้ว</option/>\n\
                                        <option value="0' + row.id + '" style="color: red">รีเซต</option/>\n\
                                        </select>';
                        } else if (row.status == 'ไม่อนุมัติ') {
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
                    "mRender": function (data, type, row) {
                        if (row.status == 'ไม่อนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                            <option value="" style="color: black">ตัวเลือก</option/>\n\
                                            <option value="3' + row.id + '" style="color: red">ลบเอกสาร</option/>\n\
                                        </select>';
                        } else if (row.status == 'ชำระเงินแล้ว') {
                            return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                            <option value="" style="color: black">ตัวเลือก</option/>\n\
                                            <option value="2' + row.id + '" style="color: blue">พิมพ์เอกสาร</option/>\n\
                                        </select>';
                        } else if (row.status == 'รออนุมัติ') {
                            return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                            <option value="" style="color: black">ตัวเลือก</option/>\n\
                                            <option value="1' + row.id + '" style="color: green">แก้ไขเอกสาร</option/>\n\
                                            <option value="2' + row.id + '" style="color: blue">พิมพ์เอกสาร</option/>\n\
                                            <option value="3' + row.id + '" style="color: red">ลบเอกสาร</option/>\n\
                                        </select>';
                        }
                    }
                }
                ]
            });
        }
    });
}; // END tableQuotation

// update status
function changeStatus($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    console.log(type, id);
    switch (type) {
        case '1':
            updateQuotation(id);
            break;
        case '2':
            printPDF(id);
            $('#MyModalPrintPDF').modal('show');
            break;
        case '3':
            deleteId(id);
            break;
    }
}

function deleteId(id) {
    swal({
        title: "ยืนยันการลบข้อมูล",
        text: "คุณกำลังลบข้อมูล, ต้องการดำเนินต่อหรือไม่?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ปิด",
        closeOnConfirm: false
    },
        function () {
            $.ajax({
                url: '/api-f2/delete-f2/' + id,
                type: 'DELETE',
                success: function (result) {
                    if (result == "Success") {
                        window.location.href = "/expenses";
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

    if ('' != $('#taxId').val()) {
        if ($('#taxId').val().length < 13) {
            taxId.focus()
            $('#error-taxId-length').removeClass("hide")
            pass = false;
        } else {
            $('#error-taxId-length').addClass("hide")
        }
    } else {
        $('#error-taxId-length').addClass("hide")
    }

    if ('' == $('#customers').val()) {
        customers.focus()
        $('#error-customers').removeClass("hide")
        pass = false;
    } else {
        $('#error-customers').addClass("hide")
    }

    var table = $('#tableCreateQuotationDisplay').DataTable();
    console.log('table.row', table.rows().count())
    for (let index = 0; index < table.rows().count(); index++) {
        const value = $('#product' + index).val();
        console.log('value' + value);
        if ('' == value) {
            //customers.focus()
            //  alert('true' + '#product' + index)
            $('#error-product' + index).removeClass("hide")
            pass = false;
        } else {
            //alert('flase')
            $('#error-product' + index).addClass("hide")
        }
    }

    return pass;
} // end validate