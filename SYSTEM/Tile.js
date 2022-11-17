var Tile_JSON = [{"ID":"TEST","NAME":"るみしすてむ","POS":"0","VOID":"window.open('https://rumiserver.com/rumisystem/','_blank')"}];
const Tile_ID = Array(0,1,2,3,4,5,6,7,8,9,10);
var Clicked_Tile;

window.addEventListener('load', (event) => {
	TILE_RELOAD();
});

function TILE_RELOAD(){
	//タイルをリロード

	//タイルを一回抹殺
	Tile_ID.forEach(element => {
		document.getElementById("TILE_" + element).style = "";
		document.getElementById("TILE_" + element).innerHTML = "";
	});

	var count = 0; //例のアレ、そう、カウント

	//一個一個追加
	Tile_JSON.forEach(element => {
		document.getElementById("TILE_" + element.POS).style = "background-image: url(./ETC/" + element.ID + "/TILE_ICON.png); background-size: contain; font-size:10px; cursor: pointer;";	//テキスト
		document.getElementById("TILE_" + element.POS).dataset.tileindex = count;	//JSON上で何個目のタイルか
		document.getElementById("TILE_" + element.POS).innerHTML = "<R id=\"TILE_ITEM\" onclick=\"if(!event.ctrlKey){Menu_Close(); " + element.VOID + "}\" style=\"display:block; position: relative; top: 70px;\">" + element.NAME + "</R>";	//名前

		count++;
	});
}

function TILE_CONTEXTMENU(e, INDEX){
	const CONTEXTMENU = document.getElementById("TILE_CONTEXTMENU");

	if(e.ctrlKey){
		//コントロールキーを押している場合
		CONTEXTMENU.innerHTML = "今選択してるのは～！ ：" + INDEX + "です！！<HR><BUTTON onclick=\"TILE_CH(" + e.target.dataset.tileindex + ");\" style=\"width: 100%;\">" + "タイルの場所を変更" + "</BUTTON>";		//中に追加

		CONTEXTMENU.style.left = e.clientX + "px";	//位置を調整
		CONTEXTMENU.style.top = e.clientY + "px";		//位置を調整
		CONTEXTMENU.style.display = "block";		//なんか、あれだよ、あれ
	}else{
		//押してねえぞ！！ファアアック
		CONTEXTMENU.style.display = "none";		//これもあれだよ、うん
	}
}

function TILE_CH(INDEX){
	Dialog("移動先のタイルを選んでほしいのだ！", "タイル", 0)

	const now_selecttile = Clicked_Tile;

	const countUp = () => {
		if(now_selecttile != Clicked_Tile){
			var checkFlg = true;
			var CH_INDEX = "None";

			Tile_ID.forEach(element => {
				if("TILE_" + element == Clicked_Tile){
					CH_INDEX = element;
				}
			});
		
			if(CH_INDEX == "None"){
				console.log("[ OK ]I CAN'T FUCKING BELIEVE THIS!!!");

				console.log("[ OK ]Canseled")

				//処理停止
				clearInterval(set_int);
				return;
			}

			Tile_JSON.forEach(element => {
				if(element.POS == CH_INDEX){
					Dialog("Error", "タイル", 1)

					//処理停止
					clearInterval(set_int);
					return;
				}
			});

			if(checkFlg){
				console.log("[ *** ]Tile Changeding...")
				Tile_JSON[INDEX].POS = CH_INDEX;
				TILE_RELOAD();

				console.log("[ OK ]Tile Changeed!")
			}else{
				console.log("[ OK ]Canseled")
			}

			document.getElementById("TILE_CONTEXTMENU").style.display = "none";

			//処理停止
			clearInterval(set_int);
			return;
		}
	}
	const set_int = setInterval(countUp, 1000);
}

window.addEventListener('click', function(e){
	if(e.target.className.split(" ")[1] == "TILE_ITEM"){
		console.log("タイルをクリックした！");

		Clicked_Tile = e.target.className.split(" ")[0];	//Clicked_Tileに、タイルのIDをぶちこーん

		if(!e.ctrlKey){
			try{
				var click_event = new Event('click');//クリックイベントを作成
				var target = document.getElementById(Clicked_Tile).querySelector("#TILE_ITEM"); //タイルの中のアイテムを取得
				target.dispatchEvent(click_event);	//そのアイテムのクリックイベントをチャッカマン
			}catch(ex){
				//タイルの中にアイテムがない場合
			}
		}
	}else{
		document.getElementById("TILE_CONTEXTMENU").style.display = "none";
	}
});
