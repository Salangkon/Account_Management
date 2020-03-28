$(document).ready(function () {
    getFile();
});

function getFile() {
    /*  $.ajax({
          type: "GET",
          url: "/api-chart-account/selete-chart-account",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (msg) {
              SeleteChartAccountItem = msg;
              console.log('getSeleteChartAccountItem', msg);
          }
      });*/
    var fileItem = [
        // {
        //     ig: '123',
        //     name: 'file1',
        //     path: '/root/file1'
        // },
    ];
    for (let index = 0; index < 20; index++) {
        fileItem.push({
            ig: index.toString(),
            name: 'จัดเก็บไฟล์เอกสาร' + index.toString(),
            path: '/root/file' + index.toString()
        });
    }
    createDatatable(fileItem);
}


function createDatatable(data) {
    tablegeneraJournal = $('#tablegeneraJournalDisplay').DataTable({
        lengthChange: false,
        "paging": false,
        searching: false,
        responsive: true,
        "bDestroy": true,
        data: data,
        "bAutoWidth": false,
        "sAjaxDataProp": "",
        "aoColumns": [{
            'data': '',
            "sWidth": "70%",
            "mRender": function (data,
                type, row, index) {
                console.log(row);
                return '<a>' + row.name + '<a/>';
            }
        },
        {
            'data': '',
            "sWidth": "30%",
            "className": "text-center",
            "mRender": function (data,
                type, row, index) {
                return '<a href="#">Download..<a/>';
            }
        }],
    });
    console.log(tablegeneraJournal);
}

