const intervalTime = 500; // in ms

const DOM_selectors = [
    '.ytp-ad-skip-button',
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button-modern',
    'button.ytp-ad-skip-button-container'
]

let isEnabled = true;
let intervalId = null;

function main(){
    if (!isEnabled) {
        return;
    }
    
    try {
        for (const selectors of DOM_selectors) {
            const button = document.querySelector(selectors)

            if(button && !button.disabled)
            {
                button.click();
                console.log("Ad Skipped!!!!!")
                return;
            }
        }
    } catch (error) {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        console.log('Error in ad skipper:', error);
    }
}

try {
    chrome.storage.sync.get(['adSkipperEnabled'], function(result) {
        if (chrome.runtime.lastError) {
            console.log('Storage error:', chrome.runtime.lastError);
            return;
        }
        
        isEnabled = result.adSkipperEnabled !== false;
        
        if (isEnabled && !intervalId) {
            intervalId = setInterval(main, intervalTime);
            console.log('Ad Skipper Activated!');
        } else {
            console.log('Ad Skipper Disabled');
        }
    });
    
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (namespace === 'sync' && changes.adSkipperEnabled) {
            isEnabled = changes.adSkipperEnabled.newValue !== false;
            
            if (isEnabled && !intervalId) {
                intervalId = setInterval(main, intervalTime);
                console.log('Ad Skipper Activated!');
            } else if (!isEnabled && intervalId) {
                clearInterval(intervalId);
                intervalId = null;
                console.log('Ad Skipper Disabled');
            }
        }
    });
} catch (error) {
    console.log('Extension context not available:', error);
}


