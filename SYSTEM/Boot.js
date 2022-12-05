const BOOTSCREEN_LOG = document.getElementById("BOOTSCREEN_LOG");

function BOOT_SCREEN(){
	var img = document.getElementById("BOOTSCREEN_IMG");

	var IMG_COUNT = 53;

	var TIME = 100;

	BOOT_LOG("[ OK ]BootSplash load");
	index = 0;
	setInterval(function() {
        img.setAttribute("src", "./etc/BOOT_SCREEN/" + index + ".png");
        index = ++index % IMG_COUNT;
    }, TIME);
}

function BOOT_CL(){
	document.getElementById("BOOTSCREEN").style.display = "none";
}

function BOOT_LOG(TEXT){
	BOOTSCREEN_LOG.innerHTML += TEXT + "<BR>";
}