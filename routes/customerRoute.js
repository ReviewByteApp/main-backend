const express=require('express')
const router=express.Router()

const customer=require('../controller/customerController')
const Auth=require('../middleware/Auth')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Specify the directory where the uploaded files should be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  });
  
const upload = multer({ storage: storage });

/**
 * @api {post} /customer/register new cutsomer
 * @apiName Customer
 * @apiGroup register
 *
 * @apiError (500 Internal Server Error) error Error message.
 */
router.post('/register',customer.Register)
router.post('/login',customer.Login)
router.post('/logout',Auth.authenticateToken,customer.LogoutFun)
router.post('/forget',customer.Forget)
router.get('/profile',Auth.authenticateToken,customer.Profile)
router.post('/update',Auth.authenticateToken,customer.UpdateProfile)
router.post('/pic',Auth.authenticateToken,upload.single('pic'),customer.UpdatePic)
router.get('/reviews',customer.Reviews)

module.exports=router