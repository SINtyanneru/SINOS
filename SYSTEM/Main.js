var Menu_Mode = false;


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

/** Dialog(メッセージ, レベル)
 * レベル0 => ただのメッセージ
 * レベル1 => エラー表示
 * @param MSG 表示するメッセージ
 * @param TITLE 表示するタイトル
 * @param LEVEL ダイアログのレベル
 * */
function Dialog(MSG, TITLE, LEVEL){
	alert(MSG);
}

window.addEventListener('keypress', function(e){
	console.log(e.keyCode);
}, false);