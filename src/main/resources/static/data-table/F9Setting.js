$(document).on("click", ".browse", function () {
    var file = $(this).parents().find(".file");
    file.trigger("click");
});
$('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
});

var logo;
var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
var preview;
var myImg;

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
    // console.log(JSON.stringify(login))
    $.ajax({
        type: 'POST',
        url: '/api-login/seting',
        data: JSON.stringify(login),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            // console.log(JSON.stringify(msg));
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
                logo = msg.logo,
                document.getElementById("preview").src = "\\img\\" + msg.logo;
                document.getElementById("myImg").src = "\\img\\" + msg.logo;
            CheckOffice(msg.department);
        }
    })
}

function update() {
    var files = singleFileUploadInput.files;
    if (singleFileUploadInput.files.length > 0) {
        uploadSingleFile(files[0]);
        logo = files[0].name;
    }

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
    document.getElementById("preview").src = "\\img\\" + logo;
    document.getElementById("myImg").src = "\\img\\" + logo;
    $.ajax({
        type: "POST",
        url: "/api-login/save-update/",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.res == 'pass') {
                window.location.href = "/setting";
            } else {
                alert('บันทึก ไม่สำเร็จ..')
            }
        }
    });
}; // update

function uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);

    $.ajax({
        url: "/uploadLogo",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function (data) {
            // alert(data);
        }
    });
}

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

var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');