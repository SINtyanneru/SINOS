/**
 * ターミナル
 */


var TARMINAL_Version = "1.0";
function TARMINAL_Start(){
	//ウィンドウを作成
	const Window_element = Window_Create("TARMINAL", "ターミナルちゃん " + TARMINAL_Version, 0, 0, 0, 500, 500);
	//上のやつを描画
	Window_Contents("<TEXTAREA readonly id=\"TARMINAL_TEXTAREA_" + Window_element.ID + "\" style=\"width: 100%; height: calc(100% - 55px); resize: none;\">SINOS Term" + TARMINAL_Version + "\n</TEXTAREA><INPUT class=\"\" id=\"TERMINAL_INPUT_" + Window_element.ID + "\" style=\"width: 100%;\" onkeydown=\"TARMINAL_TEXTINPUT(event, '" + Window_element.ID + "')\">",0,Window_element.ID);
	document.getElementById("TARMINAL_TEXTAREA_" + Window_element.ID).value += "\nSINOS>"
}

function TARMINAL_TEXTINPUT(e,WINDOWID){
	var TARMINAL_INPUT = document.getElementById("TERMINAL_INPUT_" + WINDOWID);
	//キーはエンターキー？
	if(e.key == "Enter"){
		TARMINAL_LOG("\n>" + TARMINAL_INPUT.value + "\n", WINDOWID);

		//コマンド処理
		if(TARMINAL_INPUT.value == "tanzania"){
			TARMINAL_LOG("\nTANZANIA!!!\n", WINDOWID);
			const music = new Audio('./ETC/TARMINAL/TANZANIA.mp3');
			music.play();
		}
		if(TARMINAL_INPUT.value.slice(0, 2) == "cd"){
			const DIR_PATH = TARMINAL_INPUT.value.split(" ")[1];
			//指定されてる？
			if(DIR_PATH != undefined){
				//ディレクトリ移動
			}else{
				TARMINAL_LOG("使い方:「cd [ディレクトリのパス]」", WINDOWID);
			}
		}




		//内容をリセット
		TARMINAL_LOG("\n", WINDOWID);
		TARMINAL_INPUT.value = "";
	}
}

function TARMINAL_LOG(TEXT, WINDOWID){
	var TARMINAL_TEXTAREA = document.getElementById("TARMINAL_TEXTAREA_" + WINDOWID);
	TARMINAL_TEXTAREA.value += TEXT + "\n";
	TARMINAL_TEXTAREA.scrollTo(0, TARMINAL_TEXTAREA.scrollHeight);
}