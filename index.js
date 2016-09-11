var bignum  = require('bignum');
var express = require('express');
var morgan  = require('morgan');

const maxDigits = 50;
const port = process.argv[2] || process.env['PORT'] || 3000;

var app = express();

app.use(morgan('dev'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/is_prime/:n', (req, res) => {
    var n = req.params.n;
    // only up to fifty digits
    if (n.length <= maxDigits) {
        res.send(bignum(n).probPrime());
        res.end();
    } else {
        res.status(400);
        res.end();
    }
});

app.use(express.static('public'));

app.listen(port);
console.log('Listening on port %d', port);
