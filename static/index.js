let input_box = document.getElementById("text");
let output = document.getElementById("output");
let button = document.getElementById("button");
button.onclick = function () {
    let text = input_box.value;
    let url = "/gen/" + text;
    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            output.innerText = data.result;
        })
};