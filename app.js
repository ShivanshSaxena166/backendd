//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const persontype=["admin","vendor","user"];



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const DB =
  "mongodb+srv://weddDB:shiv@66!12@cluster0-5xyla.mongodb.net/Weddlist?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("---Database Connected---");
  });
const userSchema ={
  email:String,
  password:String,
  ty:String
}
const User = new mongoose.model("User",userSchema);


app.get("/", function(req, res){
  res.render("index");
});
app.get("/register", function(req, res){
  const newUser= new User({
    email: req.body.username,
    password: req.body.password
  })
  
  res.render("register");
});
app.post("/register", function(req, res){
  console.log(req.body);
  console.log("party fellas");
  
  const newUser= new User({
    email: req.body.username,
    password: req.body.password[0]
    
  })
  console.log("party fellas again");
  newUser.save(function(err){
    if(err)
    {
      console.log(err);
    }
    else{
      res.render("vendor-profile");
    }
  })
  
 
});
app.post("/login",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  console.log(username);
  console.log(password);
  User.findOne({email: username},function(err,foundUser){
    if(err)
    {
      console.log(err);
    }
    else{
      if(foundUser)
      {
        if(foundUser.password===password)
        {
          res.render("Success");
        }
        else
        {
          res.render("Wrong");
        }
      }
      else{
        res.render("Not");
      }
    }
   
  })

})
//admin

app.post("/registerad", function(req, res){
  console.log(req.body);
  console.log("party fellas");
  const username = req.body.username;
  const password = req.body.password;
  
  const newUser= new User({
    email: req.body.username,
    password: req.body.password[0],
    ty: "admin"

    
  })
  console.log("party fellas again");
  newUser.save(function(err){
    if(err)
    {
      console.log(err);
    }
    else{

      
            res.render("successreg");
          }
          
       


      
    
  })
  
 
});
app.post("/loginad",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  console.log(username);
  console.log(password);
  User.findOne({email: username},function(err,foundUser){
    if(err)
    {
      console.log(err);
    }
    else{
      if(foundUser)
      {
        if(foundUser.password===password&&foundUser.ty==persontype[0])
        {
          res.render("Success");
        }
        else
        {
          res.render("Wrong");
        }
      }
      else{
        res.render("Not");
      }
    }
   
  })

})



app.get("/admin", function(req, res){
  res.render("admin");
});


//vendor
app.post("/registerven", function(req, res){
  console.log(req.body);
  console.log("party fellas");
  console.log("vendor");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  
  const newUser= new User({
    email: req.body.username,
    password: req.body.password[0],
    ty: "vendor"

    
  })
  console.log("wer");
  console.log(newUser);
  console.log("party fellas again");
  
  

        newUser.save(function(err){
          if(err)
          {
            console.log(err);
          }
          else{
      
            res.render("successreg");
      
            
          }
        })

      
 
});
app.post("/loginven",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  console.log(username);
  console.log(password);
  User.findOne({email: username},function(err,foundUser){
    if(err)
    {
      console.log(err);
    }
    else{
      if(foundUser)
      {
        if(foundUser.password===password&&foundUser.ty==persontype[1])
        {
          res.render("Success");
        }
        else
        {
          res.render("Wrong");
        }
      }
      else{
        res.render("Not");
      }
    }
   
  })

})

app.get("/vendor", function(req, res){
  res.render("vendor");
});
//user


app.post("/registerus", function(req, res){
  console.log(req.body);
  console.log("party fellas");
  console.log("user");
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  
  const newUser= new User({
    email: req.body.username,
    password: req.body.password[0],
    ty: "user"

    
  })
  console.log("wer");
  console.log(newUser);
  console.log("party fellas again");
  
  

        newUser.save(function(err){
          if(err)
          {
            console.log(err);
          }
          else{
      
            res.render("successreg");
      
            
          }
        })
 
 
});
app.post("/loginus",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  console.log(username);
  console.log(password);
  User.findOne({email: username},function(err,foundUser){
    if(err)
    {
      console.log(err);
    }
    else{
      if(foundUser)
      {
        if(foundUser.password===password&&foundUser.ty==persontype[2])
        {
          res.render("Success");
        }
        else
        {
          res.render("Wrong");
        }
      }
      else{
        res.render("Not");
      }
    }
   
  })

})

app.get("/user", function(req, res){
  res.render("user");
});



//other routes
app.get("/404",function(req,res){
  res.render("404");
})
app.get("/about-us-2",function(req,res){
  res.render("about-us-2");
})
app.get("/add-listing",function(req,res){
  res.render("add-listing");
})
app.get("/blog-detail",function(req,res){
  res.render("blog-detail");
})
app.get("/blog",function(req,res){
  res.render("blog");
})
app.get("/budget-planner",function(req,res){
  res.render("budget-planner");
})
app.get("/category-listing",function(req,res){
  res.render("category-listing");
})
app.get("/contact-us-2",function(req,res){
  res.render("contact-us-2");
})
app.get("/contact-us-3",function(req,res){
  res.render("contact-us-3");
})
app.get("/couple-dashboard",function(req,res){
  res.render("couple-dashboard");
})

app.get("/faq",function(req,res){
  res.render("faq");
})
app.get("/found",function(req,res){
  res.render("found");
})
app.get("/gallery-col3",function(req,res){
  res.render("gallery-col3");
})
app.get("/gallery-col4",function(req,res){
  res.render("gallery-col4");
})
app.get("/guest-list",function(req,res){
  res.render("guest-list");
})
app.get("/help",function(req,res){
  res.render("help");
})
app.get("/listing-with-leftmap",function(req,res){
  res.render("listing-with-leftmap");
})
app.get("/listing-with-topmap",function(req,res){
  res.render("listing-with-topmap");
})
app.get("/manage-item-listing",function(req,res){
  res.render("manage-item-listing");
})
app.get("/new-listing-item-des",function(req,res){
  res.render("new-listing-item-des");
})
app.get("/pricing-plan",function(req,res){
  res.render("pricing-plan");
})
app.get("/pricing-table",function(req,res){
  res.render("pricing-table");
})
app.get("/real-wedding-listing",function(req,res){
  res.render("real-wedding-listing");
})
app.get("/real-wedding-single-listing",function(req,res){
  res.render("real-wedding-single-listing");
})
app.get("/testimonials",function(req,res){
  res.render("testimonials");
})
app.get("/to-do-list",function(req,res){
  res.render("to-do-list");
})
app.get("/vendor-dashboard",function(req,res){
  res.render("vendor-dashboard");
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
