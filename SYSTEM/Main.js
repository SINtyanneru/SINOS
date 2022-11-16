

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

window.addEventListener('load', function(e){
	this.document.body.style.backgroundImage = ("url(./ETC/WALLPAPER/1.png)");

	var ajax = new XMLHttpRequest()

	ajax.open("POST", "http://127.0.0.1/GetFileList/");
	ajax.withCredentials = true;
	ajax.send();
}, false);

window.addEventListener('keypress', function(e){
	console.log(e.keyCode);
}, false);

window.addEventListener('click', function(e){
	console.log(e.target)
}, false);