window.onload = (event) => {

    const protanopia_btn = document.getElementById("protanopia-btn");
    const deuteranopia_btn = document.getElementById("deuteranopia-btn");
    const tritanopia_btn = document.getElementById("tritanopia-btn");
    const protanomaly_btn = document.getElementById("protanomaly-btn");
    const deuteranomaly_btn = document.getElementById("deuteranomaly-btn");
    const tritanomaly_btn = document.getElementById("tritanomaly-btn");

    const slider_box = document.getElementById("slider-box");
    const extent_slider = document.getElementById("extent-slider");

	const btn_arr = [protanopia_btn, deuteranopia_btn, tritanopia_btn, protanomaly_btn, deuteranomaly_btn, tritanomaly_btn];

	chrome.storage.sync.get("PROTANOPIA", ({ PROTANOPIA }) => {
		if (PROTANOPIA) {
            slider_box.classList.add("d-none");
            button_state_handler();
            protanopia_btn.classList.add("btn-dark");
            protanopia_btn.classList.remove("btn-outline-secondary");
            color_correction('protanopia', 100, disable);
        }
	});

	chrome.storage.sync.get("DEUTERANOPIA", ({ DEUTERANOPIA }) => {
		if (DEUTERANOPIA) {
            slider_box.classList.add("d-none");
            button_state_handler();
            deuteranopia_btn.classList.add("btn-dark");
            deuteranopia_btn.classList.remove("btn-outline-secondary");
            color_correction('deuteranopia', 100, disable);
		}
	});

	chrome.storage.sync.get("TRITANOPIA", ({ TRITANOPIA }) => {
		if (TRITANOPIA) {
            slider_box.classList.add("d-none");
            button_state_handler();
            tritanopia_btn.classList.add("btn-dark");
            tritanopia_btn.classList.remove("btn-outline-secondary");
            color_correction('tritanopia', 100, disable);
		}
	});
    
	chrome.storage.sync.get("PROTANOMALY", ({ PROTANOMALY }) => {
		if (PROTANOMALY) {
            slider_box.classList.remove("d-none");
            button_state_handler();
            protanomaly_btn.classList.add("btn-dark");
            protanomaly_btn.classList.remove("btn-outline-secondary");
            color_correction('protanomaly', extent_slider.value, disable);
        }
	});

	chrome.storage.sync.get("DEUTERANOMALY", ({ DEUTERANOMALY }) => {
		if (DEUTERANOMALY) {
            slider_box.classList.remove("d-none");
            button_state_handler();
            deuteranomaly_btn.classList.add("btn-dark");
            deuteranomaly_btn.classList.remove("btn-outline-secondary");
            color_correction('deuteranomaly', extent_slider.value, disable);
		}
	});

	chrome.storage.sync.get("TRITANOMALY", ({ TRITANOMALY }) => {
		if (TRITANOMALY) {
            slider_box.classList.remove("d-none");
            button_state_handler();
            tritanomaly_btn.classList.add("btn-dark");
            tritanomaly_btn.classList.remove("btn-outline-secondary");
            color_correction('tritanomaly', extent_slider.value, disable);
		}
	});
    

	protanopia_btn.addEventListener("click", (event) => {

        chrome.storage.sync.get("PROTANOPIA", ({ PROTANOPIA }) => {
			const disable = !PROTANOPIA;
			chrome.storage.sync.set({ PROTANOPIA: disable }, () => {
                slider_box.classList.add("d-none");
                button_state_handler();
                protanopia_btn.classList.add("btn-dark");
                protanopia_btn.classList.remove("btn-outline-secondary");
                color_correction('protanopia', 100, disable);
			});
		});

	});

	deuteranopia_btn.addEventListener("click", (event) => {
	    
    	chrome.storage.sync.get("DEUTERANOPIA", ({ DEUTERANOPIA }) => {
			const disable = !DEUTERANOPIA;
			chrome.storage.sync.set({ DEUTERANOPIA: disable }, () => {
                slider_box.classList.add("d-none");
                button_state_handler();
                deuteranopia_btn.classList.add("btn-dark");
                deuteranopia_btn.classList.remove("btn-outline-secondary"); 
                color_correction('deuteranopia', 100, disable);
			});
        });

    });

	tritanopia_btn.addEventListener("click", (event) => {
    
        chrome.storage.sync.get("TRITANOPIA", ({ TRITANOPIA }) => {
			const disable = !TRITANOPIA;
			chrome.storage.sync.set({ TRITANOPIA: disable }, () => {
                slider_box.classList.add("d-none");
                button_state_handler();
                tritanopia_btn.classList.add("btn-dark");
                tritanopia_btn.classList.remove("btn-outline-secondary"); 
                color_correction('tritanopia', 100, disable);
			});
        });

    });

	protanomaly_btn.addEventListener("click", (event) => {

        chrome.storage.sync.get("PROTANOMALY", ({ PROTANOMALY }) => {
			const disable = !PROTANOMALY;
			chrome.storage.sync.set({ PROTANOMALY: disable }, () => {
                slider_box.classList.remove("d-none");
                button_state_handler();
                protanomaly_btn.classList.add("btn-dark");
                protanomaly_btn.classList.remove("btn-outline-secondary");
                color_correction('protanomaly', extent_slider.value, disable);
			});
		});

	});

	deuteranomaly_btn.addEventListener("click", (event) => {
	    
    	chrome.storage.sync.get("DEUTERANOMALY", ({ DEUTERANOMALY }) => {
			const disable = !DEUTERANOMALY;
			chrome.storage.sync.set({ DEUTERANOMALY: disable }, () => {
                slider_box.classList.remove("d-none");
                button_state_handler();
                deuteranomaly_btn.classList.add("btn-dark");
                deuteranomaly_btn.classList.remove("btn-outline-secondary"); 
                color_correction('deuteranomaly', extent_slider.value, disable);
			});
        });

    });

	tritanomaly_btn.addEventListener("click", (event) => {
    
        chrome.storage.sync.get("TRITANOMALY", ({ TRITANOMALY }) => {
			const disable = !TRITANOMALY;
			chrome.storage.sync.set({ TRITANOMALY: disable }, () => {
                slider_box.classList.remove("d-none");
                button_state_handler();
                tritanomaly_btn.classList.add("btn-dark");
                tritanomaly_btn.classList.remove("btn-outline-secondary"); 
                color_correction('tritanopia', extent_slider.value, disable);
			});
        });

    });

	// extent_slider.addEventListener("change", (event) => {
    //     extent_slider.previousSibling.innerHTML = `Extent = <b>${extent_slider.value}</b>`
    // });


    async function color_correction(diff, val, dis) {

		const id = "inject_script_image";

        // var id = (Math.random() + 1).toString(36).substring(7);

        if (dis) {

            chrome.scripting.registerContentScripts(
                [
                    {
                        id,
                        matches: ["<all_urls>"],
                        allFrames: true,
                        runAt: "document_end",
                        js: [`src/${diff}_${val}_color_correcter.js`]
                    }
                ],
                () => {
                    reload();
                }
            );
    
            console.log("Done registering");  

        } else {

            chrome.scripting.unregisterContentScripts({ ids: [id] }, () => {
                reload();
            });

            console.log("Done un-registering");

        }

    }


	async function runcolorCorrection3(disable){
		const id = "inject_script_image";
		if (disable) {
			chrome.scripting.registerContentScripts(
				[
					{
						id,
						matches: ["<all_urls>"],
						allFrames: true,
						runAt: "document_end",
						js: ["src/content3.js"],
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


    function button_state_handler() {
        for (var i of btn_arr) {
            i.classList.add("btn-outline-secondary");
            i.classList.remove("btn-dark");
        }
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

};