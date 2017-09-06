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
	
	
	
	
	var totalNum = 0;
	var totalPrice = 0;
	
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getCar.php?userID="+userId,
		async:true,
		dataType:"jsonp",
		success:function(data) {
			//console.log(data)
			if (data == '0') {
				window.location.href = "login.html";
			} else{
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/shopdata/getCar.php?userID="+userId,
					async:true,
					dataType:"jsonp",
					success:function(data) {
						//console.log(data.length);
						//console.log(data);
						
						if (data =='0') {
							$(".total em,.total i").text("0");
						}else{
							for (var i in data) {
								var buyNum = parseInt(data[i].number);
								totalNum += buyNum;
								 
								var $price = parseFloat(data[i].price);
								var $total = buyNum * $price;
								totalPrice += $total;
								//console.log(totalPrice)
								var str = '<div class="pro-list" id=" '+ data[i].goodsID +' ">'+
												'<dl>'+
													'<dt><img src="'+ data[i].goodsListImg +'"/></dt>'+
													'<dd class="allinfo">'+
														'<p class="this-name">'+ data[i].goodsName +'</p>'+
														'<p class="this-price">'+ '单价：￥' + data[i].price +'</p>'+
														'<p class="this-num">'+
															'<a href="javascript:;" class="jian">-</a>'+
															'<input type="text" id="" value="'+ data[i].number +'" disabled="disabled"/>'+
															'<a href="javascript:;" class="crease">+</a>'+
														'</p>'+
													'</dd>'+
													'<dd class="dele">'+
														'<span class="fa fa-trash"></span>'+
													'</dd>'+
												'</dl>'+
											'</div>'
								$(".main-main").append(str);
								
								var h = $(".pro-list").height() * ($(".pro-list").length + 2);
								//console.log(h);
								$(".main-main").css("height",h-40+"px");
								var myscroll = new IScroll("#main",{
									scrollX:false,
									scrollY:true
									//mouseWheel:true
								})
							}
						}
						
						$(".total em").text(totalNum);
						$(".total i").text("￥" + totalPrice);
				
						//删除事件
						$(".dele span").on("tap",function(){
							var inde = $(".dele span").index(this);
							var goodsID = $(".pro-list").eq(inde).attr("id");
							//console.log(goodsID);
							
							$.ajax({
								type:"get",
								url:"http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userId+"&goodsID="+goodsID+"&number=0",
								async:true,
								success:function(data){
									window.location.reload();
								}
							});
						})
						
						//增加事件
						
						$(".crease").on("tap",function() {
							var index1 = $(".crease").index(this);
							var goodsID1 =$(".pro-list").eq(index1).attr("id");
							
							var buyNum = parseInt($(".this-num input").eq(index1).val());
							buyNum++;
							$(".this-num input").eq(index1).val(buyNum);
							$.ajax({
								type:"get",
								url:"http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userId+"&goodsID="+goodsID1+"&number="+buyNum,
								async:true,
								success:function(data) {
									window.location.reload();
								}
							});
						})
						
						//减少事件
						
						$(".jian").on("tap",function() {
							var index2 = $(".jian").index(this);
							var goodsID2 = $(".pro-list").eq(index2).attr("id");
							
							var buyNum2 = parseInt($(".this-num input").eq(index2).val());
							buyNum2--;
							$(".this-num input").eq(index2).val(buyNum2);
							
							$.ajax({
								type:"get",
								url:"http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userId+"&goodsID="+goodsID2+"&number="+buyNum2,
								async:true,
								success:function(data) {
									window.location.reload();
								}
							});
						})
					}
				});
			}
		}
	});
	
	
	
})