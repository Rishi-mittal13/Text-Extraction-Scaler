const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors"); // Import cors module
const dotenv = require("dotenv")
const mongoose = require('mongoose') ;  
const authRoutes= require("./routes/auth.js");
const bodyParser =  require('body-parser') ; 
// const { register } = require("./routes/auth.js");
const app = express();


app.use("/", express.static("public"));
app.use(fileUpload());
app.use(cors()); // Use cors middleware
app.use("/auth", authRoutes);
dotenv.config() ; 
app.use(express.json()) ; 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.post("/extract-text", (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).end();
        return;
    }

    pdfParse(req.files.pdfFile.data).then(result => {
        res.send(result.text);
    }).catch(error => {
        console.error("PDF parsing error:", error);
        res.status(500).end();
    });
});

// app.post("/auth/register",register) ; 


//mongoose setup .  
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts); 
  }) 
  .catch((error) => console.log(`${error} did not connect`));
