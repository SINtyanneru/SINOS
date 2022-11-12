var Tile_JSON = [{"ID":"TEST","NAME":"テストタイル","POS":"0"},{"ID":"TEST","NAME":"テストタイル","POS":"5"}];

window.addEventListener('load', (event) => {
	Tile_JSON.forEach(element => {
		document.getElementById("TILE_" + element.POS).style = "background-image: url(./ETC/" + element.ID + "/TILE_ICON.png); background-size: contain; font-size:10px;";
		document.getElementById("TILE_" + element.POS).innerHTML = element.NAME;
	});
});

function TILE_CH(e, INDEX){
	const CONTEXTMENU = document.getElementById("TILE_CONTEXTMENU");

	if(e.ctrlKey){
		//コントロールキーを押している場合

		CONTEXTMENU.innerHTML = "今選択してるのは～！ ：" + INDEX + "です！！";		//中に追加

		CONTEXTMENU.style.left = e.offsetX+"px";	//位置を調整
		CONTEXTMENU.style.top = e.offsetY+"px";		//位置を調整
		CONTEXTMENU.style.display = "block";		//なんか、あれだよ、あれ
	}else{
		//押してねえぞ！！ファアアック
		CONTEXTMENU.style.display = "none";		//これもあれだよ、うん
	}
}

window.addEventListener('load', function(e){
});
