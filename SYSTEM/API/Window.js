//Window_List => Window_System.jsに入ってる
//ZIndex_max下に同じく

function Window_Close(element){
	document.getElementById(element).remove();
	console.log("[ OK ]Close Window :" + element);

	Window_List.splice(Window_List.indexOf(element));

	TASKBAR_DATA.splice(TASKBAR_DATA.indexOf(element));
	TASKBAR_RELOAD();
}

//ウィンドウ最小化
function Window_Minimize(element){
	document.getElementById(element).style.display = "none";
}
//ウィンドウを表示
function Window_Nomalize(element){
	document.getElementById(element).style.display = "block";
}
//ウィンドウをアクティブに
function Window_Active(element){
	document.getElementById(element).style.zIndex = ZIndex_max++;
}

/**
 * 
 * @param {"Title"} TITLE 
 * @param {"Posiion X"} POS_X 
 * @param {"Position Y"} POS_Y 
 * @returns 
 */
function Window_Create(TITLE,MODE,POS_X,POS_Y,SIZE_W,SIZE_H){
	try{
		var ID = Math.floor( Math.random() * 100 );

		var Window_Template;

		switch(MODE){
			case 0:
				Window_Template =
				"<DIV id=\"" + ID + "\" class=\"WINDOW\" style=\"top:" + Number(POS_Y + 80) + "px; left:" + Number(POS_X + 80) + "px; width: " + SIZE_W + "px; height: "+ SIZE_H + "px\">"+
					"<DIV class=\"TITLE\">"+ TITLE + "<R class=\"WINDOW_BUTTON\"><BUTTON onclick=\"Window_Minimize('" + ID + "')\">_</BUTTON><BUTTON onclick=\"Window_Close('" + ID + "')\" class=\"WINDOW_EXIT_BTN\">X</BUTTON></R></DIV>"+
					"<DIV class=\"CONTENTS\"></DIV>"+
				"</DIV>";
				break;
			case 1:
				Window_Template =
				"<DIV id=\"" + ID + "\" class=\"WINDOW\" style=\"top:" + Number(POS_Y + 80) + "px; left:" + Number(POS_X + 80) + "px; width: " + SIZE_W + "px; height: "+ SIZE_H + "px\">"+
					"<DIV class=\"TITLE\">"+ TITLE + "<R class=\"WINDOW_BUTTON\"><BUTTON onclick=\"Window_Minimize('" + ID + "')\">_</BUTTON><BUTTON onclick=\"Window_Close('" + ID + "')\" disabled>X</BUTTON></R></DIV>"+
					"<DIV class=\"CONTENTS\"></DIV>"+
				"</DIV>";
				break;
			case 2:
				Window_Template =
				"<DIV id=\"" + ID + "\" class=\"WINDOW\" style=\"position: fixed; top:" + Number(POS_Y) + "px; left:" + Number(POS_X) + "px; width: " + SIZE_W + "; height: "+ SIZE_H + "; z-index: 10000; resize: none;\">"+
					"<DIV class=\"TITLE\" style=\"display: none; ;\"></DIV>"+
					"<DIV class=\"CONTENTS\"></DIV>"+
				"</DIV>";
				break;
			default:
				return {"STATUS":"ERR","MSG":"Window Mode Err"};
				break;
		}

		const Window_element = document.getElementById("WINDOW_AREA").innerHTML += Window_Template;

		Window_List.push(ID);

		Window_List.forEach(element =>{
			//ドラッグしたい要素
			var div = document.getElementById(element);
			//マウスドラッグに反応する要素
			var title = div.querySelector(".TITLE");
			//ドラッグのオブジェクトを作る。
			var drag = new MouseDrag();
			drag.init(div, title);
		});

		TASKBAR_DATA.push({"ID":ID, "NAME":TITLE});
		TASKBAR_RELOAD();

		Window_Active(ID)

		return {"STATUS":"OK","ID":ID};
	}catch(ex){
		return {"STATUS":"ERR","MSG":ex};
	}
}

/**
 * 
 * @param {"追加するもの"} CONTENTS 
 * @param {"モード(0 => 内容を書き換える / 1 => 追記する)"} MODE 
 * @param {"ID"} element 
 */
function Window_Contents(CONTENTS,MODE, element){
	console.log(element);
	if(MODE == 0){
		var DIV = document.getElementById(element);
		DIV.querySelector(".CONTENTS").innerHTML = CONTENTS;
	}
	if(MODE == 1){
		var DIV = document.getElementById(element);
		DIV.querySelector(".CONTENTS").innerHTML += CONTENTS;
	}
}