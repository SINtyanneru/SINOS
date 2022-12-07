const BOOTSCREEN_LOG = document.getElementById("BOOTSCREEN_LOG");
var BOOTSCREEN_BOOT_TIMER;
var BOOTSCREEN_BOOT_SOUND = true;
function BOOT_SCREEN(){
	var img = document.getElementById("BOOTSCREEN_IMG");

	var IMG_COUNT = 53;

	var TIME = 100;

	BOOT_LOG("[ OK ]BootSplash load");
	index = 0;
	BOOTSCREEN_BOOT_TIMER = setInterval(function() {
		img.setAttribute("src", "./etc/BOOT_SCREEN/" + index + ".png");
		index = ++index % IMG_COUNT;
	}, TIME);
}

function BOOT_CL(){
	document.getElementById("BOOTSCREEN").style.display = "none";
	LOGINUI_Start();

	clearInterval(BOOTSCREEN_BOOT_TIMER);

	window.addEventListener("click", (e)=>{
		if(BOOTSCREEN_BOOT_SOUND){
			//なんで自動再生できないのよ、意味不明、ウェブ標準死ね
			const music = new Audio('./ETC/SOUND/SINOS_BOOT_SOUND.mp3');
			music.play();
			BOOTSCREEN_BOOT_SOUND = false;
		}
	})
}

function BOOT_LOG(TEXT){
	BOOTSCREEN_LOG.innerHTML += TEXT + "<BR>";
}