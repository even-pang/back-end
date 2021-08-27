const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const app = express();
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const domains = ['112.152.59.38:3060','tattoocok.com', 'http://tattoocok.com', '203.245.29.158'];
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(cors({
        origin: function(origin, callback){
            const isTrue = domains.indexOf(origin) !== -1;
            callback(null, isTrue);
        },
        credentials: true,
    }));
  } else {
    app.use(morgan('dev'));
    app.use(cors({
      origin: true,
      credentials: true,
    }));
  }
dotenv.config();
const bofficeRouter = require('./routes/boffice/index');
const homeRouter = require('./routes/home/index');
const commonRouter = require('./routes/common/index');
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet({ contentSecurityPolicy: false }));
} else {
    app.use(morgan('dev'));
}
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.tattoocok.com'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/boffice', bofficeRouter);
app.use('/home', homeRouter);
app.use('/common', commonRouter);

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next('error');
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500).render('error');
});

app.listen(app.get('port'), () => {
    console.log('Server Start.');
});