window.onload = (event) => {
	const disable_1Btn = document.querySelector("#disable_1");
	const spinner = document.querySelector("#spinner");
	const COLOR_CORRECT_TEXT = "Color Corrected";
	const NATURAL_COLOR_TEXT = "Correct Color";

	chrome.storage.sync.get("DISABLE_1", ({ DISABLE_1 }) => {
		if (DISABLE_1) {
			disable_1Btn.textContent = COLOR_CORRECT_TEXT;
			disable_1Btn.classList.add("btn-danger");
			disable_1Btn.classList.remove("btn-primary");
		} else {
			disable_1Btn.textContent = NATURAL_COLOR_TEXT;
			disable_1Btn.classList.add("btn-primary");
			disable_1Btn.classList.remove("btn-danger");
		}
	});

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



	disable_1Btn.addEventListener("click", (event) => {
	spinner.classList.remove("d-none");
	chrome.storage.sync.get("DISABLE_1", ({ DISABLE_1 }) => {
			const disable_1 = !DISABLE_1;
			chrome.storage.sync.set({ DISABLE_1: disable_1 }, () => {
				if (disable_1) {
					disable_1Btn.textContent = COLOR_CORRECT_TEXT;
				} else {
					disable_1Btn.textContent = NATURAL_COLOR_TEXT;
				}
				switchBtnState(disable_1Btn);
				spinner.classList.add("d-none");
				runcolorCorrection1(disable_1);
			});
		});


	});

	function runcolorCorrection1(disable_1){


//insert code here
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

		var xyz = JSON.stringify({ x: 5, y: 6 });

		ajax_call_handler("POST", "http://localhost:7000/images", xyz).then(resp => {
			alert(resp.x);
		});

	}




	function switchBtnState(btn) {
		btn.classList.toggle("btn-primary");
		btn.classList.toggle("btn-danger");
	}

};

