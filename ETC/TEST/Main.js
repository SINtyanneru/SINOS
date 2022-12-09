/**
 * てｓｔ
 */
var TEST_ICON_COUNT = 0;
function TEST_TILE(){
	setInterval(function(){
		var  TILE_CANVAS_OBJ = TILE_CANVAS("TEST");
		if(TILE_CANVAS_OBJ.STATUS == "OK"){
			var ctx = TILE_CANVAS_OBJ.CTX;
			// 画像読み込み
			const ICON_1 = new Image();
			ICON_1.src = "./ETC/TEST/TILE_ICON.png";  // 画像のURLを指定
			const ICON_2 = new Image();
			ICON_2.src = "./ETC/TEST/TILE_ICON_2.png";  // 画像のURLを指定
	
			ICON_2.onload = () => {
				if(TEST_ICON_COUNT == 2){
					ctx.drawImage(ICON_1, 0, 0, 90, 90);
					TEST_ICON_COUNT = 1;
				}else{
					ctx.drawImage(ICON_2, 0, 0, 90, 90);
					TEST_ICON_COUNT = 2;
				}
			};
		}
	},1000);
}