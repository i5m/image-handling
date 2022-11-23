
setTimeout(() => {
	let imgs = document.getElementsByTagName('img');
	console.log(imgs)
	const imageArr = [];
	for(imgElt of imgs){
		let file = 'images/light.png';
		imageArr.push(imgElt.src);
		let url = chrome.runtime.getURL(file);
		imgElt.src = url;
		console.log(imgElt);
		console.log(imgElt.src)

	}
	var xyz = JSON.stringify({ imageArray: imageArr});
	ajax_call_handler("POST", "http://localhost:7000/images", xyz).then(resp => {
		console.log("it worked");
	});
}, 2000);



async function ajax_call_handler(method, endpoint, data) {

    const response = await fetch(endpoint, {
        method: method,
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    }).catch(error => {

        return {
            result: false
        }

    });

    try {
        return response.json();
    } catch(err) {
        return response;
    }

}