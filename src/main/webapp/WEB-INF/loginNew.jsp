<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Account Login</title>
    <link href="/css/loginNew.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="/data-table/js/jquery-3.3.1.js" type="text/javascript"></script>
</head>

<body>
    <div class="hero">
        <div class="form-box">
            <div class="button-box">
                <div id="btn"></div>
                <button type="button" class="toggle-btn" onclick="login()">Login</button>
                <button type="button" class="toggle-btn" onclick="register()">Register</button>
            </div>
            <div id="login" class="input-group">
                <div class="input-container">
                    <i class="fa fa-user icon"></i>
                    <input class="input-login" type="text" id="id" placeholder="Username">
                </div>
                <div class="input-container">
                    <i class="fa fa-key icon"></i>
                    <input class="input-login" type="password" id="password" placeholder="Password">
                </div>
                <input type="checkbox" class="check-box"><span>Remember Password</span>
                <button type="button" class="submit-btn" onclick="loginUser()">Login</button>
            </div>
            <div id="register" class="input-group">
                <input class="input-field" type="text" id="idReg" placeholder="Username">
                <p class="hide" id="error-idReg">กรุณากรอก Username</p>
                <input class="input-field" type="password" id="passReg" placeholder="Password">
                <p class="hide" id="error-passReg">กรุณากรอก Password</p>
                <input type="text" class="input-field" id="companyReg" placeholder="ชื่อธุรกิจ" style="margin-top: 10px;">
                <p class="hide" id="error-companyReg">กรุณากรอก ชื่อธุรกิจ</p>
                <p class="hide" id="error-position">กรุณาเลือก ตำแหน่ง</p>
                <select class="input-field" style="width: 304px;background-color: aqua;" id="companyTypeReg">
                    <option value="0">ประเภทธุระกิจ</option>
                    <option value="1">นิติบุคคล</option>
                    <option value="2">บุคคลธรรมดา</option>
                </select>
                <p class="hide" id="error-typeReg">กรุณาเลือก ประเภทธุระกิจ</p>
                <input type="text" class="input-field" id="fNameReg" placeholder="ชื่อ">
                <p class="hide" id="error-fNameReg">กรุณากรอก ชื่อ</p>
                <input type="text" class="input-field" id="lNameReg" placeholder="นามสกุล">
                <p class="hide" id="error-lNameReg">กรุณากรอก นามสกุล</p>
                <input type="email" class="input-field" id="emailReg" placeholder="อีเมลล์">
                <p class="hide" id="error-emailReg">กรุณากรอก อีเมลล์</p>
                <input type="tel" class="input-field" id="telReg" placeholder="เบอร์ติดต่อ" maxlength="10" OnKeyPress="return chkNumber(this)">
                <p class="hide" id="error-telReg">กรุณากรอก เบอร์ติดต่อ</p>
                <!-- <input type="checkbox" class="check-box"><span>I Agree to the terms & conditions</span> -->
                <button type="button" class="submit-btn" style="margin-top: 20px;" onclick="registerUser()">Register</button>
            </div>
        </div>
    </div>
    <script src="js/loginNew.js"></script>

</body>

</html>