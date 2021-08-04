function printPDF(id) {
    $.ajax({
        type: "GET",
        url: "/api-journal/get-by/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log('msg PDF :: ', JSON.stringify(msg));
            user(msg.createBy);

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
                $('#referenceDocumentPrint').text(msg.referenceDocument),
                $('#documentCodePrint').text(msg.documentCode),
                $('#descriptionPrint').text(msg.description),
                $('#typePDF11').text(),
                $('#idPDF').text(msg.id),
                $('#sumDebitPDF').text(parseFloat(msg.sumDebit).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")),
                $('#sumCreditPDF').text(parseFloat(msg.sumCredit).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))


            msg.journalLists.forEach(value => {
                chartAccountCode(value.chartAccountId)
            });
            msg.journalLists.forEach(value => {
                chartAccountName(value.chartAccountId)
            });


            var numberCredit = 0;
            var tablePrintPDFCredit = [];
            $('.tablePrintPDFCreditDefault').remove();
            msg.journalLists.forEach(value => {
                numberCredit++;
                tablePrintPDFCredit += '<tr class="tablePrintPDFCreditDefault" style="text-align: right;">'
                tablePrintPDFCredit += '<td>' + parseFloat(value.debit).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>'
                tablePrintPDFCredit += '</tr>'
            });
            $('#tablePrintPDFCredit').append(tablePrintPDFCredit);

            var numberDebit = 0;
            var tablePrintPDFDebit = [];
            $('.tablePrintPDFDebitDefault').remove();
            msg.journalLists.forEach(value => {
                numberDebit++;
                tablePrintPDFDebit += '<tr class="tablePrintPDFDebitDefault" style="text-align: right;">'
                tablePrintPDFDebit += '<td>' + parseFloat(value.credit).toFixed(2).replace(",", "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>'
                tablePrintPDFDebit += '</tr>'
            });
            $('#tablePrintPDFDebit').append(tablePrintPDFDebit);

        }
    })
}

function chartAccountCode(id) {
    var number = 0;
    var tablePrintPDF = [];
    $('.tablePrintPDFDefault').remove();
    $.ajax({
        type: "GET",
        url: "/api-chart-account/get-by-id/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log("passCodeRes :: " + msg.passCode);
            number++;
            tablePrintPDF += '<tr class="tablePrintPDFDefault">'
            tablePrintPDF += '<td>' + msg.passCode + '</td>'
            tablePrintPDF += '</tr>'
            $('#tablePrintPDFPassCode').append(tablePrintPDF);
        }
    });
}

function chartAccountName(id) {
    var number = 0;
    var tablePrintPDF = [];
    $('.tablePrintPDFDefault').remove();
    $.ajax({
        type: "GET",
        url: "/api-chart-account/get-by-id/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log("passCodeRes :: " + msg.passCode);
            number++;
            tablePrintPDF += '<tr class="tablePrintPDFDefault">'
            tablePrintPDF += '<td>' + msg.text + '</td>'
            tablePrintPDF += '</tr>'
            $('#tablePrintPDFText').append(tablePrintPDF);
        }
    });
}


function user(userId) {
    console.log("userId :: " + userId);

    $.ajax({
        type: "GET",
        url: "/api-login/seting-user/" + userId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $('#nameF6PDF').text(" " + msg.fName + " " + msg.lName)
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