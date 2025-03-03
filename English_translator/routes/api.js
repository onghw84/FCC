'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  var locale;
  //console.log(translator.AmericanOnlyTranslate(1,"diaper dish towel dish soap"));
  app.route('/api/translate')
    .post((req, res) => {
      
      if (!req.body.hasOwnProperty('locale') || !req.body.hasOwnProperty('text')){
        return res.json({error:"Required field(s) missing"});
      }
      if (req.body.text == ""){
        return res.json({error:"No text to translate"});
      }
      if (req.body.locale == "american-to-british"){
        locale = 1;
      }
      else if (req.body.locale =="british-to-american"){
        locale = 2;
      }
      else {
        return res.json({error:"Invalid value for locale field"});
      }

      var text = req.body.text;
      text = translator.timeTranslate(locale, text);
      text = translator.AmericanOnlyTranslate(locale, text);
      text = translator.BritishOnlyTranslate(locale, text);
      text = translator.AmericanToBritishTitleTranslate(locale, text);
      text = translator.AmericanToBritishSpellingTranslate(locale, text);
      if (text == req.body.text){
        res.json({translation: "Everything looks good to me!"}); return;
      }
      else {
        res.json({translation: text});
      }
    });
};
