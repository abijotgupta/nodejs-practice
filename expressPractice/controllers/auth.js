const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abijot17*******@gmail.com',
    pass: '**********',
  }
});
exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if(!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
      .then(doMatch => {
        if(doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        }
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg
    });
  }
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: 'abijot17*******@gmail.com',
        subject: 'SignUp Completed',
        html: '<h1>You have been successfully signed up!</h1>' 
      });
    })
    .catch(err => console.log(err)); 
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  let token;
  crypto.randomBytes(32, (err, buffer) => {
    if(err) {
      console.log(err);
      return res.redirect('/reset'); 
    }
    token = buffer.toString('hex');
  });
  const email = req.body.email;
  User.findOne({email: email})
    .then(user => {
      if(!user) {
        req.flash('error', 'No Account Fount for this E-mail ID.');
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save();
    })
    .then(reult => {
      res.redirect('/');
      transporter.sendMail({
        to: email,
        from: 'abijot170*******@gmail.com',
        subject: 'Reset Password',
        html: `
          <p>You requested for Password Reset.</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link<a> to change Password.</p>`
      });
    })
    .catch(err => console.log('Email error', err));
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token, 
    resetTokenExpiration: {$gt: Date.now()}
  })
  .then(user => {
    let message = req.flash('error');
    if(message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'New Password',
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken: token,
    })
  })
  .catch(err => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetuserPassword;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {$gt: Date.now()},
    _id: userId,
  })
  .then(user => {
    resetuserPassword = user;
    return bcrypt.hash(newPassword, 12);
  })
  .then((hashedPassword) => {
    resetuserPassword.password = hashedPassword;
    resetuserPassword.resetToken = undefined;
    resetuserPassword.resetTokenExpiration = undefined; 
    return resetuserPassword.save();
  })
  .then((result) => {
    console.log(result);
    res.redirect('/login');
  })
  .catch(err => console.log(err));
};