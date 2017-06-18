$(function(){
	$(".loginBtn").click(function(){
		var url = document.URL;//获取网址
		console.log(url);
		var str = url.slice(url.indexOf("un"));//截取账号和密码部分
		console.log(str);
		//将截取的账号和密码是&和=部分，用"",""进行替换
		str = str.replace(/&/g,",");
		str = str.replace(/=/g,",");
		str = str.split(",");//将替换后的字符串用","进行分割，此时已是数组
		console.log(str);
		//账号密码的正则验证
		var str1 = /^[a-z0-9_-]{6,16}$/;
		var reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
	    var loginName=$(".loginName").val();
	    var psw = $(".psw").val();
	    // console.log(loginName);
	    // console.log(psw);
	    // console.log(str[0]);
	    // console.log(str[1]);
	    // console.log(str[2]);
	    // console.log(str[3]);
	    if (str1.test(psw)&&reg.test(loginName)&&loginName===str[1]&&psw===str[3]) 
	    	{
	    		console.log(loginName);
	    console.log(psw);
	    		alert("登录成功");
	    	}else{
	    		alert("登录失败，请重新登录！");
	    		return;
	    	}
	})


 // 点击注册跳转注册页面
 $(".regiBtn").click(function(){
 	window.location.href="register.html";
 })
})

 // 找回密码
 $(function(){
 	$(".huoquma").click(function(){
 		var num03 = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
 		if (!num03.test($(".shoujiIn").val())) 
 			{
 				alert("输入手机号格式错误！");
 			}else{
 				$.get("http://juhuituan.boguyuan.com/juhuituan/smsApp?action=sendCode&acode=1&un="+$(".shoujiIn").val()+"&loginType=1&type=2",function(data){
                    data=JSON.parse(data);
                    alert("您的验证码为:"+data.sdCode);
                    $(".shuru01").css("display","none");
                    $(".shuru02").css("display","block");
                    $(".first_step").css("display","none");
                    $(".second_step").css("display","block");


                    $(".tijiaoma").click(function(){
                    	if ($(".shurugain").val()!==data.sdCode) 
                    		{
                    			alert("验证码输错误！");
                    		}else{
                    			$.get("http://juhuituan.boguyuan.com/juhuituan/loginApp?action=reg&acode=1&un="+$(".shoujiIn").val()+"&mcode="+data.sdCode,function(data){
                    				// console.log(data);
                    				var newData=JSON.parse(data);
                    				// console.log(newData.data.uid);
                    				reset(newData.data.uid);
                    				// return newData;
                    			})
                    			$(".shuru01").css("display","none");
                    			$(".shuru02").css("display","none");
                    			$(".shuru03").css("display","block");
                    			$(".first_step").css("display","none");
                                $(".second_step").css("display","none");
                                $(".third_step").css("display","block");
                                function reset(newData){
                                	$(".genggaima").click(function(){
                                		console.log(newData);
                                		$.get("http://juhuituan.boguyuan.com/juhuituan/loginApp?action=pwd&acode=1&uid="+newData+"&pwd="+$(".shemima").val()+"&repwd="+$(".chongshe").val(),function(data){
		                                	if ($(".shenum").val()!==$(".shoujiIn").val()) 
		                                		{
		                                			alert("输入手机号错误！");
		                                		}else{
		                                			var num04 = /^[a-z0-9_-]{6,16}$/;
		                                			if (!num04.test($(".shemima").val())) 
		                                				{
		                                					alert("密码格式错误！请重新输入");
		                                				}else if ($(".chongshe").val()!==$(".shemima").val())
		                                				{
		                                                   alert("两次输入密码不一致，请重新输入");
		                                				}else{
		                                					alert("更改密码成功！");
		                                					// document.location.href="login.html";
		                                				}

		                                			}   

                                		})
                                })
                    		}

                    	}	
                    })
 				})
 	    }
    })
 })
