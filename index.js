var express = require('express');
var morgan  = require('morgan');
var isPrime = require('./isPrime');

const port = process.argv[2] || process.env['PORT'] || 3000;

var app = express();

app.use(morgan('common'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/is_prime/:n', (req, res) => {
    var n = +req.params.n;
    if (0 <= n && n <= Number.MAX_SAFE_INTEGER) {
        res.send(isPrime(n));
    } else if (Number.isNaN(n)) {
        res.status(400).json({error: 'not a number', n: req.params.n});
    } else {
        res.status(400).json({error: 'out of range', n: req.params.n});
    }
});

app.use(express.static('public'));

app.listen(port);
console.log('Listening on port %d', port);
