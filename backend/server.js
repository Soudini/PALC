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
const crypto = require("crypto-js");


mongoose.set('useFindAndModify', false);

app.use(bodyParser({limit: '35mb'}));
// this is our MongoDB database
const dbRoute = "mongodb://localhost/ads";
keyEncrypt = "1sd'o-tevtb!"

let admin = ["2018louysa"]


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
      redirect_uri : "http://objets-trouves.viarezo.fr/oauthend",
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
                                        response.data["expires_at"]= data.expires_at;
                                        response.data["auth"] = crypto.AES.encrypt(response.data.login, keyEncrypt).toString();
                                        return res.json({data: response.data})})}

                  });
});

router.post("/searchById", (req, res) => {
  let {id, auth} = req.body;
  console.log("search by id :",id);
  console.log(auth);
  auth_author_login = crypto.AES.decrypt(auth, keyEncrypt).toString(crypto.enc.Utf8);
  Data.findById(id).exec((err, data) => {
    if (err) return res.json({ success: false, error: err });
    show_button = (auth_author_login == data.author_login | admin.includes(auth_author_login));
    return res.json({ success: true, data: data, show_button : show_button });
  });
});



router.post("/getNumberAds", (req, res) => {

  console.log("get number of ads");
  Data.count().exec((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post("/searchData", (req, res) => {
  let {search, number, page} = req.body;
  if (!number) {number = 10};
  if (!page) {page = 0};
  console.log("search data with parameters (search,number,page)",search,number,page);
  Data.find(search,{"image" : 0}).sort({"updatedAt": -1 }).limit(number).skip(page*number).exec((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update, auth } = req.body;
  auth_author_login =  crypto.AES.decrypt(auth, keyEncrypt).toString(crypto.enc.Utf8);
  console.log(id, auth_author_login)
  if (admin.includes(auth_author_login))
  {
    console.log("update by admin")
    Data.findOneAndUpdate({_id : mongoose.Types.ObjectId(id)}, update, err => {
      if (err) {console.log(err); return res.json({ success: false, error: err });};
      return res.json({ success: true });
    });
  }

  else {
    Data.findOneAndUpdate({_id : mongoose.Types.ObjectId(id), author_login: auth_author_login}, update, err => {
      if (err) {console.log(err); return res.json({ success: false, error: err });};
      return res.json({ success: true });
    });
  }
});

// this is our delete method
// this method removes existing data in our database
router.post("/deleteData", (req, res) => {
  const { id, auth } = req.body;
  console.log("login",crypto.AES.decrypt(auth, keyEncrypt).toString(crypto.enc.Utf8))
  auth_author_login =  crypto.AES.decrypt(auth, keyEncrypt).toString(crypto.enc.Utf8);
  console.log("id to be removed", req, id );

  if (admin.includes(auth_author_login)){
    console.log("delete by admin")
    Data.findOneAndDelete({_id : id}, err => {
      if (err) {
        console.log("delete unsuccessful because : ",error);
        return res.send(err);}

      console.log("delete successful");
      return res.json({ success: true });
    });
  }
  else{
    Data.findOneAndDelete({_id : id, author_login : auth_author_login}, err => {
      if (err) {
        console.log("delete unsuccessful because : ",error);
        return res.send(err);}

      console.log("delete successful");
      return res.json({ success: true });
    });
  }
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { author, author_id, author_login, title, type, reward, description, thumbnail, image } = req.body;
  console.log("new ad posted with infos :", author, author_id, author_login, title, type);

  data.title = title;
  data.type = type;
  data.reward = reward;
  data.description = description;
  data.author = author;
  data.author_id = author_id;
  data.author_login = author_login;
  data.thumbnail = thumbnail;
  data.image = image;
  data.save(err => {
    if (err) {return res.json({ success: false, error: err });}
    return res.json({ success: true });
  });
});






// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
