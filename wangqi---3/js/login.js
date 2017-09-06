$(function () {
	
	$("#self").on("click",function () {
		if ($(this).is(":checked")) {
			$(this).parent().css("background-image","url(img/0.jpg)")
		} else{
			$(this).parent().css("background-image","none")
		}
	})
	$("#show").on("click",function () {
		if ($(this).is(":checked")) {
			$(this).parent().css("background-image","url(img/0.jpg)");
			$("#userpass").attr("type","text");
		} else{
			$(this).parent().css("background-image","none");
			$("#userpass").attr("type","password");
		}
	})
	
	$("#login-btn a").on("tap",function () {
		var status = "login";
		var userID = $("#username").val();
		var password = $("#userpass").val();
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:"status=login&userID="+userID+"&password="+password,
			dataType:"html",
			success:function(data) {
				var info = JSON.parse(data);
				//console.log(info)
				if (info == 0) {
					alert("用户名不存在");
				}
				else if (info == 2) {
					alert("用户名和密码不符")
				}
				else{
					if ($("#self").is(":checked")) {
						localStorage.setItem("userid",userID);
						localStorage.setItem("password",password);
					} else{
						sessionStorage.setItem("userid",userID);
						sessionStorage.setItem("password",password);	
					}
					window.location.href = "prolist.html";
				}
			}
		});
	})
})