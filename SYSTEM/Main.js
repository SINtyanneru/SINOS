var Menu_Mode = false;


function Menu_OC(){
	const Menu = document.getElementById("MENU");

	if(!Menu_Mode){
		Menu.classList.add("open")
		Menu_Mode = true;
	}else{
		Menu.classList.remove("open")
		Menu_Mode = false;
	}
}