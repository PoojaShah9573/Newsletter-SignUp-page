

  //jshint esversion: 6

  const express=require("express");
  //const https=require("https");
  const bodyParser=require("body-parser");
  const request=require("request");
  const https =require("https");

  const app=express();

  // to use as a static wensite like css,images
  app.use(express.static("public"));

  app.use(bodyParser.urlencoded({extended:true}));


  app.get("/",function(req,res){
  res.sendFile(__dirname+ "/signup.html");
  })


  app.post("/",function(req,res){

    const firstname=req.body.fName;
    const lastname=req.body.lName;
    const email=req.body.Email;

   //console.log(firstname);
   //console.log(lastname);
   //console.log(email);
    const data= {
    members: [
     {

       email_address: email,
       status:"subscribed",
       merge_fields:
        {
        FNAME:  firstname,
        LNAME: lastname
        }


      }
    ]
   }

   var jsonData= JSON.stringify(data);


   const url= "https://us20.api.mailchimp.com/3.0/lists/ac30a5f5b9";
   const options ={
    method:"POST",
    auth:"puja1:8ec904379929cc2874f5b9680da78a36-us20"
   }

   const request=https.request(url,options,function(response){

    if(response.statusCode === 200){
     res.sendFile(__dirname + "/success.html");
     }
     else{
        res.sendFile(__dirname + "/failure.html");
       }

    response.on("data",function (data){
    console.log(JSON.parse(data));

    })
   })


   request.write(jsonData);
   request.end();

  });

  app.post("/failure",function(req,res){

   res.redirect("/");

  })




  app.listen(process.env.PORT || 3000,function () {
    console.log("My server is 3000");

  })

  //API KEY
  // 8ec904379929cc2874f5b9680da78a36-us20



  // list id ac30a5f5b9
