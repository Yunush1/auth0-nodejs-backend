const express = require("express");
require("dotenv").config();
const {getuser} = require('./service/user-data')
const cors = require("cors");
const {jwtCheck,checkRole} = require('./middleware/check-role')
const { errorHandler } = require("./middleware/error-handling"); 
const { sendEmail } = require("./service/email.service");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json()); 

// Apply JWT authentication to all routes
app.use(jwtCheck);

app.get("/",(req,res)=>{
  res.status(200).json({
    message:"Server is running "
  })
})

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
app.post("/auth/admin",checkRole('admin'), async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
        // Validate Token with Auth0
      const user =  await getuser(accessToken);
      if (!user || !user.email) {
          return res.status(401).json({ error: "Invalid token" });
      }
      // Send Authentication Email
      await sendEmail(user,`Authentication`, accessToken,true);

      res.status(200).json({ message: "Token validated and email sent successfully on admin", permission:req?.auth?.payload?.permissions});
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/auth/user",checkRole('user'), async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
        // Validate Token with Auth0
      const user =  await getuser(accessToken);
      if (!user || !user.email) {
          return res.status(401).json({ error: "Invalid token" });
      }
      // Send Authentication Email
      // await sendEmail(user,`Authentication`, accessToken,true);
      
      res.status(200).json({ message: "Token validated and email sent successfully on user", permission:req?.auth?.payload?.permissions });
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
