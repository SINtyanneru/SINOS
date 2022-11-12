var Tile_JSON = [{"ID":"TEST","NAME":"テストタイル","POS":"0"},{"ID":"TEST","NAME":"テストタイル","POS":"5"}];

window.addEventListener('load', (event) => {
	Tile_JSON.forEach(element => {
		document.getElementById("TILE_" + element.POS).style = "background-image: url(./ETC/" + element.ID + "/TILE_ICON.png); background-size: contain; font-size:10px;";
		document.getElementById("TILE_" + element.POS).innerHTML = element.NAME;
	});
});