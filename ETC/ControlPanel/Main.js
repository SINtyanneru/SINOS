/**
 * 設定アプリ
 */

function controlPanel_Start(){
	var subx = ( screen.availWidth - 600 ) / 2;
	var suby = ( screen.availHeight - 500 ) / 2;

	const Window_element = Window_Create("設定", 0, subx, suby, 600, 500);
	const WIndowID = Window_element.ID;

	const HomeHTML = ""+
					"<H1>SINOSの設定</H1>"+
					"<HR>"+
					"<BUTTON onclick=\"controlPanel_mySettings(" + WIndowID + ")\">個人設定</BUTTON>"

	Window_Contents(HomeHTML,0,WIndowID);
}

function controlPanel_mySettings(WindowID){
	const MySettingHTML = ""+
					"<H1>個人設定設定</H1>"+
					"<HR>"+
					"<IMG id=\"controlPanel_BgFile_Preview_" + WindowID + "\" src=\"./ETC/Default_Background.png\" width=\"190px\"><BR>"+
					"<INPUT type=\"file\" id=\"controlPanel_BgFile_" + WindowID + "\"  accept=\".jpg, .png, .gif\" onchange=\"BgImg_Ch_Preview(" + WindowID + ")\"><BUTTON onclick=\"BgImg_Ch(" + WindowID + ")\">背景画像変更</BUTTON>"

	Window_Contents(MySettingHTML,0,WindowID);
}


//設定変更
function BgImg_Ch(WindowID){
	//背景画像変更
	const element = document.getElementById('controlPanel_BgFile_' + WindowID);
	const files = element.files;

	var blobUrl = window.URL.createObjectURL(files[0]);
	this.document.body.style.backgroundImage = "url(" + blobUrl + ")"
}

function BgImg_Ch_Preview(WindowID){
	//背景画像変更プレビュー
	const element = document.getElementById('controlPanel_BgFile_' + WindowID);
	const files = element.files;

	var blobUrl = window.URL.createObjectURL(files[0]);
	document.getElementById("controlPanel_BgFile_Preview_" + WindowID).src = blobUrl;
}



setInterval(function(){
	var DATE_TIME = new Date();

	var YEAR = DATE_TIME.getFullYear();
	var MONTH = DATE_TIME.getMonth()+1;
	var DATE = DATE_TIME.getDate();
	var HOUR = DATE_TIME.getHours();
	var MIN = DATE_TIME.getMinutes();
	var SEC = DATE_TIME.getSeconds();

	document.getElementById("CLOCK").innerHTML = YEAR + "年" + MONTH + "月" + DATE + "日<BR>" + HOUR + "時" + MIN + "分" + SEC + "秒";
}, 100);