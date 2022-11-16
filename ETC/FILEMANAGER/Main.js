/**
 * ファイルマネージャー
 */

function FILEMANAGER_start(){
	//ウィンドウを作成
	const Window_element = Window_Create("ファイルマネージャー", 0, 0, 0, 500, 500);
	//ウィンドウの中身をリロード
	FILEMANAGER_FILELIST_RELOAD(Window_element.ID,"");
}

function FILEMANAGER_FILELIST_RELOAD(WIndowID,Dir_Path){
	//ディレクトリのパスを入れる
	var DIR_PATH = Dir_Path.split("/");
	//パスの先頭を削除
	DIR_PATH.pop();

	//なんでJSのreplaseは先頭のものしか置換しないんだ。ファアアック
	//パスが何もなくなければ、戻るボタンを有効化
	if(Dir_Path != ""){
		var UNDO_BTN = "FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '"+ DIR_PATH.join(',').replace(/,/g,"/") + "')";
	}else{
		var UNDO_BTN = "";
	}
	//上のやつを描画
	Window_Contents("<BUTTON onclick=\"" + UNDO_BTN + "\">←</BUTTON><INPUT value=\"" + Dir_Path + "\"><HR>",0,WIndowID);

	//ファイルリストをゲット
	var FILELISTGET = FileListGet(Dir_Path);
	//ウィンドウに書き込み
	FILELISTGET.addEventListener("load", (e) => {
		JSON.parse(FILELISTGET.responseText).forEach(element => {
			if(element.TYPE == "DIR"){
				//ディレクトリの場合
				Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '" + Dir_Path + "/" + decodeURIComponent(atob(element.NAME)) + "')\">" + decodeURIComponent(atob(element.NAME)) + " | ディレクトリ</BUTTON><HR>",1,WIndowID);
			}else{
				//ファイルの場合
				Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILEDATA_LOAD('" + WIndowID + "', '" + Dir_Path + "/" + decodeURIComponent(atob(element.NAME)) + "','" + decodeURIComponent(atob(element.NAME)) + "')\">" + decodeURIComponent(atob(element.NAME)) + " | ファイル</BUTTON><HR>",1,WIndowID);
			}
		});
	});

}

function FILEMANAGER_FILEDATA_LOAD(WIndowID,Dir_Path,FILENAME){
	//ファイルのデータをゲット
	var FILELISTGET = FileDataGet(Dir_Path);

	FILELISTGET.addEventListener("load", (e) => {
		//BLOBを作成
		var blob = new Blob([FILELISTGET.response]);
		//ばぼーん
		IMGViewer_Start(URL.createObjectURL(blob),FILENAME);
	});

}