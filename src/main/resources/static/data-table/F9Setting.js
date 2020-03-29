$(document).on("click", ".browse", function () {
    var file = $(this).parents().find(".file");
    file.trigger("click");
});
$('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);

    var reader = new FileReader();
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});


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
                $('#taxId').val(msg.taxId)
            CheckOffice(msg.department);
            // $('#logo').val(msg.logo),
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
        department: departmentData,
        departmentPass: $('#departmentPass').val(),
        departmentName: $('#departmentName').val(),
    }
    console.log(JSON.stringify(data));

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

// validate
function validateInput() {
    var pass = true;

    if ('' == $('#tel').val()) {
        tel.focus()
        $('#error-tel').removeClass("hide")
        pass = false;
    } else {
        $('#error-tel').addClass("hide")
    }

    if ('' == $('#customerName').val()) {
        customerName.focus()
        $('#error-customerName').removeClass("hide")
        pass = false;
    } else {
        $('#error-customerName').addClass("hide")
    }

    if ('2' == officeType) {
        if ('' == $('#department').val()) {
            department.focus()
            $('#error-department').removeClass("hide")
            pass = false;
        } else {
            $('#error-department').addClass("hide")
        }
    }
    if ('' == $('#taxId').val()) {
        taxId.focus()
        $('#error-taxId').removeClass("hide")
        pass = false;
    } else {
        $('#error-taxId').addClass("hide")
    }

    if ('' == $('#address').val()) {
        address.focus()
        $('#error-address').removeClass("hide")
        pass = false;
    } else {
        $('#error-address').addClass("hide")
    }

    if ('' == $('#companyName').val()) {
        companyName.focus()
        $('#error-companyName').removeClass("hide")
        pass = false;
    } else {
        $('#error-companyName').addClass("hide")
    }

    if ('' == $('#companyId').val()) {
        companyId.focus()
        $('#error-companyId').removeClass("hide")
        pass = false;
    } else {
        $('#error-companyId').addClass("hide")
    }

    if ('0' == $('#companyType').val()) {
        companyType.focus()
        $('#error-companyType').removeClass("hide")
        pass = false;
    } else {
        $('#error-companyType').addClass("hide")
    }

    return pass;
} // end validate