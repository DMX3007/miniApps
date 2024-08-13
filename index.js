const { Telegraf, Input, Markup } = require('telegraf'); // для отправки файлов по URL 
require("dotenv").config();
const cors = require('cors'); // Import cors
const express = require("express");
const { configDotenv, config } = require('dotenv')

const PORT = 3000;
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const app = express();
app.use(cors());
app.use(express.json());

const bot = new Telegraf(token)

let usersData = {};

// bot.start((ctx) => {
// 	const userId = ctx.from.id;
//   const firstName = ctx.from.first_name;
//   const lastName = ctx.from.last_name;
//   const username = ctx.from.username;

//   console.log(`User ID: ${userId}`);
//   console.log(`First Name: ${firstName}`);
//   console.log(`Last Name: ${lastName}`);
//   console.log(`Username: ${username}`);
	
//   usersData[userId] = { firstName, lastName, username };

// 	const getContactBtn = Markup.button.contactRequest('Запрос пользователя', 1)
//   ctx.reply(
//     'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
//     Markup.keyboard([
//       Markup.button.webApp('Покажи мне веб сайт', process.env.WEB_APP_URL),
//     ])
//   )
// })

bot.command("setmenu", ctx =>
	// sets Web App as the menu button for current chat
	ctx.setChatMenuButton({
		text: "Launch",
		type: "web_app",
		web_app: { url: process.env.WEB_APP_URL },
	}),
);

bot.launch()

app.use((req, res, next) => {
	console.log(req.method, req.url);
	return next();
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get('/user/:id', (req, res) => {
	console.log('/user/:id');
  const userId = req.params.id;
	console.log(usersData,'users data')
  // Поиск данных пользователя в объекте
  const userData = usersData[userId];

  if (userData) {
		console.log(userData, 'sended')
    res.json(userData);
  } else {
		console.log('User not found');
    res.status(404).json({ error: 'User not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});