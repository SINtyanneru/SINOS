var Menu_Mode = false;
var Menu_AppList = [{"ID":"3MOKU","NAME":"三目並べ","VOID":"sanmoki_Start();"},{"ID":"ControlPanel","NAME":"設定","VOID":"controlPanel_Start();"}];

function Menu_OC(){
	const Menu = document.getElementById("MENU");

	if(!Menu_Mode){
		Menu.classList.add("open")
		Menu_Mode = true;
	}else{
		Menu.classList.remove("open")
		Menu_Mode = false;
	}
}

function Menu_AppList_Reload(){
	const AppList_Element = document.getElementById("APPLIST");

	Menu_AppList.forEach(element => {
		AppList_Element.innerHTML += "<DIV class=\"APPLIST_ITEM\" onclick=\"" + element.VOID + " Menu_OC();\"> <IMG src=\"./ETC/" + element.ID +"/ICON.png\">" + element.NAME + "</DIV><HR>"
	});
}

window.addEventListener('load', function(e){
	Menu_AppList_Reload();
}, false);