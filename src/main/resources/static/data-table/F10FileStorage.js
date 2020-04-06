$(document).ready(function () {
    getFolder();
    $('#exampleModalCenter').on('hidden.bs.modal', function (e) {
        getFolder();
    });

    getFile(null);
});

function getFolder() {
    $.ajax({
        type: "GET",
        url: "/directory-all",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            directoryTable(msg);
        }
    });
}

function directoryTable(data) {
    directory = $('#directory').DataTable({
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
                return row.createDate;
            }
        }, {
            "sWidth": "55%",
            "mRender": function (data,
                type, row, index) {
                return '<a href="#" onclick="getFile(' + "'" + row.id + "'" + ')"> <i class="fa fa-folder-open"></i> ' + row.name + '<a/>';
            }
        }, {
            "sWidth": "20%",
            "mRender": function (data, type, row, index, full) {
                return '<select class="form-control form-control-sm" onchange="changeFunc(value)" style="color: black">\n\
                    <option value="" style="color: black">ตัวเลือก</option/>\n\
                    <option value="1' + row.id + '" style="color: green">แก้ไขชื่อโฟลเดอร์</option/>\n\
                    <option value="2' + row.id + '" style="color: red">ลบโฟลเดอร์</option/>\n\
                    </select>';
            }
        }],
    });
    // console.log(tablegeneraJournal);
}

function getFile(id) {
    console.log("File :: " + id);

    if (id == null) {
        filesDataTable(null)
    } else {
        $.ajax({
            type: "GET",
            url: "/file-by/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                console.log("File :: " + JSON.stringify(msg));
                filesDataTable(msg);
            }
        });
    }
}

function filesDataTable(data) {
    filesTable = $('#filesTable').DataTable({
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
            "data": "createDate",
            "sWidth": "25%",
            "className": "text-center",
        }, {
            "data": "name",
            "sWidth": "55%",
        }, {
            "sWidth": "20%",
            "mRender": function (data, type, row, index, full) {
                return '<button class="btn-primary btn-sm" onclick="getDownload(' + "'" + row.id + "'" + ')"><i class="fa fa-download"></i></button>\n\
                        <button class="btn btn-danger btn-sm" onclick="deleteFile(' + "'" + row.id + "'" + ')><i class="fa fa-trash-o"></i></button>';
            }
        }],
    });
    // console.log(tablegeneraJournal);
}

function getDownload(id) {
    window.open("http://localhost:8080/download/" + id)
}

function changeFunc($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    console.log(type, id);
    switch (type) {
        case "1":
            updateFile(id);
            break;
        case "2":
            deleteFile(id);
            break;
    }
}

var upId;

function updateFile(id) {
    if (id == null) {
        $('#folder').val("")
        document.getElementById("save").hidden = false;
        document.getElementById("edit").hidden = true;
        upId = "";
    } else {
        document.getElementById("save").hidden = true;
        document.getElementById("edit").hidden = false;
        $.ajax({
            type: "GET",
            url: "/directory-by/" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                console.log("name folder :: " + msg.name);
                $('#folder').val(msg.name),
                    upId = msg.id
            }
        });
    }
    $('#exampleModalCenter').modal('show');
}

function deleteFile(id) {
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
                url: '/delete-directory/' + id,
                type: 'DELETE',
                success: function (result) {
                    if (result) {
                        window.location.href = "/file-storage";
                    } else {
                        alert("Delete Fail!!!");
                    }
                }
            });
        });
}

function AddFolder() {
    console.log($('#folder').val());
    var createFolder = $('#folder').val()

    if (createFolder.includes('/') || createFolder.includes('|') ||
        createFolder.includes('*') || createFolder.includes('<') ||
        createFolder.includes('>') || createFolder.includes('"') ||
        createFolder.includes('\\') || createFolder.includes('.') ||
        createFolder === '') {
        alert('ห้ามใช้อักษรพิเศษ')
    } else {
        $.ajax({
            url: '/create-directory/' + createFolder,
            type: 'GET',
            success: function (result) {
                if (result == "success") {
                    window.location.href = "/file-storage";
                } else {
                    alert("สร้าง Folder ไม่สำเร็จ!!! เนื่องจากมี Folder อยู่เเล้ว");
                }
            }
        });
    }
}

function updateFolder() {
    var updateFolder = {
        name: $('#folder').val(),
        id: upId
    }
    console.log(JSON.stringify(updateFolder));

    if (updateFolder.name.includes('/') || updateFolder.name.includes('|') ||
        updateFolder.name.includes('*') || updateFolder.name.includes('<') ||
        updateFolder.name.includes('>') || updateFolder.name.includes('"') ||
        updateFolder.name.includes('\\') || updateFolder.name.includes('.') ||
        updateFolder.name === '') {
        alert('ห้ามใช้อักษรพิเศษ')
    } else {
        $.ajax({
            url: '/rename-directory',
            type: 'POST',
            data: JSON.stringify(updateFolder),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result != null) {
                    window.location.href = "/file-storage";
                } else {
                    alert("สร้าง Folder ไม่สำเร็จ!!! เนื่องจากมี Folder อยู่เเล้ว");
                }
            }
        });
    }
}