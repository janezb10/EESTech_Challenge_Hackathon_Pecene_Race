require('dotenv').config();
const express = require('express');
const app = express();
const { Configuration, OpenAIApi } = require('openai');

app.use(express.static('public'));
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.post('/api/text', async (req, res) => {
    console.log(req.body);

    const importantSentences =  await sendRequest('Choose important sentences"' + req.body.txt + '"', req.body.crazy);
    const arrImportantSentences = importantSentences.split(/\r?\n/)
        .filter(w => w !== '')
        .map(e => {
            return {sentence: e}
        });

    for(i=0;i<arrImportantSentences.length;i++){
        arrImportantSentences[i].question = await sendRequest('"' + arrImportantSentences[i].sentence +'" is an answer to the question' , req.body.crazy);
        arrImportantSentences[i].question = arrImportantSentences[i].question.replace(/(\r\n|\n|\r)/gm, "");
        arrImportantSentences[i].question = arrImportantSentences[i].question.replace('"', "");
        arrImportantSentences[i].question = vprasaj(arrImportantSentences[i].question);
        arrImportantSentences[i].keywords = await sendRequest( 'List five keywords in "' + arrImportantSentences[i].sentence +'"', req.body.crazy);
        arrImportantSentences[i].keywords = arrImportantSentences[i].keywords.replace(/(\r\n|\n|\r)/gm, "");
        arrImportantSentences[i].associatedWords = await sendRequest( 'tell me 5 new words associating to "' + arrImportantSentences[i].keywords + '"' , req.body.crazy);
        arrImportantSentences[i].associatedWords = arrImportantSentences[i].associatedWords.replace(/(\r\n|\n|\r)/gm, " ");
    }
    console.log(arrImportantSentences);

    res.send(JSON.stringify(arrImportantSentences));
})



const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening on port: ${port}...`);
})

async function sendRequest(input = "tell me a joke", crazy = 0) {
    const response = await openai.createCompletion("text-davinci-002", {
        prompt: input,
        temperature: crazy,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const responseText = response.data.choices[0].text;
    console.log(crazy);
    console.log(responseText);
    return responseText;
}
/* sendRequest('tell me something');
 */

function vprasaj(str) {
    let index = str.indexOf('?');
    if (!index || index < 9) return str;
  return str.substring(0, ++index);
}