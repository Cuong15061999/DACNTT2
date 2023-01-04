var express = require('express');
var router = express.Router();
var moment = require('moment');
var fs = require('fs');
const { Classifier } = require('ml-classify-text')

/* GET home page. */
router.get('/', function (req, res, next) {
  const classifier = new Classifier()
  let positive = [
    'This is great, so cool!',
    'Wow, I love it!',
    'It really is amazing',
  ]

  let negative = [
    'This is really bad',
    'I hate it with a passion',
    'Just terrible!',
  ]

  classifier.train(positive, 'positive')
  classifier.train(negative, 'negative')
  // let predictions = classifier.predict('It sure is pretty great!')

  // if (predictions.length) {
  //   predictions.forEach(prediction => {
  //     console.log(`${prediction.label} (${prediction.confidence})`)
  //   })
  // } else {
  //   console.log('No predictions returned')
  // }
  // --------save model-------------
  // let model = classifier.model.serialize()
  // const data = JSON.stringify(model)
  // fs.writeFile("model.json", data, function(err) {
  //   if (err) {
  //       console.log(err);
  //   }
  // });
  // ------------- read model -------------
  let read = fs.readFileSync('model.json');
  let data = JSON.parse(read);
  // console.log(data);
  const loadclassifier = new Classifier()
  loadclassifier.model = data
  //---------- predict -----------------
  let predictions2 = loadclassifier.predict('It sure is pretty great!')
  if (predictions2.length) {
    predictions2.forEach(prediction2 => {
      console.log(`after read model ${prediction2.label} (${prediction2.confidence})`)
    })
  } else {
    console.log('No predictions returned')
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;