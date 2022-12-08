/**
 * るみうぇぶぶらうざー For SINOS
 */

function RWB_Start(){
	const Window_element = Window_Create("るみうぇぶぶらうざー",0,0,0,"500","500");
	const WIndowID = Window_element.ID;


	const MainUI_HTML = "<IFRAME src=\"https://www.google.com\"></IFRAME>";

	Window_Contents(MainUI_HTML,0,WIndowID);
}