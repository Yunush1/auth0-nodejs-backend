const axios = require('axios')
require('dotenv').config()
const getuser = async (accessToken)=>{
    try{
      const response = await axios.get(`${process.env.ISSUER_BASE_URL}/userinfo`,
        {
        headers:{
          authorization : `Bearer ${accessToken}`
        }
      })
      return response.data
    }catch(err){
      console.log(err)
    }
  }

  module.exports = {getuser}