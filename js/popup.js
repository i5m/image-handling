window.onload = (event) => {
	const shiftColorBtn = document.querySelector("#colorShifter");
	const spinner = document.querySelector("#spinner");

	chrome.storage.sync.get("COLOR_SHIFTED", ({ COLOR_SHIFTED }) => {
		if (COLOR_SHIFTED) {
			shiftColorBtn.textContent = "Color Shifted";
			shiftColorBtn.classList.add("btn-danger");
			shiftColorBtn.classList.remove("btn-primary");
		} else {
			shiftColorBtn.textContent = "Shift Color";
			shiftColorBtn.classList.add("btn-primary");
			shiftColorBtn.classList.remove("btn-danger");
		}
	});



	shiftColorBtn.addEventListener("click", (event) => {
		spinner.classList.remove("d-none");
		chrome.storage.sync.get("COLOR_SHIFTED", ({ COLOR_SHIFTED }) => {
			const colorShifted = !COLOR_SHIFTED;
			chrome.storage.sync.set({ COLOR_SHIFTED: colorShifted }, () => {
				if (colorShifted) {
					shiftColorBtn.textContent = "Color Shifted";
				} else {
					shiftColorBtn.textContent = "Shift Color";
				}
				switchBtnState(shiftColorBtn);
				spinner.classList.add("d-none");
				spoofNavigator(colorShifted);
			});
		});
	});


	async function getCurrentTabId() {
		let [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		return tab.id;
	}

	async function reload() {
		const tabId = await getCurrentTabId();
		chrome.tabs.reload(tabId, { bypassCache: true });
	}


	function switchBtnState(btn) {
		btn.classList.toggle("btn-primary");
		btn.classList.toggle("btn-danger");
	}

	function spoofNavigator(colorShifted) {
		const id = "inject_script_navigator";
		if (colorShifted) {
			chrome.scripting.registerContentScripts(
				[
					{
						id,
						matches: ["<all_urls>"],
						allFrames: true,
						runAt: "document_start",
						js: ["js/colorShift.js"],
					},
				],
				() => {
					reload();
				}
			);
		} else {
			chrome.scripting.unregisterContentScripts({ ids: [id] }, () => {
				reload();
			});
		}
	}

};

