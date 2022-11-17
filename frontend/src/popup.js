window.onload = (event) => {
	const shiftColorBtn = document.querySelector("#colorShifter");


	async function ajax_call_handler(method, endpoint, data) {

        const response = await fetch(endpoint, {
            method: method,
            mode: 'cors',
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



	shiftColorBtn.addEventListener("click", (event) => {
		
		var xyz = JSON.stringify({ x: 5, y: 6 });

		ajax_call_handler("POST", "http://localhost:7000/images", xyz).then(resp => {
			alert(resp.x);
		});

	});



	chrome.storage.sync.get("UA_SPOOFED", ({ UA_SPOOFED }) => {
		if (UA_SPOOFED) {
			spoofUABtn.textContent = "User Agent Spoofed";
			spoofUABtn.classList.add("btn-danger");
			spoofUABtn.classList.remove("btn-primary");
		} else {
			spoofUABtn.textContent = "Spoof User Agent";
			spoofUABtn.classList.add("btn-primary");
			spoofUABtn.classList.remove("btn-danger");
		}
	});


};

