/**
 * テキストエディター
 */

function TEXTEDITOR_Start(PATH,FILENAME){
	//ウィンドウを作成
	const Window_element = Window_Create("TEXTEDITOR", "テキストエディター | " + FILENAME, 0, 0, 0, 400, 500);
	if(PATH == "NONE"){
		//ファイルのパス指定が特にない場合
		Window_Contents("<BUTTON onclick=\"TEXTEDITOR_FILESAVE('" + Window_element.ID + "')\">保存</BUTTON><TEXTAREA id=\"TEXTEDITOR_TEXTAREA_" + Window_element.ID + "\" style=\"width: 100%; height: calc(100% - 50px); resize: none;\"></TEXTAREA>",1,Window_element.ID);
	}else{
		//ファイルのパス指定がある場合
		TEXTEDITOR_FILELOAD(Window_element.ID,PATH,FILENAME);
	}
}

function TEXTEDITOR_FILELOAD(WINDOWID,PATH,FILENAME){
	Window_Contents("<BUTTON onclick=\"SaveFile('" + PATH + "', document.getElementById('TEXTEDITOR_TEXTAREA_" + WINDOWID + "').value)\">保存</BUTTON><TEXTAREA id=\"TEXTEDITOR_TEXTAREA_" + WINDOWID + "\" style=\"width: 100%; height: calc(100% - 50px); resize: none;\">" + FileTextGet(PATH) + "</TEXTAREA>",1,WINDOWID);
}

function TEXTEDITOR_FILESAVE(WINDOWID){
	const SFD = SaveFileDialog();
	SaveFile(SFD, document.getElementById("TEXTEDITOR_TEXTAREA_" + WINDOWID).value);
}