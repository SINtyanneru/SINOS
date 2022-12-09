/**
 * ファイルマネージャー
 *
 * 上手な人はいい感じに書くんだろうけど
 * 私にはこういうことしかできないの、
 */

function FILEMANAGER_start(){
	//ウィンドウを作成
	const Window_element = Window_Create("ファイルマネージャー", 0, 0, 0, 500, 500);
	//ウィンドウの中身をリロード
	FILEMANAGER_FILELIST_RELOAD(Window_element.ID,"/HOME/" + SYSTEM_USERNAME);
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
	if(FileExists(Dir_Path + "/-_-FILE.json") == "EXT"){
		//FILE.jsonがある場合
		console.log("[ FM ]FILE.json is Exists");//ログ
		//ファイルのリストを塊にしてフォーエッチする
		JSON.parse(FILELISTGET).forEach(element_FL => {
			//FILE.jsonを読み込み
			var FILESETTING_TGET = FileTextGet(Dir_Path + "/-_-FILE.json");
			//読み込んだやつを塊にしてフォーエッチする
			JSON.parse(FILESETTING_TGET).forEach(element_FS => {
				//IFで、FILE.jsonの[NAME]と一致するかをちぇっく
				if(element_FS.NAME == element_FL.NAME){
					//一致する
					if(element_FL.TYPE == "DIR"){
						//ディレクトリの場合
						//ディスプレイ名が、NONEであるか
						if(element_FS.DISPLAY_NAME != "NONE"){
							//NONEじゃない
							//表示する
							Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '" + Dir_Path + "/" + element_FL.NAME + "')\" style=\"position: absolute; top:" + element_FS.POSY + "; left:" + element_FS.POSX + ";\">" + "<IMG src=\"./ETC/FILEMANAGER/FILE_ICON/FOLDER.png\" style=\"width: 50px; height: 50px;\"><BR>" + element_FS.DISPLAY_NAME + "</BUTTON>",1,WIndowID);
						}else{//NONEなので、もとのファイル名を表示する
							//表示する
							Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '" + Dir_Path + "/" + element_FL.NAME + "')\" style=\"position: absolute; top:" + element_FS.POSY + "; left:" + element_FS.POSX + ";\">" + "<IMG src=\"./ETC/FILEMANAGER/FILE_ICON/FOLDER.png\" style=\"width: 50px; height: 50px;\"><BR>" + element_FL.NAME + "</BUTTON>",1,WIndowID);
						}
					}else{
						//ファイルの場合
						if(element_FL.NAME.slice(0,3) != "-_-"){	//ファイルの先頭文字が-_-では無い
							//ディスプレイ名が、NONEであるか
							if(element_FS.DISPLAY_NAME != "NONE"){
								//NONEじゃない
								//表示する
								Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILEDATA_LOAD('" + WIndowID + "', '" + Dir_Path + "/" + element_FL.NAME + "','" + element_FS.DISPLAY_NAME + "','" + element_FL.MIME + "')\" style=\"position: absolute; top:" + element_FS.POSY + "; left:" + element_FS.POSX + ";\">" + "<IMG src=\"./ETC/FILEMANAGER/FILE_ICON/TXT.png\" style=\"width: 50px; height: 50px;\"><BR>" + element_FS.DISPLAY_NAME + "</BUTTON>",1,WIndowID);
							}else{//NONEなので、もとのファイル名を表示する
								//表示する
								Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILEDATA_LOAD('" + WIndowID + "', '" + Dir_Path + "/" + element_FL.NAME + "','" + element_FL.NAME + "','" + element_FL.MIME + "')\" style=\"position: absolute; top:" + element_FS.POSY + "; left:" + element_FS.POSX + ";\">" + "<IMG src=\"./ETC/FILEMANAGER/FILE_ICON/TXT.png\" style=\"width: 50px; height: 50px;\"><BR>" + element_FL.NAME + "</BUTTON>",1,WIndowID);
							}
						}//ファイルの先頭文字が-_-の場合は表示しない(システムファイルなので)
					}
				}//一致しない場合の処理は無し、
			});
		});
	}else{
		//FILE.jsonが無い場合(通常の動作)
		//ファイルのリストを塊にしてフォーエッチする
		JSON.parse(FILELISTGET).forEach(element_FL => {
			if(element_FL.TYPE == "DIR"){
				//ディレクトリの場合
				Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '" + Dir_Path + "/" + element_FL.NAME + "')\">" + "<IMG src=\"./ETC/FILEMANAGER/FILE_ICON/FOLDER.png\" style=\"width: 50px; height: 50px;\"><BR>" + element_FL.NAME + "</BUTTON>",1,WIndowID);
			}else{
				//ファイルの場合
				if(element_FL.NAME.slice(0,3) != "-_-"){	//ファイルの先頭文字が-_-では無い
					//表示する
					Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILEDATA_LOAD('" + WIndowID + "', '" + Dir_Path + "/" + element_FL.NAME + "','" + element_FL.NAME + "','" + element_FL.MIME + "')\">" + "<IMG src=\"./ETC/FILEMANAGER/FILE_ICON/TXT.png\" style=\"width: 50px; height: 50px;\"><BR>" + element_FL.NAME + "</BUTTON>",1,WIndowID);
				}//ファイルの先頭文字が-_-の場合は表示しない(システムファイルなので)
			}
	});
	}

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
		case "json":
			//テキストドキュメント形式
			console.log("[ FILE ]This file mimetype is json");
			JSONVIEWER_Start(File_Path,FILENAME);
			break;
	}

}