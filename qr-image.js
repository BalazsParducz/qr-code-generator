const fs = require("fs");
const qr = require('qr-image');
const express = require('express');

const app = express();
const port = '5555';


require('dotenv').config();
const qr_url = process.env.URL;

const fileType = 'png';

app.use('/', function(req, res) {
    console.log('You created a QR code pointing to:\n', qr_url);
    const qr_image = qr.image(qr_url, { type: fileType });
    const qr_code_file_name = 'myQR.' + fileType;
    res.type(fileType);
    qr_image.pipe(res);


    const qrImageAsFile = qr.imageSync(qr_url, { type: fileType });     // it let's writing to a file only with imageSync
    fs.writeFile('./public/' + qr_code_file_name, qrImageAsFile, 'binary', (err) => {
        if(err){
            console.log(err);
        }
        console.log('A qr image file has been written to the public folder of this project');
    })
});

app.listen(port, () => console.log(`Server started at port ${port}`));
