var SYSTEM_USERNAME = "LOGINUI";

/** Dialog(メッセージ, レベル)
 * レベル0 => ただのメッセージ
 * レベル1 => エラー表示
 * @param MSG 表示するメッセージ
 * @param TITLE 表示するタイトル
 * @param LEVEL ダイアログのレベル
 * */
function Dialog(MSG, TITLE, LEVEL){
	switch(LEVEL){
		case 0:
			PlaySound("/ETC/SOUND/SINOS_NOTIFY_SOUND.wav");
			alert(MSG);
			break;
		case 1:
			PlaySound("/ETC/SOUND/SINOS_ERR_SOUND.wav");
			alert(MSG);
			break;
	}
}

function MENUBAR_OC(MODE){
	if(MODE == 0){
		document.getElementById("MENUBAR").style.display = "none";
	}else{
		document.getElementById("MENUBAR").style.display = "block";
	}
}

function PERSONAL_SETTING_LOAD(){
	WALLPAPER();
	MenuBar_RELOAD();
	TILE_RELOAD();
}

function WALLPAPER(){
	BOOT_LOG("[ *** ]Wall Paper Settings...");
	//背景画像の設定関連
	try{
		//背景画像のJSONを取得
		const WALLPAPER_FILEGET = FileTextGet("/CONF/USER/" + SYSTEM_USERNAME + "/DESKTOP.json");
		//JSONをJSONぱーす
		const WALLPAPER_JSON = JSON.parse(WALLPAPER_FILEGET);
		//背景画像の種類
		if(WALLPAPER_JSON.WALLPAPER_TYPE == "SYSTEM"){
			//システムの背景
			this.document.body.style.backgroundImage = ("url(./ETC/WALLPAPER/" + WALLPAPER_JSON.WALLPAPER_URL + ")");

		}else{
			//カスタム背景
			//ファイルのデータをゲット
			var WALLPAPER_DATA = FileDataGet(WALLPAPER_JSON.WALLPAPER_URL);
			BOOT_LOG("[ OK ]WP File Get:" + WALLPAPER_JSON.WALLPAPER_URL);
			//BLOBを作成
			var bin = atob(WALLPAPER_DATA.replace(/^.*,/, ''));
			var buffer = new Uint8Array(bin.length);
			BOOT_LOG("[ OK ]WP Created buffer");
			for (var i = 0; i < bin.length; i++) {
				buffer[i] = bin.charCodeAt(i);
			}

			//BLOBを作成
			var blob = new Blob([buffer.buffer]);
			BOOT_LOG("[ OK ]Created WP Blob:" + URL.createObjectURL(blob));
			this.document.body.style.backgroundImage = ("url(" + URL.createObjectURL(blob) + ")");
			BOOT_LOG("[ OK ]Set WP");
		}

		BOOT_LOG("[ OK ]WP Setting Compleat!");

		//ログインしてないので、こうする
		if(SYSTEM_USERNAME == "LOGINUI"){
			//通常だと、ログアウト時にも2000ms待ってしまうので、ここでログアウトされたかをチェック
			if(LOGINUI_LOGOUT_ == false){
				//現時点では、ここで読み込み終了なのでここで止める
				setTimeout(function(){BOOT_CL();},2000);
			}
		}
	}catch(e){
		BOOT_LOG("[ Error ]Window Reload...");
		window.location.reload();
	}
}

var CONTEXTMENU;

//右クリック禁止
document.oncontextmenu = function () {return false;}

window.addEventListener('load', function(e){
	//背景画像読み込みを実行
	WALLPAPER();

	CONTEXTMENU = document.getElementById("CONTEXTMENU");
}, false);

window.addEventListener("keydown", function(e){
	console.log(e.key);
	console.log(e.ctrlKey);
	console.log(e.altKey);
	console.log(e.shiftKey);
	if(e.key == "t" || e.key == "T"){
		if(e.ctrlKey){
			if(e.altKey){
				if(LOGIN){//ログインしてるう？
					TARMINAL_Start();
				}
			}
		}
	}


	if(e.key == "Enter"){
		if(e.ctrlKey){
			if(e.altKey){
				if(e.shiftKey){
					if(LOGIN){//ログインしてるう？
						VOIDRUN_Start();
					}
				}
			}
		}
	}
}, false);

window.addEventListener('click', function(e){
	console.log("クリック")
	console.log(e.target)

	if(e.target.id != "CONTEXTMENU"){
		CONTEXTMENU_EXIT();
	}
}, false);

window.addEventListener('contextmenu', function(e){
	console.log("右クリック");
	console.log(e.target);

	//右クリックした場所
	if(e.target.id == "DESKTOP_BACKGROUND"){
		//デスクトップのコンテキストメニュー
		CONTEXTMENU_EDIT("デスクトップ");
		CONTEXTMENU_SHOW();
	}else if(e.target.id == "MENUBAR"){
		//メニューバーのコンテキストメニュー
		CONTEXTMENU_EDIT("メニューバー");
		CONTEXTMENU_SHOW();
	}
}, false);

function CONTEXTMENU_EDIT(CONTENTS){
	CONTEXTMENU.innerHTML = CONTENTS;
}

function CONTEXTMENU_SHOW(){
	CONTEXTMENU.style.display = "block";
	CONTEXTMENU.style.left = event.clientX + "px";	//位置を調整
	CONTEXTMENU.style.top = event.clientY + "px";		//位置を調整
}

function CONTEXTMENU_EXIT(){
	CONTEXTMENU.style.display = "none";
}

async function sha256(str) {
	// Convert string to ArrayBuffer
	const buff = new Uint8Array([].map.call(str, (c) => c.charCodeAt(0))).buffer;
	// Calculate digest
	const digest = await crypto.subtle.digest('SHA-256', buff);
	// Convert ArrayBuffer to hex string
	// (from: https://stackoverflow.com/a/40031979)
	return [].map.call(new Uint8Array(digest), x => ('00' + x.toString(16)).slice(-2)).join('');
}