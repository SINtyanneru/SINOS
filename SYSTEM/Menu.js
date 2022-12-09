var Menu_Mode = false;
var Menu_AppList = [{"ID":"3MOKU","NAME":"三目並べ","VOID":"sanmoki_Start();"},{"ID":"ControlPanel","NAME":"設定","VOID":"controlPanel_Start();"},{"ID":"FILEMAN","NAME":"ファイルマネージャー","VOID":"FILEMANAGER_start();"},{"ID":"Tours","NAME":"SINOSツアー","VOID":"sinos_tours_Start();"},{"ID":"TEXTEDITOR","NAME":"テキストエディター","VOID":"TEXTEDITOR_Start('NONE','');"},{"ID":"TARMINAL","NAME":"ターミナル","VOID":"TARMINAL_Start();"},{"ID":"RumiWebBrowser","NAME":"るみうぇぶぶらうざ","VOID":"RWB_Start();"}];

function Menu_OC(){
	const Menu = document.getElementById("MENU");

	if(!Menu_Mode){
		Menu.classList.add("open");

		DashBord_Close();

		Menu_Mode = true;
	}else{
		Menu.classList.remove("open");
		Menu_Mode = false;
	}
}

function Menu_Close(){
	if(Menu_Mode){
		const Menu = document.getElementById("MENU");

		Menu.classList.remove("open")
		Menu_Mode = false;
	}
}

function Menu_AppList_Reload(){
	const AppList_Element = document.getElementById("APPLIST");

	Menu_AppList.forEach(element => {
		AppList_Element.innerHTML += "<DIV class=\"APPLIST_ITEM\" onclick=\"" + element.VOID + " Menu_OC();\"> <IMG width=\"16\" src=\"./ETC/" + element.ID +"/ICON.png\">" + element.NAME + "</DIV>"
	});
}

setInterval(function(){
	var DATE_TIME = new Date();

	var YEAR = DATE_TIME.getFullYear();
	var MONTH = DATE_TIME.getMonth()+1;
	var DATE = DATE_TIME.getDate();
	var HOUR = DATE_TIME.getHours();
	var MIN = DATE_TIME.getMinutes();
	var SEC = DATE_TIME.getSeconds();

	document.getElementById("MENUBAR_CLOCK").innerHTML = YEAR + "年" + MONTH + "月" + DATE + "日<BR>" + HOUR + "時" + MIN + "分" + SEC + "秒";
}, 100);

window.addEventListener('load', function(e){
	Menu_AppList_Reload();
}, false);