const pos = require('pos');

let produce =  function(doc) {
    const words = new pos.Lexer().lex(doc);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    let result = "";
    let status = 0;
    for (let i in taggedWords) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        console.log(word + " /" + tag);
        if(tag === "NN" || tag === "NNS") {
            if(status !== 1){
                status = 1;
                result = result + "fucking ";
            }
        }
        else
            status = 0;
        result = result + word;
        if(tag !== ".")
            result += " ";
    }
    console.log(result);
    return result;
};

module.exports = produce;