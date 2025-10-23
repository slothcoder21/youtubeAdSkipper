const toggle = document.getElementById('ad-skipper-toggle');
const statusLabel = document.getElementById('toggle-status');

chrome.storage.sync.get(['adSkipperEnabled'], function(result) {
    const isEnabled = result.adSkipperEnabled !== false;
    toggle.checked = isEnabled;
    updateStatusLabel(isEnabled);
});

toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;
    
    chrome.storage.sync.set({adSkipperEnabled: isEnabled}, function() {
        console.log('Ad skipper state saved:', isEnabled);
    });
    
    updateStatusLabel(isEnabled);
});

function updateStatusLabel(isEnabled) {
    statusLabel.textContent = isEnabled ? 'On' : 'Off';
}
