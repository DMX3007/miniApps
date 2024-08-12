const { Telegraf, Input, Markup } = require('telegraf'); // для отправки файлов по URL 
require("dotenv").config();
const cors = require('cors'); // Import cors
const express = require("express");

const PORT = 3000;
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
console.log(webAppUrl)

const app = express();
app.use(cors());
app.use(express.json());
const bot = new Telegraf(token)
bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.start((ctx) => {
	console.log('called start')
  ctx.reply(
    'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
    Markup.keyboard([
      Markup.button.webApp('Покажи мне веб сайт', 'https://masdfasdfasdfyvueapp.loca.lt'),
    ])
  )
})

bot.launch()

// app.post(webhookPath, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });

app.use((req, res, next) => {
	console.log(req.method, req.url);
	return next();
});

app.get("/", (req, res) => {
  res.send("Express is running on port 3000");
	console.log(bot)
});

// bot.on("message", async (msg) => {
// 	console.log('message recieved')
//   const chatId = msg.chat.id;
//   const text = msg.text;
// 	try {
// 		await bot.sendMessage(chatId, "💱 Кнопка под текстом (inline) 💵", {
// 			reply_markup: {
// 				inline_keyboard: [
// 					[{ text: "Open web app", web_app: { url: webAppUrl } }],
// 				],
// 			},
// 		});
// 	} catch (err) {
// 		console.log(err)
// 	}
// });

app.post('/request-contact', async (req, res) => {
	console.log('request-contact-data', req.body);
	const { chatId, messageText, buttonText } = req.body 
	const msgText = messageText ? messageText : 'Отправьте пожалуйста свои контакты 📱' 
	const getContactBtn = Markup.button.contactRequest(buttonText ? buttonText : 'Отпрвить контакт')
	const getContactK = Markup.keyboard([getContactBtn]).resize().oneTime(true)

	try {
		const result = await bot.telegram.sendMessage(chatId,  msgText, getContactK)
		res.json({ status: 'success', result })
	} catch (error) {
		res.status(500).json({ status: 'error', reason: error.message, error })
		console.log('error ', error);
	}
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});