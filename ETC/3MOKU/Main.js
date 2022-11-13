/**
 * 三目並べ(アプリのテスト)
 */

//ウィンドウを作成
function sanmoki_Start(){
    const Window_element = Window_Create("三目並べ", 1, 0, 0, 500, 500);
    const WIndowID = Window_element.ID;

    samoku_reset(WIndowID);
}

function sanmoku_Clicked(e){

    if(document.getElementById("sanmoku_" + e.target.className.split("_")[2]).innerHTML == "丸の番"){
        if(e.target.innerHTML == "無"){
            e.target.innerHTML = "<IMG src=\"./ETC/3MOKU/Asets/CIRCLE.png\">";
            document.getElementById("sanmoku_" + e.target.className.split("_")[2]).innerHTML = "罰の番";

            Victory_Judgment(e.target.className.split("_")[2]);
        }else{
            Dialog("そこには置けない","三目並べ",0);
        }
    }else{
        if(e.target.innerHTML == "無"){
            e.target.innerHTML = "<IMG src=\"./ETC/3MOKU/Asets/CROSS.png\">";
            document.getElementById("sanmoku_" + e.target.className.split("_")[2]).innerHTML = "丸の番";

            Victory_Judgment(e.target.className.split("_")[2]);
        }else{
            Dialog("そこには置けない","三目並べ",0);
        }

    }

    //console.log(document.getElementsByClassName("sanmoku_" + ++e.target.className.split("_")[1]))
}

