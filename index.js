const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var app = express();


app.use(cors(
  {
    origin: ["https//orion-server-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
  ));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/Images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "crud",
//   connectionLimit:10
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to MySQL database');
// });

// // Routes

// // Read operation
// app.get('/getaddelectrical', (req, res) => {
//   const sql = "SELECT * FROM book";
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json({ error: "error" });
//     }
//     return res.json(data);
//   });
// });

// // Create operation
// app.post('/addelectrical', (req, res) => {
//   const sql = "INSERT INTO book (productname, description, file) VALUES (?, ?, ?)";
//   const values = [
//     req.body.productname,
//     req.body.description,
//     req.body.file
//   ];
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       return res.json({ error: "error" });
//     }
//     return res.json(data);
//   });
// });

// // Update operation
// app.put('/updateelectrical/:id', (req, res) => {
//   const sql = "UPDATE book SET productname=?, description=?, file=? WHERE id=?";
//   const values = [
//     req.body.productname,
//     req.body.description,
//     req.body.file,
//     req.params.id
//   ];
//   db.query(sql, values, (err, data) => {
//     if (err) {
//       return res.json({ error: "error" });
//     }
//     return res.json(data);
//   });
// });

// // Delete operation
// app.delete('/delete/:id', (req, res) => {
//   const sql = "DELETE FROM book WHERE id=?";
//   const id = req.params.id;
//   db.query(sql, id, (err, data) => {
//     if (err) {
//       return res.json({ error: "error" });
//     }
//     return res.json(data);
//   });
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const productImageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/favimage");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        img.fieldname + "_" + Date.now() + path.extname(img.originalname)
      );
    },
  }),
});

var app = express();
app.use(express.static("public/Images"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//mongoose code
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog_db");
}

/////////////////////////////////////////////////////////////1
//schema create
const blogSchema = new mongoose.Schema({
  name: String,
  email: String,
  Number: String,
  Company: String,
  selectedItem: String,
  comment: String,
});

//model create
const blogmodel = mongoose.model("user_tbl", blogSchema);

//apifor register
app.post("/fullScreenBtn", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var selectedItem = req.body.selectedItem;
  var mnt = req.body.mnt;

  const table = new blogmodel({
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    selectedItem: selectedItem,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);
    console.log("Company:", savedDocument.Company);
    console.log("comment:", savedDocument.comment);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "Sending Email using Node.js",
      text: `Name: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\nSelectedItem: ${savedDocument.selectedItem}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg1: "message send successfuly" });
  });
});

////////////////////////////////////////////////////////2
//schema create
const directContactSchemaSchema = new mongoose.Schema({
  name: String,
  email: String,
  mail: String,
});

//model create
const directContactmodel = mongoose.model(
  "directContact_tbl",
  directContactSchemaSchema
);

//apifor register
app.post("/contact", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var mailc = req.body.mailc;

  const table = new directContactmodel({
    name: name,
    email: email,
    message: mailc,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "Direct Contact",
      text: `Name: ${savedDocument.name}\nEmail: ${savedDocument.email}\nContent: ${savedDocument.message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ msg2: "email sent Successfully" });
  });
});

/////////////////////////////////////////////////////3

//schema create
const fittingsSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

const fittingsmodel = mongoose.model("fittings_tbl", fittingsSchema);

//apifor register
app.post("/fittings", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new fittingsmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    // Nodemailer setup and sending email
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "fittings",
      text: `productname: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ msg3: "enquire sent successfully" });
  });
});

//////////////////////////////////////////////////////4

//schema create
const electroMechanicalSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const electroMechanicalmodel = mongoose.model(
  "electroMechanical_tbl",
  electroMechanicalSchema
);

//apifor register
app.post("/electroMechanical", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new electroMechanicalmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "electroMechanical",
      text: `productname: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ msg4: "enquire send successfully" });
  });
});

/////////////////////////////////////////////////////////5

//schema create
const safetySchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const safetymodel = mongoose.model("safety_tbl", safetySchema);

//apifor register
app.post("/safety", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new safetymodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "safety",
      text: `productname: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ msg5: "enquire send successfully" });
  });
});

/////////////////////////////////////////////////////6

//schema create
const weldingSchema = new mongoose.Schema({
  productname: String,

  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const weldingmodel = mongoose.model("welding_tbl", weldingSchema);

//apifor register
app.post("/welding", (req, res) => {
  var productname = req.body.productname;

  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new weldingmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "welding",
      text: `productname: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ msg6: "enquire send successfully" });
  });
});

////////////////////////////////////////////////////7

//schema create
const flangesSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const flangesmodel = mongoose.model("flanges_tbl", flangesSchema);

