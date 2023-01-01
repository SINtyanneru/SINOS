/**
 * メニューバー関連
 */
var MENUBAR_JSON = [];
var TASKBAR_DATA = [];

function MenuBar_RELOAD(){
	//メニューバーのJSONを取得
	const MENUBAR_FILEGET = FileTextGet("/CONF/USER/" + SYSTEM_USERID + "/MENUBAR.json");
	//JSONをJSONぱーす
	const MENUBAR_JSON_FILE = JSON.parse(MENUBAR_FILEGET);
	//パースした塊を変数にバボーン
	MENUBAR_JSON = MENUBAR_JSON_FILE;

	//エレメント
	var MENUBAR_CONTENTS = document.getElementById("MENUBAR_CONTENTS");

	MENUBAR_CONTENTS.innerHTML = "";
	//フォーエッチで、一つ一つ取得し、メニューバーエレメントにバボーン
	MENUBAR_JSON_FILE.forEach(element => {
		MENUBAR_CONTENTS.innerHTML += element;
	});
}

function TASKBAR_RELOAD(){
	const TASKBAR = document.getElementById("TASKBAR");
	//タスクバーがあるかどうか
	if(TASKBAR != null){
		//あるから続行
		TASKBAR.innerHTML = "";
		TASKBAR_DATA.forEach(element => {
			var HTML = "<BUTTON onclick=\"Window_Active('" + element.ID + "'); Window_Nomalize('" + element.ID + "');\">"+
						"<IMG src=\"\">"+
						"<R style=\"text-align: center;\">" + element.NAME + "</R>"+
						"</BUTTON>";

			TASKBAR.innerHTML += HTML;
		});
	}//無いから終了
}