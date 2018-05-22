const pos = require('pos');

const noun = /^NN/;
const verb = /^VB/;

let produce =  function(doc) {
    const words = new pos.Lexer().lex(doc);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    let result = "";
    let prevT='', prevW='';
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
        if(noun.exec(tag) && !noun.exec(prevT))
            result += "fucking ";
        /*else if(verb.exec(tag));*/
        else if(word.toUpperCase() === 'IS' || word.toUpperCase() === 'ARE')
            if(isQue(prevW))
                result += "the fuck ";

        result += word;
        prevT = tag;
        prevW = word;
    }
    console.log(result);
    return result;
};

function isQue(str) {
    str = str.toUpperCase();
    return str === "WHAT" || str === "WHERE" || str === "WHO" || str === "HOW";
}
module.exports = produce;