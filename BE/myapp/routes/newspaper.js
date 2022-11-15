var express = require('express');
const newsPaperSevice = require('../service/newspaperService');
var router = express.Router();

/* GET All NewsPaper. */
router.get('/',async function(req, res, next) {
  try {
    const allNewsPaper = await newsPaperSevice.getAllNewsPaper();
    res.status(200).json({
      data: allNewsPaper,
      message: 'Get all newspaper',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

/* GET Specific NewsPaper. */
router.get('/:id',async function(req, res, next) {
  try {
    const newsPaper = await newsPaperSevice.getNewsPaper(req.params.id);
    if(newsPaper){
      res.status(200).json({
        data: newsPaper,
        message: 'Get newspaper with id: '+ req.params.id,
      });
    }else{
      res.status(404).json({
        message: 'Can not find newspaper with id'+ req.params.id,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

/* ADD NewsPaper. */
router.post('/',async function(req, res, next) {
  try {
    const addNewsPaper = await newsPaperSevice.addNewsPaper(req);
    if(addNewsPaper){
      res.status(200).json({
        data: addNewsPaper,
        message: 'Add newspaper',
      });
    }else{
      res.status(404).json({
        message: 'Newspaper already have',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

/* Edit Newspaper. */
router.put('/:id',async function(req, res, next) {
  try {
    const updateNewsPaper = await newsPaperSevice.editNewsPaper(req);
    if(updateNewsPaper){
      res.status(200).json({
        data: updateNewsPaper,
        message: 'Edit newspaper with id:'+ req.params.id,
      });
    }else{
      res.status(404).json({
        message: 'Can not find newspaper with id:'+ req.params.id,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Delete Newspaper. */
router.delete('/:id',async function(req, res, next) {
  try {
    const delNewsPaper = await newsPaperSevice.delNewsPaper(req.params.id);
    if(delNewsPaper){
      res.status(200).json({
        data: delNewsPaper,
        message: 'Del newspaper with id: '+ req.params.id,
      });
    }else{
      res.status(200).json({
        message: 'Can not find newspaper with id: '+ req.params.id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })    
  }
});

module.exports = router;