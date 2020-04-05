$(document).ready(function () {
    getFile();
});

function getFile() {
    $.ajax({
        type: "GET",
        url: "/directory-all",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            createDatatable(msg);
        }
    });
}

function formatDate(nowDate) {
    var date = new Date(nowDate * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return new Date(nowDate).toLocaleDateString("en-US") + " " + formattedTime;
}

function createDatatable(data) {
    tablegeneraJournal = $('#tablegeneraJournalDisplay').DataTable({
        data: data,
        lengthChange: false,
        "pageLength": 20,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        responsive: true,
        "sAjaxDataProp": "",
        "bDestroy": true,
        "order": [
            [0, "desc"]
        ],
        "aoColumns": [{
            "sWidth": "25%",
            "className": "text-center",
            "mRender": function (data,
                type, row, index) {
                return formatDate(row.createDate);
            }
        }, {
            "sWidth": "75%",
            "mRender": function (data,
                type, row, index) {
                return '<a href="#"> <i class="fa fa-folder-open"></i> ' + row.name + '<a/>';
            }
        }],
    });
    console.log(tablegeneraJournal);
}

function AddFolder() {
    console.log($('#folder').val());
    var createFolder = $('#folder').val()

    if (createFolder.includes('/') || createFolder.includes('|') ||
        createFolder.includes('*') || createFolder.includes('<') ||
        createFolder.includes('>') || createFolder.includes('"') ||
        createFolder.includes('\\') || createFolder.includes('.')) {
        alert('ห้ามใช้อักษรพิเศษ')
    } else {
        $.ajax({
            url: '/create-directory/' + createFolder,
            type: 'GET',
            success: function (result) {
                if (result == "success") {
                    window.location.href = "/file-storage";
                } else {
                    alert("สร้าง Folder ไม่สำเร็จ!!!");
                }
            }
        });
    }
}