$(document).ready(function () {
    login();
});

var taxId;
var department;
var departmentPass;
var departmentName;
var address;
var company;
var type;
var status;
var logo;

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
                logo = msg.logo,
                status = msg.status,
                type = msg.type,
                taxId = msg.taxId,
                department = msg.department,
                departmentPass = msg.departmentPass,
                departmentName = msg.departmentName,
                address = msg.address,
                company = msg.company
                document.getElementById("myImg").src = "\\img\\" + msg.logo;
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
        company: company,
        position: $('#positionUser').val(),
        tel: $('#tel').val(),
        type: type,
        status: status,
        taxId: taxId,
        logo: logo,
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