const axios = require('axios');

// axios.post('http://localhost:3000/api/userLogin',{
//   username:"admin2",
//   password:"admin12"
// }).then(res=>{
//   console.log(res.data);
// })
axios.post('http://localhost:3000/api/updateHouse',{
  city:"bb"
}).then(res=>{
  console.log(res.data);
})
