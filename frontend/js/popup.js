window.onload = (event) => {
	const shiftColorBtn = document.querySelector("#colorShifter");
	// const spinner = document.querySelector("#spinner");

	// chrome.storage.sync.get("COLOR_SHIFTED", ({ COLOR_SHIFTED }) => {
	// 	if (COLOR_SHIFTED) {
	// 		shiftColorBtn.textContent = "Color Shifted";
	// 		shiftColorBtn.classList.add("btn-danger");
	// 		shiftColorBtn.classList.remove("btn-primary");
	// 	} else {
	// 		shiftColorBtn.textContent = "Shift Color";
	// 		shiftColorBtn.classList.add("btn-primary");
	// 		shiftColorBtn.classList.remove("btn-danger");
	// 	}
	// });


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


	// async function getCurrentTabId() {
	// 	let [tab] = await chrome.tabs.query({
	// 		active: true,
	// 		currentWindow: true,
	// 	});
	// 	return tab.id;
	// }

	// async function reload() {
	// 	const tabId = await getCurrentTabId();
	// 	chrome.tabs.reload(tabId, { bypassCache: true });
	// }


	// function switchBtnState(btn) {
	// 	btn.classList.toggle("btn-primary");
	// 	btn.classList.toggle("btn-danger");
	// }

	// function spoofNavigator(colorShifted) {
	// 	const id = "inject_script_navigator";
	// 	if (colorShifted) {
	// 		chrome.scripting.registerContentScripts(
	// 			[
	// 				{
	// 					id,
	// 					matches: ["<all_urls>"],
	// 					allFrames: true,
	// 					runAt: "document_start",
	// 					js: ["js/colorShift.js"],
	// 				},
	// 			],
	// 			() => {
	// 				reload();
	// 			}
	// 		);
	// 	} else {
	// 		chrome.scripting.unregisterContentScripts({ ids: [id] }, () => {
	// 			reload();
	// 		});
	// 	}
	// }

};

