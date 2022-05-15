import React, { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";

import
  Button

//   ModalHeader,
 from "./Button";
 import LoaderUI from './LoaderUI';
 import TaskCancelSaveButton from './TaskCancelSaveButton'
import  ModalUI from './ModalUI'
export default function UIImageUpload({
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
  dontShowBTN
}) {
  function selectPhotoTapped() {

    const options = {
      // quality: 0.5,
      // width:'100%',
      // height:'100%',
      // maxWidth: 1000,
      // maxHeight: 1000,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
        toggleModal();
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        toggleModal();
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        toggleModal();
      } else {
        const { type, uri, data } = response;
        let source = { uri: response.uri };
        const typeCheck = type?.substr(6) || "jpg";
        //let source = { uri };
        let sourceImage = { uri: "data:image/jpeg;base64," + data };
        setImageURL(sourceImage.uri);
        setUploadImageURL(uri);
        setImageType(typeCheck);

      }
    });
  }

  React.useEffect(() => {
    modalVisible && selectPhotoTapped();
  }, [modalVisible]);

  return (
    <>
      {!dontShowBTN && (
        <Button
          buttonText={title }
          buttonTextStyling={[
            background
              ? {
                  color: color == "yes" ? "white" : "#2D2D45",
                  fontSize: 12,
                  alignSelf: "center"
                }
              : styles.white
          ]}
          propStyling={[background ? { margin: 0 } : styles.btn]}
          onPress={toggleModal}
        />
      )}
      <ModalUI visible={modalVisible} onClose={toggleModal}>
        {/* <ModalHeader title="Upload Reciept" cancelFn={toggleModal} /> */}
        {loader ? (
          <LoaderUI />
        ) : (
          <>
            <Image style={styles.avatar} source={{ uri: imageURL }} />
            <TaskCancelSaveButton
              cancelButtonTitle="Change Image"
              saveButtonTitle="Upload"
              cancelFn={selectPhotoTapped}
              saveFn={saveFn}
              dontShowIcon
            />
          </>
        )}
      </ModalUI>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '90%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode:'contain'
  },
  btn: {
    margin: 10,
    backgroundColor:'salmon'
  },
  white: {
    color: "white"
  }
});
