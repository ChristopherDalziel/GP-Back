let jwt = require( 'jsonwebtoken' );
const token_secret = process.env.TOKEN_SECRET;
const User = require('../models/user');


const checkToken = (req, res, next) =>
{
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] ||
              req.headers['authorization'] || "";
              
  // An empty string allows the token to be treated as a string but will return false
  if( token.startsWith( 'Bearer ' ) )
  {
    // Remove Bearer from string
    token = token.slice( 7, token.length );
  }

  if( token )
  {
    // Pass in the token and the secret key into verify()
    jwt.verify( token, token_secret, (err, decoded) =>
    {
      if( err )
      {
        console.log('line 28' + err.message)
        return res.json(
        {
          success: false,
          message: 'You are not authorized to view this page'
        } );
      }
      else
      {
        req.decoded = decoded;
        next();

      }
    } );
  }
  else
  {
    return res.json(
    {
      success: false,
      message: 'Please log in'
    } );

  }
};

//checking the password token sent in the email for password reset
const checkPasswordToken = async (req, res) => {
  try {
    const {token} = req.headers;
    const user = await User.findOne({
      passwordToken: token
    })
    if (!user) {
      res.status(403).send('Unable to find user')
    } else {
      res.status(200).end();
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports =
{
  checkToken, checkPasswordToken
}