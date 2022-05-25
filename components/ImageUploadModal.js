import React from 'react';
import useLoader from './useLoader';
import imageUpload from './imageUpload';
import UIImageUpload from './UIImageUpload';
import extract from '../api/Extract';
import {Alert} from 'react-native';

export default function ImageUploadModal({
  sendStateToParent,
  title,
  background,
  color,
  data,
}) {
  const [modalVisible, toggleModalVisible] = useLoader();
  const [loader, toggleLoader] = useLoader();
  const [imageURL, setImageURL] = React.useState('');
  const [uploadURL, setUploadImageURL] = React.useState('');
  const [imageType, setImageType] = React.useState('');

  function toggleModal() {
    setUploadImageURL('');
    setImageURL('');
    toggleModalVisible();
  }
  function saveFn() {
    toggleLoader();
    let imgData = new FormData();
    imgData.append('files', {
      // @ts-ignore
      // modelName:"Vehicle_Card_Front",
      policyNo: '1234',
      docCategory: '10001',
      docContent: imageURL,
      // file:uploadURL
      // uri: uploadURL,
      // type: `image/${imageType}`,
      // name: `upload.${imageType}`
    });
    const file = {
      uri: uploadURL,
      name: 'Vehical.jpeg',
      type: 'image/jpg',
    };
    let formdata = new FormData();
    formdata.append('files', file);
    formdata.append('endpoint','insurecue-proj')
    // formdata.append('modelName', data);
    // formdata.append('userName', 'tfai_trainer');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    var resultdata;
    if (data) {
      console.log(requestOptions,"requestOptions",data);
      console.log(
        'this is ocr api url https://ocr.techforce.ai/api/operator_roi/InsureCue_Extract_Data',
      );
      fetch(
        'https://ocr.techforce.ai/api/operator_roi/InsureCue_Extract_Data',
        requestOptions,
      )
        // fetch("https://insurecueapi.techforce.ai/insurecue/postInsureStaging", requestOptions)

        // .then(response => response.text())
        .then((res) => console.log(res, 'data'))
        .then(async (result) => {
          console.log(result, 'polo'), (resultdata = await JSON.parse(result));
          sendStateToParent(resultdata);
          toggleLoader();
          toggleModal();
        })
        .catch((error) => {
          Alert.alert('Alerts', error.toString());
          console.log('error', error);
          toggleLoader();
        });
    } else {
      fetch(
        `https://insurecuebotbot.techforce.ai/api/aws/upload`,
        {
          //  fetch(`https://insurecuebotbot.techforce.ai/api/aws/upload`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': '3PeZr8Hc1gFbVI2nUe9dT',
            'Partner-Id': 'DOWALI',
          },
          body: JSON.stringify({
            formdata,
          }),
        },
      )
        .then((url) => {
          console.log(url, 'fomrdata');
          if (typeof url.url === 'string') {
            alert('Image Uploaded!');
            sendStateToParent(url);
            toggleLoader();
            toggleModal();
            // toggleModal();
          } else {
            console.log({url});
            toggleLoader();
            alert('Failed to Upload, Will get back to you shortly');
          }
        })
        .catch((er) => {
          er.response, toggleLoader();
          alert('Failed to Upload');
          console.log(er, 'error');
        });
    }
    // imageUpload(formdata)
    //   .then(url => {
    //     console.log(url,'fomrdata')
    //     if (typeof url === "string") {
    //       alert("Image Uploaded!");
    //       sendStateToParent(url);
    //       toggleLoader();
    //       toggleModal();
    //     } else {
    //       console.log({ url });
    //       toggleLoader();
    //       alert("Failed to Upload, Will get back to you shortly");
    //     }
    //   })
    // .catch(imageUploadER => {
    //   console.log({ imageUploadER });
    //   toggleLoader();
    //   alert("Failed to Upload");
    // });
  }

  return (
    <>
      <UIImageUpload
        {...{
          title,
          background,
          color,
          toggleModal,
          modalVisible,
          loader,
          imageURL,
          setImageURL,
          setUploadImageURL,
          setImageType,
          saveFn,
        }}
      />
    </>
  );
}
