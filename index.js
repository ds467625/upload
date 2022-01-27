const express = require('express');
const cors = require('cors'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 1337;  


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Method",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type",
      "Authorization"
  );
  next();
});

app.use(express.json({ limit: '20MB' }));
app.use(express.urlencoded({ extended: true}));
app.use(cors());


app.post('/napi/uploadfile', function (req, res) {
   res.send(req.headers);
  })


  app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})