/**
 * 三目並べ(アプリのテスト)
 */

//ウィンドウを作成
function sanmoki_Start(){
    const Window_element = Window_Create("三目並べ", 1, 0, 0, 500, 500);
    const WIndowID = Window_element.ID;

    Window_Contents("<BUTTON class='sanmoku_0' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_1' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_2' onclick='sanmoku_Clicked(event)'>無</BUTTON><BR>" + 
    "<BUTTON class='sanmoku_0' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_1' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_2' onclick='sanmoku_Clicked(event)'>無</BUTTON><BR>"+
    "<BUTTON class='sanmoku_0' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_1' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_2' onclick='sanmoku_Clicked(event)'>無</BUTTON>",0,WIndowID);
}

function sanmoku_Clicked(e){
    e.target.innerHTML = "丸";

    document.getElementById("sanmoku_" + Number(++e.target.className.split("_")[1])).innerHTML = "罰"
}