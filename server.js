const express = require("express");
const https = require('https');
const app = express();
const multer = require('multer');

const fs = require('fs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const dotIndex = file.originalname.lastIndexOf('.');
        if (dotIndex != -1) {
            const name = file.originalname.substring(0, dotIndex);
            const ext = file.originalname.substring(dotIndex + 1);
            cb(null, `${name}_${Date.now()}.${ext}`);
        }
        else {
            cb(null, `${file.originalname}_${Date.now()}`);
        }
    }
});
const upload = multer({ storage });

const nodeMailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const logJson = require('./log.json');

const transporter = nodeMailer.createTransport({
	service: 'Gmail',
	auth: {
		user: logJson.email.login,
		pass: logJson.email.password
	}
});

app.post('/send-email', upload.single('img'), (req, res) => {
	const {email, phone, name, style, size} = req.body;
	const img = req.file;

	console.log(`Got post: ${email}, ${phone}, ${name}, ${style}, ${size}`);
	if (img) console.log('With image:', img);
	else console.log('No image');

	const mailOptions = {
		to: 'gooroochanel3@gmail.com',
		subject: `Новый покупатель`,
		html: `<h1>Почта:</h1> <h3>${email}<h3> <br> <h1>Телефон:</h1> <h3>${phone}</h3> <br> <h1>Имя:</h1> <h3>${name}</h3> <br> <h1>Стиль:</h1> <h3>${style}</h3> <br> <h1>Размер:</h1> <h3>${size}</h3> <br> <img src="cid:siskakota" width="300" alt="photo"/>`,
		attachments: [{
			path: `${__dirname}\\${img.path}`,
			cid: `siskakota`
		}]
	};

	transporter.sendMail(mailOptions, (error,info) => {
		if (error){
			return console.log(error);
		}
		console.log("Message sent");

		fs.unlinkSync(img.path);
	});

	res.sendStatus(200);
});

const server = app.listen(8080, () => {
	console.log(`Express running -> PORT ${server.address().port}`);
});

app.get('/', (req,res) => {
	res.render("holst",{
	});
});

app.get('/index', (req,res) => {
	res.render("index");
});