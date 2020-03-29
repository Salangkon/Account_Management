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
                $('#f_name').val(msg.f_name),
                $('#l_name').val(msg.l_name),
                $('#email').val(msg.email),
                $('#company').val(msg.company),
                $('#address').val(msg.address),
                $('#position').val(msg.position),
                $('#tel').val(msg.tel),
                $('#type').val(msg.type),
                $('#status').val(msg.status),
                $('#taxId').val(msg.taxId)
                if (msg.department == 1) {
					document.getElementById("department1").checked = true;
                    document.getElementById("department").hidden = true;
				} else {
					document.getElementById("department2").checked = true;
					document.getElementById("department").hidden = false;
				}
                // $('#logo').val(msg.logo),
        }
    })
}

function CheckOffice(department) {
	if (department == 1) {
		document.getElementById("department").hidden = true;
	} else {
		document.getElementById("department").hidden = false;
	}
	console.log("CheckOffice :: " + officeType);
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