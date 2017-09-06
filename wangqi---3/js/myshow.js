$(function () {
	var userId = sessionStorage.getItem("userid") || localStorage.getItem("userid");
	$("footer div").on("tap",function() {
		//alert($(this).index())
		$(this).addClass("active-div").siblings().removeClass();
		switch($(this).index()){
			case 0:
				//location.href = "index.html";
				break;
			case 1:
				location.href = "prolist.html";
				break;
			case 2:
				if (userId) {
					location.href="cart.html"
				} else{
					location.href = "login.html";
				}
				break;
			case 3:
				if (userId) {
					location.href="myshow.html"
				} else{
					location.href = "login.html";
				}
				break;
		}
	})
})