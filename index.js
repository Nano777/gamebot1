// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const ACCESS_TOKEN = 'V206n6VoibKzYZZScoHBuB3TDmAQZX79fWcn1PVJDgx3MLuWZAtPDt1Skpm3u9Zl82+rz9uhbN/pTKv1YrmMfgUuPiJgKOgobFGnYFHv2IlES13DZ+9ObCGaDZMbj73rFsNtwTlNR4nQZehAPF3RxgdB04t89/1O/w1cDnyilFU='
const CHANNEL_SECRET = 'a1847c4717368b47d2c0ad7b00d43747'
const DATABASE_URL = 'ec2-50-16-196-57.compute-1.amazonaws.com'


const line_config = {
    channelAccessToken:ACCESS_TOKEN,
    channelSecret:CHANNEL_SECRET
}

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/callback', line.middleware(line_config), (req, res, next) => {
    res.sendStatus(200);
	
	req.body.events.forEach((event) =>{
		var userid = event.source.userId;
		if(event.type == "message" && event.message.type == "text"){
			bot.replyMessage(event.replyToken,{
				type:"text",
				text:event.message.text
			});
		}else if(event.type == "follow"){
			repm("追加ありがとう。\n3人グループに私を呼んで[#スタート]と声を掛けてくれ")
		}
	})
});