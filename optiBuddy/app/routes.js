module.exports = function (app, passport, db) {
  console.log("App is available:", typeof app); //test
  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    console.log("GET / route hit"); //testing to see if this works.
    res.render("index.ejs");
  });

  //Profile Page
  app.get("/profile", isLoggedIn, function (req, res) {
    db.collection("users")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("profile.ejs", {
          user: req.user,
          users: result,
        });
      });
  });

  // Home Menu Page (1st page after succesful login)
  app.get("/home", isLoggedIn, function (req, res) {
    res.render("home.ejs", {
      user: req.user, 
    });
  });
  // Route for Style Guide
  app.get("/style-guide", isLoggedIn, function (req, res) {
    res.render("style-guide.ejs");
  });
  
    // Route for Find an Eye Doctor
    app.get("/find-eye-doctor", isLoggedIn, function (req, res) {
      res.render("find-eye-doctor.ejs");
    });
 
    //THIS DOESN'T WORK

    // Route for Saved Links
  app.get("/saved-links", isLoggedIn, function (req, res) {
    // Fetch user's saved links from the database
    db.collection("savedLinks").find({ userId: req.user._id }).toArray((err, links) => {
      if (err) {
        console.error("Error fetching saved links:", err);
        return res.redirect("/home");
      }
      res.render("saved-links.ejs", { links });
    });
  });

  // Route for adding a new saved link
  // app.post("/saved-links", isLoggedIn, function (req, res) {
  //   const newLink = {
  //     userId: req.user._id,
  //     title: req.body.title,
  //     url: req.body.url,
  //   };

  //   db.collection("savedLinks").insertOne(newLink, (err, result) => {
  //     if (err) {
  //       console.error("Error saving link:", err);
  //       return res.redirect("/saved-links");
  //     }
  //     res.redirect("/saved-links");
  //   });
  // });

// Route for deleting a saved link  //THIS DOESN'T WORK YET!
// app.post("/saved-links/delete", isLoggedIn, function (req, res) {
//   const linkId = req.body.linkId;

 
  // db.collection("savedLinks").deleteOne({ _id: new db.ObjectId(linkId), userId: req.user._id }, (err) => {
  //   if (err) {
  //     console.error("Error deleting link:", err);
  //     return res.redirect("/saved-links");
  //   }
  //   res.redirect("/saved-links");
// Route for deleting a saved link THIS DOESN'T WORK YET!
// app.post("/saved-links/delete", isLoggedIn, function (req, res) {
//   const linkId = req.body.linkId;

//   db.collection("savedLinks").deleteOne({ _id: new db.ObjectId(linkId), userId: req.user._id }, (err) => {
//     if (err) {
//       console.error("Error deleting link:", err);
//       return res.redirect("/saved-links");
//     }
//     res.redirect("/saved-links");




  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // Signup
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

// Process the signup form
app.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/home", // Redirect to the home page after successful signup
    failureRedirect: "/signup", // Redirect back to the signup page if there's an error
    failureFlash: true, // Allow flash messages
  })
);

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/home", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // Settings Page
  app.get("/settings", isLoggedIn, function (req, res) {
    res.render("settings.ejs");
  });

  // Appearance Page
  app.get("/appearance", isLoggedIn, function (req, res) {
    res.render("appearance.ejs");
  });

  // Handle Appearance Toggle Light Mode/ Dark Mode
  app.post("/appearance/toggle", isLoggedIn, function (req, res) {
    const mode = req.body.mode; // 'light' or 'dark'
    console.log("Appearance mode selected:", mode);
    // You can save the mode to the user's profile in the database if needed
    res.redirect("/appearance");
  });

  // Chat Page
  app.get("/chat", isLoggedIn, function (req, res) {
    res.render("chat.ejs");
  });

  // Handle Chat Input (POST route)
  app.post("/chat", isLoggedIn, function (req, res) {
    const userMessage = req.body.message;
    // Handle chat processing logic here
    console.log("User message:", userMessage);
    res.redirect("/chat");
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout(() => {
      console.log("User has logged out!");
    });
    res.redirect("/");
  });

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      // saves new user document into the user collection in mongo
      res.redirect("/profile");
    });
  });


// Delete Account Page
app.get("/delete", isLoggedIn, function (req, res) {
    res.render("delete.ejs");
  });

// Delete Account!
app.post("/delete", isLoggedIn, function (req, res) {
  const confirmation = req.body.confirm;
  if (confirmation === "yes") {
    const userId = req.user._id;
    db.collection("users").deleteOne({ _id: userId }, (err, result) => {
      if (err) {
        console.log("Error deleting account:", err);
        return res.redirect("/delete");
      }
      console.log("Account deleted for user:", userId);
      req.logout(() => {
        res.redirect("/");
      });
    });
  } else {
    res.redirect("/settings");
  }
});
};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
