import axios from 'axios';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from './Button';
import LoaderUI from './LoaderUI';
import ModalUI from './ModalUI';
import {Image} from 'react-native';
import TaskCancelSaveButton from './TaskCancelSaveButton';

export default function UploadImageComponent({
  toggleModal,
  modalVisible,
  loader,
  imageURL,
  background,
  color,
  setImageURL,
  setUploadImageURL,
  setImageType,
  saveFn,
  title,
  dontShowBTN,
}) {
  let formdata = new FormData();
  launchImageLibrary(async (response) => {
    if (response.didCancel) {
      console.log(response.didCancel);
      toggleModal();
    } else if (response.errorCode) {
      console.log(response.errorCode);
      toggleModal();
    } else if (response.errorMessage) {
      toggleModal();
      console.log(response.errorMessage);
    } else {
      setImageURL(response);
      console.log(response?.type, 'response');
      // let sourceImage = {uri: 'data:image/jpeg;base64,' + data};
      const files = {
        filepath: `data:image/png;base64,${response?.data}`,
      };
      const opts = {
        files,
      };
      options, formdata.append('files', opts);
      formdata.append('endpoint', 'insurecue-proj');
      console.log(formdata, 'data');
      let res = await axios
        .post('https://insurecuebotbot.techforce.ai/api/aws/upload', formdata, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then((response) => {
          console.log('This is responce', response);
        })
        .catch((e) => {
          console.log('This is error', e);
        });
    }
  });
  return (
    <>
      {!dontShowBTN && (
        <Button
          buttonText={title}
          buttonTextStyling={[
            background
              ? {
                  color: color == 'yes' ? 'white' : '#2D2D45',
                  fontSize: 12,
                  alignSelf: 'center',
                }
              : color == 'yes'
              ? 'white'
              : '#2D2D45',
          ]}
          propStyling={[background ? {margin: 0} : {margin: 0}]}
          onPress={toggleModal}
        />
      )}
      <ModalUI visible={modalVisible} onClose={toggleModal}>
        {/* <ModalHeader title="Upload Reciept" cancelFn={toggleModal} /> */}
        {loader ? (
          <LoaderUI />
        ) : (
          <>
            <Image source={{uri: imageURL?.uri}} />
            <TaskCancelSaveButton
              cancelButtonTitle="Change Image"
              saveButtonTitle="Upload"
              //   cancelFn={selectPhotoTapped}
              saveFn={saveFn}
              dontShowIcon
            />
          </>
        )}
      </ModalUI>
    </>
  );
}

// setImageURL(response);
//         console.log(response?.type, 'response');
//         // let sourceImage = {uri: 'data:image/jpeg;base64,' + data};
//         const files = {
//           filepath: `data:image/png;base64,${response?.data}`,
//         };
//         const opts = {
//           files,
//         };
//         formdata.append('files', opts);
//         formdata.append('endpoint', 'insurecue-proj');
//         console.log(formdata, 'data');
//         let res = await axios
//           .post(
//             'https://insurecuebotbot.techforce.ai/api/aws/upload',
//             formdata,
//             {
//               headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             },
//           )
//           .then((response) => {
//             console.log('This is responce', response);
//           })
//           .catch((e) => {
//             console.log('This is error', e);
//           });
