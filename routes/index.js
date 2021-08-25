const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  console.log('Hey!!!');
  //res.send('Hey!');
  //res.send('It works!');
  //res.json(wes);
  res.send(req.query.name);
});

module.exports = router;
