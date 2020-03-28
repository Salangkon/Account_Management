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