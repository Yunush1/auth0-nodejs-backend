const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();
const {getuser} = require('./service/user-data')
const cors = require("cors");
const { errorHandler } = require("./middleware/error-handling"); 
const { sendEmail } = require("./service/email.service");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json()); 
/**
 * Auth0 JWT Middleware
 */
const jwtCheck = auth({
  audience: "auth integration api",
  issuerBaseURL: "https://dev-ss8hahvk572wlra3.us.auth0.com",
  tokenSigningAlg: "RS256", // Keep RS256 since Auth0 defaults to this
});

// Apply JWT authentication to all routes
app.use(jwtCheck);

/**
 * Protected Route (Requires valid token)
 * */ 
app.get("/authorized", async (req, res) => {
  try{
    const accessToken = req.headers.authorization.split(' ')[1]
    
    const user = await getuser(accessToken)
    if (!user || !user.email) {
      return res.status(401).json({ error: "Invalid token" });
  }
    await sendEmail(userinfo.email,"Hello world", "<h1>This is the test message</h1>",true)
  res.status(200).json({ message: "You are authorized!" ,user});
  }catch(err){
    res.status(500).json({message:'Internal server error'})
  }
});

/**
 * Protected Endpoint: Receives the token, validates it, and sends an email.
 */
app.post("/auth/callback", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
        // Validate Token with Auth0
      const user =  await getuser(accessToken);
      if (!user || !user.email) {
          return res.status(401).json({ error: "Invalid token" });
      }

      // Send Authentication Email
      await sendEmail(user,"Autheticated user", accessToken,true);

      res.status(200).json({ message: "Token validated and email sent successfully" });
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: "Internal Server Error" });
  }
});


/**
 *  Global Error Handler (Should be the last middleware)
 */ 
app.use(errorHandler);

/**
 * Start server on 5000
 */
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
