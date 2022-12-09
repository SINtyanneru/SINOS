/**
 * JSONビュワー
 */

function JSONVIEWER_Start(Path, FNAME){
	//ウィンドウを作成
	const Window_element = Window_Create("JSONビュワー | " + FNAME, 0, 0, 0, 500, 600);
	try{
		var JSON_HTML = "<TEXTAREA style=\"width: 100%; height: calc(100% - 34px);\">";
		
		var FILEGET = FileTextGet(Path);
		
		JSON.parse(FILEGET).forEach(element => {
			const j1 = element;
			const keyList = Object.keys(j1)
		
			for (let k1 in keyList){
				JSON_HTML += `key=${keyList[k1]} | value=${j1[keyList[k1]]}` + "\n"
			}
		});
	
		JSON_HTML += "</TEXTAREA>";

		Window_Contents(JSON_HTML, 0, Window_element.ID);
	}catch(ex){
		Dialog("エラーが発生", "JSONビュワー", 1);
		Window_Close(Window_element.ID);
	}
}