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
            $('#departmentIdPrint').text(msg.departmentId), //เลขที่เอกสาร
                $('#status').text(msg.status), //สถานะ
                $('#pricePrint').text(msg.price), //รวมเป็นเงิน
                $('#priceDisplayPrint').text(parseFloat(msg.price).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //รวมเป็นเงิน
                $('#productPriceAllPrint').text(parseFloat(msg.productPriceAll).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ราคาสินค้าทั้งหมด
                $('#discountPrint').text(msg.discount + " %"), //ส่วนลด
                $('#discountPricePrint').text(parseFloat(msg.discountPrice).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ราคาหักส่วนลด
                $('#discountProductPricePrint').text(parseFloat(msg.discountProductPrice).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //
                $('#vatPrint').text(parseFloat(msg.vat).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " บาท"), //ภาษีมูลค่าเพิ่ม
                $('#notePrint').text(msg.note), //หมาบเหตุ
                $('#datePrint').text(msg.date), //วันที่
                $('#dateEndPrint').text(msg.dateEnd) //วันที่_ครบกำหนด
            if (msg.price == 0) {
                $('#priceDisplayPrintTh').text("( ศูนย์บาทถ้วน )"); // แปลงไทย
            } else {
                $('#priceDisplayPrintTh').text("( " + ArabicNumberToText(msg.productPriceAll) + " )"); // แปลงไทย
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