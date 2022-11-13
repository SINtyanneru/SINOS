//Window_List => Window_System.jsに入ってる
//ZIndex_max下に同じく

function Window_Close(element){
	document.getElementById(element).remove();
	console.log("[ OK ]Close Window :" + element);

    Window_List.splice(Window_List.indexOf(element));
}

/**
 * 
 * @param {"Title"} TITLE 
 * @param {"Posiion X"} POS_X 
 * @param {"Position Y"} POS_Y 
 * @returns 
 */
function Window_Create(TITLE,POS_X,POS_Y,SIZE_W,SIZE_H){
    try{
        var ID = Math.floor( Math.random() * 100 );

        const Window_Template =
        "<DIV id=\"" + ID + "\" class=\"WINDOW\" style=\"top:" + POS_Y + "px; left:" + POS_X + "px; width: " + SIZE_W + "px; height: "+ SIZE_H + "px\">"+
            "<DIV class=\"TITLE\">"+ TITLE + "<R class=\"WINDOW_BUTTON\"><BUTTON>_</BUTTON><BUTTON onclick=\"Window_Close('" + ID + "')\">X</BUTTON></R></DIV>"+
            "<DIV class=\"CONTENTS\"></DIV>"+
        "</DIV>";
    
        const Window_element = document.getElementById("WINDOW_AREA").innerHTML += Window_Template;
    
        Window_List.push(ID);
    
        Window_List.forEach(element =>{
            //ドラッグしたい要素
            var div = document.getElementById(element);
            //マウスドラッグに反応する要素
            var title = div.querySelector(".TITLE");
            //ドラッグのオブジェクトを作る。
            var drag = new MouseDrag();
            drag.init(div, title);
        });
    
        return {"STATUS":"OK","ID":ID};
    }catch(ex){
        return {"STATUS":"ERR","MSG":ex};
    }
}