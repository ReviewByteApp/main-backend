const Customer = require ('../models/customerModel');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const config = require ('../config/index');
const Review = require('../models/reviewModel');
const JWT_SECRET = config.JWT_SECRET;
const expiresIn = config.expiresIn;

exports.Register = async (req, res) => {
  const {name, email, password, city, country} = req.body;
  try {
    const customerExist = await Customer.findOne ({email: email});
    if (customerExist)
      return res.status (401).json ({message: 'Customer Exist'});

    const hashPassword = await bcrypt.hash (password, 10);
    let newCustomer = new Customer ({
      name: name,
      email: email,
      city: city,
      country: country,
      password: hashPassword,
    });
    await newCustomer.save ();
    res.status (200).json ({message: 'Account Created'});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

exports.Login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const isCustomer = await Customer.findOne ({email: email});
    if (!isCustomer) return res.status (401).json ({message: 'Invalid Email'});

    const validPass = await bcrypt.compare (password, isCustomer.password);
    if (!validPass)
      return res.status (401).json ({message: 'Invalid Password'});

    const token = jwt.sign ({id: isCustomer._id}, JWT_SECRET, {
      expiresIn: expiresIn,
    });

    isCustomer.token = token;
    await isCustomer.save ();

    res.status (200).json ({token: token});
  } catch (error) {
    res.status (500).json ({error: error.message});
  }
};

exports.LogoutFun=async(req,res)=>{
  const id = req.user.id;
  try {
    await Customer.findByIdAndUpdate(id,{token:""});
    res.status (200).json ({message:'logout'});
  } catch (error) {
    res.status (500).json ({error: error.message});
  }
}

exports.Forget = async (req, res) => {
  const {email} = req.body;
  const password = '123456';
  try {
    const customerExist = await Customer.findOne ({email: email});
    if (!customerExist)
      return res.status (401).json ({message: 'Customer not found'});

    const hashPassword = await bcrypt.hash (password, 10);

    customerExist.password = hashPassword;
    await customerExist.save ();
    res.status (200).json ({message: 'Password Reset', password: password});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

exports.Profile = async (req, res) => {
  const id = req.user.id;
  try {
    const customerExist = await Customer.findById(id);
    res.status (200).json ({customerExist});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

exports.UpdateProfile = async (req, res) => {
  const id = req.user.id;
  const {name,username,phone,city}=req.body;
  console.log(name,username,phone,city)
  try {
    await Customer.findByIdAndUpdate(id,{
      name,city,phone,username
    });
    res.status (200).json ({message:'updated'});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

exports.UpdatePic = async (req, res) => {
  const id = req.user.id;
  let pic='business.png'
  if (req.file)pic=req.file.filename
  console.log(req.file)
  try {
    await Customer.findByIdAndUpdate(id,{
      pic
    });
    res.status (200).json ({message:'updated'});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

exports.Reviews = async (req, res) => {
  const id = req.query.id;
  try {
    const reviews = await Review.find({customerId:id})
    .populate('businessId', 'name')
    .sort({ createAt: -1 })
    res.status (200).json ({reviews});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};
