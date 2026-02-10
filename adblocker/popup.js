document.getElementById("whitelist").onclick = () => {

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {

        let site = new URL(tabs[0].url).hostname;

        chrome.storage.sync.get(["whitelist"], d => {

            let list = d.whitelist || [];

            let msgBox = document.getElementById("msg");

            if (!list.includes(site)) {
                list.push(site);

                chrome.storage.sync.set({ whitelist: list });

                msgBox.innerText = "✓ Whitelisted: " + site;
            } else {
                msgBox.innerText = "Already whitelisted";
            }

        });

    });

};
