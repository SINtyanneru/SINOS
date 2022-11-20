/**
 * ターミナル
 */

var TARMINAL_TEXT = [];

var TARMINAL_Version = "1.0";
function TARMINAL_Start(){
	//ウィンドウを作成
	const Window_element = Window_Create("ターミナルちゃん " + TARMINAL_Version, 0, 0, 0, 500, 500);
	//上のやつを描画
	Window_Contents("<TEXTAREA id=\"TARMINAL_TEXTAREA_" + Window_element.ID + "\" style=\"width: 100%; height: calc(100% - 35px); resize: none;\" onkeydown=\"TARMINAL_TEXTINPUT(event, '" + Window_element.ID + "')\">SINOS Term" + TARMINAL_Version + "\n</TEXTAREA>",0,Window_element.ID);
	document.getElementById("TARMINAL_TEXTAREA_" + Window_element.ID).value += "\nSINOS>"
	TARMINAL_TEXT.push({"WINDOWID":Window_element.ID,"TEXT":""});
}

function TARMINAL_TEXTINPUT(e,WINDOWID){
	//何個目のコンソールかを識別するためのカウント
	var count = 0;
	//ﾌｫｰｴｯﾁを回すのだ
	TARMINAL_TEXT.forEach(element => {
		//ウィンドウIDが一致したら
		if(element.WINDOWID == WINDOWID){
			var TARMINAL_TEXTAREA = document.getElementById("TARMINAL_TEXTAREA_" + WINDOWID)
			//キーはエンターキー？
			if(e.key == "Enter"){
				//コマンド処理
				if(TARMINAL_TEXT[count].TEXT == "tanzania"){
					TARMINAL_TEXTAREA.value += "\nTANZANIA!!!\n";
					const music = new Audio('./ETC/TARMINAL/TANZANIA.mp3');

					music.play();
				}

				TARMINAL_TEXTAREA.value += "\nSINOS>"
				//内容をリセット
				TARMINAL_TEXT[count].TEXT = "";
			}else{
				//エンターキーじゃないので、内容を+する
				TARMINAL_TEXT[count].TEXT += e.key;
			}
		}

		//カウントに+1
		count++;
	});
}