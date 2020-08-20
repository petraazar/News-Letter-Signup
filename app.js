const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
const https = require("https");
const { response } = require("express");
const { request } = require("http");

app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email

    const data = {
        members :[{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }
        }]
        
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/627db372ef"

        const options = {
            method: "POST",
            auth: "ali:eb125eab24a2325e8ec8a06628aa43ad-us17"
        }
        const request = https.request(url, options, function(response){
            if(response.statusCode === 200) {
                res.sendFile(__dirname+"/success.html");
            } else {
                res.sendFile(__dirname+"/failure.html")
            }


            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
        })

        request.write(jsonData);
        request.end();
    });

    app.post("/failure", function(req,res){
        res.redirect("/");
    })
    








////
app.listen(process.env.PORT || 3000, function(){ //process.env.PORT is used to listen to port chosen by heroku host
    console.log("Server is on and running on port 3000")
});




//API KEY
//eb125eab24a2325e8ec8a06628aa43ad-us17

//List ID
//627db372ef

//Data form JSON
//--data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' 
