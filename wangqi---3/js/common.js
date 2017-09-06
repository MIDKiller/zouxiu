
var storageKey = "zxkey";
var userinfo = null;

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null) return  unescape(r[2]);
     return null;
}

function showErr(msg){
	$("#error").text(msg).animate({
		"top":"50%"
	},1000);
}

function saveStorage(type,key,val){
	if(type=="session")
	{
		sessionStorage.setItem(key,val);
	}
	else{
		localStorage.setItem(key,val);
	}
}

function checkLogin(){
	if(sessionStorage.getItem(storageKey)!=null)
	{
		userinfo = JSON.parse(sessionStorage.getItem(storageKey));
		return userinfo;
		//return sessionStorage.getItem(storageKey);
	}
	if(localStorage.getItem(storageKey)!=null)
	{
		userinfo = JSON.parse(localStorage.getItem(storageKey));
		return userinfo;
		//return localStorage.getItem(storageKey)
	}
	return null;	
}

//$(function(){
//	$("footer div").on("tap",function(){
//		switch ($(this).index()){
//			case 0:
//				location.href = "home.html";
//				break;
//			case 1:
//				location.href = "list.html";
//				break;
//			case 2:
//				location.href = "car.html";
//				break;
//			case 3:
//				location.href = "me.html";
//				break;
//			default:
//				break;
//		}
//		console.log($(this).index());
//	})
//})
