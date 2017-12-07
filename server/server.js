var express    = require("express");
var routes = require('./routes/routes');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'carpool App' });
});
router.post('/register',routes.register);
router.post('/login',routes.login);
router.get('/drivers',routes.drivers);
app.use('/api', router);
app.listen(4000,()=>{
    console.log("server listening on port 4000");
});