 /* 长宽占位 rem算法, 根据root的rem来计算各元素相对rem, 默认html 320/20 = 16px */
     function placeholderPic(){
      var w = document.documentElement.offsetWidth;
      document.documentElement.style.fontSize=w/50+'px';
     }
     placeholderPic();
     window.onresize=function(){
      placeholderPic();
     }


 // 验证部分
 
 $(function(){
     
     // 当输入框为空的时候，输入错误
     $(".registerBtn").click(function(){
	  	if ($(".yanzhengNum").val()==""||$(".yanzhenIn").val()==""||$(".regist_mima").val()=="") 
	  		{
	  			alert("输入错误！")
	  		};
	  })

    // 验证的手机号验证
    $(".gainYan").click(function(){
        var num01 = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
	 	console.log($(".yanzhengNum").val());
	 	if (!num01.test($(".yanzhengNum").val())) 
	 		{
	           alert("手机号格式错误！");
	 		}
	 		else{
                $.get("http://juhuituan.boguyuan.com/juhuituan/smsApp?action=sendCode&acode=1&un="+$(".yanzhengNum").val()+"&loginType=1&type=1",function(data){
                    data=JSON.parse(data);
                    // console.log(data.sdCode);
                    $(".yanzhenIn").val(data.sdCode);
                    $(".registerBtn").click(function(){
				    	var num02 = /^[a-z0-9_-]{6,16}$/;
				    	if (!num02.test($(".regist_mima").val())) 
				    		{
				    			alert("格式错误，请输入字母数字6-16位！");
				    		}
				    		else{
				    			$.get("http://juhuituan.boguyuan.com/juhuituan/loginApp?action=reg&acode=1&un"+$(".yanzhengNum").val()+"&pwd="+$(".regist_mima").val()+"&mcode="+data.sdCode,function(data){
				                    alert("注册成功");
				                    window.location.href="login.html?un="+$(".yanzhengNum").val()+"&pwd="+$(".regist_mima").val();
				    			})
				    		}
				    })

                })
	 		}


    })

 })
 