$(function () {

	
	var id = GetQueryString("goodsid");
	
	var userId = sessionStorage.getItem("userid") || localStorage.getItem("userid");
	//console.log(userId);

	goodsInfo(id);
	function goodsInfo (id) {
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?goodsID="+id,
			async:true,
			dataType:"jsonp",
			success:function (info) {
				//console.log(info);
				var str = JSON.parse(info[0].imgsUrl);
				//console.log(str);
				for (var i in str) {
					var div = $("<div class='swiper-slide slide" + (parseInt(i) + 1)+"'></div>");
					//console.log(div);
					$("#detail-main .swiper-wrapper").append(div);
					var $img = $("<img/>");
					$img.attr("src",str[i]);
					div.append($img);
					$('.goodsname').html(info[0].goodsName);
					$('.price').html("￥"+info[0].price);
					$('.buynum').html("购买人数："+info[0].buynumber);
					
				}
				
				var swiper = new Swiper(".swiper-container",{
					loop:true,
					autoplay:'2000',
					speed:1000,
					pagination: '.swiper-pagination'
				})	
			}
		});
	}
	
	
	
	
	//点击加入购物车
	var count = 0;
	//console.log(id);
	
	$("#add_cart").on("tap",function() {
		if (!userId) {
			window.location.href = "login.html";
		}else{
			if ($(id).val()) {
				console.log($(id).val())
				count = $(id).val();
			}
			//console.log($(id))
			count++;
			
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php?userID="+ userId +"&goodsID="+ id +"&number=" + count,
				async:true,
				success:function (data) {
					//console.log(data);
					//console.log(count);
				}
			});
		}
	})
	
	$("#cart-btn").on("tap",function() {
		if (userId) {
			window.location.href = "cart.html";
		} else{
			window.location.href = "login.html";
		}
	})
	
})