var DashBord_Mode = false;

function DashBord_OC(){
	const DashBord = document.getElementById("DASHBORD");

	if(!DashBord_Mode){
		DashBord.classList.add("open");

		Menu_Close();

		DashBord_Mode = true;
	}else{
		DashBord.classList.remove("open");
		DashBord_Mode = false;
	}
}

function DashBord_Close(){
	if(DashBord_Mode){
		const DashBord = document.getElementById("DASHBORD");

		DashBord.classList.remove("open");
		DashBord_Mode = false;
	}
}

/* ---------------------------------------------------------------------
	アナログ時計 参考：https://dianxnao.com/javascript%EF%BC%9A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%90%E3%82%B9%E3%81%A7%E6%99%AE%E9%80%9A%E3%81%AE%E3%82%A2%E3%83%8A%E3%83%AD%E3%82%B0%E6%99%82%E8%A8%88%E3%82%92%E4%BD%9C%E3%82%8B/
 --------------------------------------------------------------------- */
/*
 * グローバル変数
 */
let wrapper = null;                // キャンバスの親要素
let canvas = null;                    // キャンバス
let g = null;                        // コンテキスト
let clock_size;                    // 時計のサイズ
let scale;                            // 時計のスケール
let center = { x:0, y:0 };            // 時計の中心座標
let $id = function(id){ return document.getElementById(id); };    // DOM取得用
 
/*
 * 定数
 */
const BACKGROUND_COLOR = "transparent";        // 背景色
const WAKU_COLOR = "black";        // 時計枠の色
const CLOCK_BG_COLOR = "transparent";            // 時計枠内側の色
const CLOCK_CENTER_COLOR = "deeppink";    // 時計針の中心のピンの色
const MOJI_BAN_COLOR = "black";            // 文字盤の12本の線の色
const SUJI_COLOR = "gray"                // 数字の色
const DIGITAL_NUM_COLOR = "rgb(0, 255, 0)";		//デジタル時計のいろ
const DIGITAL_BG_COLOR = "rgba(255, 255, 255, 0.5)";		//デジタル時計のいろ
const JI_SHIN_COLOR = "slategrey";            // 時針の色
const FUN_SHIN_COLOR = "slategrey";            // 分針の色
const BYOU_SHIN_COLOR = "deeppink";        // 秒針の色
 
/*
 * キャンバスのサイズをウインドウに合わせて変更
 */
function getSize(){
	// キャンバスのサイズを再設定
	canvas.width = wrapper.offsetWidth;
	canvas.height =  wrapper.offsetHeight;
	// キャンバスの中心を設定
	center.x = canvas.width / 2;
	center.y = canvas.height / 2;
	// 短辺を時計のサイズとする
	clock_size = canvas.width >= canvas.height ? canvas.height : canvas.width;
	// 時計の縮尺を設定（ウインドウ短辺=500px のとき 縮尺=1 とする）
	scale = clock_size / 500.0;
}
 
/*
 * リサイズ時（キャンバスの中心と時計の縮尺を再設定）
 */
window.addEventListener("resize", function(){
	getSize();
});
 
/*
 * アナログ時計を描画する
 */
