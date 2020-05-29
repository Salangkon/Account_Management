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
var companyId;
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
            companyId = msg.companys.companyId,
                $('#company').val(msg.companys.companyName),
                $('#address').val(msg.companys.address),
                $('#companyType').val(msg.companys.companyType),
                $('#department').val(msg.companys.department),
                $('#departmentName').val(msg.companys.departmentName),
                $('#departmentPass').val(msg.companys.departmentPass),
                $('#tel').val(msg.companys.tel),
                $('#taxId').val(msg.companys.taxId),
                logo = msg.companys.logo,
                document.getElementById("preview").src = "\\img\\" + msg.companys.logo;
            document.getElementById("myImg").src = "\\img\\" + msg.companys.logo;
            CheckOffice(msg.companys.department, msg.companys.departmentName, msg.companys.departmentPass);
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
        companyName: $('#company').val(),
        companyId: companyId,
        address: $('#address').val(),
        companyType: $('#companyType').val(),
        department: departmentData,
        departmentName: $('#departmentName').val(),
        departmentPass: $('#departmentPass').val(),
        tel: $('#tel').val(),
        taxId: $('#taxId').val(),
        logo: logo,
    }
    console.log(JSON.stringify(data));
    document.getElementById("preview").src = "\\img\\" + logo;
    document.getElementById("myImg").src = "\\img\\" + logo;
    $.ajax({
        type: "POST",
        url: "/api-login/save-update-company",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.res == 'pass') {
                alert('บันทึกเรียบร้อย')
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

function CheckOffice(department, departmentName, departmentPass) {
    if (department == 1) {
        document.getElementById("department1").checked = true;
        document.getElementById("department").hidden = true;
    } else {
        document.getElementById("department2").checked = true;
        document.getElementById("department").hidden = false;
        $('#departmentName').val(departmentName),
            $('#departmentPass').val(departmentPass)
    }
    departmentData = department;
    console.log("CheckOffice :: " + department);
}

var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');