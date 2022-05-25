import axios from 'axios';
export default function extract(data){
    console.log(JSON.stringify({
          modelName:data.modelName,
          userName : data.userName
      }),'data')
    return  fetch(`http://3.215.203.86:8000/api/operator_roi/Extract_Data`, {
      method: 'POST',
      mode:'no-cors',
      body:data
    })
    .then(url => {url, console.log(url,'post')
       })
    .catch(er => {er.response,
    
      console.log(er,'error')})

//     return axios({
//   method: 'POST',
//   url: 'http://3.215.203.86:8000/api/operator_roi/Extract_Data',
//   headers:{
// 'Content-Type':'multipart/form-data'
//   },
//   data:data
// })
    
};