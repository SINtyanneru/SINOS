/**
 * 設定アプリ
 */

function controlPanel_Start(){
	var subx = ( screen.availWidth - 600 ) / 2;
	var suby = ( screen.availHeight - 500 ) / 2;

	const Window_element = Window_Create("設定", 0, subx, suby, 600, 500);
	const WIndowID = Window_element.ID;

	const HomeHTML = ""+
					"<H1>SINOSの設定</H1>"+
					"<HR>"+
					"<BUTTON onclick=\"controlPanel_mySettings(" + WIndowID + ")\">個人設定</BUTTON>"

	Window_Contents(HomeHTML,0,WIndowID);
}

function controlPanel_mySettings(WindowID){
	const MySettingHTML = ""+
					"<H1>個人設定設定</H1>"+
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
}


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