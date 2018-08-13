var express = require('express');
var bodyParser = require('body-parser');
var client = require('twilio')(process.env.SID, process.env.AuthToken);
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.post('/send', function(req, res) {
    function generatePassword() {
        var password = "";
    	var combination = "0123456789";
    	for(var i = 0; i < 6; i++)
        	password += combination.charAt(Math.floor(Math.random() * combination.length));
    	return password;
    }
    var num = req.body.mobile;
    var otp = generatePassword();
    client.messages
        .create({
        to: num,
        from: '+13308929311',
        body: 'Your OTP is ' + otp 
    })
    .then(message => console.log(message.sid))
    .done();
    res.send('OTP sent successfully');
});

app.listen('3000' || process.env.PORT, function() {
    console.log('Server is running at port ' + process.env.PORT);
});