function IMGViewer_Start(BLOB_URL,FILENAME){
	const Window_element = Window_Create("IMGViewer", "画像見るわー(?) | " + FILENAME, 0, 0, 0, 500, 500);
	Window_Contents("<BUTTON onclick=\"IMGViewer_Rotate('" + Window_element.ID + "', 90)\">90</BUTTON><BUTTON onclick=\"IMGViewer_Rotate('" + Window_element.ID + "', -90)\">-90</BUTTON>"+
					"<HR><DIV style=\"overflow: scroll; width: 100%; height: 100%;\"><IMG id='IMGVIEWER_" + Window_element.ID + "' src=\"" + BLOB_URL + "\" \"></DIV>", 0, Window_element.ID);
}

var d = 0;
function IMGViewer_Rotate(WINDOWID, x){
	var e = document.getElementById("IMGVIEWER_" + WINDOWID);
	d = d + x;
	e.style.transform = "rotate(" + d + "deg)";
}