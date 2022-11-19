
setTimeout(() => {
	let imgs = document.getElementsByTagName('img');
	console.log(imgs)

	for(imgElt of imgs){
		let file = 'images/light.png';
		let url = chrome.runtime.getURL(file);
		imgElt.src = url;
		console.log(imgElt);
		console.log(imgElt.src)

	}
}, 2000);