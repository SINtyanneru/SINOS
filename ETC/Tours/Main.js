/**
 * SINOSのつあー
 */

function sinos_tours_Start(){
	const Window_element = Window_Create("SINOSツアー(ヘルプ)", 0, 0, 0, 500, 500);
	const WIndowID = Window_element.ID;

	Window_Contents("<DIV style=\"margin: 0px; width: 100%; height: 100%;\"><IFRAME src=\"./ETC/Tours/HTML/index.html\" style=\"width: 100%; height: 100%;\"></IFRAME>",0,WIndowID);
}