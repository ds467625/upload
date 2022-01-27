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
   console.log(req.headers);
   if (request.headers['x-file-name']) {
        
    // Temporary location of our uploaded file
    // Nginx uses a private file path in /tmp on Centos
    // we need to get the name of that path
    var temp_dir = fs.readdirSync('/tmp');
    var nginx_temp_dir = [];
    for (var i = 0; i < temp_dir.length; i++) {
        
        if (temp_dir[i].match('nginx.service')) {
            nginx_temp_dir.push(temp_dir[i]);
        }
    }
    
    var temp_path = '/tmp/' + nginx_temp_dir[0] + request.headers['x-file-name'];
    
    fs.move(temp_path , response.locals.localfilepath, {}, function (err) {
        
        if (err) {
            response.status(500).send(err);
            return;
        }
        
        // Send back a sucessful response with the file name
        response.status(200).send(response.locals.localfilepath);
        response.end();
                
            
    });
}
  
  })


  app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})