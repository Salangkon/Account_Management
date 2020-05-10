function printPDF(id) {
    $.ajax({
        type: "GET",
        url: "/api-journal/get-by/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log('msg PDF :: ', JSON.stringify(msg));
            if (msg.type == 'JV') {
                $('#titleTHPrint').text("สมุดรายวันทั่วไป")
                $('#titleENPrint').text("Journal voucher")
            } else if (msg.type == 'UV') {
                $('#titleTHPrint').text("สมุดรายวันซื้อ")
                $('#titleENPrint').text("Purchase voucher")
            } else if (msg.type == 'SV') {
                $('#titleTHPrint').text("สมุดรายวันขาย")
                $('#titleENPrint').text("Sales voucher")
            } else if (msg.type == 'PV') {
                $('#titleTHPrint').text("สมุดรายวันจ่าย")
                $('#titleENPrint').text("Payment voucher")
            } else if (msg.type == 'RV') {
                $('#titleTHPrint').text("สมุดรายวันรับ")
                $('#titleENPrint').text("Receipt voucher ")
            }
            $('#datePrint').text(formatDMY(msg.date)),

            $('#typePDF11').text(),
            $('#idPDF').text(msg.id),
                $('#customersPDF').text(msg.companyId),
                $('#datePDF').text(msg.date),
                $('#descriptionPDF').text(msg.description),
                $('#referenceDocumentPDFF6').text(msg.referenceDocument),
                $('#sumDebitPDF').text(parseFloat(msg.sumDebit).toFixed(2)),
                $('#sumCreditPDF').text(parseFloat(msg.sumCredit).toFixed(2))
        }
    })
}

function formatDMY(ts) {
    let current_datetime = new Date(ts)
    // convert unix timestamp to milliseconds
    var year = current_datetime.getFullYear();
    var month = ("0" + (current_datetime.getMonth() + 1)).slice(-2);
    var date = ("0" + current_datetime.getDate()).slice(-2);
    return year + "-" + month + "-" + date;
}

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