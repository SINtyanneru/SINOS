function FileListGet(Path){
	var ajax = new XMLHttpRequest();

	ajax.open("POST", "http://127.0.0.1/GetFileList/" + Path);
	ajax.withCredentials = true;
	ajax.send();

	return ajax;
}

function FileTextGet(Path){
	var ajax = new XMLHttpRequest();

	ajax.open("POST", "http://127.0.0.1/GetFileData/" + Path);
	ajax.withCredentials = true;
	ajax.send();

	return ajax;
}

function FileDataGet(Path){
	var ajax = new XMLHttpRequest();

	ajax.open("POST", "http://127.0.0.1/GetFileData/" + Path);
	ajax.withCredentials = true;
	ajax.responseType = 'blob';
	ajax.send();

	return ajax;
}

function SaveFile(Path){
	var formdata = new FormData();
	formdata.append("WIR","TESU");
	formdata.append("aaa","iii");

	var ajax = new XMLHttpRequest();

	ajax.open("POST", "http://127.0.0.1/SaveFile/" + Path);
	ajax.withCredentials = true;
	ajax.send(formdata);

	return ajax;
}