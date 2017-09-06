$(function () {
	
	var cid = 1;
	var page = 0;
	var direction = 0;
	var type = "init";
	var curTypedId = 0;
	$("#wrapper").height($(window).height()-96);
	var typelist = new IScroll("#typelist",{
		scrollX:true,
		scrollY:false
	})
	var myscroll = new IScroll("#prolist",{
		scrollbars:false,
		mouseWheel:true,
		preventDefault:true,
		probeType:2
	})
	
	//获取商品分类
	function getType () {
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getclass.php",
			//async:true,
			success:function (msg){
				var obj = eval(msg);
				//console.log(obj);
				for (var i = 0;i < obj.length;i++) {
					if (i == 0) {
						cid = obj[i].classID;
						var li = $("<li class='iconfont active' data-classid='"+obj[i].classID+"'>"+obj[i].icon+"<b></b></li>");
						getPro(obj[i].classID);
					} else{
						var li = $("<li class='iconfont' data-classid='"+obj[i].classID+"'>" + obj[i].icon + "<b></b></li>");
					}
					li.on("tap",function () {
						$("#typelist li").each(function () {
							$(this).removeClass("active")
						})
						$(this).addClass("active");
						var classid = $(this).data("classid");
						cid = classid;
						page = 0;
						$("#prolist ul").html("");
						getPro(classid);
					}).appendTo($("#typelist ul"));
				}
				var w = obj.length * 50;
				$("#typelist ul").css("width",w+"px");
				typelist.refresh();
			}
		});
	}
	//获取商品列表
	function getPro (classid) {
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			async:true,
			dataType:"jsonp",
			data:{
				"classID":classid,
				"linenumber":4
			},
			success:function (info) {
				//console.log(info);
				if(info!=0){
					$.each(info,function(i,obj){
						var li = $("<li data-proid='" +obj.goodsID+"'><img src='"+obj.goodsListImg+"'><span>"+obj.goodsName+"</span><strong>￥"+obj.price+"</strong></li>");
						$("#prolist ul").append(li);
					})
				}else{
					var li = $("<li>即将上架</li>");
					$("#prolist ul").append(li);
				}

				var h = $(window).height() - 96;
			
				$("#prolist").css("height",h + "px");
				myscroll.refresh();
				myscroll.scrollTo(0,0);
			}
		});
	}
	
	
	var bottom = 0;
	myscroll.on("scroll",function () {
		//console.log(this.y + "--" + this.maxScrollY);
		if (this.directionY == -1 && this.y < 5) {
			direction = -1;
			
		}else if (this.directionY == 1 && this.y < this.maxScrollY + 5) {
			direction = 1;
			bottom = 1;
			this.refresh();
		}
	})
	
	myscroll.on("scrollEnd",function () {
		if (direction == 1 && bottom == 1) {
			//console.log("加载数据");
			page++;
			upAction(cid);
			
			bottom = 0;
		}
	})
	//上划加载数据
	function upAction (cid) {
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php?classID="+ cid +"&linenumber=4&pageCode="+page,
			async:true,
			dataType:"jsonp",
			success:function (obj) {
				//console.log(obj);
				for(var i in obj) {
					//console.log(i)
					var li = $("<li data-proid='"+obj[i].goodsID +"'><img src='"+obj[i].goodsListImg +"'><span>"+ obj[i].goodsName+"</span><strong>￥"+obj[i].price +"</strong></li>")
					$("#prolist ul").append(li);
				}
			}
		});
	}
	
									
	//跳转到详情页面"
	$("#prolist").on("tap","li",function(){
		location.href = "detail.html?goodsid=" + $(this).data("proid");
	})
	
	
	getType();
	
	
	
	var userId = sessionStorage.getItem("userid") || localStorage.getItem("userid");
	console.log(userId)
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
	
	
	
	$("#cart-btn").on("tap",function() {
		if (userId) {
			window.location.href = "cart.html";
		} else{
			window.location.href = "login.html";
		}
	})
})