/**
 * ログインUI
 */

var LOGINUI_LOGOUT_ = false;
var LOGIN = false;

function LOGINUI_Start(){
	MENUBAR_OC(0);
	const Window_element = Window_Create("LOGINUI", "LoginUI",2,0,0,"100%","100%");
	const WIndowID = Window_element.ID;
	console.log(WIndowID);

	LOGIN = false;

	var USERLIST = "";
	//背景画像のJSONを取得
	const USERLIST_FILEGET = FileTextGet("/CONF/USER/LIST.json");
	//JSONをJSONぱーす
	const USERLIST_JSON = JSON.parse(USERLIST_FILEGET);
	USERLIST_JSON.forEach(element => {
		if(element.ACTIVE == "TRUE"){
			USERLIST += "<OPTION value=\"" + element.USERID + "\">" + element.USERNAME + "</OPTION>";
		}
	});

	const LOGINUI_HTML = "<H1 style=\"position: fixed; bottom: 0px; left: 0px; user-select: none;\">Welcome to SINOS</H1>"+
						"<DIV style=\"text-align: center; border: solid; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; width: 500px; height: 300px; background-color: silver;\">"+
						"<IMG src=\"./ETC/LOGINUI/BANNER.png\" style=\"width: 500px; pointer-events: none;\">"+
						"<BR><R style=\"user-select: none;\">ログイン</R>"+
						"<SELECT style=\"width: 100%;\" id=\"LOGINUI_USERNAME\">"+ USERLIST + "</SELECT>"+
						"<BR>"+
						"<INPUT type=\"text\" style=\"width: 100%;\" id=\"LOGINUI_PASS\" placeholder=\"パスワード\">"+
						"<BR>"+
						"<BUTTON onclick=\"LOGINUI_LOGIN('" + WIndowID + "');\">ログイン</BUTTON> | <BUTTON>シャットダウン</BUTTON> <BUTTON onclick=\"SYSTEM_RELOAD();\">再機動</BUTTON>"+
						"</DIV>";

	Window_Contents(LOGINUI_HTML,0,WIndowID);
}

async function LOGINUI_LOGIN(WIndowID){
	var RESULT = false;
	const USERID = document.getElementById("LOGINUI_USERNAME");
	const PASS = document.getElementById("LOGINUI_PASS");
	const digest = await sha256(PASS.value);

	const LOGIN_NOW_HTML = "<H1>ようこそ</H1>";

	//ユーザーのJSONを取得
	const USERLIST_FILEGET = FileTextGet("/CONF/USER/LIST.json");
	//JSONをJSONぱーす
	const USERLIST_JSON = JSON.parse(USERLIST_FILEGET);
	var PERMISSION;

	USERLIST_JSON.forEach(element => {
		if(element.USERID == USERID.value){
			if(element.ACTIVE == "TRUE"){
				console.log(digest);
				if(element.PASS == digest){
					PERMISSION = element.PERMISSION;
					RESULT = true;
				}
			}else{
				Dialog("このユーザーは無効化されています！","ログイン", 1);
				return;
			}
		}
	});

	if(RESULT){
		Window_Contents(LOGIN_NOW_HTML,0,WIndowID);
		SYSTEM_USERID = USERID.value;
		SYSTEM_USERPERMISSION = PERMISSION;

		LOGIN = true;
		//個人用設定を再読み込み
		PERSONAL_SETTING_LOAD();

		//演出
		setTimeout(function(){Window_Close(WIndowID); MENUBAR_OC(1); PlaySound("/ETC/SOUND/SINOS_LOGIN_SOUND.wav");}, 1000);
	}else{
		Dialog("ログインに失敗しました！","ログイン", 1);
	}
}

function LOGINUI_LOGOUT(){
	SYSTEM_USERID = "LOGINUI";

	LOGINUI_LOGOUT_ = true;

	PERSONAL_SETTING_LOAD();

	LOGINUI_Start();
}