const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
const port = 8080;

    const botUserAgents = [
        'bot', 'crawler', 'spider', 'crawling', 'curl', 'wget', 'python-requests',
        'uptimerobot', 'pingdom', 'statuscake', 'newrelic', 'healthchecks', 'Better Uptime Bot'
    ];

    const isBot = botUserAgents.some(botAgent => userAgent.toLowerCase().includes(botAgent.toLowerCase()));

    if (isBot) {
        return;
    }

const animeQuotes = [
    { quote: "The only ones who should kill are those prepared to be killed.", character: "Lelouch Lamperouge", anime: "Code Geass" },
    { quote: "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... is the Pirate King!", character: "Monkey D. Luffy", anime: "One Piece" },
    { quote: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.", character: "Kenshin Himura", anime: "Rurouni Kenshin" },
    { quote: "People's lives don't end when they die, it ends when they lose faith.", character: "Itachi Uchiha", anime: "Naruto" },
    { quote: "I don't want to swim. I don't want to be free. I just want to stay here and decay.", character: "Rei Ayanami", anime: "Neon Genesis Evangelion" },
    { quote: "You should enjoy the little detours. To the fullest. Because that's where you'll find the things more important than what you want.", character: "Ging Freecss", anime: "Hunter x Hunter" },
    { quote: "No matter how deep the night, it always turns to day, eventually.", character: "Brook", anime: "One Piece" },
    { quote: "If you wanna make people dream, you've gotta start by believing in that dream yourself!", character: "Simon", anime: "Gurren Lagann" },
    { quote: "The world's not perfect, but it's there for us trying the best it can. That's what makes it so damn beautiful.", character: "Roy Mustang", anime: "Fullmetal Alchemist: Brotherhood" },
    { quote: "I'm not stupid. I'm just too lazy to show how smart I am.", character: "Oreki Houtarou", anime: "Hyouka" },
    { quote: "I don't want to run away anymore. I don't want to lie to myself anymore.", character: "Shinji Ikari", anime: "Neon Genesis Evangelion" },
    { quote: "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.", character: "Gildarts Clive", anime: "Fairy Tail" },
    { quote: "The past makes you want to die out of regret, and the future makes you depressed out of anxiety. So by elimination, the present is likely the happiest time.", character: "Takasaki Misaki", anime: "Welcome to NHK" },
    { quote: "A lesson without pain is meaningless. For you cannot gain something without sacrificing something else in return. But once you have overcome it and made it your own, you will gain an irreplaceable fullmetal heart.", character: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood" },
    { quote: "I want you to be happy. I want you to laugh a lot. I don’t know what exactly I’ll be able to do for you, but I’ll always be by your side.", character: "Kagome Higurashi", anime: "Inuyasha" },
    { quote: "It’s not the face that makes someone a monster; it’s the choices they make with their lives.", character: "Naruto Uzumaki", anime: "Naruto" },
    { quote: "In our society, letting others find out that you're a nice person is a very risky move. It's extremely likely that someone would take advantage of that.", character: "Hitagi Senjougahara", anime: "Bakemonogatari" },
    { quote: "Power comes in response to a need, not a desire. You have to create that need.", character: "Goku", anime: "Dragon Ball Z" },
    { quote: "We are all like fireworks: we climb, we shine and always go our separate ways and become further apart. But even if that time comes, let’s not disappear like a firework, and continue to shine forever.", character: "Hitsugaya Toshiro", anime: "Bleach" },
    { quote: "If you don’t take risks, you can’t create a future.", character: "Monkey D. Luffy", anime: "One Piece" },
    { quote: "Sometimes, we have to look beyond what we want and do what's best.", character: "Kakashi Hatake", anime: "Naruto" },
    { quote: "The world is cruel, but also very beautiful.", character: "Mikasa Ackerman", anime: "Attack on Titan" },
    { quote: "To know sorrow is not terrifying. What is terrifying is to know you can't go back to happiness you could have.", character: "Matsumoto Rangiku", anime: "Bleach" },
    { quote: "A person grows up when he's able to overcome hardships. Protection is important, but there are some things that a person must learn on his own.", character: "Jiraiya", anime: "Naruto" },
    { quote: "You can't sit around envying other people's worlds. You have to go out and change your own.", character: "Shinichi Kudo", anime: "Detective Conan" },
    { quote: "The only thing we're allowed to do is to believe that we won't regret the choice we made.", character: "Levi Ackerman", anime: "Attack on Titan" },
    { quote: "The moment you think of giving up, think of the reason why you held on so long.", character: "Natsu Dragneel", anime: "Fairy Tail" },
    { quote: "Forgetting is like a wound. The wound may heal, but it has already left a scar.", character: "Monkey D. Luffy", anime: "One Piece" }
];

const knockKnockJokes = [
    { setup: "Knock knock.", punchline: "Who's there?", response: "Boo", reply: "Boo who?", final: "Don't cry, it's just a joke!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Lettuce", reply: "Lettuce who?", final: "Lettuce in, it's cold out here!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Cow says", reply: "Cow says who?", final: "No, a cow says moooo!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Orange", reply: "Orange who?", final: "Orange you glad I didn't say banana?" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Harry", reply: "Harry who?", final: "Harry up and answer the door!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Interrupting cow", reply: "Interrupting cow wh-", final: "MOOOO!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Tank", reply: "Tank who?", final: "You're welcome!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Atch", reply: "Atch who?", final: "Bless you!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Nobel", reply: "Nobel who?", final: "No bell, that's why I knocked!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Olive", reply: "Olive who?", final: "Olive you and I miss you!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Police", reply: "Police who?", final: "Police let me in, it's cold out here!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Robin", reply: "Robin who?", final: "Robin you, now hand over the cash!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Control Freak", reply: "Control Freak who?", final: "Okay, now you say, 'Control Freak who?'" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Snow", reply: "Snow who?", final: "Snow use, the joke's over!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Ice Cream", reply: "Ice Cream who?", final: "Ice cream if you don't let me in!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Figs", reply: "Figs who?", final: "Figs the doorbell, it's broken!" },
    { setup: "Knock knock.", punchline: "Who's there?", response: "Broken pencil", reply: "Broken pencil who?", final: "Never mind, it's pointless!" }
];

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public.', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public.')));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.get('/anime/quote', (req, res) => {
    const randomQuote = animeQuotes[Math.floor(Math.random() * animeQuotes.length)];
    res.json(randomQuote);
});

