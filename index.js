const express = require('express');
const cors = require('cors'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 1337;  
var fs = require('fs-extra');
const filesystem = require('fs');
const req = require('express/lib/request');


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



app.post('/napi/uploadfile', function (request, response) {
   console.log(request.headers);
   if (request.headers['x-file-name']) {
        
    // Temporary location of our uploaded file
    // Nginx uses a private file path in /tmp on Centos
    // we need to get the name of that path
    // var temp_dir = fs.readdirSync('/tmp');
    // var nginx_temp_dir = [];
    // for (var i = 0; i < temp_dir.length; i++) {
        
    //     if (temp_dir[i].match('nginx.service')) {
    //         nginx_temp_dir.push(temp_dir[i]);
    //     }
    //}
    

    const dir = './uploads';

    if(!filesystem.existsSync(dir)) {
        filesystem.mkdirSync(dir, { recursive: true });
    } else {
        console.log("Directory already exit");
    }
    
    const localfilepath = process.cwd()+'/uploads';
    console.log(localfilepath);

    const filename = request.headers['x-file-name']
    console.log(filename);
    var lastIndex = filename.lastIndexOf('/');
    console.log(lastIndex);
    const name = filename.substr(lastIndex,filename.length);

    fs.move( filename , localfilepath+name, {}, function (err) {
        
        if (err) {
            console.log(err);
            response.status(500).send(err);
            return;
        }


        fs.readFile(localfilepath+name, function(error, data) {
            if(error) {
                res.send('Internal Server Error', 500);
                return;
            }

            console.log(data);

           
           
        });



        
        // Send back a sucessful response with the file name
        response.status(200).send(localfilepath);
        response.end();
                
            
    });
}
  
  })


  app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})