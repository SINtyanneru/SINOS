/**
 * 三目並べ(アプリのテスト)
 */

var Window_ID = 00;

//ウィンドウを作成
function sanmoki_Start(){
    if(Window_ID != 00){
        Dialog("一つ以上起動することはできません！","三目並べ",1);
        return;
    }
    
    const Window_element = Window_Create("三目並べ", 1, 0, 0, 500, 500);
    Window_ID = Window_element.ID;
}