/**
 * 三目並べ(アプリのテスト)
 */

//ウィンドウを作成
function sanmoki_Start(){
    const Window_element = Window_Create("三目並べ", 1, 0, 0, 500, 500);
    const WIndowID = Window_element.ID;

    Window_Contents("<DIV id='sanmoku_" + WIndowID + "'>丸</DIV>"+
    "<BUTTON class='sanmoku_0_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_1_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_2_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BR>" + 
    "<BUTTON class='sanmoku_3_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_4_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_5_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BR>"+
    "<BUTTON class='sanmoku_6_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_7_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON><BUTTON class='sanmoku_8_" + WIndowID + "' onclick='sanmoku_Clicked(event)'>無</BUTTON>",0,WIndowID);
}

function sanmoku_Clicked(e){

    if(document.getElementById("sanmoku_" + e.target.className.split("_")[2]).innerHTML == "丸"){
        e.target.innerHTML = "丸";
        document.getElementById("sanmoku_" + e.target.className.split("_")[2]).innerHTML = "罰";
    }else{
        e.target.innerHTML = "罰";
        document.getElementById("sanmoku_" + e.target.className.split("_")[2]).innerHTML = "丸";
    }

    //console.log(document.getElementsByClassName("sanmoku_" + ++e.target.className.split("_")[1]))
}