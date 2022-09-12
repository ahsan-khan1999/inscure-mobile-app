import React from 'react';
import useLoader from './useLoader';
import imageUpload from './imageUpload';
import UIImageUpload from './UIImageUpload';
import extract from '../api/Extract';
import {Alert} from 'react-native';
import axios from 'axios';

export default function ImageUploadModal({
  sendStateToParent,
  title,
  background,
  color,
  data,
}) {
  const [modalVisible, toggleModalVisible] = useLoader();
  console.log(data, 'data');
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
    // alert('at func');
    toggleLoader();
    // let imgData = new FormData();
    // imgData.append('files', {
    // @ts-ignore
    // modelName:"Vehicle_Card_Front",
    // policyNo: '1234',
    // docCategory: '10001',
    // docContent: imageURL,
    // file:uploadURL
    // uri: uploadURL,
    // type: `image/${imageType}`,
    // name: `upload.${imageType}`
    // });
    if (data) {
      console.log('Hello this got exectuyed', imageURL);
      let formdata = new FormData();
      formdata.append('files', imageURL);
      formdata.append('endpoint', 'insurecue-proj');
      try {
        axios
          .post(
            'https://insurecuebotbot.techforce.ai/api/aws/upload',
            formdata,
            {
              headers: {
                'encoding-type': 'multipart/form-data',
              },
            },
          )
          .then((response) => {
            // console.log('This is responce', response);
            console.log(response, 'response data');

            if (response) {
              setUploadImageURL(response?.data?.Location);
              axios
                .post(
                  'https://insurecueocr.techforce.ai/api/operator_roi/InsureCue_Extract_Data',
                  {
                    file: response?.data?.Location,
                    modelName: data,
                    userName: 'tfai_trainer',
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )
                .then((response) => {
                  sendStateToParent(response?.data);
                  toggleLoader();
                  toggleModal();
                })
                .catch((error) => {
                  Alert.alert('Alert', error.toString());
                  console.log('error', error);
                  toggleLoader();
                });
            }
          });
      } catch (e) {
        console.log('This is errorrrrr', e);
      }

      // console.log(
      //   'this is ocr api url https://insurecueocr.techforce.ai/api/operator_roi/InsureCue_Extract_Data',
      // );
      // fetch(
      //   'https://insurecueocr.techforce.ai/api/operator_roi/InsureCue_Extract_Data',
      //   requestOptions,
      // )
      //   .then((response) => {
      //     response.json().then((res) => {
      //       console.log('This is hello response',res);
      //       sendStateToParent(res);
      //       toggleLoader();
      //       toggleModal();
      //     });
      //   })
      //   .catch((error) => {
      //     Alert.alert('Alert', error.toString());
      //     console.log('error', error);
      //     toggleLoader();
      //   });
    } else {
      let formdata = new FormData();
      formdata.append('files', imageURL);
      formdata.append('endpoint', 'insurecue-proj');
      try {
        axios
          .post(
            'https://insurecuebotbot.techforce.ai/api/aws/upload',
            formdata,
            {
              headers: {
                'encoding-type': 'multipart/form-data',
              },
            },
          )
          .then((response) => {
            sendStateToParent(response?.data);

            // console.log('This is responce', response);
            console.log(response, 'response data');
            toggleLoader();
            toggleModal();
          });
      } catch (e) {
        console.log('This is errorrrrr', e);
        toggleLoader();
        toggleModal();
      }
    }

    // else {
    //   fetch(
    //     `https://insurance.awnic.com/InsureApiUAT/API/motor/motorUploadDocument`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Api-Key': '3PeZr8Hc1gFbVI2nUe9dT',
    //         'Partner-Id': 'DOWALI',
    //       },
    //       body: JSON.stringify({
    //         formdata,
    //       }),
    //     },
    //   )
    //     .then((url) => {
    //       console.log(url, 'fomrdata');
    //       if (typeof url.url === 'string') {
    //         alert('Image Uploaded!');
    //         sendStateToParent(url);
    //         toggleLoader();
    //         toggleModal();
    //         // toggleModal();
    //       } else {
    //         console.log({url});
    //         toggleLoader();
    //         alert('Failed to Upload, Will get back to you shortly');
    //       }
    //     })
    //     .catch((er) => {
    //       er.response, toggleLoader();
    //       alert('Failed to Upload');
    //       console.log(er, 'error');
    //     });
    // }

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
