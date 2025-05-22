'use strict';

let mongoose = require('mongoose');
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const stockSchema = new mongoose.Schema({
  stock: { type: String, required: true},
  ip:  { type: String, required: true},
});
const Stock = mongoose.model('Stock', stockSchema);

Stock.deleteMany({}, function(err,data){if (err) return console.error(err);});
/*var newstock = new Stock({stock: "GOOG", ip:anonymize("::ffff:192.168.144.203")});
newstock.save(function(err, data) {
  if (err) return console.error(err);
});
var newstock = new Stock({stock: "MSFT", ip:anonymize("::ffff:192.168.144.138")});
newstock.save(function(err, data) {
  if (err) return console.error(err);
});
var newstock = new Stock({stock: "ABCD", ip:anonymize("::ffff:192.168.23.138")});
newstock.save(function(err, data) {
  if (err) return console.error(err);
});*/

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){      
      //console.log(req.query);
      //console.log(req.ip);
      //console.log(req.headers['x-forwarded-for']);
      var stocks = []; var prices = {}; var likes = {};
      if (!Array.isArray(req.query.stock)){
        stocks.push(req.query.stock.toUpperCase());
      }
      else {stocks = req.query.stock.map(el=>el.toUpperCase());}

      const promises = [];
      for (var i = 0; i < stocks.length; i++){                
        var priceUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stocks[i]}/quote`;
        promises.push(
        fetch(priceUrl)
        .then(res => res.json())
        .then(function (res) {
          if (res == "Invalid symbol"){
            console.log("Invalid Symbol");            
          }
          else {
            prices[res["symbol"]]=res["latestPrice"];
          }
        })
        .catch(function() {
          console.log("cannot fetch url");
        }));
      
      }

      Promise.all(promises).then(async () => {
        for (var i = 0; i < stocks.length; i++){
          var sip = stocks[i];
          const data = await Stock.countDocuments({stock:sip});
          likes[sip] = data;
          if (req.query.like){
            if (req.query.like == "true"){
              const data1 = await Stock.findOne({stock:sip, ip:anonymize(req.headers['x-forwarded-for'])});
              //console.log(data1);
              if (!data1){                
                //console.log("enter");
                likes[sip]+= 1;
                var newstock = new Stock({stock: sip, ip:anonymize(req.headers['x-forwarded-for'])});
                newstock.save(function(err, data) {
                  if (err) return console.error(err);
                });
              }
            }
          }
        }

        //console.log(stocks);
        //console.log(prices);
        //console.log(likes);
        if (stocks.length == 1){          
          if (stocks[0] in prices){
            res.json({"stockData":{"stock":stocks[0],"price":prices[stocks[0]],"likes":likes[stocks[0]]}});
          }
          else {
            res.json({"stockData":{"error":"invalid symbol","likes":likes[stocks[0]]}});
          }
        }
        else {
          var stockdata = [];
          var likedif = likes[stocks[0]] - likes[stocks[1]];
          likes[stocks[0]] = likedif;
          likes[stocks[1]] = -likedif;
          for (var i = 0; i < stocks.length; i++){
            var dic = {}
            if (stocks[i] in prices){
              dic["stock"] = stocks[i];
              dic["price"] = prices[stocks[i]];
            }
            else {
              dic["error"] = "invalid symbol"
            }
            dic["rel_likes"] = likes[stocks[i]];
            stockdata.push(dic);
          }
          res.json({"stockData":stockdata});
        }
      })
      .catch((e) => {
          console.log("error");
      })
    });
    
};

function anonymize(ip) {
  let pattern = /^[0-9]+\.[0-9]+\.[0-9]+\./gi;
  return ip.match(pattern)+'0';
} 
