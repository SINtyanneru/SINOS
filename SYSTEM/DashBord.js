var DashBord_Mode = false;

function DashBord_OC(){
	const DashBord = document.getElementById("DASHBORD");

	if(!DashBord_Mode){
		DashBord.classList.add("open");

		Menu_Close();

		DashBord_Mode = true;
	}else{
		DashBord.classList.remove("open");
		DashBord_Mode = false;
	}
}

function DashBord_Close(){
	if(DashBord_Mode){
		const DashBord = document.getElementById("DASHBORD");

		DashBord.classList.remove("open");
		DashBord_Mode = false;
	}
}