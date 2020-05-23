$(document).ready(function () {
    reportBuyTax();
}); // end document

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

function formatDMY(ts) {
    let current_datetime = new Date(ts)
    // convert unix timestamp to milliseconds
    var year = current_datetime.getFullYear();
    var month = ("0" + (current_datetime.getMonth() + 1)).slice(-2);
    var date = ("0" + current_datetime.getDate()).slice(-2);
    return year + "-" + month + "-" + date;
}

function reportBuyTax() {
    var fromDate = 0;
    var toDate = 0;

    if (document.getElementById('fromDate').value != '') {
        fromDate = document.getElementById('fromDate').value
    }
    if (document.getElementById('toDate').value != '') {
        toDate = document.getElementById('toDate').value;
    }

    $.ajax({
        type: "GET",
        url: "/TaxReport/get-by/ReportBuyTax/" + $('#createBy').val() + "/" + fromDate + "/" + toDate,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            console.log(JSON.stringify(res));
            $('#tableReportBuyTax').DataTable({
                paging: false,
                searching: true,
                "bDestroy": true,
                // "sAjaxSource": searchDate(),
                data: jQuery.parseJSON(JSON.stringify(res)),
                "sAjaxDataProp": "",
                "order": [
                    [0, "desc"]
                ],
                "aoColumns": [{
                    'data': 'date',
                    "className": "text-center",
                    "mRender": function (data,
                        type, row, index) {
                        return formatDMY(row.date);
                    }
                }, {
                    'data': 'departmentId',
                    // "sWidth": "43%",
                }, {
                    'data': 'referenceDocument',
                    // "sWidth": "43%",
                }, {
                    'data': 'company',
                    // "sWidth": "43%",reportBuyTax
                }, {
                    'data': 'date',
                    // "sWidth": "43%",
                    "mRender": function (data,
                        type, row, index) {
                        return parseFloat(row.price).toFixed(2);
                    }
                }, {
                    'data': 'date',
                    // "sWidth": "43%",
                    "mRender": function (data,
                        type, row, index) {
                        return parseFloat(row.priceVat).toFixed(2);
                    }
                }, {
                    'data': 'date',
                    // "sWidth": "43%",
                    "mRender": function (data,
                        type, row, index) {
                        return parseFloat(row.productPriceAll).toFixed(2);
                    }
                }, ]
            });
        }
    });
}; // END tableQuotation

function reportBuyTaxPrint() {
    window.open("/api/report/type/reportBuyTax/userid/s1/startDate/0/endDate/0/รายงานภาษี");
    // window.location.href = "/api/report/type/reportBuyTax/userid/s1/startDate/0/endDate/0/รายงานภาษี";
}