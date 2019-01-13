const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const fs = require("fs");
const axios = require("axios");
const API_PORT = 3001;
const app = express();
const router = express.Router();
const request = require("request");

// this is our MongoDB database
const dbRoute = "mongodb://Server:dTvTZv4m75ucB5E@ds145193.mlab.com:45193/objets-trouves";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/getUserInfo", (req, res) => {
    let {code} = req.body;
    console.log(code);
    //const requestBody = "grant_type=authorization_code&code="+code+"&redirect_uri=http://138.195.139.246/&client_id=279c525e5961df88feb2b6053f210f7537265270&client_secret=f9e8e9c0a1a1eb060601e491286613f33f76ae73";
    const requestBody = {
      grant_type : "authorization_code",
      code : code,
      redirect_uri : "http://138.195.139.246/oauthend",
      client_id : "279c525e5961df88feb2b6053f210f7537265270",
      client_secret : "f9e8e9c0a1a1eb060601e491286613f33f76ae73"
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const url = "https://auth.viarezo.fr/oauth/token"
    request.post("https://auth.viarezo.fr/oauth/token", {form: requestBody}, (err, response, body)=>{
                    const data = JSON.parse(body);
                    console.log(body);

                    if (data.error) {
                      return res.json({error:err})
                    }
                    else {
                      axios.get("https://auth.viarezo.fr/api/user/show/me", {headers : {Authorization: 'Bearer '.concat(data.access_token)}})
                      .then(response => {console.log(response.data);
                                        return res.json({data: response.data})})}

                  });


    /*axios.post(url, requestBody, config)
      .then((result,err) => {
        console.log(result,res);
        return res.json(result);
      }).catch((err) => {
    console.log(err)
  })*/

});

router.post("/searchById", (req, res) => {
  let {id} = req.body;
  console.log("search by id :",id);
  Data.findById(id).exec((err, data) => {
    console.log(err,data);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post("/searchData", (req, res) => {
  let {search, number} = req.body;
  console.log("search data with parameters (search,number)",search,number);
  if (!number) {number = 10}
  Data.find(search).sort({"updatedAt": -1 }).limit(number).exec((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { author, title, type, reward, description, thumbnail, image } = req.body;


  data.title = title;
  data.type = type;
  data.reward = reward;
  data.description = description;
  data.author = author;
  data.thumbnail = thumbnail;
  data.image = image;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});






// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
