function FileListGet(Path){
	var ajax = new XMLHttpRequest();

	ajax.open("POST", "http://127.0.0.1/GetFileList/" + Path);
	ajax.withCredentials = true;
	ajax.send();

	return ajax;
}

function FileDataGet(Path){
	var ajax = new XMLHttpRequest();

	ajax.open("POST", "http://127.0.0.1/GetFileData/" + Path);
	ajax.withCredentials = true;
	ajax.send();

	return ajax;
}