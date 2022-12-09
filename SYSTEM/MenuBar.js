/**
 * メニューバー関連
 */
var MENUBAR_JSON = [];

function MenuBar_RELOAD(){
	//メニューバーのJSONを取得
	const MENUBAR_FILEGET = FileTextGet("/CONF/USER/" + SYSTEM_USERNAME + "/MENUBAR.json");
	//JSONをJSONぱーす
	const MENUBAR_JSON_FILE = JSON.parse(MENUBAR_FILEGET);
	//パースした塊を変数にバボーン
	MENUBAR_JSON = MENUBAR_JSON_FILE;

	//エレメント
	var MENUBAR_CONTENTS = document.getElementById("MENUBAR_CONTENTS");

	//フォーエッチで、一つ一つ取得し、メニューバーエレメントにバボーン
	MENUBAR_JSON_FILE.forEach(element => {
		MENUBAR_CONTENTS.innerHTML += element;
	});
}