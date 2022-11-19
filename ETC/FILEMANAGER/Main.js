/**
 * ファイルマネージャー
 */

function FILEMANAGER_start(){
	//ウィンドウを作成
	const Window_element = Window_Create("ファイルマネージャー", 0, 0, 0, 500, 500);
	//ウィンドウの中身をリロード
	FILEMANAGER_FILELIST_RELOAD(Window_element.ID,"/HOME");
}

function FILEMANAGER_FILELIST_RELOAD(WIndowID,Dir_Path){
	//ディレクトリのパスを入れる
	var DIR_PATH = Dir_Path.split("/");
	//パスの先頭を削除
	DIR_PATH.pop();

	//なんでJSのreplaseは先頭のものしか置換しないんだ。ファアアック
	//パスが何もなくなければ、戻るボタンを有効化
	if(Dir_Path != ""){
		//戻るボタンのを入れる
		var UNDO_BTN = "FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '"+ DIR_PATH.join(',').replace(/,/g,"/") + "')";
	}else{
		//何も入れない
		var UNDO_BTN = "";
	}
	//上のやつを描画
	Window_Contents("<BUTTON onclick=\"" + UNDO_BTN + "\">←</BUTTON><INPUT value=\"" + Dir_Path + "\"><HR>",0,WIndowID);

	//ファイルリストをゲット
	var FILELISTGET = FileListGet(Dir_Path);
	//ウィンドウに書き込み
	JSON.parse(FILELISTGET).forEach(element => {
		if(element.TYPE == "DIR"){
			//ディレクトリの場合
			Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '" + Dir_Path + "/" + element.NAME + "')\">" + element.NAME + " | ディレクトリ</BUTTON><HR>",1,WIndowID);
		}else{
			//ファイルの場合
			console.log(element.MIME);
			Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILEDATA_LOAD('" + WIndowID + "', '" + Dir_Path + "/" + element.NAME + "','" + element.NAME + "','" + element.MIME + "')\">" + element.NAME + " | ファイル</BUTTON><HR>",1,WIndowID);
		}
	});

}

function FILEMANAGER_FILEDATA_LOAD(WIndowID,File_Path,FILENAME,MIMETYPE){
	//ファイルのデータをゲット
	var FILELISTGET = FileDataGet(File_Path);

	console.log(MIMETYPE);

	console.log(FILELISTGET);
	switch(MIMETYPE){
		case "png":
		case "jpg":
		case "jpeg":
		case "gif":
			//画像形式
			console.log("[ FILE ]This file mimetype is picture");
			var bin = atob(FILELISTGET.replace(/^.*,/, ''));
			var buffer = new Uint8Array(bin.length);
			for (var i = 0; i < bin.length; i++) {
				buffer[i] = bin.charCodeAt(i);
			}

			//BLOBを作成
			var blob = new Blob([buffer.buffer]);

			IMGViewer_Start(URL.createObjectURL(blob),FILENAME);
			break;
		case "txt":
			//テキストドキュメント形式
			console.log("[ FILE ]This file mimetype is text");

			TEXTEDITOR_Start(File_Path,FILENAME);
			break;
	}

}