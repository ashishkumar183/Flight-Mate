const express = require('express')

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,/*async*/ () =>{
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    // We can also insert data by the method given below 
    // const {City,Airport} = require('./models');
    // const bengaluru = await City.findByPk(1);
    // console.log(bengaluru);
    // const airport = await Airport.create({name: "Kempagowda",code: "BLR",cityId: 1})
    // const kempairport = await bengaluru.createAirport({name: "Kempagowda",code: "BLR"});
    // console.log(kempairport);
});