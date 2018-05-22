const pos = require('pos');

let produce =  function(doc) {
    const words = new pos.Lexer().lex(doc);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    let result = "";
    let status = 0;
    let sym = 0;
    for (let i in taggedWords) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        console.log(word + " /" + tag);
        if(tag === '"' || tag === word) {
            status = 0;
            sym = 1;
            result += word;
            continue;
        }
        if(sym === 1)
            sym = 0;
        else
            result += " ";
        if(tag === "NN" || tag === "NNS") {
            if(status !== 1){
                status = 1;
                result += "fucking " + word;
            }
        }
        else {
            status = 0;
            result += word;
        }
    }
    console.log(result);
    return result;
};

module.exports = produce;