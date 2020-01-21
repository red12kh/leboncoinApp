const express = require('express')

const app = express()
const cors = require('cors')
/**** */
const leboncoin = require('leboncoin-api');



app.use(cors
    ({
        origine: 'localhost:8000'
    }))
app.get('/all', function (req, res) {
    var search = new leboncoin.Search()
    .setPage(1)
    .setQuery("renove")
    .setFilter(leboncoin.FILTERS.PARTICULIER)
    .setCategory("locations")
    .setRegion("ile_de_france")
    .addSearchExtra("price", {min: 1500, max: 2000}) // will add a range of price
    .addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé

    search.run().then(function (data) {
        console.log("data", data)
        data.results[0].getDetails().then(function (details) {
            // console.log(details); // the item 0 with more data such as description, all images, author, ...
        }, function (err) {
            console.error(err);
        });
        data.results[0].getPhoneNumber().then(function (phoneNumer) {
            console.log(phoneNumer); // the phone number of the author if available
        }, function (err) {
            console.error(err); // if the phone number is not available or not parsable (image -> string) 
        });
        res.json(data)
    }, function (err) {
        console.error(err);
    });
})
app.post('/', function (req, res) {
  

    console.log(req.query.department)
  
    
    var search = new leboncoin.Search()
        .setPage(1)
        
        .setCategory("voitures")
        // .setLocation([{"zipcode": req.query.Locality}]) fix this
        // .setDepartment(req.query.department)
        .setDepartment("req.query.departement")
        // .addSearchExtra("price", { min: req.query.Price, max: 2000 })fix this too
    search.run().then(function (data) {
        console.log("data: ", data)
        data.results[0].getDetails().then(function (details) {
             console.log(details); // the item 0 with more data such as description, all images, author, ...
        }, function (err) {
            console.error(err);
        });
        data.results[0].getPhoneNumber().then(function (phoneNumer) {
            console.log(phoneNumer); // the phone number of the author if available
        }, function (err) {
            console.error(err); // if the phone number is not available or not parsable (image -> string) 
        });
        res.json(data)
    }, function (err) {
        console.error(err);
    });




})






// app.get('/', (req, res) => {
//     console.log("req.params")
//     searchAll.run(
//         function (data) {
//             console.log(req.params)
//             data.results[0].getDetails().then(function (details) {
//                 console.log(details); // the item 0 with more data such as description, all images, author, ...
//             }, function (err) {
//                 console.error(err);
//             });
//         })
// })

app.listen(8000, () => console.log('app test is running on port : 8000'))
