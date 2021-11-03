const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    const quoteObject = {
        quote: quote
    };
    res.send(quoteObject);
  });
  
app.get('/api/quotes', (req, res, next) => {
    const query = req.query;
    console.log(query);
    const quotesObject = {
        quotes: []
    };
    
    if(Object.keys(query).length === 0){
        console.log('TA VACIO');
        quotesObject['quotes'] = quotes;
        res.send(quotesObject);
    } else {
        quotes.filter(element => {
            if(element['person'] === query['person']){
                quotesObject.quotes.push(element);
            }
        } );
        res.send(quotesObject);
    }

})