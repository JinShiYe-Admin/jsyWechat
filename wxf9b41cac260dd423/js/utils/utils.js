//出错的监听
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	console.log("---ERROR---start---");
	console.log("错误信息-0:" + JSON.stringify(errorMessage.detail));
	console.log("错误信息-1:" + errorMessage);
	console.log("出错文件:" + scriptURI);
	console.log("出错行号:" + lineNumber);
	console.log("出错列号:" + columnNumber);
	console.log("错误详情:" + errorObj);
	console.log("---ERROR---end---");
}

//公共方法
var utils = (function(mod) {
	mod.getUUID = function() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for(var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	}
	//判断是否安卓系统
	mod.isAndroid = function() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		return isAndroid;
	}
	//判断是否ios系统
	mod.isiOS = function() {
		var u = navigator.userAgent;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return isiOS;
	}

	/**
	 * 获取url中的数据
	 * @param {String} url
	 */
	mod.getDataFromUrl = function(url) {
		var data = {};
		var index = url.indexOf("&");
		if(index != -1) {
			let nUrl=url.split('#')[0]
			let dataStr = nUrl.substring(index + 6, nUrl.length);
			data = JSON.parse(decodeURIComponent(dataStr));
		}
		return data;
	}

	/**
	 * 用mui打开一个页面，通过url传递数据
	 * @param {String} url 路径
	 * @param {Object} data 数据对象
	 */
	mod.mOpenWithData = function(url, data) {
		data = data || {};
		var ids = url.split("/");
		var dataStr = JSON.stringify(data);
		console.log("mOpen " + url + ' ' + dataStr);
		mui.openWindow({
			url:url + "?v=" + Math.random() + "&data=" + encodeURIComponent(dataStr).replace(/\'/g, "’"),
			id:ids[ids.length - 1],
			styles:{
				statusbar:{
					background: "#00CFBD"
				}
			},
			// show:{
			// 	aniShow:'fade-in'
			// }
		});
	}

	/**
	 * 用window打开一个页面，通过url传递数据
	 * @param {String} url 路径
	 * @param {Object} data 数据对象
	 */
	mod.wOpenWithData = function(url, data) {
		data = data || {};
		var ids = url.split("/");
		var dataStr = JSON.stringify(data);
		console.log("wOpen " + url + ' ' + dataStr);
		window.open(url + "?v=" + Math.random() + "&data=" + encodeURIComponent(dataStr), ids[ids.length - 1]);
	}

	/**
	 *初始化mui的scrollY
	 * @param {Object} muiString
	 */
	mod.muiInitScrollY = function(muiString) {
		muiString = muiString || ".mui-scroll-wrapper";
		mui(muiString).scroll({
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			indicators: true, //是否显示滚动条
			deceleration: 0.003, //阻尼系数,系数越小滑动越灵敏
			bounce: true, //是否启用回弹
		});
	}

	/**
	 * 判断数据是否是undefined，null,""
	 * @param {Object} data
	 */
	mod.checkData = function(data) {
		if(data !== undefined && data !== null && data !== "") {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 给头像添加默认值
	 * @param {Object} string 传过来的头像url
	 * @param {Object} flag 当前调用界面对于默认头像的层级关系
	 */
	mod.updateHeadImage = function(string, flag) {
		var tempStr = '';
		//判断img是否为null，或者空
		if(string == '' || string == null || string == 'null' || string == undefined) { //赋值
			switch(flag) {
				case 0:
					tempStr = '../../img/utils/default_personalimage.png';
					break;
				case 1:
					tempStr = '../../img/utils/default_personalimage.png';
					break;
				case 2:
				default:
					tempStr = '../../img/utils/default_personalimage.png';
					break;
				case 3:
					tempStr = '../../img/utils/default_personalimage.png';
					break;
			}
		} else {
			tempStr = string;
		}
		return tempStr;
	}

 

	/**
	 * href 打开一个页面，并保存SessionStorage数据
	 * @param {Object} data
	 */
	mod.hrefSessionStorage = function(url, data) {
		var sKey = new Date().getTime() + "" + parseInt(Math.random() * 1000);
		store.set(sKey, JSON.stringify(data));
		location.href = url + "?sKey=" + sKey;
	}

	/**
	 * 通过url中的sKey,获取SessionStorage数据
	 * @return data
	 */
	mod.getSessionStorageByUrlsKey = function() {
		var search = location.search.toString();
		var keyword = "?sKey=";
		var index = search.indexOf(keyword);
		if(index != -1) {
			var sKey = search.substring(index + keyword.length);
			var sValue = store.get(sKey)
			if(sValue) {
				var obj = JSON.parse(sValue);
				return obj;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	/**
	 * 获取url中的key值
	 * @param {Object} key
	 */
	mod.getValueFromUrlByKey = function(key) {
		var search = location.search.toString();
		var keyword = "?" + key + "=";
		var index = search.indexOf(keyword);
		if(index != -1) {
			var value = search.substring(index + keyword.length);
			return value;
		} else {
			return null;
		}
	}

	/**
	 * 当前时间+随机数
	 */
	mod.timeAndRandom = function() {
		var value = new Date().getTime() + "" + parseInt(Math.random() * 1000);
		return value;
	}

	/**
	 * 判断是安卓还是苹果系统
	 */
	mod.getSystem = function() {
		var userAgent = window.navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("iphone") != -1) {
			return "iOS";
		}
		if(userAgent.indexOf("ipod") != -1) {
			return "iOS";
		}
		if(userAgent.indexOf("ipad") != -1) {
			return "iOS";
		}
		if(userAgent.indexOf("android") != -1) {
			return "Android";
		}
		return "unknown";
	}
	/**
	 * 	获取参数
	 * @param {Object} url_string
	 * @param {Object} param
	 */
	mod.getUrlParam = function(url_string, param) {
		if(!url_string) {
			url_string = location.href;
		}
		try {
			var eurl = new URL(url_string);
			return eurl.searchParams.get(param);
		} catch(e) {
			param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + param + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(url_string);
			return results == null ? null : results[1];
		}
	}

	return mod;
})(window.utils || {});