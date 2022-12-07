/**
 * 関数を指定して実行
*/

function VOIDRUN_Start(){
	var subx = 10;
	var suby = ( screen.availHeight - 330 );

	const Window_element = Window_Create("関数を指定して実行", 0, subx, suby, 500, 200);
	const WIndowID = Window_element.ID;

	const UIHTML = ""+
					"実行する関数を指定してください"+
					"<HR>"+
					"<INPUT type=\"text\" onkeydown=\"VOIDRUN_RUN('" + WIndowID + "', this, event)\">"

	Window_Contents(UIHTML, 0, WIndowID);
}

function VOIDRUN_RUN(WindowID, element, e){
	try{
		if(e.key == "Enter"){
			window[element.value]();
			Window_Close(WindowID);
		}
	}catch(ex){
		Dialog("たぶん関数が見つかりませんでした","関数を指定して実行", 1)
	}
}