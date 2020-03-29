$(document).ready(function () {
    login();
});

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}

function update() {
    var data = {
        id: $('#id').val(),
        password: $('#password').val(),
        passwordNew: $('#passwordNew').val(),
        passwordNew2: $('#passwordNew2').val(),
        fName: $('#fName').val(),
        lName: $('#lName').val(),
        email: $('#email').val(),
        address: address,
        company: company,
        position: $('#position').val(),
        tel: $('#tel').val(),
        type: type,
        status: status,
        taxId: taxId,
        department: department,
        departmentPass: departmentPass,
        departmentName: departmentName,
    }
    if (data.passwordNew != '') {
        data.password = data.passwordNew;
    }
    console.log(JSON.stringify(data));

    if (data.passwordNew == data.passwordNew2) {
        alert('บันทึกเรียบร้อย')
        $.ajax({
            type: "POST",
            url: "/api-login/save-update/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == 'pass') {
                    window.location.href = "/seting";
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


var taxId;
var department;
var departmentPass;
var departmentName;
var address;
var company;
var type;
var status;

function login() {
    var login = {
        id: $('#idLog').val(),
        password: $('#passwordLog').val(),
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
                $('#password').val(msg.password),
                $('#fName').val(msg.fName),
                $('#lName').val(msg.lName),
                $('#email').val(msg.email),
                $('#position').val(msg.position),
                $('#tel').val(msg.tel),
                status = msg.status,
                type = msg.type,
                taxId = msg.taxId,
                department = msg.department,
                departmentPass = msg.departmentPass,
                departmentName = msg.departmentName,
                address = msg.address,
                company = msg.company
            // $('#logo').val(msg.logo),
        }
    })
}