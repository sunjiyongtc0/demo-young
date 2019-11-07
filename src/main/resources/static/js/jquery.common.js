var timer = setInterval("myInterval()",1000);//10毫秒
function myInterval() {
	//var frame = top.mainFrame.document.getElementById("iframepage");//整合NQS使用
	var frame = top.document.getElementById("iframepage");
	if(frame){
		var subWeb = frame.contentDocument || frame.contentWindow.document;;
		//var wh = $(top.window).height()-120;//整合NQS使用
		var wh = $(top.window).height()-110;
		if(subWeb.body && subWeb.body.scrollHeight != frame.height){
			var fh = subWeb.body.scrollHeight;
			frame.height = (fh < wh) ? wh : fh;
		}
	}
}
/**
 * 获取当前用户的所有权限关键字
 */
function getGlobalAuths(){
	$.ajax({
		url:path+"/pdc_Role/listJsonUserRoleResourcesAuthSigns",
		async:false,
		success:function(data){
			
			//页面点击退出后data是<script>top.location.href='frame/login/Login_index.jsp'</script> 
			if (data.indexOf("script") == -1) {
				
				top.GlobalAuths = eval(data);
			}
		},
		failure:function(){
			$.dialog.error("程序出现错误，请联系管理员！");
		}
	});
}

function hasAuthority(authority){
	if(top.GlobalAuths == null || top.GlobalAuths.length == 0){
		getGlobalAuths();
	}
	if(authority && top.GlobalAuths != null 
			&& $.inArray(authority, top.GlobalAuths) != -1){
		return true;
	}else{
		return false;
	}
}

/*
function SetCwinHeight(iframeObj){
	if (document.getElementById){  
		if (iframeObj && !window.opera){  
    		if (iframeObj.contentDocument && iframeObj.contentDocument.body.offsetHeight){  
     			iframeObj.height = iframeObj.contentDocument.body.offsetHeight;  
    		}else if(document.frames[iframeObj.name].document && document.frames[iframeObj.name].document.body.scrollHeight){  
     			iframeObj.height = document.frames[iframeObj.name].document.body.scrollHeight;  
    		}  
   		}  
  	} 
}*/