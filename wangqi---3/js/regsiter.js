$(function () {
	$("#_user").on("change",function () {
		var reg = /^\w{6,20}$/;
		if (reg.test($(this).val()) == false) {
			showWarn("用户名为6-20位数字字母下划线");
		}
	})
	$("#_password").on("change",function () {
		var reg1 = /^\w{6,20}$/;
		if (reg1.test($(this).val()) == false) {
			showWarn("密码为6-20位数字字母下划线");
		}
	})
	$("#test_pass").on("change",function () {
		if ($(this).val() != $("#_password").val()) {
			showWarn("两次输入的密码不一致");
		}
	})
	
	$("#reg_now").on("tap",function () {
		//alert(2)
		if (/^\w{6,20}$/.test($("#_user").val()) && /^\w{6,20}$/.test($("#_password").val()) && $("#test_pass").val() == $("#_password").val()) {
			var status = "register";
			var userID = $("#_user").val();
			var password = $("#_password").val();
			$.ajax({
				"type":"get",
				"url":"http://datainfo.duapp.com/shopdata/userinfo.php",
				"data":"status=register&userID="+userID+"&password="+password,
				"success":function (data) {
					//console.log(data);
					if (data == 0) {
						showWarn("用户名已经存在");
					} else if(data == 2){
						showWarn("数据异常，请重试");
					}else if (data == 1) {
						window.location.href = "login.html";
					}
				}
			});
		}else{
			showWarn("请完善您的信息");
		}
	})
	
	
	function showWarn(warnMsg) {
		$("#wrong_warn").html(warnMsg).css("opacity","1").animate({
			"opacity":"0"
		},2500)
	}
	
})