//apifor register
app.post("/flanges", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new flangesmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "flanges",
      text: `productname: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg7: "enquire send successfully" });
  });
});

//////////////////////////////////////////////////////////8

//schema create
const valvesSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const valvesmodel = mongoose.model("valves_tbl", valvesSchema);

//apifor register
app.post("/valves", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new valvesmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "valves",
      text: `ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg8: "enquire send successfully" });
  });
});

//////////////////////////////////////////////////////9

//schema create
const fastenersSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const fastenersmodel = mongoose.model("fasteners_tbl", fastenersSchema);

//apifor register
app.post("/fasteners", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;
  const table = new fastenersmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "fasteners",
      text: `ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg9: "enquire send successfully" });
  });
});

//////////////////////////////////////////////////////////////10

//schema create
const instrumentationSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const instrumentationmodel = mongoose.model(
  "instrumentation_tbl",
  instrumentationSchema
);

//apifor register
app.post("/instrumentation", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new instrumentationmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "instrumentation",
      text: `ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg10: "enquire send successfully" });
  });
});

////////////////////////////////////////////////////////////11

//schema create
const liftingTacklesSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const liftingTacklesmodel = mongoose.model(
  "liftingTackles_tbl",
  liftingTacklesSchema
);

//apifor register
app.post("/liftingTackles", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new liftingTacklesmodel({
    productname: productname,

    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "liftingTackles",
      text: `
      ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg11: "enquire send successfully" });
  });
});

////////////////////////////////////////////////////////12

//schema create
const fenderSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const fendermodel = mongoose.model("fender_tbl", fenderSchema);

//apifor register
app.post("/fender", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new fendermodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "fender",
      text: `ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg12: "enquire send successfully" });
  });
});

////////////////////////////////////////////////////////////////////13

//schema create
const electricalSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const electricalmodel = mongoose.model("electrical_tbl", electricalSchema);

