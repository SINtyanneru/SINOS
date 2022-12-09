function FileListGet(Path){
	return chrome.webview.hostObjects.sync.class.FileListGet(Path);
}

function FileTextGet(Path){
	return chrome.webview.hostObjects.sync.class.FileTextGet(Path);
}

function FileDataGet(Path){
	return chrome.webview.hostObjects.sync.class.FileDataGet(Path);
}

function FileExists(Path){
	return chrome.webview.hostObjects.sync.class.FileExists(Path);
}

function OpenFileDialog(){
	return chrome.webview.hostObjects.sync.class.OpenFileDialog();
}

function SaveFile(Path, DATA){
	return chrome.webview.hostObjects.sync.class.SaveFile(Path, DATA);
}