$(document).ready(function () {
    login();
});

var address;
var type;
var status;
var companyId;

function login() {
    var login = {
        id: $('#id').val(),
        password: $('#password').val(),
    }
    console.log(JSON.stringify(login))
    $.ajax({
        type: 'POST',
        url: '/api-login/seting',
        data: JSON.stringify(login),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            console.log(JSON.stringify(msg));
            $('#id').val(msg.id),
                $('#passwordUser').val(msg.password),
                $('#fNameUser').val(msg.fName),
                $('#lNameUser').val(msg.lName),
                $('#emailUser').val(msg.email),
                $('#positionUser').val(msg.position),
                $('#tel').val(msg.tel),
                status = msg.status,
                type = msg.type,
                companyId = msg.companyId,
                taxId = msg.taxId
            document.getElementById("myImg").src = "\\img\\" + msg.companys.logo;

            persanol(msg.companyId)
        }
    })
}

function persanol(companyId) {
    $.ajax({
        type: "GET",
        url: "/api-login/seting-persanol/" + companyId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $('#tableSetingPersanol').DataTable({
                paging: true,
                "bDestroy": true,
                data: jQuery.parseJSON(JSON.stringify(msg)),
                "sAjaxDataProp": "",
                "aoColumns": [{
                        "sWidth": "15%",
                        "mRender": function (data, type, row) {
                            return row.fName + " " + row.lName
                        }
                    }, {
                        'data': 'position',
                        "className": "text-center",
                        "sWidth": "8%",
                    }, {
                        'data': 'tel',
                        "className": "text-center",
                        "sWidth": "8%",
                    }, {
                        'data': 'email',
                        "sWidth": "14%",
                    }, {
                        'data': 'address',
                        "sWidth": "25%",
                    },
                    {
                        "className": "text-center",
                        "sWidth": "10%",
                        "mRender": function (data, type, row) {
                            if (row.status == 'Y') {
                                return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                            <option value="" style="color: green">ใช้งาน</option/>\n\
                                            <option value="N' + row.id + '" style="color: red">ระงับการใช้งาน</option/>\n\
                                        </select>';
                            } else if (row.status == 'N') {
                                return '<select class="form-control form-control-sm" onchange="changeStatus(value)" style="color: black">\n\
                                            <option value="" style="color: red">ระงับการใช้งาน</option/>\n\
                                            <option value="Y' + row.id + '" style="color: green">ใช้งาน</option/>\n\
                                        </select>';
                            }
                        }
                    }
                ]
            });
        }
    });
}

// update status
function changeStatus($i) {
    var type = $i.slice(0, 1);
    var id = $i.substr(1, 100);
    console.log(type, id);
    $.ajax({
        type: 'GET',
        url: '/api-login/update-position/' + id + "/" + type,
        data: JSON.stringify(login),
        success: function (msg) {
            if (msg == 'pass') {
                window.location.href = "/setting-user";
            } else {
                alert('ระงับการใช้งาน ไม่สำเร็จ..')
            }
        }
    })
}

function update() {
    var data = {
        id: $('#id').val(),
        password: $('#passwordUser').val(),
        passwordNew: $('#passwordNew').val(),
        passwordNew2: $('#passwordNew2').val(),
        fName: $('#fNameUser').val(),
        lName: $('#lNameUser').val(),
        email: $('#emailUser').val(),
        address: address,
        companyId: companyId,
        position: $('#positionUser').val(),
        tel: $('#tel').val(),
        type: type,
        status: status,
    }
    if (data.passwordNew != '') {
        data.password = data.passwordNew;
    }
    console.log(JSON.stringify(data));

    if (data.passwordNew == data.passwordNew2) {
        alert('บันทึกเรียบร้อย')
        $.ajax({
            type: "POST",
            url: "/api-login/save-update-user",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.res == 'pass') {
                    window.location.href = "/setting-user";
                } else {
                    alert('บันทึก ไม่สำเร็จ..')
                }
            }
        });
    } else {
        alert('กรุณากรอกรหัสใหม่ ให้ถูกต้อง')
        passwordNew2.focus()
    }
}; // update

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}