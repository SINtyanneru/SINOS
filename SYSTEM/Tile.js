var Tile_JSON = [{"ID":"TEST","NAME":"テストタイル","POS":"0"},{"ID":"TEST","NAME":"テストタイル","POS":"5"}];
const Tile_ID = Array(0,1,2,3,4,5,6,7,8,9,10);
var Clicked_Tile;

window.addEventListener('load', (event) => {
	TILE_RELOAD();
});

function TILE_RELOAD(){
	Tile_ID.forEach(element => {
		document.getElementById("TILE_" + element).style = "";
		document.getElementById("TILE_" + element).innerHTML = "";
	});

	Tile_JSON.forEach(element => {
		document.getElementById("TILE_" + element.POS).style = "background-image: url(./ETC/" + element.ID + "/TILE_ICON.png); background-size: contain; font-size:10px;";
		document.getElementById("TILE_" + element.POS).innerHTML = element.NAME;
	});
}

function TILE_CONTEXTMENU(e, INDEX){
	const CONTEXTMENU = document.getElementById("TILE_CONTEXTMENU");

	if(e.ctrlKey){
		//コントロールキーを押している場合

		CONTEXTMENU.innerHTML = "今選択してるのは～！ ：" + INDEX + "です！！<BUTTON onclick=\"TILE_CH();\">" + "タイルの場所を変更" + "</BUTTON>";		//中に追加

		CONTEXTMENU.style.left = e.clientX + "px";	//位置を調整
		CONTEXTMENU.style.top = e.clientY + "px";		//位置を調整
		CONTEXTMENU.style.display = "block";		//なんか、あれだよ、あれ
	}else{
		//押してねえぞ！！ファアアック
		CONTEXTMENU.style.display = "none";		//これもあれだよ、うん
	}
}

function TILE_CH(){
	alert("移動先のタイルを選んでほしいのだ！");

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

				clearInterval(set_int);
				return;
			}

			Tile_JSON.forEach(element => {
				if(element.POS == CH_INDEX){
					checkFlg = window.confirm('そこにはすでにタイルがあるよ、本当に変える？');
				}
			});

			if(checkFlg){
				console.log("[ *** ]Tile Changeding...")
				Tile_JSON[1].POS = CH_INDEX;
				TILE_RELOAD();

				console.log("[ OK ]Tile Changeed!")
			}else{
				console.log("[ OK ]Canseled")
			}

			document.getElementById("TILE_CONTEXTMENU").style.display = "none";

			clearInterval(set_int);
			return;
		}
	}
	const set_int = setInterval(countUp, 1000);
}

window.addEventListener('click', function(e){
	console.log("くりっく" + e.target.id);
	if(e.target.className.split(" ")[1] == "TILE_ITEM"){
		console.log("タイルをクリックした！");
		Clicked_Tile = e.target.className.split(" ")[0]
	}
});
