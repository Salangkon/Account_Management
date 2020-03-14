function login() {
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
                window.location.href = "/";
            } else {
                alert("กรุณา login")
            }
        }
    });

}