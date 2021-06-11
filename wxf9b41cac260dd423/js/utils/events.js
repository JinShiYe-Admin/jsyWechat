//公共方法js
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	console.log("错误信息-0:", errorMessage.detail);
	console.log("错误信息-1:" + errorMessage);
	console.log("出错文件:" + scriptURI);
	console.log("出错行号:" + lineNumber);
	console.log("出错列号:" + columnNumber);
	console.log("错误详情:" + errorObj);
	var webUrl = window.location.toString();
	var ids = webUrl.split("/");
	var webId = ids[ids.length - 1];
	var showAlert = false;
	 
	var isMuiLazyError = false; //是否是mui懒加载的BUG
	if (errorMessage.detail != undefined) {
		//mui懒加载的BUG的判断逻辑
		if (errorMessage.detail["element"] != undefined && errorMessage.detail["uri"] != undefined) {
			if (errorMessage.detail["element"]["_mui_lazy_width"] != undefined || errorMessage.detail["element"][
					"_mui_lazy_height"
				] != undefined) {
				isMuiLazyError = true;
			}
		}
	}
	if (!scriptURI) {
		return;
	}
}

var events = (function(mod) {

	mod.click = false; //是否是点击状态
	mod.clickTime = 1000; //点击持续时间，默认1秒

	//判断输入字符串是否为空或者全部都是空格
	mod.isNull = function(str) {
		if (str == "") return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}

	 
	/**
	 * 获取样式
	 */
	mod.getNavBarStyle = function(navBarStyle) {
		var extraStyle = {
			backgroundColor: "#13b7f6",
			titleColor: "#FFFFFF",
			backButton: {
				color: "#FFFFFF",
				colorPressed: "#0000FF"
			}
		}
		mui.extend(navBarStyle, extraStyle);
		return mui.extend({
			navigationbar: navBarStyle
		}, mod.getWebStyle());
	}
	  


	var lastCallTime = 0
	var timeOut;
	/**
	 * 返回一个等待框
	 */
	mod.showWaiting = function(string) {
		clearTimeout(timeOut);
		let times = 30000;
		let title = '加载中...';
		if (string) {
			times = 120000;
			title = string;
		}
		addToast(title);
		$('#loadingToast').fadeIn(100);
		timeOut=setTimeout(function() {
			events.closeWaiting();
		}, times);
		return $('#loadingToast')
	}
	
	function addToast(string){
		let str=string?string:"加载中..."
		if($('#loadingToast')[0]){
			$('#loadingToast-text')[0].innerHTML=str
		}else{
			let html="<div id='loadingToast' style='display: none;'>"+
				"<div class='weui-mask_transparent'></div>"+
				"<div class='weui-toast'>"+
					"<span class='weui-primary-loading weui-icon_toast'>"+
					 " <span class='weui-primary-loading__dot'></span>"+
					"</span>"+
					"<p id='loadingToast-text' class='weui-toast__content'>"+str+"</p>"+
				"</div>"+
			"</div>"
			let toast_div = document.createElement("div");  
			toast_div.id='toast'
			document.body.appendChild(toast_div);
			let toast=document.getElementById("toast")
			toast.innerHTML=toast.innerHTML+html
		}
	}
	// function removeToast(){
	// 	let toast=document.getElementById("loadingToast")
	// 	toast.parentNode.removeChild(toast)
	// }

	/**
	 * 关闭一个或所有的等待框
	 */
	mod.closeWaiting = function(waiting) {
		clearTimeout(timeOut);
		if (waiting) {
			waiting.fadeOut(100);
		} else {
			$('#loadingToast').fadeOut(100);
		}
		// removeToast();
	}

	 
	/**
	 *
	 * @param {Object} title 标题
	 * @param {Object} hint 提示语
	 * @param {Object} callback 确认回调
	 * @param {Object} cancelLog 取消打印信息
	 */
	mod.setDialog = function(title, hint, callback, cancelLog) {
		var btnArray = ['否', '是'];
		mui.confirm(hint, title, btnArray, function(e) {
			if (e.index == 1) {
				callback();
			} else {
				mui.toast(cancelLog)
			}
		}, "div");
	}
 
	/**
	 * 默认webview的样式
	 * @param {Object} path  webView的id或者路径
	 */
	mod.getWebStyle = function(path) {
		var styles = {
			top: '0px',
			bottom: '0px',
			softinputMode: "adjustResize",
			hardwareAccelerated: false
		};
		if (path) {
			var ids = path.split('/');
			var id = ids[ids.length - 1];
			//安卓中video标签播放视频需要开启硬件加速
			//1.求知问题详情页
			//2.微课节次详情页
			//3.微课节次单个详情页
			if (id == "qiuzhi-question.html" || id == "course_details.html" || id == "course_section.html" || id ==
				'space-detail.html' || id == 'zone_main.html' || id == "sciedu_show_main.html" || "storage_show_video.html") {
				styles.hardwareAccelerated = true;
			}
			if (id == "show-home1.html") {
				styles.hardwareAccelerated = "auto";
			}
		}
		return styles;
	}
	/**
	 * 禁止使用回车
	 * @param {Object} elem  禁止使用回车的元素
	 */
	mod.fobidEnter = function(elem) {
		elem.onkeydown = function(event) {
			//console.log("键盘输入事件：" + JSON.stringify(event.keyCode))
			if (event.keyCode == 13) {
				return false;
			}
		}
	}

	return mod;

})(events || {});