function clock(){
	//CANVASをクリア
	g.clearRect(0, 0, 500, 500);

	g.save();        // デフォルト設定保存

	// 背景色を描画
	g.fillStyle = BACKGROUND_COLOR;
	g.fillRect(0, 0, canvas.width, canvas.height);

	// 時計枠の内側（背景色）を描画
	g.translate(center.x, center.y);        // キャンバスの中心を中心座標に設定
	g.scale(scale, scale);                // 時計の縮尺を設定
	g.fillStyle = CLOCK_BG_COLOR;
	g.beginPath();
	g.arc(0, 0, 200, 0, Math.PI*2, true);
	g.fill();

	/*
	//もう使わない
	// 時計枠の描画
	g.beginPath();
	g.lineWidth = 25;
	g.strokeStyle = WAKU_COLOR;
	g.arc(0, 0, 200, 0, Math.PI*2, true);
	g.stroke();
	*/

	//===============================[ 時計にデジタル文字を表示 ]
	var DATE_TIME = new Date();		//時刻のあれを定義

	//時刻を全て変数にバボーン
	var YEAR = DATE_TIME.getFullYear();
	var MONTH = DATE_TIME.getMonth()+1;
	var DATE = DATE_TIME.getDate();
	var HOUR = DATE_TIME.getHours();
	var MIN = DATE_TIME.getMinutes();
	var SEC = DATE_TIME.getSeconds();

	//デジタル時計として表示する時刻を変数にバボーン
	var DATE_TEXT = YEAR + "年" + MONTH + "月" + DATE + "日";
	var TIME_TEXT = HOUR + "時" + MIN + "分" + SEC + "秒";

	//ここから表示処理
	g.fillStyle = SUJI_COLOR;
	g.font = "32px serif";    // ゴシック体
	g.textBaseline = "middle";
	g.lineWidth = 5;
	g.fillStyle = DIGITAL_BG_COLOR;		//デジタル文字の背景色
	g.fillRect( -120, 0, 240, 90 )	//四角を描画
	g.fillStyle = DIGITAL_NUM_COLOR;	//デジタル文字の色
	var DATE_WIDTH = g.measureText(DATE_TEXT);		//文字の長さ
	var TIME_WIDTH = g.measureText(TIME_TEXT);		//文字の長さ
	g.fillText(DATE_TEXT, 0 - DATE_WIDTH.width / 2, 30);	//0 - 文字の長さ / 2の位置に表示
	g.fillText(TIME_TEXT, 0 - TIME_WIDTH.width / 2, 70);	//0 - 文字の長さ / 2の位置に表示
	//==========================================================

	g.rotate(-Math.PI/2);    // 左に90度回転（12時方向を0度とするため）
	g.lineCap = "round";    // 時針、分針、秒針の角をを丸くするため設定

	// 現在時刻取得
	let now = new Date();

	let hour = now.getHours();            // 時
	let minute = now.getMinutes();        // 分
	let second = now.getSeconds();        // 秒

	hour = hour >= 12 ? hour - 12 : hour;    // 13時～24時  -> 1時～12時に変更

	// 文字盤の時間を表す12本の線を描画
	g.save();
	g.strokeStyle = MOJI_BAN_COLOR;
	g.lineWidth = 6;
 
	g.beginPath();
	for(let i=0; i<12; i++){
		g.rotate(Math.PI/6);    // 30度ずつ回転
		g.moveTo(170, 0);
		g.lineTo(190, 0);
	}
	g.stroke();
	g.restore();

	// 文字盤の秒数を表す64本の線を描画
	g.save();
	g.strokeStyle = MOJI_BAN_COLOR;
	g.lineWidth = 4;

	g.beginPath();
	for(let i=0; i<64; i++){
		g.rotate(Math.PI/30);    // 30度ずつ回転
		g.moveTo(170, 0);
		g.lineTo(180, 0);
	}
	g.stroke();
	g.restore();

	// 時間の数字を描画
	g.save();
	g.rotate(Math.PI/2);        // 回転を元に戻す（3時15分方向を0度）
							// 文字盤の数字の描画向きが傾いてしまう為
	g.fillStyle = SUJI_COLOR;
	g.font = "bold 32px sans-serif";    // ゴシック体
	g.textBaseline = "middle";

	let angle = -60;    // 時計中心からの角度（数字の1から描画開始）
	let offset = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15, 20];    // 数字によるx座標のずれを補正
	let r = 150;        // 時計中心からの半径
 
	i = 1;
	while(i <= 12){
		let radian = angle * Math.PI / 180;    // ラジアンに変換
		let x = r * Math.cos(radian);        // x座標
		let y = r * Math.sin(radian);        // y座標

		if(i % 1 == 0) g.fillText(i, x-offset[i-1], y);    // 3, 6, 9, 12のみ描画
		angle += 30;
		i++;
	}
	g.restore();
 
	// 時針を描画
	g.save();
	g.rotate( hour * (Math.PI/6) + minute * (Math.PI/360) + second * (Math.PI/21600) );    // 時数*30度 + 分数*0.5度 + 秒数 * 0.00833333333度 回転
	g.lineWidth = 12;
	g.strokeStyle = JI_SHIN_COLOR;
	g.beginPath();
	g.moveTo(-20, 0);
	g.lineTo(85, 0);
	g.stroke();
	g.restore();
	 
	// 分針を描画
	g.save();
	g.rotate( minute * (Math.PI/30) + second * (Math.PI/1800) );    // 分数*6度 + 秒数*0.1度 回転 
	g.lineWidth = 8;
	g.strokeStyle = FUN_SHIN_COLOR;
	g.beginPath();
	g.moveTo(-28, 0);
	g.lineTo(112, 0);
	g.stroke();
	g.restore();
	 
	// 秒針を描画
	g.rotate(second * Math.PI/30);    // 秒数*6度 回転
	g.strokeStyle = BYOU_SHIN_COLOR;
	g.lineWidth = 4;
	g.beginPath();
	g.moveTo(-30, 0);
	g.lineTo(180, 0);
	g.stroke();
 
	// 時計の中心を描画
	g.fillStyle = CLOCK_CENTER_COLOR;
	g.beginPath();
	g.arc(0, 0, 8, 0, Math.PI*2, true);
	g.fill();

	g.restore();
 
	setTimeout(clock, 100);    // 再帰呼び出し
}
 
/*
 * 起動時の処理
 */
window.addEventListener("load", function(){
	// キャンバスの親要素情報取得（親要素が無いとキャンバスのサイズが画面いっぱいに表示できないため）
	wrapper = $id("DASHBORD_CLOCK_WRAPPER");
	// キャンバス情報取得
	canvas = $id("DASHBORD_CLOCK");
	g = canvas.getContext("2d");
 
	// キャンバスをウインドウサイズにする
	getSize();

	// アナログ時計を起動
	clock();
});