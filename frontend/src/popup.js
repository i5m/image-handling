window.onload = (event) => {
	const disable_1Btn = document.querySelector("#disable_1");
	const disable_2Btn = document.querySelector("#disable_2");
	const disable_3Btn = document.querySelector("#disable_3");
	const disable_4Btn = document.querySelector("#disable_4");
	const disable_5Btn = document.querySelector("#disable_5");
	const disable_6Btn = document.querySelector("#disable_6");
	const slide1 = document.querySelector("#slide1");
	const slide2 = document.querySelector("#slide2");
	const slide3 = document.querySelector("#slide3");
	const spinner = document.querySelector("#spinner");
	const COLOR_CORRECT_TEXT = "Corrected";
	const NATURAL_COLOR_TEXT = "Correct";
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

	chrome.storage.sync.get("PROTANOPIA", ({ PROTANOPIA }) => {
		if (PROTANOPIA) {
			disable_1Btn.textContent = COLOR_CORRECT_TEXT+" for Protanopia";
			disable_1Btn.classList.add("btn-danger");
			disable_1Btn.classList.remove("btn-primary");
		} else {
			disable_1Btn.textContent = NATURAL_COLOR_TEXT+" for Protanopia";
			disable_1Btn.classList.add("btn-primary");
			disable_1Btn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("DEUTERANOPIA", ({ DEUTERANOPIA }) => {
		if (DEUTERANOPIA) {
			disable_2Btn.textContent = COLOR_CORRECT_TEXT+" for Deuteranopia";
			disable_2Btn.classList.add("btn-danger");
			disable_2Btn.classList.remove("btn-primary");
		} else {
			disable_2Btn.textContent = NATURAL_COLOR_TEXT+" for Deuteranopia";
			disable_2Btn.classList.add("btn-primary");
			disable_2Btn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("TRITANOPIA", ({ TRITANOPIA }) => {
		if (TRITANOPIA) {
			disable_3Btn.textContent = COLOR_CORRECT_TEXT+" for Tritanopia";
			disable_3Btn.classList.add("btn-danger");
			disable_3Btn.classList.remove("btn-primary");
		} else {
			disable_3Btn.textContent = NATURAL_COLOR_TEXT+" for Tritanopia";
			disable_3Btn.classList.add("btn-primary");
			disable_3Btn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("PROTANOMALY", ({ PROTANOMALY }) => {
		if (PROTANOMALY) {
			disable_4Btn.textContent = COLOR_CORRECT_TEXT+" for Protanomaly";
			disable_4Btn.classList.add("btn-danger");
			disable_4Btn.classList.remove("btn-primary");
		} else {
			disable_4Btn.textContent = NATURAL_COLOR_TEXT+" for Protanomaly";
			disable_4Btn.classList.add("btn-primary");
			disable_4Btn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("DEUTERANOMALY", ({ DEUTERANOMALY }) => {
		if (DEUTERANOMALY) {
			disable_5Btn.textContent = COLOR_CORRECT_TEXT+" for Deuteranomaly";
			disable_5Btn.classList.add("btn-danger");
			disable_5Btn.classList.remove("btn-primary");
		} else {
			disable_5Btn.textContent = NATURAL_COLOR_TEXT+" for Deuteranomaly";
			disable_5Btn.classList.add("btn-primary");
			disable_5Btn.classList.remove("btn-danger");
		}
	});

	chrome.storage.sync.get("TRITANOMALY", ({ TRITANOMALY }) => {
		if (TRITANOMALY) {
			disable_6Btn.textContent = COLOR_CORRECT_TEXT+" for Tritanomaly";
			disable_6Btn.classList.add("btn-danger");
			disable_6Btn.classList.remove("btn-primary");
		} else {
			disable_6Btn.textContent = NATURAL_COLOR_TEXT+" for Tritanomaly";
			disable_6Btn.classList.add("btn-primary");
			disable_6Btn.classList.remove("btn-danger");
		}
	});


	disable_1Btn.addEventListener("click", (event) => {
	spinner.classList.remove("d-none");
	chrome.storage.sync.get("PROTANOPIA", ({ PROTANOPIA }) => {
			const disable = !PROTANOPIA;
			chrome.storage.sync.set({ PROTANOPIA: disable }, () => {
				if (disable) {
					disable_1Btn.textContent = COLOR_CORRECT_TEXT+" for Protanopia";
				} else {
					disable_1Btn.textContent = NATURAL_COLOR_TEXT+" for Protanopia";
				}
				switchBtnState(disable_1Btn);
				spinner.classList.add("d-none");
				runcolorCorrection1(disable);
			});
		});


	});

	disable_2Btn.addEventListener("click", (event) => {
	spinner.classList.remove("d-none");
	chrome.storage.sync.get("DEUTERANOPIA", ({ DEUTERANOPIA }) => {
			const disable = !DEUTERANOPIA;
			chrome.storage.sync.set({ DEUTERANOPIA: disable }, () => {
				if (disable) {
					disable_2Btn.textContent = COLOR_CORRECT_TEXT+" for Deuteranopia";
				} else {
					disable_2Btn.textContent = NATURAL_COLOR_TEXT+" for Deuteranopia";
				}
				switchBtnState(disable_2Btn);
				spinner.classList.add("d-none");
				runcolorCorrection2(disable);
			});
	});
});

	disable_3Btn.addEventListener("click", (event) => {
	spinner.classList.remove("d-none");
	chrome.storage.sync.get("TRITANOPIA", ({ TRITANOPIA }) => {
			const disable = !TRITANOPIA;
			chrome.storage.sync.set({ TRITANOPIA: disable }, () => {
				if (disable) {
					disable_3Btn.textContent = COLOR_CORRECT_TEXT+" for Tritanopia";
				} else {
					disable_3Btn.textContent = NATURAL_COLOR_TEXT+" for Tritanopia";
				}
				switchBtnState(disable_3Btn);
				spinner.classList.add("d-none");
				runcolorCorrection3(disable);
			});
	});
});

	disable_4Btn.addEventListener("click", (event) => {
		
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("PROTANOMALY", ({ PROTANOMALY }) => {
			const disable = !PROTANOMALY;
			chrome.storage.sync.set({ PROTANOMALY: disable }, () => {
				if (disable) {
					disable_4Btn.textContent = COLOR_CORRECT_TEXT+" for Protanomaly";
					slide1.style.display ="block";
				} else {
					disable_4Btn.textContent = NATURAL_COLOR_TEXT+" for Protanomaly";
					slide1.style.display ="none";
				}
				switchBtnState(disable_4Btn);
				spinner.classList.add("d-none");
				runcolorCorrection4(disable);
			});
	});
	});
	
	disable_5Btn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("DEUTERANOMALY", ({ DEUTERANOMALY }) => {
			const disable = !DEUTERANOMALY;
			chrome.storage.sync.set({ DEUTERANOMALY: disable }, () => {
				if (disable) {
					disable_5Btn.textContent = COLOR_CORRECT_TEXT+" for Deuteranomaly";
					slide2.style.display ="block";
				} else {
					disable_5Btn.textContent = NATURAL_COLOR_TEXT+" for Deuteranomaly";
					slide2.style.display ="none";
				}
				switchBtnState(disable_5Btn);
				spinner.classList.add("d-none");
				runcolorCorrection5(disable);
			});
		});
	});

	disable_6Btn.addEventListener("click", (event) => {
	spinner.classList.remove("d-none");
	chrome.storage.sync.get("TRITANOMALY", ({ TRITANOMALY }) => {
			const disable = !TRITANOMALY;
			chrome.storage.sync.set({ TRITANOMALY: disable }, () => {
				if (disable) {
					disable_6Btn.textContent = COLOR_CORRECT_TEXT+" for Tritanomaly";
					slide3.style.display ="block";
				} else {
					disable_6Btn.textContent = NATURAL_COLOR_TEXT+" for Tritanomaly";
					slide3.style.display ="none";
				}
				switchBtnState(disable_6Btn);
				spinner.classList.add("d-none");
				runcolorCorrection6(disable);
			});
	});
	});


	function runcolorCorrection1(disable){


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

	async function runcolorCorrection2(disable){
		const id = "inject_script_image";
		if (disable) {
			chrome.scripting.registerContentScripts(
				[
					{
						id,
						matches: ["<all_urls>"],
						allFrames: true,
						runAt: "document_end",
						js: ["src/content.js"],
					},
				],
				() => {
					reload();
				}
			);
		console.log("script laoded")
		} else {
			chrome.scripting.unregisterContentScripts({ ids: [id] }, () => {
				reload();
			});
		}

	}

	function runcolorCorrection3(disable){
		//insert code here
		// 
	}

	function runcolorCorrection4(disable){
		//insert code here
		// 
	}
	function runcolorCorrection5(disable){
		//insert code here
		// 
	}
	function runcolorCorrection6(disable){
		//insert code here
		// 
	}



	async function reload() {
		const tabId = await getCurrentTabId();
		chrome.tabs.reload(tabId, { bypassCache: true });
	}

	async function getCurrentTabId() {
		let [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		return tab.id;
	}
	function switchBtnState(btn) {
		btn.classList.toggle("btn-primary");
		btn.classList.toggle("btn-danger");
	}

};



