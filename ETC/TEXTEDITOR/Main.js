/**
 * テキストエディター
 */

function TEXTEDITOR_Start(PATH,FILENAME){
	//ウィンドウを作成
	const Window_element = Window_Create("TEXTEDITOR", "テキストエディター | " + FILENAME, 0, 0, 0, 400, 500);
	if(PATH == "NONE"){
		//ファイルのパス指定が特にない場合
	}else{
		//ファイルのパス指定がある場合
		TEXTEDITOR_FILELOAD(Window_element.ID,PATH,FILENAME);
	}
}

function TEXTEDITOR_FILELOAD(WINDOWID,PATH,FILENAME){
	Window_Contents("<TEXTAREA style=\"width: 100%; height: calc(100% - 50px); resize: none;\">" + FileTextGet(PATH) + "</TEXTAREA>",1,WINDOWID);
}