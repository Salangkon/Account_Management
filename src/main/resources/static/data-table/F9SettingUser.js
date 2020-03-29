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