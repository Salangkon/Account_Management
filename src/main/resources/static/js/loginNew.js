var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

function loginUser() {
    var login = {
        id: $('#id').val(),
        password: $('#password').val(),
    }
    console.log(JSON.stringify(login))
    $.ajax({
        type: 'POST',
        url: '/api-login/login',
        data: JSON.stringify(login),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.res === "pass") {
                window.location.href = "/home-pages";
            } else if(result.res === "ban") {
                alert("username ถูกรงับการใช้งาน!!!")
            }else {
                alert("กรุณา login")
            }
        }
    });
}

function registerUser() {
    var pass = true;
    pass = validateInput();
    console.log("pass :: ", pass);
    if (pass) {
        var register = {
            address: "",
            companyName: $('#companyReg').val(),
            companyType: $('#companyTypeReg').val(),
            department: "1",
            departmentName: "",
            departmentPass: "",
            logo: "logo20200412.png",
            tel: $('#telReg').val(),
            taxId: "",
            users: [{
                id: $('#idReg').val(),
                password: $('#passReg').val(),
                fName: $('#lNameReg').val(),
                lName: $('#lNameReg').val(),
                email: $('#emailReg').val(),
                address: "",
                position: "เจ้าของธุระกิจ",
                tel: "",
                status: "Y",
            }]
        }
        console.log(JSON.stringify(register));
        $.ajax({
            type: "POST",
            url: "/api-login/register",
            data: JSON.stringify(register),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.res == 'pass') {
                    var login = {
                        id: register.id,
                        password: register.password,
                    }
                    console.log(JSON.stringify(login))
                    $.ajax({
                        type: 'POST',
                        url: '/api-login/login',
                        data: JSON.stringify(login),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            if (result.res === "pass") {
                                window.location.href = "/setting";
                            }
                        }
                    });
                } else if (result.res == 'user') {
                    alert('user นี้!! มีในระบบแล้ว')
                } else {
                    alert('บันทึก ไม่สำเร็จ..')
                }
            }
        });
    }
}

// validate
function validateInput() {
    var pass = true;
    if ('' == $('#telReg').val()) {
        telReg.focus()
        $('#error-telReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-telReg').addClass("hide")
    }

    if ('' == $('#emailReg').val()) {
        emailReg.focus()
        $('#error-emailReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-emailReg').addClass("hide")
    }

    if ('' == $('#lNameReg').val()) {
        lNameReg.focus()
        $('#error-lNameReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-lNameReg').addClass("hide")
    }

    if ('' == $('#fNameReg').val()) {
        fNameReg.focus()
        $('#error-fNameReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-fNameReg').addClass("hide")
    }

    if ('0' == $('#typeReg').val()) {
        typeReg.focus()
        $('#error-typeReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-typeReg').addClass("hide")
    }

    if ('' == $('#companyReg').val()) {
        companyReg.focus()
        $('#error-companyReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-companyReg').addClass("hide")
    }

    if ('' == $('#position').val()) {
        position.focus()
        $('#error-position').removeClass("hide")
        pass = false;
    } else {
        $('#error-position').addClass("hide")
    }

    if ('' == $('#passReg').val()) {
        passReg.focus()
        $('#error-passReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-passReg').addClass("hide")
    }

    if ('' == $('#idReg').val()) {
        idReg.focus()
        $('#error-idReg').removeClass("hide")
        pass = false;
    } else {
        $('#error-idReg').addClass("hide")
    }
    return pass;
} // end validate

//กรอกได้เฉพราะ ตัวเลข
function chkNumber(ele) {
    var vchar = String.fromCharCode(event.keyCode);
    if ((vchar < '0' || vchar > '9') && (vchar != '.')) return false;
    ele.onKeyPress = vchar;
}