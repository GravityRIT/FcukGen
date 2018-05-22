const pos = require('pos');

let produce =  function(doc) {
    const words = new pos.Lexer().lex(doc);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    let result = "";
    let status = 0;
    let ctr = 0,j;
    for (let i in taggedWords) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = taggedWord[1];
        console.log(word + " /" + tag);
        j = doc.indexOf(word);
        ctr += j;
        doc = doc.substr(j + word.length);
        for(;j>0;j--)
            result += " ";
        if(tag === "NN" || tag === "NNS") {
            if(status !== 1){
                status = 1;
                result += "fucking ";
            }
        }
        else {
            status = 0;
        }
        result += word;
    }
    console.log(result);
    return result;
};

module.exports = produce;