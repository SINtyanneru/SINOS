/**
 * 設定アプリ
 */

function controlPanel_Start(){
	var subx = ( screen.availWidth - 600 ) / 2;
	var suby = ( screen.availHeight - 500 ) / 2;

	const Window_element = Window_Create("設定", 0, subx, suby, 700, 500);
	const WIndowID = Window_element.ID;

	controlPanel_HOME(WIndowID);
}

function controlPanel_HOME(WindowID){
	const HomeHTML = ""+
					"<DIV style=\"overflow-y: scroll; width: 100%; height: calc(100% - 55px);\">"+
					"<H1>SINOSの設定</H1>"+
					"SINOSの設定画面だ！！コントロールパネルと言うのは嘘だ！"+
					"<HR>"+
					"<BUTTON onclick=\"controlPanel_mySettings(" + WindowID + ")\">個人用設定</BUTTON>"+
					"<BUTTON onclick=\"controlPanel_UserSetting(" + WindowID + ")\">ユーザー設定</BUTTON>"+
					"</DIV>";

	Window_Contents(HomeHTML,0,WindowID);
}


//個人設定
function controlPanel_mySettings(WindowID){
	//Uncaught SyntaxError: Identifier 'WALLPAPER_JSON' has already been declared (at Main.js:32:7) ←おかしいだろ！WALLPAPER_JSONはグローバル変数、じゃないだろ調子に乗んなクソガキ
	try{
		Window_Contents("読み込み中....",0,WindowID);

		var BGURL = "";
		//背景画像のJSONを取得
		const WALLPAPER_JSONGET = FileTextGet("/CONF/USER/" + SYSTEM_USERID + "/DESKTOP.json");
		//JSONをJSONぱーす
		const WALLPAPER_JSON = JSON.parse(WALLPAPER_JSONGET);
		//背景画像の種類
		if(WALLPAPER_JSON.WALLPAPER_TYPE == "SYSTEM"){
			//システムの背景
			BGURL = "./ETC/WALLPAPER/" + WALLPAPER_JSON.WALLPAPER_URL;
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
			BGURL = URL.createObjectURL(blob);
		}


		//HTML用意
		const MySettingHTML = ""+
						"<DIV style=\"overflow-y: scroll; width: 100%; height: calc(100% - 55px);\">"+
						"<H1>個人設定設定</H1>"+
						"<BUTTON onclick=\"controlPanel_HOME('" + WindowID + "')\">ホームに戻る</BUTTON>"+
						"<HR>"+
						"<IMG id=\"controlPanel_BgFile_Preview_" + WindowID + "\" src=\"" + BGURL + "\" width=\"190px\"><BR>"+
						"<BR>"+
						"ファイルを開いて設定<BR>"+
						"<BUTTON onclick=\"BgImg_Open(" + WindowID + ")\">ファイルを開く</BUTTON><BR>"+
						"<BR>"+
						"SINOSに用意されている画像を設定<BR>"+
						"<BUTTON onclick=\"controlPanel_BgImg_Ch('" + WindowID + "', '','SYS')\">背景画像変更</BUTTON>"+
						"<SELECT id=\"CONTROLPANEL_MSS_" + WindowID + "\" onchange=\"controlPanel_BgImg_Ch_Preview('" + WindowID + "', 'SYS')\"></SELECT>"+
						"</DIV>";
		//そのHTMLを書き込む
		Window_Contents(MySettingHTML,0,WindowID);
	
		//背景画像のJSONを取得
		const WALLPAPERLIST_FILEGET = FileTextGet("/CONF/WALP/WALLPAPER_LIST.json");
		//JSONをJSONぱーす
		const WALLPAPERLIST_JSON = JSON.parse(WALLPAPERLIST_FILEGET);
	
		var SELECT = document.getElementById("CONTROLPANEL_MSS_" + WindowID);

		WALLPAPERLIST_JSON.forEach(element => {
			SELECT.innerHTML += "<OPTION value=\"" + element.FILE + "\">" + element.NAME + "</OPTION>";
		});
	}catch(ex){
		Dialog(ex,"コントロールパネル",1);
	}
}
//背景画像をオープン
function BgImg_Open(WindowID){
	//背景画像変更
	const OFD = OpenFileDialog();

	controlPanel_BgImg_Ch(WindowID, OFD, "CST");

	//ファイルのデータをゲット
	var FILELISTGET = FileDataGet(OFD);
	var bin = atob(FILELISTGET.replace(/^.*,/, ''));
	var buffer = new Uint8Array(bin.length);
	for (var i = 0; i < bin.length; i++) {
		buffer[i] = bin.charCodeAt(i);
	}
	//BLOBを作成
	var blob = new Blob([buffer.buffer], {type: "image/png"});
	var blobUrl = URL.createObjectURL(blob);
	this.document.body.style.backgroundImage = "url(" + blobUrl + ")";
	document.getElementById("controlPanel_BgFile_Preview_" + WindowID).src = blobUrl;
}
//設定変更
function controlPanel_BgImg_Ch(WindowID, PATH, MODE){
	var WIR_JSON = "";
	if(MODE == "CST"){
		WIR_JSON = "{"+
					"\"WALLPAPER_TYPE\":\"USER\","+
					"\"WALLPAPER_URL\":\"" + PATH + "\""+
					"}";

	}else{
		PATH = document.getElementById("CONTROLPANEL_MSS_" + WindowID).value;
		WIR_JSON = "{"+
					"\"WALLPAPER_TYPE\":\"SYSTEM\","+
					"\"WALLPAPER_URL\":\"" + PATH + "\""+
					"}";
		this.document.body.style.backgroundImage = "url(./ETC/WALLPAPER/" + PATH + ")";
	}

	//JSONファイルとして設定を保存
	SaveFile("/CONF/USER/" + SYSTEM_USERID + "/DESKTOP.json", WIR_JSON);
}
//背景画像をプレビュー
function controlPanel_BgImg_Ch_Preview(WindowID, MODE){
	if(MODE == "CST"){
		//背景画像変更プレビュー
		const element = document.getElementById('controlPanel_BgFile_' + WindowID);
		const files = element.files;

		var blobUrl = window.URL.createObjectURL(files[0]);
		document.getElementById("controlPanel_BgFile_Preview_" + WindowID).src = blobUrl;
	}else{
		//背景画像変更プレビュー
		document.getElementById("controlPanel_BgFile_Preview_" + WindowID).src = "./ETC/WALLPAPER/" + document.getElementById("CONTROLPANEL_MSS_" + WindowID).value;
	}
}

