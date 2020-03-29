$(document).on("click", ".browse", function () {
    var file = $(this).parents().find(".file");
    file.trigger("click");
});
$('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);
    logo = fileName;
    var reader = new FileReader();
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});

var logo;

$(document).ready(function () {
    login();
});

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}

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
                $('#password').val(msg.password),
                $('#email').val(msg.email),
                $('#company').val(msg.company),
                $('#address').val(msg.address),
                $('#position').val(msg.position),
                $('#tel').val(msg.tel),
                $('#type').val(msg.type),
                $('#status').val(msg.status),
                $('#taxId').val(msg.taxId),
                $('#logo').val(msg.logo),

            CheckOffice(msg.department);
        }
    })
}

function update() {
    var data = {
        id: $('#id').val(),
        password: $('#password').val(),
        fName: $('#fName').val(),
        lName: $('#lName').val(),
        email: $('#email').val(),
        address: $('#address').val(),
        company: $('#company').val(),
        position: $('#position').val(),
        tel: $('#tel').val(),
        type: $('#type').val(),
        status: $('#status').val(),
        taxId: $('#taxId').val(),
        logo: logo,
        department: departmentData,
        departmentPass: $('#departmentPass').val(),
        departmentName: $('#departmentName').val(),
    }
    console.log(JSON.stringify(data));
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
}; // update

var departmentData;

function CheckOffice(department) {
    if (department == 1) {
        document.getElementById("department1").checked = true;
        document.getElementById("department").hidden = true;
    } else {
        document.getElementById("department2").checked = true;
        document.getElementById("department").hidden = false;
    }
    departmentData = department;
    console.log("CheckOffice :: " + department);
}