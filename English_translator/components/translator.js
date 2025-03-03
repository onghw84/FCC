const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    Translate(locale, text, highlight){
        text = this.timeTranslate(locale, text);
        text = this.AmericanOnlyTranslate(locale, text);
        text = this.BritishOnlyTranslate(locale, text);
        text = this.AmericanToBritishTitleTranslate(locale, text);
        text = this.AmericanToBritishSpellingTranslate(locale, text);

        if (highlight == 0){
            text = text.replaceAll('<span class="highlight">',"");
            text = text.replaceAll('</span>',"");
        }
        return text;
    }

    timeTranslate(locale, text){
        if (locale == 1){//american to british
            return text.replaceAll(/(\d+):(\d\d)/g,'<span class="highlight">$1.$2</span>');
        }
        else {
            return text.replaceAll(/(\d+).(\d\d)/g,'<span class="highlight">$1:$2</span>');
        }
    }

    AmericanOnlyTranslate(locale, text) {
        const onlyKey = Object.keys(americanOnly);
        if (locale == 1){//american to british
            for (var i = 0; i < onlyKey.length; i++){
                let regex = new RegExp(`\\b${onlyKey[i]}\\b`, 'gi');
                //text = text.replaceAll(regex,`<span class="highlight">${americanOnly[onlyKey[i]]}</span>`);
                let match = [...text.matchAll(regex)];
                for (var j = 0; j < match.length; j++){
                    console.log(match[j].index);
                    //replace with corresponding translation if match.index not within span element
                    if (this.checkSpan(text, match[j].index)){
                        text = text.slice(0,match[j].index).concat(`<span class="highlight">${americanOnly[onlyKey[i]]}</span>`,text.slice(match[j].index+onlyKey[i].length));
                    }
                }
            }
        }
        return text;
    }

    checkSpan(text, index){
        //check if index is within highlight span
        const regex1 = '<span class="highlight">';
        const regex2 = '</span>';
        let index1 = [];
        let index2 = [];
        console.log(text);
        const match1 = [...text.matchAll(regex1)];
        const match2 = [...text.matchAll(regex2)];
        match1.forEach(e=>index1.push(e.index));
        match2.forEach(e=>index2.push(e.index));      
        for (var i = 0; i < index1.length; i++){
            if (index > index1[i] && index < index2[i]){
                return false;
            }
        }
        return true;
    }

    BritishOnlyTranslate(locale, text) {
        const onlyKey = Object.keys(britishOnly);
        if (locale == 2){//british to american
            for (var i = 0; i < onlyKey.length; i++){
                let regex = new RegExp(`\\b${onlyKey[i]}\\b`, 'gi');
                //text = text.replaceAll(regex,`<span class="highlight">${britishOnly[onlyKey[i]]}</span>`);
                let match = [...text.matchAll(regex)];
                for (var j = 0; j < match.length; j++){
                    console.log(match[j].index);
                    //replace with corresponding translation if match.index not within span element
                    if (this.checkSpan(text, match[j].index)){
                        text = text.slice(0,match[j].index).concat(`<span class="highlight">${britishOnly[onlyKey[i]]}</span>`,text.slice(match[j].index+onlyKey[i].length));
                    }
                }
            }
        }
        return text;
    }

    AmericanToBritishTitleTranslate(locale, text) {
        const AmericanKey = Object.keys(americanToBritishTitles);
        const BritishKey = Object.values(americanToBritishTitles);  
        if (locale == 1){//american to british

            //todo: have to solve regex recognize . as a random char issue
            for (var i = 0; i < AmericanKey.length; i++){
                let tmp = AmericanKey[i].replace('.','\\.');
                let regex = new RegExp(`\\b${tmp}`, 'gi');
                text = text.replaceAll(regex,`<span class="highlight">${BritishKey[i]}</span>`);
            }
        }
        else {            
            for (var i = 0; i < BritishKey.length; i++){
                let regex = new RegExp(`\\b${BritishKey[i]}\\b`, 'gi');
                text = text.replaceAll(regex,`<span class="highlight">${AmericanKey[i]}</span>`);
            }
        }
        return text;
    }

    AmericanToBritishSpellingTranslate(locale, text) {        
        const AmericanKey = Object.keys(americanToBritishSpelling);
        const BritishKey = Object.values(americanToBritishSpelling);
        if (locale == 1){//american to british            
            for (var i = 0; i < AmericanKey.length; i++){
                let regex = new RegExp(`\\b${AmericanKey[i]}\\b`, 'gi');
                text = text.replaceAll(regex,`<span class="highlight">${BritishKey[i]}</span>`);
            }
        }
        else {            
            for (var i = 0; i < BritishKey.length; i++){
                let regex = new RegExp(`\\b${BritishKey[i]}\\b`, 'gi');
                text = text.replaceAll(regex,`<span class="highlight">${AmericanKey[i]}</span>`);
            }
        }
        return text;
    }    
}

module.exports = Translator;
