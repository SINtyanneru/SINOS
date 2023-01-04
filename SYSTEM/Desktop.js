let DESKTOP_CANVAS_CLICK = false;
let DESKTOP_CANVAS_SX = 0;
let DESKTOP_CANVAS_SY = 0;
let DESKTOP_CANVAS_X = 0;
let DESKTOP_CANVAS_Y = 0;

window.addEventListener("load", (e)=>{
	const DESKTOP_CANVAS = document.getElementById("DESKTOP_CANVAS");

	DESKTOP_CANVAS.width = window.screen.width;
	DESKTOP_CANVAS.height = window.screen.height;

	// element = <canvas width="200" height="200"></canvas>
	var context = DESKTOP_CANVAS.getContext("2d");

	DESKTOP_CANVAS.addEventListener("mousedown", (e)=>{
		if(e.button == 0){
			DESKTOP_CANVAS_CLICK = true;
			DESKTOP_CANVAS_SX = e.clientX;
			DESKTOP_CANVAS_SY = e.clientY;
		}
	});

	DESKTOP_CANVAS.addEventListener("mouseup", (e)=>{
		DESKTOP_CANVAS_CLICK = false;
		//クリア
		context.clearRect(0, 0, DESKTOP_CANVAS.width, DESKTOP_CANVAS.height);
	});

	DESKTOP_CANVAS.addEventListener("mouseleave", (e)=>{
		DESKTOP_CANVAS_CLICK = false;
		//クリア
		context.clearRect(0, 0, DESKTOP_CANVAS.width, DESKTOP_CANVAS.height);
	});

	DESKTOP_CANVAS.addEventListener("mousemove", (e)=>{
		if(DESKTOP_CANVAS_CLICK){
			if(e.button == 0){
				let rect = DESKTOP_CANVAS.getBoundingClientRect();
				console.log(rect);
	
				DESKTOP_CANVAS_X = e.clientX - DESKTOP_CANVAS_SX - rect.left;
				DESKTOP_CANVAS_Y = e.clientY - DESKTOP_CANVAS_SY - rect.top;
	
				//クリア
				context.clearRect(0, 0, DESKTOP_CANVAS.width, DESKTOP_CANVAS.height);
	
				// パスをリセット
				context.beginPath () ;
	
				context.fillStyle = "rgba(0, 255, 170, 0.555)";
				//左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
				context.fillRect(DESKTOP_CANVAS_SX,DESKTOP_CANVAS_SY,DESKTOP_CANVAS_X,DESKTOP_CANVAS_Y);
	
				// レクタングルの座標(50,50)とサイズ(75,50)を指定
				context.rect( DESKTOP_CANVAS_SX, DESKTOP_CANVAS_SY, DESKTOP_CANVAS_X, DESKTOP_CANVAS_Y )
	
				// 線の色
				context.strokeStyle = "white";
	
				// 線の太さ
				context.lineWidth = 1 ;
	
				// 線を描画を実行
				context.stroke() ;
			}
		}
	});
});