//ユーザー設定
function controlPanel_UserSetting(WindowID){
	var USERLIST = "";
	//背景画像のJSONを取得
	const USERLIST_FILEGET = FileTextGet("/CONF/USER/LIST.json");
	//JSONをJSONぱーす
	const USERLIST_JSON = JSON.parse(USERLIST_FILEGET);
	USERLIST_JSON.forEach(element => {
		if(element.ACTIVE == "TRUE"){
			USERLIST += "<BUTTON style=\"width: 100%;\" onclick=\"controlPanel_UserSetting_Setting('" + WindowID + "', '" + element.USERID + "')\">" + element.USERNAME + "</BUTTON>";
		}
	});

	const UserSettingHTML = ""+
					"<DIV style=\"overflow-y: scroll; width: 100%; height: calc(100% - 55px);\">"+
					"<H1>ユーザー設定</H1>"+
					"<BUTTON onclick=\"controlPanel_HOME('" + WindowID + "')\">ホームに戻る</BUTTON>"+
					"<HR>"+
					"ユーザーリスト<BR>"+
					"<DIV style=\"overflow-y: scroll; overflow-x: hidden; width: 50%; height: 200px;\">"+
					"<HR>"+
					USERLIST+
					"</DIV>"+
					"</DIV>";

	Window_Contents(UserSettingHTML,0,WindowID);
}

function controlPanel_UserSetting_Setting(WindowID, UID){
	var USER = {};
	//背景画像のJSONを取得
	const USERLIST_FILEGET = FileTextGet("/CONF/USER/LIST.json");
	//JSONをJSONぱーす
	const USERLIST_JSON = JSON.parse(USERLIST_FILEGET);
	USERLIST_JSON.forEach(element => {
		if(element.USERID == UID){
			USER = {"USERNAME":element.USERNAME,"PERMISSION":element.PERMISSION};
		}
	});

	const UserSettingHTML = ""+
					"<DIV style=\"overflow-y: scroll; width: 100%; height: calc(100% - 55px);\">"+
					"<H1>ユーザー設定 / 「" + USER.USERNAME + "」の設定</H1>"+
					"<BUTTON onclick=\"controlPanel_UserSetting('" + WindowID + "')\">戻る</BUTTON>"+
					"<HR>"+
					"<DIV style=\"border-top: solid; border-bottom: solid;\">"+
					"ユーザーID：<INPUT id=\"controlPanel_USERSETTING_USERIDINPUT_" + WindowID + "\" type=\"text\" value=\"" + UID + "\"><BR>"+
					"ユーザー名：<INPUT id=\"controlPanel_USERSETTING_USERNAMEINPUT_" + WindowID + "\" type=\"text\" value=\"" + USER.USERNAME + "\"><BR>"+
					"権限：" + USER.PERMISSION + "<BR>"+
					"</DIV>"+
					"<BUTTON onclick=\"controlPanel_UserSetting_Ch('" + WindowID + "', '" + UID + "')\">設定を適応</BUTTON>"+
					"<BUTTON onclick=\"controlPanel_UserSetting_Pass_Open('" + UID + "')\">パスワードを変更</BUTTON>"+
					"</DIV>";

	Window_Contents(UserSettingHTML,0,WindowID);
}

