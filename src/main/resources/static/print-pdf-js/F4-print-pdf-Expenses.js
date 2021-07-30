// Print PDF
function printPDF(id) {
    console.log("Print :: ", id);
    var number = 0;
    var tablePrintPDF = [];
    $('.tablePrintPDFDefault').remove();

    $.ajax({
        type: "GET",
        url: "/api-f2/get-by-id/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            ///////NEW//////
            var getCompanys = document.getElementById("getCompanys").value;
            var getDepartment = document.getElementById("getDepartment").value;
            var getDepartmentPass = document.getElementById("getDepartmentPass").value;
            if (getDepartment == 1) {
                $('#getCompanysPrint').text(getCompanys + " (สำนักงานใหญ่)");
            } else {
                $('#getCompanysPrint').text(getCompanys + " (" + getDepartmentPass + ")");
            };
            if (msg.officeType == 1) {
                $('#customersNamePrint').text(msg.customerName + " (สำนักงานใหญ่)");
            } else {
                $('#customersNamePrint').text(msg.customerName + " (" + msg.departmentPass + ")");
            };
            $('#addressPrint').text(msg.address);
            $('#taxIdPrint').text("เลขประจำตัวผู้เสียภาษี " + msg.taxId);

            $('#departmentIdPrint').text(msg.departmentId); //เลขที่เอกสาร
            $('#status').text(msg.status); //สถานะ
            $('#notePrint').text(msg.note); //หมาบเหตุ
            $('#datePrint').text(msg.date); //วันที่
            $('#dateEndPrint').text(msg.dateEnd); //วันที่_ครบกำหนด
            $('#statusVatPrint').text(msg.statusVat); //วันที่_ครบกำหนด
            // ไม่รวมภาษี
            $('#pricePrint').text(msg.price); //รวมเป็นเงิน
            $('#priceDisplayPrint').text(parseFloat(msg.price).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //รวมเป็นเงิน
                $('#productPriceAllPrint').text(parseFloat(msg.productPriceAll).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ราคาสินค้าทั้งหมด
                $('#discountPrint').text(msg.discount + " %"), //ส่วนลด
                $('#discountPricePrint').text(parseFloat(msg.discountPrice).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ราคาหักส่วนลด
                $('#discountProductPricePrint').text(parseFloat(msg.discountProductPrice).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //
                $('#vatPrint').text(parseFloat(msg.vat).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท") //ภาษีมูลค่าเพิ่ม
            // รวมภาษี
            $('#pricePrint1').text(msg.price1), //รวมเป็นเงิน
                $('#priceDisplayPrint1').text(parseFloat(msg.price1).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //รวมเป็นเงิน
                $('#productPriceAllPrint1').text(parseFloat(msg.productPriceAll1).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ราคาสินค้าทั้งหมด
                $('#discountPrint1').text(msg.discount1 + " %"), //ส่วนลด
                $('#discountPricePrint1').text(parseFloat(msg.discountPrice1).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ราคาหักส่วนลด
                $('#discountProductPricePrint1').text(parseFloat(msg.discountProductPrice1).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //
                $('#vatPrint1').text(parseFloat(msg.vat1).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ภาษีมูลค่าเพิ่ม
                $('#sumPricePrint1').text(parseFloat(msg.discountProductPrice1).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท") //ราคาหักส่วนลด

            if (msg.statusVat == 1) {
                document.getElementById("statusVatPrint1").hidden = false;
                document.getElementById("statusVatPrint2").hidden = true;
            } else {
                document.getElementById("statusVatPrint1").hidden = true;
                document.getElementById("statusVatPrint2").hidden = false;
            }
            if (msg.note == "" || msg.note == null) {
                document.getElementById("noteFlg").hidden = true;
            } else {
                document.getElementById("noteFlg").hidden = false;
            }
            if (msg.price == 0 || msg.price == 0) {
                $('#priceDisplayPrintTh').text("( ศูนย์บาทถ้วน )"); // แปลงไทย
                $('#priceDisplayPrintTh1').text("( ศูนย์บาทถ้วน )"); // แปลงไทย
            } else {
                $('#priceDisplayPrintTh').text("( " + ArabicNumberToText(msg.productPriceAll) + " )"); // แปลงไทย
                $('#priceDisplayPrintTh1').text("( " + ArabicNumberToText(msg.discountProductPrice1) + " )"); // แปลงไทย
            }
            dataCustomer(msg.companyId)
            msg.f2ListModels.forEach(value => {
                console.log(value.productDetail);
                number++;
                tablePrintPDF += '<tr class="tablePrintPDFDefault">';
                tablePrintPDF += '<td style="text-align: center">' + number + '</td>';
                tablePrintPDF += '<td>' + value.product + '</td>';
                tablePrintPDF += '<td style="text-align: center">' + parseFloat(value.productNumber).toFixed(0).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>';
                tablePrintPDF += '<td style="text-align: center">' + parseFloat(value.productPrice).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>';
                tablePrintPDF += '<td style="text-align: center">' + parseFloat(value.productSumPrice).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>';
                tablePrintPDF += '</tr>';
            });
            $('#tablePrintPDFDisplay').append(tablePrintPDF);
        }
    })
} // end Print PDF

document.getElementById("btnPrint").onclick = function () {
    printElement(document.getElementById("printThis"));
}

function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
}