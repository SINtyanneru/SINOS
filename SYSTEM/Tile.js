var Tile_JSON = [];	//タイルのJSON(ファイルを取得して入れるので、最初は空っぽ)
const Tile_ID = Array(0,1,2,3,4,5,6,7,8,9,10);//タイルの数分これを置くよ。
var Clicked_Tile;//クリックしたタイル

function TILE_RELOAD(){
	//タイルをリロード

	//タイルのJSONを取得
	const TILE_FILEGET = FileTextGet("/CONF/USER/" + SYSTEM_USERID + "/TILE.json");
	//JSONをJSONぱーす
	const TILE_JSON_FILE = JSON.parse(TILE_FILEGET);
	//パースした塊を変数にバボーン
	Tile_JSON = TILE_JSON_FILE;


	//タイルを一回抹殺
	Tile_ID.forEach(element => {
		document.getElementById("TILE_" + element).style = "";
		document.getElementById("TILE_" + element).innerHTML = "";
	});

	var count = 0; //例のアレ、そう、カウント

	//一個一個追加
	Tile_JSON.forEach(element => {
		document.getElementById("TILE_" + element.POS).dataset.tileindex = count;	//JSON上で何個目のタイルか
		document.getElementById("TILE_" + element.POS).innerHTML = "<R class=\"TILE_ITEM_OWNER\" id=\"TILE_ITEM_OWNER\" style=\"position: relative; top: 0px; font-size: 15px;\" onclick=\"if(!event.ctrlKey){Menu_Close(); " + element.VOID + "}\"><CANVAS id=\"TILE_" + element.POS + "_CANVAS\"></CANVAS><R style=\"display:block; position: relative; top: -20px; font-size: 15px;\">" + element.NAME + "</R></R>";

		count++;
	});
}

function TILE_CONTEXTMENU(e, INDEX){
	CONTEXTMENU_EDIT("今選択してるのは～！ ：" + INDEX + "です！！<HR><BUTTON onclick=\"TILE_CH(" + e.target.dataset.tileindex + ");\" style=\"width: 100%;\">" + "タイルの場所を変更" + "</BUTTON>");		//中に追加
	CONTEXTMENU_SHOW();
}

function TILE_CANVAS(ID){
	const TILE_JSON_Routes = Tile_JSON.map((obj) => {
		return obj.ID;
	});
	const TILE_JSON_INDEX = TILE_JSON_Routes.indexOf(ID);

	if(TILE_JSON_INDEX != -1){
		const TILE_JSON_POS = Tile_JSON[TILE_JSON_INDEX].POS;

		var canvas = document.getElementById("TILE_" + TILE_JSON_POS + "_CANVAS");
		var ctx = canvas.getContext('2d')
	
		canvas.width = 90;
		canvas.height = 90;

		/*
		ctx.font = '48px serif';
		ctx.fillText('Hello world', 10, 50);
		*/

		return {"STATUS":"OK", "CTX":ctx};
	}else{
		return {"STATUS":"ERR"};
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

			CONTEXTMENU_EXIT();

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
	}
});

window.addEventListener("contextmenu", function(e){
	if(e.target.className.split(" ")[1] == "TILE_ITEM"){
		console.log("タイルを右クリックした！");

		Clicked_Tile = e.target.className.split(" ")[0];	//Clicked_Tileに、タイルのIDをぶちこーん

		TILE_CONTEXTMENU(e, e.target.className.split(" ")[0].split("_")[1]);
	}else{
	}
});