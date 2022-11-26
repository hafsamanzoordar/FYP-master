const User = require("./models/user");
const Donations = require("./models/donation");
const janaza = require("./models/janazaReq");
const collar = require("./models/whiteCollarReq");
const express = require("express"),
  app = express(),
  dotenv = require("dotenv"),
  cookieParser = require("cookie-parser"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  authRoutes = require("./routes/authRoutes"),
  userRoutes = require("./routes/userRoutes"),
  donationRoutes = require("./routes/donationRoutes"),
  whiteCollarReqRoutes = require("./routes/whiteCollarReqRoutes"),
  janazaReqRoutes = require("./routes/janazaReqRoutes"),
  marketRoutes = require("./routes/marketRoutes"),
  transactionRoutes = require("./routes/transRoutes"),
  memberRoutes = require("./routes/memberRoutes"),
  jwt = require("jsonwebtoken");
const verify = require("./utils/auth");
const Donation = require("./models/donation");

//connect to mongodb and listen for requests
const dbURI =
  "mongodb+srv://admin:hafsa123@cluster0.xzwka.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  require("express-session")({
    secret: "Any normal Word", //decode or encode session
    resave: false,
    saveUninitialized: false,
  })
);
dotenv.config();

//register view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// R O U T E S

app.use(cors());

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/donations", donationRoutes);

app.use("/api/whiteCollarRequests", whiteCollarReqRoutes);

app.use("/api/janazaRequests", janazaReqRoutes);

app.use("/api/markets", marketRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/", memberRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong! ";
  return res.status(errorStatus).json(errorMessage);
});

app.get("/api/userProfile", async (req, res) => {
  if (req.header("x-access-token")) {
    token = req.header("x-access-token");
    jwt.verify(token, process.env.secret, async (err, decoded) => {
      if (err) {
        console.log(err.errorMessage);
        return res.send(401).send("Invalid Token");
      }
      if (decoded) {
        email = decoded.email;
        const user = await User.findOne({ email }).select(
          "username email gender phone"
        );
        const donations = await Donation.aggregate([
          { $match: { email: user?.email } },
          {
            $group: {
              _id: "$email",
              total: { $sum: "$amount" },
            },
          },
        ]);
        let membership = "Standard Member";
        if (donations[0]?.total >= 100000) membership = "Gold Member";
        else if (donations[0]?.total >= 50000) membership = "Silver Member";
        else if (donations[0]?.total >= 25000) membership = "Bronze Member";
        return res.status(200).send({
          ...user?._doc,
          membership,
        });
      }
    });
  } else {
    return res.send("No Token Found");
  }
});

app.put("/api/userProfile/:id", verify, async (req, res, next) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
});

app.get("/api/donationRecord", async (req, res) => {
  const data = await Donations.aggregate([
    {
      $match : { status : "Transferred" }},
    {
      $group: {
        _i9d: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
  res.send(data);
});

app.get("/api/janazaRecord", async (req, res) => {
  const data = await janaza.aggregate([
    {
      $match : { status : "Approved" }},
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);
  res.send(data);
});

app.get("/api/collarRecord", async (req, res) => {
  const data = await collar.aggregate([
    {
      $match : { status : "Approved" }},
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);
  res.send(data);
});

// Logout
app.get("/logout", function (req, res) {
  // remove the req.user property and clear the login session
  req.logout();

  // destroy session data
  req.session = null;

  // redirect to homepage
  res.redirect("/");
});

module.exports = app;
