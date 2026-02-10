let enabled = true;

chrome.storage.sync.get(["enabled"], data => {
    enabled = data.enabled !== false;
    applyRules();
});

chrome.storage.onChanged.addListener(changes => {
    if (changes.enabled) {
        enabled = changes.enabled.newValue;
        applyRules();
    }
});

function applyRules() {

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1,2,3,4,5]
    });

    if (!enabled) return;

    const rules = [
        {
            id: 1,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "doubleclick.net",
                resourceTypes: ["script","image"]
            }
        },
        {
            id: 2,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "googleads",
                resourceTypes: ["script","image"]
            }
        },
        {
            id: 3,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "adservice",
                resourceTypes: ["script"]
            }
        },
        {
            id: 4,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "taboola",
                resourceTypes: ["script"]
            }
        },
        {
            id: 5,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "outbrain",
                resourceTypes: ["script"]
            }
        }
    ];

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules
    });
}

applyRules();
