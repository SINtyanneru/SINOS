/**
 * ターミナル
 */


var TARMINAL_Version = "1.0";
function TARMINAL_Start(){
	//ウィンドウを作成
	const Window_element = Window_Create("ターミナルちゃん " + TARMINAL_Version, 0, 0, 0, 500, 500);
	//上のやつを描画
	Window_Contents("<TEXTAREA readonly class=\"hm\" id=\"TARMINAL_TEXTAREA_" + Window_element.ID + "\" style=\"width: 100%; font-size: 50px; height: calc(100% - 100px); resize: none;\">SINOS Term" + TARMINAL_Version + "\n</TEXTAREA><INPUT class=\"hm\" id=\"TERMINAL_INPUT_" + Window_element.ID + "\" style=\"font-size: 50px; width: 100%;\" onkeydown=\"TARMINAL_TEXTINPUT(event, '" + Window_element.ID + "')\">",0,Window_element.ID);
	document.getElementById("TARMINAL_TEXTAREA_" + Window_element.ID).value += "\nSINOS>"
}

function TARMINAL_TEXTINPUT(e,WINDOWID){
	//何個目のコンソールかを識別するためのカウント
	var count = 0;
	//ﾌｫｰｴｯﾁを回すのだ
	var TARMINAL_TEXTAREA = document.getElementById("TARMINAL_TEXTAREA_" + WINDOWID);
	var TARMINAL_INPUT = document.getElementById("TERMINAL_INPUT_" + WINDOWID);
	//キーはエンターキー？
	if(e.key == "Enter"){
		TARMINAL_TEXTAREA.value += "\n>" + TARMINAL_INPUT.value + "\n";

		//コマンド処理
		if(TARMINAL_INPUT.value == "tanzania"){
			TARMINAL_TEXTAREA.value += "\nTANZANIA!!!\n";
			const music = new Audio('./ETC/TARMINAL/TANZANIA.mp3');
			music.play();
		}

		TARMINAL_TEXTAREA.value += "\nOK";
		//内容をリセット
		TARMINAL_INPUT.value = "";
		TARMINAL_TEXTAREA.scrollTo(0, TARMINAL_TEXTAREA.scrollHeight);
	}
}