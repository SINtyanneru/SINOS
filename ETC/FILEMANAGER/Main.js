function FILEMANAGER_start(){
	const Window_element = Window_Create("ファイルマネージャー", 0, 0, 0, 500, 500);
	FILEMANAGER_FILELIST_RELOAD(Window_element.ID,"");
}

function FILEMANAGER_FILELIST_RELOAD(WIndowID,Dir_Path){
	Window_Contents("",0,WIndowID);

	var FILELISTGET = FileListGet(Dir_Path);

	FILELISTGET.addEventListener("load", (e) => {
		JSON.parse(FILELISTGET.responseText).forEach(element => {
			if(element.TYPE == "DIR"){
				Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILELIST_RELOAD('" + WIndowID + "', '" + Dir_Path + "/" + decodeURIComponent(atob(element.NAME)) + "')\">" + decodeURIComponent(atob(element.NAME)) + " | ディレクトリ</BUTTON><HR>",1,WIndowID);
			}else{
				Window_Contents("<BUTTON onclick=\"FILEMANAGER_FILEDATA_LOAD('" + WIndowID + "', '" + Dir_Path + "/" + decodeURIComponent(atob(element.NAME)) + "')\">" + decodeURIComponent(atob(element.NAME)) + " | ファイル</BUTTON><HR>",1,WIndowID);
			}
		});
	});

}

function FILEMANAGER_FILEDATA_LOAD(WIndowID,Dir_Path){
	Window_Contents("",0,WIndowID);

	var FILELISTGET = FileDataGet(Dir_Path);

	FILELISTGET.addEventListener("load", (e) => {
		console.log(window.atob((FILELISTGET.responseText)));
	});

}