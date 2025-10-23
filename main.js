const intervalTime = 500; // in ms

const DOM_selectors = [
    '.ytp-ad-skip-button',
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button-modern',
    'button.ytp-ad-skip-button-container'
]

function main(){
    // Check if ad skipper is enabled
    chrome.storage.sync.get(['adSkipperEnabled'], function(result) {
        const isEnabled = result.adSkipperEnabled !== false; // Default to true if not set
        
        if (!isEnabled) {
            return; // Don't skip ads if disabled
        }
        
        for (const selectors of DOM_selectors) {
            const button = document.querySelector(selectors)

            if(button && !button.disabled)
            {
                button.click();
                console.log("Ad Skipped!!!!!")
                return;
            }
        }
    });
}

setInterval(main, intervalTime);

console.log('Ad Skipper Activated!');


