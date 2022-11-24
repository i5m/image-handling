window.onload = (event) => {

    const protanopia_btn = document.getElementById("protanopia-btn");
    const deuteranopia_btn = document.getElementById("deuteranopia-btn");
    const tritanopia_btn = document.getElementById("tritanopia-btn");
    const extent_slider = document.getElementById("extent-slider");

	const btn_arr = [protanopia_btn, deuteranopia_btn, tritanopia_btn];

	chrome.storage.sync.get("PROTANOPIA", ({ PROTANOPIA }) => {
		if (PROTANOPIA) {
            button_state_handler();
            protanopia_btn.classList.add("btn-primary");
            protanopia_btn.classList.remove("btn-outline-secondary");
        }
	});

	chrome.storage.sync.get("DEUTERANOPIA", ({ DEUTERANOPIA }) => {
		if (DEUTERANOPIA) {
            button_state_handler();
            deuteranopia_btn.classList.add("btn-primary");
            deuteranopia_btn.classList.remove("btn-outline-secondary");
		}
	});

	chrome.storage.sync.get("TRITANOPIA", ({ TRITANOPIA }) => {
		if (TRITANOPIA) {
            button_state_handler();
            tritanopia_btn.classList.add("btn-primary");
            tritanopia_btn.classList.remove("btn-outline-secondary");
		}
	});

	protanopia_btn.addEventListener("click", (event) => {

        chrome.storage.sync.get("PROTANOPIA", ({ PROTANOPIA }) => {
			const disable = !PROTANOPIA;
			chrome.storage.sync.set({ PROTANOPIA: disable }, () => {
                button_state_handler();
                protanopia_btn.classList.add("btn-primary");
                protanopia_btn.classList.remove("btn-outline-secondary");
                color_correction('protanopia', disable);
			});
		});

	});

	deuteranopia_btn.addEventListener("click", (event) => {
	    
    	chrome.storage.sync.get("DEUTERANOPIA", ({ DEUTERANOPIA }) => {
			const disable = !DEUTERANOPIA;
			chrome.storage.sync.set({ DEUTERANOPIA: disable }, () => {
                button_state_handler();
                deuteranopia_btn.classList.add("btn-primary");
                deuteranopia_btn.classList.remove("btn-outline-secondary"); 
                color_correction('deuteranopia', disable);
			});
        });

    });

	tritanopia_btn.addEventListener("click", (event) => {
    
        chrome.storage.sync.get("TRITANOPIA", ({ TRITANOPIA }) => {
			const disable = !TRITANOPIA;
			chrome.storage.sync.set({ TRITANOPIA: disable }, () => {
                button_state_handler();
                tritanopia_btn.classList.add("btn-primary");
                tritanopia_btn.classList.remove("btn-outline-secondary"); 
                color_correction('tritanopia', disable);
			});
        });

    });

	// extent_slider.addEventListener("change", (event) => {
    //     extent_slider.previousSibling.innerHTML = `Extent = <b>${extent_slider.value}</b>`
    // });


    async function color_correction(diff, dis) {

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
                        js: [`src/${diff}_color_correcter.js`]
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
            i.classList.remove("btn-primary");
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