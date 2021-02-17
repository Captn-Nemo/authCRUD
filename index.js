const config = require("config-yml"),
  mongoose = require("mongoose"),
  express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  app = express();
//Configuring the cross browser access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());
app.use(bodyParser.json());
// Configuring the database
mongoose.Promise = global.Promise;
const MongooseOptions = {
  poolsize: 100,
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      keepAlive: true,
    },
    reconnectTries: 30,
  },
  replset: {
    socketOptions: {
      socketTimeoutMS: 0,
      keepAlive: true,  
    },
    reconnectTries: 30,
  },
  //useMongoClient: true
  useNewUrlParser: true,
};
// DataBase connection using mongoose
mongoose
  .connect(config.mongo.connection, MongooseOptions)
  .then(() => {
    console.log("Database connection complete");
    // db connection success means, Create a Server with running at port 'config.port'
    var server = app.listen(config.port, function () {
      console.log("App listening at  port ", config.port);
    });
  })
  .catch((err) => { 
    console.log(err);
  });
require("./routes/index.js")(app);

module.exports = app;// for test cases
