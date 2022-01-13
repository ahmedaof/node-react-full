const { body, validationResult } = require('express-validator');
exports.userSignupValidator = (req,res,next) => {
 body('email').isEmail(),
body('name','name is required').notEmpty(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  }
 return next();
}
