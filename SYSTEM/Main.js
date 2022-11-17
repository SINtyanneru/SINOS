var SYSTEM_USERNAME = "Default";

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

function WALLPAPER(){
	//背景画像の設定関連

	//背景画像のJSONを取得
	const WALLPAPER_FILEGET = FileTextGet("/CONF/USER/" + SYSTEM_USERNAME + "/DESKTOP.json");
	WALLPAPER_FILEGET.addEventListener("load", (e) => {
		//JSONをJSONぱーす
		const WALLPAPER_JSON = JSON.parse(WALLPAPER_FILEGET.responseText);

		//背景画像の種類
		if(WALLPAPER_JSON.WALLPAPER_TYPE == "SYSTEM"){
			//システムの背景
			this.document.body.style.backgroundImage = ("url(./ETC/WALLPAPER/" + WALLPAPER_JSON.WALLPAPER_URL + ")");
		}else{
			//カスタム背景
			//ファイルのデータをゲット
			var WALLPAPER_DATA = FileDataGet(WALLPAPER_JSON.WALLPAPER_URL);

			WALLPAPER_DATA.addEventListener("load", (e) => {
				//BLOBを作成
				var blob = new Blob([WALLPAPER_DATA.response]);
				console.log(URL.createObjectURL(blob));
				this.document.body.style.backgroundImage = ("url(" + URL.createObjectURL(blob) + ")");
			});
		}

	});
}

//右クリック禁止
document.oncontextmenu = function () {return false;}

window.addEventListener('load', function(e){
	//背景画像読み込みを実行
	WALLPAPER();
	SaveFile("/aaa.txt")
}, false);

window.addEventListener('keypress', function(e){
	console.log(e.keyCode);
}, false);

window.addEventListener('click', function(e){
	console.log("クリック")
	console.log(e.target)
}, false);

window.addEventListener('contextmenu', function(e){
	console.log("右クリック")
	console.log(e.target)
}, false);