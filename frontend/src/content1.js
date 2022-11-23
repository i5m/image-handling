
setTimeout(() => {
	let imgs = document.getElementsByTagName('img');
	const imageArr = [];
	for(imgElt of imgs){
		let file = 'images/light.png';
		imageArr.push(imgElt.src);
		let url = chrome.runtime.getURL(file);
		imgElt.src = url;

	}
	var xyz = JSON.parse(JSON.stringify({ imageArray: imageArr,type_:1}));
	console.log(xyz)
	postData("http://localhost:7000/images",xyz)
}, 1000);


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
// .then(response => response.json())
// .then(response => console.log(JSON.stringify(response)))

return response.json(); // parses JSON response into native JavaScript objects
}

// postData('https://example.com/answer', { answer: 42 })
//   .then((data) => {
//     console.log(data); // JSON data parsed by `data.json()` call
//   });