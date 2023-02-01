var express = require('express');
const GuestService = require('../service/GuestService');
var router = express.Router();

/* GET All user. */
router.get('/',async function(req, res, next) {
  try {
    const alluser = await GuestService.getAllUser();
    res.status(200).json({
      data: alluser,
      message: 'Get all user',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

router.get('/:id',async function(req, res, next) {
  try {
    const user = await GuestService.getUserById(req.params.id);
    if(user){
      res.status(200).json({
        data: user,
        message: 'Get user with id: '+ req.params.id,
      });
    }else{
      res.status(404).json({
        message: 'Can not find user with id'+ req.params.id,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

/* ADD user. */
router.post('/',async function(req, res, next) {
  try {
    const adduser = await GuestService.addUser(req);
    if(adduser){
      res.status(200).json({
        data: adduser,
        message: 'Add user',
      });
    }else{
      res.status(404).json({
        message: 'user already have',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

/* Edit user. */
router.put('/:id',async function(req, res, next) {
  try {
    const user = await GuestService.editUser(req);
    if(user){
      res.status(200).json({
        data: user,
        message: 'Edit user with id:'+ req.params.id,
      });
    }else{
      res.status(404).json({
        message: 'Can not find user with id:'+ req.params.id,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* Delete user. */
router.delete('/:id',async function(req, res, next) {
  try {
    const user = await GuestService.delUser(req.params.id);
    if(user){
      res.status(200).json({
        data: user,
        message: 'Delete user with id: '+ req.params.id,
      });
    }else{
      res.status(200).json({
        message: 'Can not find user with id: '+ req.params.id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })    
  }
});

module.exports = router;