const express = require ('express');
// konstanta bodyParser konvertuje API Call u JSON
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// pozivamo ili ukljucujemo model file
const Users = require('./models/userModel');
// pozivamo ili ukljucujemo config file
const dbConfig = require('./config/dbConfig');
const serverConfig = require("./config/server");


// const - konstanta koja poziva express funkciju iz libery-a
// express je funkcija koja se odnosi na listen i jos neke druge
// app je varijabla, express objekat
const app = express();
// konekcija na bazu - .then (data => console.log('MONGO DB is connected')); promis koji prima podatke
mongoose
  .connect(dbConfig.MONGODB_URL)
  .then((data) => console.log("MONGO DB is connected."))
  .catch((err) => console.log(`${err}`));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// metoda post upisuje podatke u bazu
///api/login 1 argument je URL
//req, res 2 argument je funkcija koja izvršava neki kod
// req - zahtjev koji dolazi sa frontenda
// res - ono sto mi saljemo iz backenda frontendu
//req i res su objekti

app.post('/api/login', (req,res) => {
    const reqBody = req.body;
    // findOne trzimo samo jednog usera sa određenim karakteristikama
    const foundUser = Users.findOne(reqBody, (err, data) => {
         if(err){
            const errorMsg =`Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
         }
         else{
            res.send(data);
         }
    });
});

// listen je express funkcija koja znaci slusaj
// err metoda
app.listen(serverConfig.port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(serverConfig.serverRunningMsg);
    }
  });