app.get('/kkj', (req, res) => {
    const randomJoke = knockKnockJokes[Math.floor(Math.random() * knockKnockJokes.length)];
    res.json(randomJoke);
});

app.get('/', (req, res) => {
    const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our First ever API!</title>
            <style>
                body {
                    font-family: 'Courier New', Monaco, monospace;
                    line-height: 1.6;
                    margin: 20px;
                    padding: 20px;
                    background-color: #f0f0f0;
                }

                h1 {
                    color: #333;
                }

                ul {
                    list-style-type: none;
                    padding: 0;
                }

                li {
                    margin-bottom: 20px;
                }
                

                .response-box {
                    background-color: #fff;
                    padding: 15px;
                    border: 1px solid #ccc;
                    color: #333;
                    border-radius: 5px;
                    margin-top: 10px;
                }

                .response-header {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333;
                }

                .response-content {
                    background-color: #333;
                    padding: 10px;
                    border-radius: 5px;
                    overflow-x: auto;
                    white-space: pre-wrap;
                    font-size: 14px;
                    color: white;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Our API!</h1>
                <p>Explore the following endpoints:</p>
                <ul>
                    <li>
                        <strong>/anime/quote</strong>: Returns a random anime quote.
                        <p>Example Usage: GET /anime/quote</p>
                        <div class="response-box">
                            <p class="response-header">Response:</p>
                            <div class="response-content">
                                <pre>{
    "quote": "If you don’t take risks, you can’t create a future.",
    "character": "Monkey D. Luffy",
    "anime": "One Piece"
}</pre>
                            </div>
                        </div>
                    </li>
                    <li>
                        <strong>/kkj</strong>: Returns a random knock-knock joke.
                        <p>Example Usage: GET /kkj</p>
                        <div class="response-box">
                            <p class="response-header">Response:</p>
                            <div class="response-content">
                                <pre>{
    "setup": "Knock knock.",
    "punchline": "Who's there?",
    "response": "Boo",
    "reply": "Boo who?",
    "final": "Don't cry, it's just a joke!"
}</pre>
                            </div>
                        </div>
                    </li>
                </ul>
                <p>Enjoy using the API!</p>
            </div>
        </body>
        </html>
    `;
    res.send(message);
});

app.listen(port, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
