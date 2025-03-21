const axios = require('axios')

const getuser = async (accessToken)=>{
    try{
      const response = await axios.get('https://dev-ss8hahvk572wlra3.us.auth0.com/userinfo',
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