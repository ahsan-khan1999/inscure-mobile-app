// import { nodeInstance } from "../../../../api";

export default function imageUpload(files) {
    console.log(files,'FIles')
  return  fetch(`https://insurance.awnic.com/InsureApiUAT/API/motor/motorUploadDocument`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key':'3PeZr8Hc1gFbVI2nUe9dT',
        'Partner-Id':'DOWALI'
      },
      body: JSON.stringify({
          files
      }),
    })
      
    .then(url => {url,console.log(url,'inside ')})
    .catch(er => {er.response,console.log(er,'error')})

}
