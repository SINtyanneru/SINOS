//初期化だよ！
window.onload = function(){
	//ドラッグしたい要素
	const div = document.querySelector("#DIV1");
	//マウスドラッグに反応する要素
	const title = div.querySelector(".TITLE");
	//ドラッグのオブジェクトを作る。
	const drag = new MouseDrag();
	drag.init(div, title);

	//ドラッグしたい要素
	const div2 = document.querySelector("#DIV2");
	//マウスドラッグに反応する要素
	const title2 = div2.querySelector(".TITLE");
	//ドラッグのオブジェクトを作る。
	const drag2 = new MouseDrag();
	drag2.init(div2, title2);
};