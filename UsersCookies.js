let DeepUsers = [
    'user_sees_ads=false; csrftoken=k3cK85zB5rVnjwBD0CjPXHbdKOO9ubZm; sessionid=5muzjoxpul9zn1ny130ryfqarfyv71cv; messages=W1siX19qc29uX21lc3NhZ2UiLDAsMjUsIlN1Y2Nlc3NmdWxseSBzaWduZWQgaW4gYXMgamFoZXlvdjU3NC4iLCIiXV0:1rd2vI:JBMfdDE_R6ubBFGVML1RQz5AQKxy_XwVNmE_-zeVRYY'
  
  ]
  
  let RND = {
    user: () => {
      let rand = Math.floor(Math.random() * DeepUsers.length)
      // 
      return DeepUsers[rand];
    },
    Ainames: (specific) => {
      let randomNames = ['cute-creature-generator', 'text2img', 'fantasy-world-generator', 'cyberpunk-generator', 'fantasy-portrait-generator']
      return specific ? randomNames[specific] : randomNames[Math.floor(Math.random() * randomNames.length)]
    }
  };
  
  module.exports = {
    RND
  }