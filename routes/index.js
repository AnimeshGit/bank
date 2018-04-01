var express = require('express');
var router = express.Router();
var Cards = require('../models/cards');
var Atms = require('../models/atms');
var Trans = require('../models/trans');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addCards', function(req, res, next) {
  var newCardData = new Cards({
    card_number : req.body.card_number,
    pin : req.body.pin,
    balance :  req.body.balance
  })
  newCardData.save(function(err,data){
    if (err) {
      res.send({
          success: false,
          msg: 'This Card Num or Pin Num Already exist.'
      });
    } else {
      res.json({
          success: true,
          msg: 'Successful saved data.',
          data: data
      });
      return;
    }
  })
});

router.post('/getCards', function(req, res, next) {
  Cards.findOne({
    $and : [ 
      { card_number : req.body.card_number }, 
      { pin : req.body.pin } 
    ]
  }).then(function(data){
    if (data!=null) {
      res.json({
        success: true,
        msg: 'Wel Come To Screen Two',
        data: data
      });
      return;
    } else {
      res.send({
        success: false,
        msg: 'Invalid Card Number OR Pin Number'
      });
      return
    }
  })
});

router.post('/addAtms', function(req, res, next) {
  var newAtmData = new Atms({
    currency_denomination : req.body.currency_denomination,
    count : req.body.count
  })
  newAtmData.save(function(err,data){
    if (err) {
      res.send({
          success: false,
          msg: 'This Currency Already exist.'
      });
    } else {
      res.json({
          success: true,
          msg: 'Successful saved Atm Data.',
          data: data
      });
      return;
    }
  })
});

router.get('/getAtms', function(req, res, next) {
  Atms.find().then(function(data){
    res.json({
        success: true,
        msg: 'Successful saved data.',
        data: data
    });
    return;
  }).catch(function(error){
    res.send({
      success: false,
      msg: 'Unable to get data'
    });
  })
});

router.post('/withdrawAmount', function(req,res,next){
  console.log("amont",req.body.amount)
  if(req.body.amount!=undefined && req.body.amount!=null && req.body.amount!=""){

    Cards.findOne({
      _id : req.body.cardId 
    }).then(function(data){
      if (data!=null) {
        if (data.balance<req.body.amount) {
          res.send({
            success: false,
            msg: 'unsufficiant Balance'
          });
          return
        } else {
          if (req.body.amount % 100 == 0) {
            NewBalance = data.balance - req.body.amount;
            Cards.findOneAndUpdate({
              _id : req.body.cardId 
            }, {
                $set: {
                    'balance': NewBalance
                }
            }, {
                'new': true
            }, function(err, updatedBalance) {
              if(err){
                res.json({
                  success: true,
                  msg: 'Transaction Cansel',
                });
                return;              
              }else{
                var newTransData = new Trans({
                  trans_amount : req.body.amount,
                  card_number : data.card_number
                })
                newTransData.save(function(err,data){
                  if (err) {
                    res.send({
                        success: false,
                        msg: 'This Currency Already exist.'
                    });
                  } else {
                      res.json({
                        success: true,
                        msg: 'Transaction Successful',
                        data1: updatedBalance,
                        data2: req.body.amount
                      });
                      return;
                  }
                })
              }
            });
          } else {
            res.send({
              success: false,
              msg: 'Please enter the amount of multiple of 100'
            });
            return              
          }
        }
      } else {
        res.send({
          success: false,
          msg: 'Invalid Input'
        });
        return
      }
    }).catch(function(error){
      res.send({
        success: false,
        msg: 'Invalid UserId'
      });
      return
    })

  }else{
    res.send({
      success: false,
      msg: 'Please anter amount'
    });
    return
  }
})

router.get('/getAvailBalance/:id',function(req,res,next){
  Cards.findOne({_id:req.params.id}).then(function(data){
    res.json({
      success: true,
      msg: 'Available Balance',
      data: data
    });
    return;
  })
})

module.exports = router;
