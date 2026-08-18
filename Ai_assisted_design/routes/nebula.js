let express = require('express');
let router = express.Router();

/* GET nebula page. */
router.get('/', function(req, res, next) {
  res.render('nebula');
});

module.exports = router;
