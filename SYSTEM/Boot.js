function BOOT_SCREEN(){
	var img = document.getElementById("BOOTSCREEN_IMG");
	var IMG_ARRAY = [
		"./etc/BOOT_SCREEN/0.png",
		"./etc/BOOT_SCREEN/1.png",
		"./etc/BOOT_SCREEN/2.png",
		"./etc/BOOT_SCREEN/3.png",
		"./etc/BOOT_SCREEN/4.png",
		"./etc/BOOT_SCREEN/5.png",
		"./etc/BOOT_SCREEN/6.png",
		"./etc/BOOT_SCREEN/7.png",
		"./etc/BOOT_SCREEN/8.png",
		"./etc/BOOT_SCREEN/9.png",
	];

	var TIME = 500;

	length = IMG_ARRAY.length,
	index = 0;
	setInterval(function() {
        img.setAttribute("src", IMG_ARRAY[index]);
        index = ++index % length;
    }, TIME);
}