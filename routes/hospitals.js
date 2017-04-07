var express = require("express");
var router  = express.Router();
var Hospital = require("../models/hospital");
var middleware = require("../middleware");


//INDEX - show all hospital
router.get("/", function(req, res){
    // Get all hospital from DB
    Hospital.find({}, function(err, allHospitals){
       if(err){
           console.log(err);
       } else {
          res.render("hospitals/index",{hospitals:allHospitals});
       }
    });
});

//CREATE - add new hospital to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to hospitals array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHospital = {name: name, image: image, description: desc, author:author}
    // Create a new hospital and save to DB
    Hospital.create(newHospital, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to hospitals page
            console.log(newlyCreated);
            res.redirect("/hospitals");
        }
    });
});

//NEW - show form to create new hospital
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("hospitals/new"); 
});

// SHOW - shows more info about one hospital
router.get("/:id", function(req, res){
    //find the hospital with provided ID
    Hospital.findById(req.params.id).populate("comments").exec(function(err, foundHospital){
        if(err){
            console.log(err);
        } else {
            console.log(foundHospital)
            //render show template with that hospital
            res.render("hospitals/show", {hospital: foundHospital});
        }
    });
});

// EDIT HOSPITAL ROUTE
router.get("/:id/edit", middleware.checkHospitalOwnership, function(req, res){
    Hospital.findById(req.params.id, function(err, foundHospital){
        res.render("hospitals/edit", {hospital: foundHospital});
    });
});

// UPDATE HOSPITAL ROUTE
router.put("/:id",middleware.checkHospitalOwnership, function(req, res){
    // find and update the correct hospital
    Hospital.findByIdAndUpdate(req.params.id, req.body.hospital, function(err, updatedHospital){
       if(err){
           res.redirect("/hospitals");
       } else {
           //redirect somewhere(show page)
           res.redirect("/hospitals/" + req.params.id);
       }
    });
});

// DESTROY HOSPITAL ROUTE
router.delete("/:id",middleware.checkHospitalOwnership, function(req, res){
   Hospital.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/hospitals");
      } else {
          res.redirect("/hospitals");
      }
   });
});


module.exports = router;