//apifor register
app.post("/electrical", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new electricalmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "electrical",
      text: `ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg13: "enquire send successfully" });
  });
});

///////////////////////////////////////////////////////////14

//schema create
const otherGeneralItemsSchema = new mongoose.Schema({
  productname: String,
  name: String,
  email: String,
  Number: String,
  Company: String,
  comment: String,
});

//model create
const otherGeneralItemsmodel = mongoose.model(
  "otherGeneralItems_tbl",
  otherGeneralItemsSchema
);

//apifor register
app.post("/otherGeneralItems", (req, res) => {
  var productname = req.body.productname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var comp = req.body.comp;
  var mnt = req.body.mnt;

  const table = new otherGeneralItemsmodel({
    productname: productname,
    name: name,
    email: email,
    Number: phno,
    Company: comp,
    comment: mnt,
  });

  table.save().then((savedDocument) => {
    // Access the 'name' and 'email' properties of the saved document
    console.log("Name:", savedDocument.name);
    console.log("Email:", savedDocument.email);

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "souravoz2018@gmail.com",
        pass: "zneq wfaa eunz cacv",
      },
    });

    var mailOptions = {
      from: "souravoz2018@gmail.com",
      to: "developer.clazzo1@gmail.com",
      subject: "otherGeneralItems",
      text: `ProductName: ${savedDocument.productname}\nName: ${savedDocument.name}\nEmail: ${savedDocument.email}\nMobileNumber: ${savedDocument.Number}\nCOMPANY: ${savedDocument.Company}\ncomnt:${savedDocument.comment}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send({ msg14: "enquire send successfully" });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addfittingsSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addfittingsmodel = mongoose.model("addfittings_tbl", addfittingsSchema);

app.post("/addfittings", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addfittingsmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg15: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg15: "error", error: err.message });
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/getaddfittings", (req, res) => {
  addfittingsmodel
    .find()
    .then((addfittings) => res.json(addfittings))
    .catch((err) => res.json(err));
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//api for update
app.get("/getupdatefittings/:id", (req, res) => {
  const id = req.params.id;
  addfittingsmodel
    .findById({ _id: id })
    .then((addfittings) => res.json(addfittings))
    .catch((err) => res.json(err));
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteFittings/:id", async (req, res) => {
  const idn = req.params.id;
  await addfittingsmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//api for put update
app.put("/update/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addfittingsmodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getFittingsProduct/:id", (req, res) => {
  const id = req.params.id;
  addfittingsmodel
    .findById({ _id: id })
    .then((addfittings) => res.json(addfittings))
    .catch((err) => res.json(err));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
const productSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
  // Add other fields as needed
});

const Productmodel = mongoose.model("Product", productSchema);

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Endpoint to register a favorite product
app.post(
  "/registerFavoriteProduct",
  upload.single("file"),
  async (req, res) => {
    try {
      // Check if a product with the same ID already exists
      const existingProduct = await Productmodel.findOne({
        productname: req.body.productname,
      });

      if (existingProduct) {
        // Product with the same name already exists
        return res
          .status(400)
          .json({
            success: false,
            error1: "Product is already registered as a favorite",
          });
      }

      // Create a new Product instance with the request body
      const newProduct = new Productmodel(req.body);

      // Save the product to MongoDB
      await newProduct.save();

      // Respond with a success message
      res
        .status(200)
        .json({ success: true, message: "Product registered successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error registering product:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/favoritePage", (req, res) => {
  Productmodel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
//delete from fav
app.delete("/deletefav/:id", async (req, res) => {
  const idn = req.params.id;
  await Productmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
const addelectroMechanicalSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addelectroMechanicalmodel = mongoose.model(
  "addelectroMechanical_tbl",
  addelectroMechanicalSchema
);

app.post("/addelectroMechanical", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addelectroMechanicalmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getElectroMechanicalProduct/:id", (req, res) => {
  const id = req.params.id;
  addelectroMechanicalmodel
    .findById({ _id: id })
    .then((addelectroMechanical) => res.json(addelectroMechanical))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddelectroMechanical", (req, res) => {
  addelectroMechanicalmodel
    .find()
    .then((addelectroMechanical) => res.json(addelectroMechanical))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdateelectroMechanical/:id", (req, res) => {
  const id = req.params.id;
  addelectroMechanicalmodel
    .findById({ _id: id })
    .then((addelectroMechanical) => res.json(addelectroMechanical))
    .catch((err) => res.json(err));
});

//api for put update
app.put(
  "/updateelectroMechanical/:id",
  upload.single("file"),
  async (req, res) => {
    const idn = req.params.id;

    try {
      const updatedRecord = await addelectroMechanicalmodel.findByIdAndUpdate(
        idn,
        {
          productname: req.body.pname,
          description: req.body.desc,
          image: req.file.filename,
        },
        { new: true }
      );

      if (updatedRecord) {
        res.json({ msg15: "success" });
      } else {
        res.status(404).json({ msg15: "Record not found" });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ msg15: "Internal Server Error" });
    }
  }
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteelectroMechanical/:id", async (req, res) => {
  const idn = req.params.id;
  await addelectroMechanicalmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addsafetySchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addsafetymodel = mongoose.model("addsafety_tbl", addsafetySchema);

app.post("/addsafety", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addsafetymodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getSafetyProduct/:id", (req, res) => {
  const id = req.params.id;
  addsafetymodel
    .findById({ _id: id })
    .then((addsafety) => res.json(addsafety))
    .catch((err) => res.json(err));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddsafety", (req, res) => {
  addsafetymodel
    .find()
    .then((addsafety) => res.json(addsafety))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdatesafety/:id", (req, res) => {
  const id = req.params.id;
  addsafetymodel
    .findById({ _id: id })
    .then((addsafety) => res.json(addsafety))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updatesafety/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addsafetymodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deletesafety/:id", async (req, res) => {
  const idn = req.params.id;
  await addsafetymodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const addweldingSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addweldingmodel = mongoose.model("addwelding_tbl", addweldingSchema);

app.post("/addwelding", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addweldingmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getWeldingProduct/:id", (req, res) => {
  const id = req.params.id;
  addweldingmodel
    .findById({ _id: id })
    .then((addwelding) => res.json(addwelding))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddwelding", (req, res) => {
  addweldingmodel
    .find()
    .then((addwelding) => res.json(addwelding))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdatewelding/:id", (req, res) => {
  const id = req.params.id;
  addweldingmodel
    .findById({ _id: id })
    .then((addwelding) => res.json(addwelding))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updatewelding/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addweldingmodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deletewelding/:id", async (req, res) => {
  const idn = req.params.id;
  await addweldingmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addflangesSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addflangesmodel = mongoose.model("addflanges_tbl", addflangesSchema);

app.post("/addflanges", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addflangesmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getFlangesProduct/:id", (req, res) => {
  const id = req.params.id;
  addflangesmodel
    .findById({ _id: id })
    .then((addflanges) => res.json(addflanges))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddflanges", (req, res) => {
  addflangesmodel
    .find()
    .then((addflanges) => res.json(addflanges))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdateflanges/:id", (req, res) => {
  const id = req.params.id;
  addflangesmodel
    .findById({ _id: id })
    .then((addflanges) => res.json(addflanges))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updateflanges/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addflangesmodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteflanges/:id", async (req, res) => {
  const idn = req.params.id;
  await addflangesmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addvalvesSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addvalvesmodel = mongoose.model("addvalves_tbl", addvalvesSchema);

app.post("/addvalves", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addvalvesmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getValvesProduct/:id", (req, res) => {
  const id = req.params.id;
  addvalvesmodel
    .findById({ _id: id })
    .then((addvalves) => res.json(addvalves))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddvalves", (req, res) => {
  addvalvesmodel
    .find()
    .then((addvalves) => res.json(addvalves))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdatevalves/:id", (req, res) => {
  const id = req.params.id;
  addvalvesmodel
    .findById({ _id: id })
    .then((addvalves) => res.json(addvalves))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updatevalves/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addvalvesmodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deletevalves/:id", async (req, res) => {
  const idn = req.params.id;
  await addvalvesmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addfastenersSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addfastenersmodel = mongoose.model(
  "addfasteners_tbl",
  addfastenersSchema
);

app.post("/addfasteners", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addfastenersmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getFastenersProduct/:id", (req, res) => {
  const id = req.params.id;
  addfastenersmodel
    .findById({ _id: id })
    .then((addfasteners) => res.json(addfasteners))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddfasteners", (req, res) => {
  addfastenersmodel
    .find()
    .then((addfasteners) => res.json(addfasteners))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdatefasteners/:id", (req, res) => {
  const id = req.params.id;
  addfastenersmodel
    .findById({ _id: id })
    .then((addfasteners) => res.json(addfasteners))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updatefasteners/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addfastenersmodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deletefasteners/:id", async (req, res) => {
  const idn = req.params.id;
  await addfastenersmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addinstrumentationSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addinstrumentationmodel = mongoose.model(
  "addinstrumentation_tbl",
  addinstrumentationSchema
);

app.post("/addinstrumentation", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addinstrumentationmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getInstrumentationProduct/:id", (req, res) => {
  const id = req.params.id;
  addinstrumentationmodel
    .findById({ _id: id })
    .then((addinstrumentation) => res.json(addinstrumentation))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddinstrumentation", (req, res) => {
  addinstrumentationmodel
    .find()
    .then((addinstrumentation) => res.json(addinstrumentation))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdateinstrumentation/:id", (req, res) => {
  const id = req.params.id;
  addinstrumentationmodel
    .findById({ _id: id })
    .then((addinstrumentation) => res.json(addinstrumentation))
    .catch((err) => res.json(err));
});

//api for put update
app.put(
  "/updateinstrumentation/:id",
  upload.single("file"),
  async (req, res) => {
    const idn = req.params.id;

    try {
      const updatedRecord = await addinstrumentationmodel.findByIdAndUpdate(
        idn,
        {
          productname: req.body.pname,
          description: req.body.desc,
          image: req.file.filename,
        },
        { new: true }
      );

      if (updatedRecord) {
        res.json({ msg15: "success" });
      } else {
        res.status(404).json({ msg15: "Record not found" });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ msg15: "Internal Server Error" });
    }
  }
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteinstrumentation/:id", async (req, res) => {
  const idn = req.params.id;
  await addinstrumentationmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addliftingTacklesSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addliftingTacklesmodel = mongoose.model(
  "addliftingTackles_tbl",
  addliftingTacklesSchema
);

app.post("/addliftingTackles", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addliftingTacklesmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getLiftingTacklesProduct/:id", (req, res) => {
  const id = req.params.id;
  addliftingTacklesmodel
    .findById({ _id: id })
    .then((addliftingTackles) => res.json(addliftingTackles))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddliftingTackles", (req, res) => {
  addliftingTacklesmodel
    .find()
    .then((addliftingTackles) => res.json(addliftingTackles))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdateliftingTackles/:id", (req, res) => {
  const id = req.params.id;
  addliftingTacklesmodel
    .findById({ _id: id })
    .then((addliftingTackles) => res.json(addliftingTackles))
    .catch((err) => res.json(err));
});

//api for put update
app.put(
  "/updateliftingTackles/:id",
  upload.single("file"),
  async (req, res) => {
    const idn = req.params.id;

    try {
      const updatedRecord = await addliftingTacklesmodel.findByIdAndUpdate(
        idn,
        {
          productname: req.body.pname,
          description: req.body.desc,
          image: req.file.filename,
        },
        { new: true }
      );

      if (updatedRecord) {
        res.json({ msg15: "success" });
      } else {
        res.status(404).json({ msg15: "Record not found" });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ msg15: "Internal Server Error" });
    }
  }
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteliftingTackles/:id", async (req, res) => {
  const idn = req.params.id;
  await addliftingTacklesmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const addfenderSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addfendermodel = mongoose.model("addfender_tbl", addfenderSchema);

app.post("/addfender", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addfendermodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getFenderProduct/:id", (req, res) => {
  const id = req.params.id;
  addfendermodel
    .findById({ _id: id })
    .then((addfender) => res.json(addfender))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddfender", (req, res) => {
  addfendermodel
    .find()
    .then((addfender) => res.json(addfender))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdatefender/:id", (req, res) => {
  const id = req.params.id;
  addfendermodel
    .findById({ _id: id })
    .then((addfender) => res.json(addfender))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updatefender/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addfendermodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deletefender/:id", async (req, res) => {
  const idn = req.params.id;
  await addfendermodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
const addelectricalSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addelectricalmodel = mongoose.model(
  "addelectrical_tbl",
  addelectricalSchema
);

app.post("/addelectrical", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addelectricalmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getElectricalProduct/:id", (req, res) => {
  const id = req.params.id;
  addelectricalmodel
    .findById({ _id: id })
    .then((addelectrical) => res.json(addelectrical))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddelectrical", (req, res) => {
  addelectricalmodel
    .find()
    .then((addelectrical) => res.json(addelectrical))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdateelectrical/:id", (req, res) => {
  const id = req.params.id;
  addelectricalmodel
    .findById({ _id: id })
    .then((addelectrical) => res.json(addelectrical))
    .catch((err) => res.json(err));
});

//api for put update
app.put("/updateelectrical/:id", upload.single("file"), async (req, res) => {
  const idn = req.params.id;

  try {
    const updatedRecord = await addelectricalmodel.findByIdAndUpdate(
      idn,
      {
        productname: req.body.pname,
        description: req.body.desc,
        image: req.file.filename,
      },
      { new: true }
    );

    if (updatedRecord) {
      res.json({ msg15: "success" });
    } else {
      res.status(404).json({ msg15: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ msg15: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteelectrical/:id", async (req, res) => {
  const idn = req.params.id;
  await addelectricalmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addotherGeneralItemsSchema = new mongoose.Schema({
  productname: String,
  description: String,
  image: String,
});

const addotherGeneralItemsmodel = mongoose.model(
  "addotherGeneralItems_tbl",
  addotherGeneralItemsSchema
);

app.post("/addotherGeneralItems", upload.single("file"), (req, res) => {
  var pname = req.body.pname;
  var desc = req.body.desc;
  var image = req.file.filename;
  const table = new addotherGeneralItemsmodel({
    productname: pname,
    description: desc,
    image: image,
  }); // Use pname and desc here
  table
    .save()
    .then(() => {
      res.send({ msg16: "success" });
    })
    .catch((err) => {
      res.status(500).send({ msg16: "error", error: err.message });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getOtherGeneralItemsProduct/:id", (req, res) => {
  const id = req.params.id;
  addotherGeneralItemsmodel
    .findById({ _id: id })
    .then((addotherGeneralItems) => res.json(addotherGeneralItems))
    .catch((err) => res.json(err));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getaddotherGeneralItems", (req, res) => {
  addotherGeneralItemsmodel
    .find()
    .then((addotherGeneralItems) => res.json(addotherGeneralItems))
    .catch((err) => res.json(err));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for update
app.get("/getupdateotherGeneralItems/:id", (req, res) => {
  const id = req.params.id;
  addotherGeneralItemsmodel
    .findById({ _id: id })
    .then((addotherGeneralItems) => res.json(addotherGeneralItems))
    .catch((err) => res.json(err));
});

//api for put update
app.put(
  "/updateotherGeneralItems/:id",
  upload.single("file"),
  async (req, res) => {
    const idn = req.params.id;

    try {
      const updatedRecord = await addotherGeneralItemsmodel.findByIdAndUpdate(
        idn,
        {
          productname: req.body.pname,
          description: req.body.desc,
          image: req.file.filename,
        },
        { new: true }
      );

      if (updatedRecord) {
        res.json({ msg15: "success" });
      } else {
        res.status(404).json({ msg15: "Record not found" });
      }
    } catch (error) {
      console.error("Error updating record:", error);
      res.status(500).json({ msg15: "Internal Server Error" });
    }
  }
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//api for delete data
app.delete("/deleteotherGeneralItems/:id", async (req, res) => {
  const idn = req.params.id;
  await addotherGeneralItemsmodel.deleteOne({ _id: idn });
  res.json("data delete successfully");
});

const port = process.env.PORT || 9000;
//listen
app.listen(port, () => {
  console.log("server running http://localhost:9000/");
});
