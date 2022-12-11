/**
 * 設定アプリ
 */

function controlPanel_Start(){
	var subx = ( screen.availWidth - 600 ) / 2;
	var suby = ( screen.availHeight - 500 ) / 2;

	const Window_element = Window_Create("設定", 0, subx, suby, 600, 500);
	const WIndowID = Window_element.ID;

	controlPanel_HOME(WIndowID);
}

function controlPanel_HOME(WindowID){
	const HomeHTML = ""+
					"<H1>SINOSの設定</H1>"+
					"<HR>"+
					"<BUTTON onclick=\"controlPanel_mySettings(" + WindowID + ")\">個人用設定</BUTTON>";

	Window_Contents(HomeHTML,0,WindowID);
}


//個人設定
function controlPanel_mySettings(WindowID){
	//Uncaught SyntaxError: Identifier 'WALLPAPER_JSON' has already been declared (at Main.js:32:7) ←おかしいだろ！WALLPAPER_JSONはグローバル変数、じゃないだろ調子に乗んなクソガキ
	try{
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

	
		const MySettingHTML = ""+
						"<H1>個人設定設定</H1>"+
						"<BUTTON onclick=\"controlPanel_HOME('" + WindowID + "')\">ホームに戻る</BUTTON>"+
						"<HR>"+
						"<IMG id=\"controlPanel_BgFile_Preview_" + WindowID + "\" src=\"./ETC/Default_Background.png\" width=\"190px\"><BR>"+
						"<BUTTON onclick=\"BgImg_Open(" + WindowID + ")\">ファイルを開く</BUTTON><BR>"+
						"<BUTTON onclick=\"BgImg_Ch('" + WindowID + "', '','SYS')\">背景画像変更</BUTTON>"+
						"<SELECT id=\"CONTROLPANEL_MSS_" + WindowID + "\" onchange=\"BgImg_Ch_Preview('" + WindowID + "', 'SYS')\"></SELECT>"
	
		Window_Contents(MySettingHTML,0,WindowID);
	
		//背景画像のJSONを取得
		const WALLPAPER_FILEGET = FileTextGet("/CONF/WALP/WALLPAPER_LIST.json");
		//JSONをJSONぱーす
		const WALLPAPER_JSON = JSON.parse(WALLPAPER_FILEGET);
	
		var SELECT = document.getElementById("CONTROLPANEL_MSS_" + WindowID);

		WALLPAPER_JSON.forEach(element => {
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

	BgImg_Ch(WindowID, OFD, "CST");

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
function BgImg_Ch(WindowID, PATH, MODE){
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

	console.log(SaveFile("/CONF/USER/" + SYSTEM_USERNAME + "/DESKTOP.json", WIR_JSON));
}
//背景画像をプレビュー
function BgImg_Ch_Preview(WindowID, MODE){
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