function controlPanel_UserSetting_Ch(WindowID, UID){
	console.log(WindowID);
	const USERID = document.getElementById("controlPanel_USERSETTING_USERIDINPUT_" + WindowID).value;
	const USERNAME = document.getElementById("controlPanel_USERSETTING_USERNAMEINPUT_" + WindowID).value;

	//背景画像のJSONを取得
	const USERLIST_FILEGET = FileTextGet("/CONF/USER/LIST.json");
	//JSONをJSONぱーす
	const USERLIST_JSON = JSON.parse(USERLIST_FILEGET);

	//適応するJSONを用意
	var USERSETTING_JSON = {
		"USERID": USERID,
		"USERNAME":USERNAME,
		"PASS":"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
		"ACTIVE":"TRUE",
		"PERMISSION":"ROOT"
	}

	//適応する
	//参考https://qiita.com/issan/items/eca28b59652c52a0ec0d
	for(var i = 0; i < USERLIST_JSON.length; i++) {
		if(USERLIST_JSON[i].USERID == UID) {
			USERLIST_JSON[i] = USERSETTING_JSON;
		}
	}

	//JSONファイルとして設定を保存
	SaveFile("/CONF/USER/LIST.json", JSON.stringify(USERLIST_JSON));
}
//パスワードを変更ダイアログを出す
function controlPanel_UserSetting_Pass_Open(UID){
	var subx = ( screen.availWidth - 700 ) / 2;
	var suby = ( screen.availHeight - 500 ) / 2;

	const Window_element = Window_Create("「」のパスワードを変更", 0, subx, suby, 700, 500);
	const WindowID = Window_element.ID;

	const UserSettingHTML = ""+
							"<DIV style=\"overflow-y: scroll; width: 100%; height: calc(100% - 55px);\">"+
							"<H1>「」のパスワードを変更</H1>"+
							"<INPUT id=\"controlPanel_USERSETTING_PASSINPUT_NOW_" + WindowID + "\" type=\"text\" placeholder=\"今のパスワード\"><BR>"+
							"<INPUT id=\"controlPanel_USERSETTING_PASSINPUT_NEW_" + WindowID + "\" type=\"text\" placeholder=\"新しいパスワード\"><BR>"+
							"<INPUT id=\"controlPanel_USERSETTING_PASSINPUT_NEWC_" + WindowID + "\" type=\"text\" placeholder=\"新しいパスワードの確認\"><BR>"+
							"<BUTTON onclick=\"controlPanel_UserSetting_Pass_Ch('" + WindowID + "', '" + UID + "')\">変更</BUTTON>"+
							"</DIV>";

	Window_Contents(UserSettingHTML,0,WindowID);
}
//パスワードを変更
async function controlPanel_UserSetting_Pass_Ch(WindowID, UID){
	console.log(WindowID);
	const NOW = document.getElementById("controlPanel_USERSETTING_PASSINPUT_NOW_" + WindowID).value;
	const NEW = document.getElementById("controlPanel_USERSETTING_PASSINPUT_NEW_" + WindowID).value;
	const NEWC = document.getElementById("controlPanel_USERSETTING_PASSINPUT_NEWC_" + WindowID).value;
	const digest = await sha256(NOW);
	const digest_new = await sha256(NEW);

	//背景画像のJSONを取得
	const USERLIST_FILEGET = FileTextGet("/CONF/USER/LIST.json");
	//JSONをJSONぱーす
	const USERLIST_JSON = JSON.parse(USERLIST_FILEGET);

	USERLIST_JSON.forEach(element => {
		if(element.USERID == UID){
			if(element.PASS == digest){
				if(NEW == NEWC){
					//適応する
					//参考https://qiita.com/issan/items/eca28b59652c52a0ec0d
					for(var i = 0; i < USERLIST_JSON.length; i++) {
						if(USERLIST_JSON[i].USERID == UID) {
							USERLIST_JSON[i].PASS = digest_new;
						}
					}
					//JSONファイルとして設定を保存
					SaveFile("/CONF/USER/LIST.json", JSON.stringify(USERLIST_JSON));
					Dialog("変更しました！","パスワード変更",0);
				}else{
					Dialog("パスワードが一致しません","パスワード変更",1);
					return;
				}
			}else{
				Dialog("パスワードが違うます！","パスワード変更",1);
				return;
			}
		}
	});
}