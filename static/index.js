let inputBox = document.getElementById("text");
let output = document.getElementById("output");
let sButton = document.getElementById("button");
let copyButton = document.getElementById("copy_button");

sButton.onclick = function () {
    let text = inputBox.value;
    let url = "/gen/" + text;
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            copyButton.innerText = "Copy";
            output.innerText = data.result;
        })
};

function fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        copyButton.innerHTML = "Copied";
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        copyButton.innerHTML = "Copied";
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

copyButton.addEventListener('click', function(event) {
    let text = output.innerText;
    copyTextToClipboard(text);
});