//勝敗判定
function Victory_Judgment(WindowID){
    /**
     * [O][X][X]
     * [O][X][X]
     * [O][X][X]
     */
    var VJ_1 = document.getElementsByClassName("sanmoku_0_" + WindowID)[0].innerHTML;
    if(VJ_1 != "無"){
        if(document.getElementsByClassName("sanmoku_0_" + WindowID)[0].innerHTML == VJ_1){
            if(document.getElementsByClassName("sanmoku_3_" + WindowID)[0].innerHTML == VJ_1){
                if(document.getElementsByClassName("sanmoku_6_" + WindowID)[0].innerHTML == VJ_1){
                    Dialog(VJ_1 + "の勝ち！", "三目並べ", 0);
                }
            }
        }else{
            console.log("VJ_1 nilet");
        }
    }


    /**
     * [X][O][X]
     * [X][O][X]
     * [X][O][X]
     */
    var VJ_2 = document.getElementsByClassName("sanmoku_1_" + WindowID)[0].innerHTML;
    if(VJ_2 != "無"){
        if(document.getElementsByClassName("sanmoku_1_" + WindowID)[0].innerHTML == VJ_2){
            if(document.getElementsByClassName("sanmoku_4_" + WindowID)[0].innerHTML == VJ_2){
                if(document.getElementsByClassName("sanmoku_7_" + WindowID)[0].innerHTML == VJ_2){
                    Dialog(VJ_2 + "の勝ち！", "三目並べ", 0);
                }
            }
        }else{
            console.log("VJ_2 nilet");
        }
    }

    /**
     * [X][X][O]
     * [X][X][O]
     * [X][X][O]
     */
    var VJ_3 = document.getElementsByClassName("sanmoku_2_" + WindowID)[0].innerHTML;
    if(VJ_3 != "無"){
    if(document.getElementsByClassName("sanmoku_2_" + WindowID)[0].innerHTML == VJ_3){
        if(document.getElementsByClassName("sanmoku_5_" + WindowID)[0].innerHTML == VJ_3){
            if(document.getElementsByClassName("sanmoku_8_" + WindowID)[0].innerHTML == VJ_3){
                Dialog(VJ_3 + "の勝ち！", "三目並べ", 0);
            }
        }
        }else{
            console.log("VJ_3 nilet");
        }
    }

    /**
     * [O][O][O]
     * [X][X][X]
     * [X][X][X]
     */
    var VJ_4 = document.getElementsByClassName("sanmoku_0_" + WindowID)[0].innerHTML;
    if(VJ_4 != "無"){
    if(document.getElementsByClassName("sanmoku_0_" + WindowID)[0].innerHTML == VJ_4){
        if(document.getElementsByClassName("sanmoku_1_" + WindowID)[0].innerHTML == VJ_4){
            if(document.getElementsByClassName("sanmoku_2_" + WindowID)[0].innerHTML == VJ_4){
                Dialog(VJ_4 + "の勝ち！", "三目並べ", 0);
            }
        }
        }else{
            console.log("VJ_4 nilet");
        }
    }

    /**
     * [X][X][X]
     * [O][O][O]
     * [X][X][X]
     */
    var VJ_5 = document.getElementsByClassName("sanmoku_3_" + WindowID)[0].innerHTML;
    if(VJ_5 != "無"){
    if(document.getElementsByClassName("sanmoku_3_" + WindowID)[0].innerHTML == VJ_5){
        if(document.getElementsByClassName("sanmoku_4_" + WindowID)[0].innerHTML == VJ_5){
            if(document.getElementsByClassName("sanmoku_5_" + WindowID)[0].innerHTML == VJ_5){
                Dialog(VJ_5 + "の勝ち！", "三目並べ", 0);
            }
        }
        }else{
            console.log("VJ_5 nilet");
        }
    }


    /**
     * [X][X][X]
     * [X][X][X]
     * [O][O][O]
     */
    var VJ_6 = document.getElementsByClassName("sanmoku_6_" + WindowID)[0].innerHTML;
    if(VJ_6 != "無"){
    if(document.getElementsByClassName("sanmoku_6_" + WindowID)[0].innerHTML == VJ_6){
        if(document.getElementsByClassName("sanmoku_7_" + WindowID)[0].innerHTML == VJ_6){
            if(document.getElementsByClassName("sanmoku_8_" + WindowID)[0].innerHTML == VJ_6){
                Dialog(VJ_6 + "の勝ち！", "三目並べ", 0);
            }
        }
        }else{
            console.log("VJ_6 nilet");
        }
    }

    /**
     * [O][X][X]
     * [X][O][X]
     * [X][X][O]
     */
    var VJ_7 = document.getElementsByClassName("sanmoku_0_" + WindowID)[0].innerHTML;
    if(VJ_7 != "無"){
    if(document.getElementsByClassName("sanmoku_0_" + WindowID)[0].innerHTML == VJ_7){
        if(document.getElementsByClassName("sanmoku_4_" + WindowID)[0].innerHTML == VJ_7){
            if(document.getElementsByClassName("sanmoku_8_" + WindowID)[0].innerHTML == VJ_7){
                Dialog(VJ_7 + "の勝ち！", "三目並べ", 0);
            }
        }
        }else{
            console.log("VJ_7 nilet");
        }
    }

    /**
     * [X][X][O]
     * [X][O][X]
     * [O][X][X]
     */
    var VJ_8 = document.getElementsByClassName("sanmoku_2_" + WindowID)[0].innerHTML;
    if(VJ_8 != "無"){
    if(document.getElementsByClassName("sanmoku_2_" + WindowID)[0].innerHTML == VJ_8){
        if(document.getElementsByClassName("sanmoku_4_" + WindowID)[0].innerHTML == VJ_8){
            if(document.getElementsByClassName("sanmoku_6_" + WindowID)[0].innerHTML == VJ_8){
                Dialog(VJ_8 + "の勝ち！", "三目並べ", 0);
            }
        }
        }else{
            console.log("VJ_8 nilet");
        }
    }
}

function samoku_reset(WIndowID){
    console.log(WIndowID);
    Window_Contents("<DIV id='sanmoku_" + WIndowID + "'>丸の番</DIV>"+
    "<BUTTON class='sanmoku_0_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON> <BUTTON class='sanmoku_1_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON> <BUTTON class='sanmoku_2_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON><BR>" + 
    "<BUTTON class='sanmoku_3_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON> <BUTTON class='sanmoku_4_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON> <BUTTON class='sanmoku_5_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON><BR>"+
    "<BUTTON class='sanmoku_6_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON> <BUTTON class='sanmoku_7_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON> <BUTTON class='sanmoku_8_" + WIndowID + "' onclick='sanmoku_Clicked(event)' style='width: 80px; height: 80px;'>無</BUTTON><BR>"+
    "<BUTTON id='sanmoku_reset_" + WIndowID + "' onclick='samoku_reset(event.target.id.split(\"_\")[2])'>リセット</BUTTON>",0,WIndowID);
}