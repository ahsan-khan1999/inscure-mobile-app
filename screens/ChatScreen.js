import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageUploadModal from '../components/ImageUploadModal';
import BobImg from '../assets/imgpsh_fullsize_anim.jpeg';
import Gear from '../assets/gear.png';
import thirdParty from '../assets/third-party.png';
import Chat2 from './ChatScreen2';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import {Bubbles} from 'react-native-loader';
import Img from '../assets/log-in-screen.jpg';

const ChatScreen = (props) => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [licenceNo, setlicenceNo] = React.useState('');
  const [vehicleName, setVehicleName] = React.useState('');
  const [modelNo, setmodelNo] = React.useState('');
  const [countryOrigin, setCountryOrigin] = React.useState('');
  const [bodyType, setBodyType] = React.useState('');
  const [vehicletype, setvehicleType] = React.useState('');
  const [engineNo, setEngineNo] = React.useState('');
  const [chasisNo, setchasisNo] = React.useState('');
  const [plateNo, setPlateNo] = React.useState('');
  const [nationality, setnationality] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [InsuranceExpData, setInsuranceExpData] = React.useState('');
  const [policyno, setpolicyno] = React.useState('');
  const [registrationDate, setregistrationDate] = React.useState('');
  const [insuranceType, setInsuranceType] = React.useState(null);
  const [DrivingFront, setDrivingFront] = React.useState('');
  const [DrivingBack, setDrivingBack] = React.useState('');
  const [VehicleFront, setVehicalFront] = React.useState('');
  const [VehicleBack, setVehicalBack] = React.useState('');
  const [isModal, setIsModal] = React.useState(false);
  const [EmiratesFront, setEmiratesFront] = React.useState('');
  const [EmiratesBack, setEmiratesBack] = React.useState('');
  const [isForm, setForm] = React.useState(false);
  const [carImage1, setcarImage1] = React.useState('');
  const [carImage2, setcarImage2] = React.useState('');
  const [carImage3, setcarImage3] = React.useState('');
  const [carImage4, setcarImage4] = React.useState('');
  const [TestResult, setTesResult] = React.useState(''); //false
  console.log(TestResult, 'TestResult');
  const [Carverified, setCarVerified] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [isQuestion, setIsQuestion] = React.useState(false);
  const [showChat2, setshowChat2] = React.useState(false);
  const [accident, setAccident] = React.useState('');
  const [repair, setRepair] = React.useState('');
  const [userName, setuserName] = React.useState('');
  const [Dob, setDob] = React.useState('');
  const [vehicleBody, setVehicleBody] = React.useState('');
  const [passengers, setPassengers] = React.useState('');
  const [vehicleRegist, setVehicleRegist] = React.useState('');
  const [registCountry, setRegistCountry] = React.useState('');
  const [date, setDate] = React.useState('');
  const [insRange, setInsRange] = React.useState('');
  const [vehicleTypeMaster, setVehicleTypeMaster] = React.useState('');

  const [vehicleFront, setvehicleFront] = React.useState('');
  const [vehicleBack, setvehicleBack] = React.useState('');
  const [drivingFront, setdrivingFront] = React.useState('');
  const [userData, setuserdata] = React.useState('');
  const [vehicleSpec, setvehicleSpec] = React.useState('');

  const [drivingIssueDate, setDrivingIssueDate] = React.useState('');
  const [drivingExpiryDate, setDrivingExpiryDate] = React.useState('');
  const [isDrivingLicenseExpired, setIsDrivingLicenseExpired] = React.useState(
    false,
  );
  const [isLoading, setIsLoading] = React.useState('');
  const [ownerName, setOwnerName] = React.useState('');
  const [t_c_no, setTCNo] = React.useState('');
  const [vehicleInsuranceType, setVehicleInsuranceType] = React.useState('');
  const [showCarImageUpload, setShowCarImageUpload] = React.useState(false);
  const [vehicleSpecType, setVehicleSpecType] = React.useState(false);
  const [isAPIError, setIsAPIError] = React.useState(false);
  const [isDocNameValid, setIsDocNameValid] = React.useState(false);
  const [time, setTime] = React.useState(false);
  const [isPhone, setPhone] = React.useState('');
  const [isEmail, setEmail] = React.useState('');
  const [isUserData, setIsUserData] = React.useState(false);
  console.log(VehicleFront, 'vech daya');
  const scrollViewRef = useRef();

  async function setAsyncData() {
    let vehicleFront = JSON.parse(await AsyncStorage.getItem('VEhicleFront'));
    let vehicleBack = JSON.parse(await AsyncStorage.getItem('VEhicleBack'));
    let drivingFront = JSON.parse(await AsyncStorage.getItem('drivingFront'));
    let userData = JSON.parse(await AsyncStorage.getItem('LoginData'));
    setvehicleFront(vehicleBack);
    setvehicleBack(vehicleFront);
    setdrivingFront(drivingFront);
    setuserdata(userData);
  }

  React.useEffect(() => {
    if (DrivingFront !== '' && VehicleBack !== '' && VehicleFront !== '') {
      setForm(true);
    }
  }, [DrivingFront, VehicleFront, VehicleBack]);
  React.useEffect(() => {
    if (
      carImage1 !== '' &&
      carImage2 !== '' &&
      carImage3 !== '' &&
      carImage4 !== ''
    ) {
      setCarVerified(true);
      if (getYear() >= time) {
        setTesResult('1');
      }
    }
  }, [carImage4, carImage3, carImage2, carImage1]);
  React.useEffect(() => {
    if (TestResult !== '') {
      if (date - registrationDate < 3 && insuranceType !== 'Third-Party') {
        setIsQuestion(true);
      } else {
        setAccident('No');
      }
    }
  }, [TestResult]);
  React.useEffect(() => {
    if (repair === 'Yes') {
      setIsQuestion(true);
    }
  }, [repair]);
  React.useEffect(() => {
    if (accident == 'Yes' || accident == 'No') {
      if (insRange === '') {
        // alert('inside testing 1')
        console.log('inside testing');
        setIsLoading('Please wait while we are fetching car valuation');
        fetchVehicleSpecs().then((r) =>
          console.log('this is vehicle spec in test result effect', r),
        );
      }
      // props.navigation.navigate('Chat2')
    } else if (
      TestResult !== '' &&
      (date - registrationDate > 3 || registrationDate == '')
    ) {
      if (insRange === '') {
        // alert('inside testing 2')
        console.log('inside testing');
        setIsLoading('Please wait while we are fetching car valuation');
        fetchVehicleSpecs().then((r) =>
          console.log('this is vehicle spec in test result effect'),
        );
      }
    }
  }, [accident, TestResult]);

  React.useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    setTime(today.getTime());
    today = yyyy;
    setDate(today);
  }, []);

  React.useEffect(() => {
    if (VehicleFront !== '') {
      setPlateNo('');
      setnationality('');
      setExpiryDate('');
      setInsuranceExpData('');
      setpolicyno('');
      setregistrationDate('');
      setIsModal(true);
    }
    fetchVehicleType();
  }, [VehicleFront]);

  React.useEffect(() => {
    if (VehicleBack !== '') {
      setmodelNo('');
      setCountryOrigin('');
      setBodyType('');
      setvehicleType('');
      setEngineNo('');
      setIsModal(true);
    }
  }, [VehicleBack]);

  React.useEffect(() => {
    if (DrivingFront !== '') {
      setlicenceNo('');
      setDob('');
      setVehicleName('');
      setDrivingExpiryDate('');
      setDrivingIssueDate('');
    }
  }, [DrivingFront]);

  React.useEffect(() => {
    if (DrivingBack !== '') {
      console.log('this is comparison ', getYear() >= time);
      console.log('this is insurance type ', insuranceType);
      if (
        insuranceType === 'Comprehensive' &&
        vehicleInsuranceType === 'Third-Party'
      ) {
        setShowCarImageUpload(true);
      } else {
        if (getYear() >= time) {
          setCarVerified(true);
          // setTesResult('1');
        }
        if (getYear() >= time && insuranceType === 'Third-Party') {
          setCarVerified(true);
          setTesResult('1');
        } else if (insuranceType === 'Third-Party') {
          setCarVerified(true);
        }
      }
    }
  }, [DrivingBack]);

  React.useEffect(() => {
    getDta();
  }, []);

  async function getDta() {
    let AuthData = await AsyncStorage.getItem('LoginData');
    console.log(AuthData, 'Authdat');
    let vehiclefront = await AsyncStorage.getItem('' + '');
    let refineddata = JSON.parse(vehiclefront);
  }

  function getYear() {
    if (VehicleFront !== '') {
      let date = parseFields(VehicleFront?.Output[0]?.data, 'ins_exp');
      console.log('this is date ====', date);
      if (date !== '') {
        let s = date.split('-');
        let d = new Date();
        if (s.length > 0) {
          d.setDate(s[0]);
          d.setMonth(s[1]);
          d.setFullYear(s[2]);
          let g = new Date(d);
          return g.getTime();
        }
        return date;
      }
    }
  }

  function fetchVehicleType() {
    let myHeaders = new Headers();
    myHeaders.append('Partner-Id', 'DOWALI');
    myHeaders.append('Api-Key', '6gbW8thKLuAzyeNWrWXVBQ4Rq');
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({masterType: 'VEHICLE_MAKE_MODEL'});

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://insurance.awnic.com/InsureApi/API/motor/masterData',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        setVehicleTypeMaster(result);
        // console.log('this is testing vehcle type****',result);
      })
      .catch((error) => console.log('error', error));
  }

  //  function checkValidVehicleBack(){
  //   console.log('this is inside check vehicle back',vehicleBack);
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //
  //   var raw = JSON.stringify({
  //     "data":[
  //       {
  //         "chassis_number":vehicleBack?.ChasisNumber,
  //         "year":vehicleBack?.ModelNumber
  //       }
  //     ]
  //   });
  //
  //   var config = {
  //     method: 'post',
  //     url: 'https://ocr.techforce.ai/api/operator_roi/InsureCue_vehicleSpecs/',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data : raw,
  //     timeout: 90000,
  //   };
  //
  //   axios(config)
  //     .then(function (response) {
  //       console.log('this data  for chasis no vehicle type ',(response.data.Output.vehicle_type).toLowerCase().trim());
  //       console.log('this data  for  vehicle type ',vehicleBack?.VehicleType.toLowerCase().trim());
  //       console.log('this data  for  vehicle type ',typeof((response.data.Output.vehicle_type).toLowerCase().trim() === vehicleBack?.VehicleType.toLowerCase().trim()));
  //       if((response.data.Output.vehicle_type).toLowerCase().trim() === vehicleBack?.VehicleType.toLowerCase().trim()){
  //         setIsValidVehicleBack(true);
  //       }else{
  //         alert("Vehicle Type and Chasis Number doesn't match");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  console.log(
    'This is vehicle frontdtttttttttttttttttttttttttttttttttttttttttttttttdd',
    vehicleFront,
  );
  async function handleData(e) {
    if (e == 'vehicleFront') {
      let vehicleFrontData = {
        Plateno:
          plateNo !== ''
            ? plateNo
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'plate_no')
            : '',
        Nationality:
          nationality != ''
            ? nationality
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'nationality')
            : '',
        ExpiryDate:
          expiryDate !== ''
            ? expiryDate
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'exp_date')
            : '',
        InsuranceExp:
          InsuranceExpData !== ''
            ? InsuranceExpData
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'ins_exp')
            : '',
        PolicyNumber:
          policyno !== ''
            ? policyno
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'policy_no')
            : '',
        RegistrationDate:
          registrationDate !== ''
            ? registrationDate
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'reg_date')
            : '',

        Owner:
          ownerName !== ''
            ? ownerName
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'owner')
            : '',
        TCNo:
          t_c_no !== ''
            ? t_c_no
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 't_c_no')
            : '',
        InsuranceType: vehicleInsuranceType !== '' ? vehicleInsuranceType : '',
        PlaceOfIssue: VehicleFront
          ? parseFields(VehicleFront?.Output[0]?.data, 'place_of_issue')
          : '',

        Mortgage: VehicleFront
          ? parseFields(VehicleFront?.Output[0]?.data, 'mortgage')
          : '',
        Private: VehicleFront
          ? parseFields(VehicleFront?.Output[0]?.data, 'private')
          : '',
        VehicleType: VehicleFront
          ? parseFields(VehicleFront?.Output[0]?.data, 'vehicle_type')
          : '',
      };

      if (
        (plateNo !== '' ||
          parseFields(VehicleFront?.Output[0]?.data, 'plate_no') !== '') &&
        (policyno !== '' ||
          parseFields(VehicleFront?.Output[0]?.data, 'policy_no') !== '') &&
        vehicleInsuranceType !== ''
      ) {
        console.log('Helllo');
        await AsyncStorage.setItem(
          'VEhicleFront',
          JSON.stringify(vehicleFrontData),
        );
        console.log('front data saved');

        let expdate =
          registrationDate !== ''
            ? registrationDate.slice(6, 10)
            : VehicleFront?.Output[0]?.data[6]?.fieldValue.slice(6, 10);
        console.log(expdate, 'expdate');
        setregistrationDate(expdate);
        fetch(
          `https://insurecueapi.techforce.ai/insurecue/updateInsureStaging`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Api-Key': '3PeZr8Hc1gFbVI2nUe9dT',
              'Partner-Id': 'DOWALI',
            },
            body: JSON.stringify({
              vehicleFrontData,
            }),
          },
        )
          .then((res) => {
            console.logg('This is responce from front updation', res);
            // alert("uploaded ")
          })
          .catch((e) => {
            // alert("errror")
          });
        setIsModal(false);
      } else {
        alert(
          'Plate Number,Policy Number and Previous Insurance Type is required',
        );
      }
    }
    if (e == 'vehicleBack') {
      console.log('testing sd', VehicleFront);
      let vehicleBackData = {
        ModelNumber:
          modelNo !== ''
            ? modelNo
            : VehicleBack
            ? parseFields(VehicleBack?.Output[0]?.data, 'model')
            : '',
        Origin:
          countryOrigin != ''
            ? countryOrigin
            : VehicleBack
            ? parseFields(VehicleBack?.Output[0]?.data, 'origin')
            : '',
        BodyType:
          bodyType !== ''
            ? bodyType
            : VehicleBack
            ? parseFields(VehicleBack?.Output[0]?.data, 'origin1')
            : '',
        VehicleType:
          vehicletype !== ''
            ? vehicletype
            : VehicleBack
            ? parseFields(VehicleBack?.Output[0]?.data, 'vehicle_type')
            : '',
        EngineNumber:
          engineNo !== ''
            ? engineNo
            : VehicleBack
            ? parseFields(VehicleBack?.Output[0]?.data, 'engine_no')
            : '',
        ChasisNumber:
          chasisNo !== ''
            ? chasisNo
            : VehicleBack
            ? parseFields(VehicleBack?.Output[0]?.data, 'chassis_no')
            : '',
        NumberOfPassenger: VehicleBack
          ? parseFields(VehicleBack?.Output[0]?.data, 'number_of_pass')
          : '',
      };

      if (
        (bodyType !== '' ||
          parseFields(VehicleBack?.Output[0]?.data, 'origin1') !== '') &&
        (vehicletype !== '' ||
          parseFields(VehicleBack?.Output[0]?.data, 'vehicle_type') !== '')
      ) {
        await AsyncStorage.setItem(
          'VEhicleBack',
          JSON.stringify(vehicleBackData),
        );
        setvehicleBack(vehicleBackData);
        setIsModal(false);
        // checkValidVehicleBack();
        // await fetchVehicleSpecs();
        console.log('back data saved');
      } else {
        // alert('Body type and Vehicle type is required');
      }
    }
    if (e == 'drivingFront') {
      let drivingFrontData = {
        LicenseNumber:
          licenceNo !== ''
            ? licenceNo
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'license_no')
            : '',
        DOB:
          Dob !== ''
            ? Dob
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'date of birth')
            : '',
        Name:
          vehicleName !== ''
            ? vehicleName
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'name')
            : '',
        DriverNationality: DrivingFront
          ? parseFields(DrivingFront?.Output[0]?.data, 'nationality')
          : '',
        PlaceOfIssue: DrivingFront
          ? parseFields(DrivingFront.Output[0].data, 'place of issue')
          : '',
        IssueDate:
          drivingIssueDate !== ''
            ? drivingIssueDate
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'issue date')
            : '',
        ExpiryDate:
          drivingExpiryDate !== ''
            ? drivingExpiryDate
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'exp date')
            : '',
      };

      if (
        (vehicleName !== '' ||
          parseFields(DrivingFront?.Output[0]?.data, 'name') !== '') &&
        (drivingExpiryDate !== '' ||
          parseFields(DrivingFront?.Output[0]?.data, 'exp date') !== '')
      ) {
        await AsyncStorage.setItem(
          'drivingFront',
          JSON.stringify(drivingFrontData),
        );

        checkDrivingExpiry(
          drivingExpiryDate !== ''
            ? drivingExpiryDate
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'exp date')
            : '',
        );
        checkNameValidation(
          vehicleName !== ''
            ? vehicleName
            : DrivingFront
            ? parseFields(DrivingFront?.Output[0]?.data, 'name')
            : '',
          ownerName !== ''
            ? ownerName
            : VehicleFront
            ? parseFields(VehicleFront?.Output[0]?.data, 'owner')
            : '',
        );

        // setTesResult("1");
        console.log('driving back data saved');

        setFormSubmitted(true);
        setForm(false);
      } else {
        // alert('Name and Driving License Expiry Date is required');
      }
    }
  }

  function checkDrivingExpiry(date) {
    console.log('this is expiry check data', typeof date);

    let s = date.split('-');
    let m = parseInt(s[1]);
    if (!isNaN(m)) {
      date = new Date();
      date.setDate(s[0]);
      date.setMonth(s[1] - 1);
      date.setFullYear(s[2]);
    }

    let today = new Date();
    let exp = new Date(date);
    console.log('this is the expiry adte', date);
    console.log('this is month ', exp.getMonth());
    if (exp.getTime() < today.getTime()) {
      setIsDrivingLicenseExpired(true);
      // alert('Driving License is expired');
    } else {
      setIsDrivingLicenseExpired(false);
    }
  }

  function checkNameValidation(drivingName, vehicleLicenseName) {
    console.log('this is drivingname ', drivingName.trim().toLowerCase());
    console.log(
      'this is vehiclename ',
      vehicleLicenseName.trim().toLowerCase(),
    );
    console.log(
      'this is comparision ',
      drivingName.trim().toLowerCase() ===
        vehicleLicenseName.trim().toLowerCase(),
    );
    if (
      drivingName.trim().toLowerCase() ===
      vehicleLicenseName.trim().toLowerCase()
    ) {
      setIsDocNameValid(true);
    } else {
      // alert(
      //   'It appears that the name on the Driving License does not match the name on the Vehicle License. Please enter a valid ID card.',
      // );
    }
  }

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => props.navigation.navigate('LandingScreen'),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // function for getting correct field from response data
  function parseFields(data, field) {
    let itemValue = '';
    data.forEach(function (item) {
      if (item?.fieldName == field) {
        itemValue = item?.fieldValue;
      }
    });
    return itemValue;
  }

  async function fetchVehicleSpecs() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log(vehicleBack, 'vehicleBack');
    var raw = JSON.stringify({
      data: [
        {
          chassis_number: vehicleBack?.ChasisNumber?.replace(' ', ''),
          year: vehicleBack?.ModelNumber?.replace(' ', ''),
        },
      ],
    });

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // let vehicleSpec1 = await fetch("https://ocr.techforce.ai/api/operator_roi/InsureCue_vehicleSpecs/", requestOptions)
    //   .then(response => response.json());

    var config1 = {
      method: 'post',
      url:
        'https://insurecueocr.techforce.ai/api/operator_roi/InsureCue_vehicleSpecs/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: raw,
      timeout: 90000,
    };
    console.log(raw, 'vraw');
    axios
      .post(
        'https://insurecueocr.techforce.ai/api/operator_roi/InsureCue_vehicleSpecs/',
        raw,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(function (response) {
        // alert('this is inside first promise');
        console.log('this is response hekko ', response);

        console.log('this is type of resp', response.data);
        // alert(response.data.Output.vehicle_type);
        setVehicleSpecType(response.data.Output.vehicle_type);
        var raw1 = JSON.stringify({
          data: [
            {
              model: response.data.Output.vehicle_type,
              trim: 'other',
              year: vehicleBack?.ModelNumber,
              mileage: '',
              reg: 'GCC Specs',
            },
          ],
        });
        const userDict = JSON.stringify({
          email: 'admin@techforce.ai',
          password: 'Admin123',
        });
        console.log('this is second raw', raw1);

        axios
          .post('http://150.136.7.55:8055/auth/login', userDict, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            console.log(res,"res is here");
            console.log(res?.data?.data?.access_token, 'res is here from director login accesss token');
            
            // let response = JSON.parse(res);
            // console.log(response?.data,"access token json parse");
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${res?.data?.data?.access_token}`,
            };
            console.log(headers, 'parsed response headers',raw1);
            axios
              .get(
                `http://150.136.7.55:8055/items/tf_insurcue_carvalues?filter={}&limit=10`,
                {
                  headers: headers,
                },
              )
              .then(function (response) {
                console.log('this is the range ', response);
                let r = response.data.Output.price;
                let s = r.split('-');
                console.log('this is values array', s);
                // alert(response.data.Output.price)
                if (s.length > 1) {
                  let t = s.map(function (c) {
                    return Number(c.replace(/[^\d.]/g, ''));
                  });
                  console.log('this is car values ', t);
                  setInsRange(t);
                  setIsLoading('');
                  setshowChat2(true);
                  // alert('inside   car value out 2')
                  console.log('this is insurenace range ', insRange);
                } else {
                  setInsRange([]);
                  setIsLoading('Unable to fetch car valuation');
                  setIsAPIError(true);
                  setshowChat2(true);
                  // alert('inside   car value out 3')
                }
              })
              .catch(function (error) {
                console.log(error, 'error is here at car value');
              });
          })
          .catch((e) => {
            console.log(e, 'error from director login');
          });
      })
      .catch(function (error) {
        console.log(error, 'error is here dude');
      });

    // var config2 = {
    //   method: 'post',
    //   url: 'https://ocr.techforce.ai/api/operator_roi/InsureCue_carvalues/',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data : raw
    // };
    //
    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // vehicleSpec = JSON.parse(vehicleSpec);
    // let data = vehicleSpec?.Output;
    // setvehicleSpec(vehicleSpec1);
    // alert(vehicleSpec1);
    // console.log('this is vehicle spec >>>>>> '+(vehicleSpec1?.Output["Make "]).trim()+' '+(vehicleSpec1?.Output["Model  "]).trim()+' >>>> '+(vehicleSpec1?.Output["Model Year "]).trim());
    // alert('this is below vehicle spec ');
    // .then(result => {
    //   result = JSON.parse(result);
    //   setvehicleSpec(result);
    //   alert(result?.Output)
    //   return fetchRangeValue(result?.Output);
    //   console.log('this is spec dta',result);
    // })
    // var raw = JSON.stringify({
    //   "data": [
    //     {
    //       "model": (vehicleSpec1?.Output["Make "]).trim()+" "+(vehicleSpec1?.Output["Model  "]).trim(),
    //       "trim": "other",
    //       "year": (vehicleSpec1?.Output["Model Year "]).trim(),
    //       "mileage": "",
    //       "reg": "GCC Specs",
    //     },
    //   ],
    // });
    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };
    //
    // await fetch(
    //   "https://ocr.techforce.ai/api/operator_roi/InsureCue_carvalues/",
    //   requestOptions,
    // ).then((response) => response.text())
    //   .then((result) => {
    //     result = JSON.parse(result);
    //     let r = result.Output.price;
    //     console.log('this is the range ',r);
    //     let s = r.split("-");
    //     console.log('this is values array',s);
    //     alert('inside   car value out')
    //     if(s.length > 1){
    //       let t = s.map(function(c) {
    //         return Number(c.replace(/[^\d.]/g, ""));
    //       });
    //       console.log('this is car values ',t);
    //       setInsRange(t);
    //       setIsLoading('');
    //       setshowChat2(true);
    //       alert('inside   car value out 2')
    //       console.log('this is insurenace range ',insRange);
    //     }else{
    //       setInsRange([]);
    //       setIsLoading('Unable to fetch car valuation');
    //       setshowChat2(true);
    //       alert('inside   car value out 3')
    //     }
    //
    //   })
    //   .catch((error) => console.log("error", error));
  }

  function fetchRangeValue(data) {
    console.log('this is vehicle spec data ', data['Model  ']);
    // let vehicleFront = JSON.parse(await AsyncStorage.getItem("VEhicleFront"));
    // let vehicleBack = JSON.parse(await AsyncStorage.getItem("VEhicleBack"));

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Partner-Id', 'DOWALI');
    myHeaders.append('Api-Key', '6gbW8thKLuAzyeNWrWXVBQ4Rq');

    var raw = JSON.stringify({
      data: [
        {
          model: data['Make '].trim() + ' ' + data['Model  '].trim(),
          trim: 'other',
          year: data['Model Year '].trim(),
          mileage: '',
          reg: 'GCC Specs',
        },
      ],
    });

    console.log('this is range value raw ---- ', {
      data: [
        {
          model: data['Make '].trim() + ' ' + data['Model  '].trim(),
          trim: data['Trim '].trim(),
          year: data['Model Year '].trim(),
          mileage: '',
          reg: 'GCC Specs',
        },
      ],
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch(
      'https://ocr.techforce.ai/api/operator_roi/InsureCue_carvalues/',
      requestOptions,
    );
  }

  //saving all the details to the server database
  async function saveFinalData(
    fidelityPolicy,
    policyData,
    paymentResponse,
    planName,
    vehicleModelData,
    awnicRawData,
    sumInsured,
    docLink,
    quoteNo,
  ) {
    console.log('test  save data');
    console.log('this is plan name ', planName);
    console.log('fidelity in save data ', fidelityPolicy);
    console.log('payment response in save data ', paymentResponse);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let loginData = JSON.parse(await AsyncStorage.getItem('LoginData'));

    let raw = JSON.stringify({
      Email_ID: loginData.email,
      Phone_No: loginData.phone,
      Company_Name: '',
      Policy_No: parseFields(VehicleFront?.Output[0]?.data, 'policy_no'),
      Partner_ID: '',
      P_Start_Date: (planName = 'Plan 1'
        ? awnicRawData.motorPolicyInfo.policyStartDate
        : fidelityPolicy?.Data?.PolStartDt),
      P_End_Date: (planName = 'Plan 1'
        ? awnicRawData.motorPolicyInfo.policyEndDate
        : fidelityPolicy?.Data?.PolEndDt),
      Product_Code: (planName = 'Plan 1'
        ? policyData.premiumInfo.productCode
        : ''),
      Assured_Code: '150200',
      Customer_Cod: '150200',
      Broker_Code: '150200',
      paymentMode: 'On Account',
      Currency_Typ: '',
      Currency_Rat: '',
      Gross_Premium: (planName = 'Plan 1'
        ? policyData.premiumInfo.finalPremiumAmt
        : fidelityPolicy?.Data?.QuoteNo),
      VAT_Amt: (planName = 'Plan 1'
        ? policyData.premiumInfo.finalPremiumVat
        : fidelityPolicy?.Data?.VATAmount),
      Car_Bran: '',
      Registration_Location: '',
      Transaction_Type: '',
      Mortgage: parseFields(VehicleFront?.Output[0]?.data, 'mortgage'),
      Make_Code: (planName = 'Plan 1'
        ? vehicleModelData.makeCode
        : fidelityPolicy?.Data?.QuoteNo),
      Model_Code: (planName = 'Plan 1'
        ? vehicleModelData.code
        : fidelityPolicy?.Data?.QuoteNo),
      No_Of_Cylinders: (planName = 'Plan 1'
        ? vehicleModelData.noOfCylinder
        : fidelityPolicy?.Data?.QuoteNo),
      Manufacture_Year: parseFields(VehicleBack?.Output[0].data, 'model'),
      Usage_Type: '1001',
      Sum_Insured: sumInsured,
      Customer_Type: '100',
      User_FName: parseFields(DrivingFront.Output[0].data, 'name'),
      User_LName: '',
      User_Nationality: parseFields(
        VehicleFront?.Output[0]?.data,
        'nationality',
      ),
      User_Address: parseFields(VehicleFront?.Output[0]?.data, 'nationality'),
      Quote_No: (planName = 'Plan 1' ? quoteNo : fidelityPolicy?.Data?.QuoteNo),
      Quote_Processed_By: '',
      Payment_Receipt_No: '',
      Plate_Code: parseFields(VehicleFront?.Output[0]?.data, 'plate_no'),
      Plate_Category: '',
      Color: '002',
      V_Registered_Date: parseFields(VehicleFront?.Output[0]?.data, 'reg_date'),
      Agency: '',

      V_Plate_No: parseFields(VehicleFront?.Output[0]?.data, 'plate_no'),
      Ins_Type: '100',
      Owner: parseFields(VehicleFront?.Output[0]?.data, 'owner'),
      Nationality: parseFields(VehicleFront?.Output[0]?.data, 'nationality'),
      Reg_Date: parseFields(VehicleFront?.Output[0]?.data, 'reg_date'),
      Ins_Exp_Date: parseFields(VehicleFront?.Output[0]?.data, 'ins_exp'),
      Exp_Date: parseFields(VehicleFront?.Output[0]?.data, 'exp_date'),
      TC_No: parseFields(VehicleFront?.Output[0]?.data, 't_c_no'),
      Model: parseFields(VehicleBack?.Output[0].data, 'model'),
      Origin: parseFields(VehicleBack?.Output[0].data, 'origin'),
      Body_Type: parseFields(VehicleBack?.Output[0].data, 'origin1'),
      Vehicle_Type: parseFields(VehicleBack?.Output[0].data, 'vehicle_type'),
      Engine_No: parseFields(VehicleBack?.Output[0].data, 'engine_no'),
      Chassis_No: parseFields(VehicleBack?.Output[0].data, 'chassis_no'),
      No_Of_Passengers: parseFields(
        VehicleBack?.Output[0].data,
        'number_of_pass',
      ),
      D_License_No: parseFields(DrivingFront.Output[0].data, 'license_no'),
      D_Name: parseFields(DrivingFront.Output[0].data, 'name'),
      D_Nationality: parseFields(DrivingFront.Output[0].data, 'nationality'),
      D_DOB: parseFields(DrivingFront.Output[0].data, 'date of birth'),
      D_Exp_Date: parseFields(DrivingFront.Output[0].data, 'exp date'),
      D_Issue_Date: parseFields(DrivingFront.Output[0].data, 'issue date'),
      D_POI: parseFields(DrivingFront.Output[0].data, 'place of issue'),
      V_License_Front_Image: '',
      V_License_Back_Image: '',
      D_License_Front_Image: '',
      D_License_Back_Image: '',
      Emirates_Front_Image: '',
      Emirates_Back_Image: '',
      Possesion_Letter: '',
      Test_Result: '',
      Car_Image_1: '',
      Car_Image_2: '',
      Car_Image_3: '',
      Car_Image_4: '',
      Insurance_Policy_Document_URL: docLink,
      Transaction_Date: new Date(),
      Transaction_Time: '',
      Transaction_Hint: '',
      Order_ID: paymentResponse?.Transaction?.OrderID,
      Payment_Mode: '',
      Amount: '',
      Customer_Name: '',
      Order_Name: '',
      Username: '',
      Password: '',
      Transaction_Status: '',
    });

    let body =
      'Email_ID:' +
      loginData.email +
      ',' +
      'Phone_No:' +
      loginData.phone +
      ',' +
      'Company_Name:' +
      '' +
      ',' +
      'Policy_No:' +
      parseFields(VehicleFront?.Output[0]?.data, 'policy_no') +
      ',' +
      'Partner_ID:' +
      '' +
      ',' +
      'P_Start_Date:' +
      (planName === 'Plan 1'
        ? awnicRawData.motorPolicyInfo.policyStartDate
        : awnicRawData.motorPolicyInfo.policyStartDate) +
      ',' +
      '' +
      'P_End_Date:' +
      (planName === 'Plan 1'
        ? awnicRawData.motorPolicyInfo.policyEndDate
        : awnicRawData.motorPolicyInfo.policyEndDate) +
      ',' +
      '' +
      'Product_Code:' +
      (planName === 'Plan 1' ? policyData.premiumInfo.productCode : '') +
      ',' +
      'Assured_Code:' +
      '150200' +
      ',' +
      'Customer_Cod:' +
      '150200' +
      ',' +
      '' +
      'Broker_Code:' +
      '150200' +
      ',' +
      'paymentMode:' +
      'On Account' +
      ',' +
      'Currency_Typ:' +
      '' +
      ',' +
      'Currency_Rat:' +
      '' +
      ',' +
      '' +
      'Gross_Premium:' +
      (planName === 'Plan 1'
        ? policyData.premiumInfo.finalPremiumAmt
        : policyData.premiumInfo.finalPremiumAmt) +
      ',' +
      '' +
      'VAT_Amt:' +
      (planName === 'Plan 1'
        ? policyData.premiumInfo.finalPremiumVat
        : policyData.premiumInfo.finalPremiumVat) +
      ',' +
      '' +
      'Car_Bran:' +
      '' +
      ',' +
      'Registration_Location:' +
      '' +
      ',' +
      'Transaction_Type:' +
      '' +
      ',' +
      '' +
      'Mortgage:' +
      parseFields(VehicleFront?.Output[0]?.data, 'mortgage') +
      ',' +
      '' +
      'Make_Code:' +
      (planName === 'Plan 1'
        ? vehicleModelData.makeCode
        : vehicleModelData.makeCode) +
      ',' +
      '' +
      'Model_Code:' +
      (planName === 'Plan 1' ? vehicleModelData.code : vehicleModelData.code) +
      ',' +
      '' +
      'No_Of_Cylinders: ' +
      (planName === 'Plan 1'
        ? vehicleModelData.noOfCylinder
        : vehicleModelData.noOfCylinder) +
      ',' +
      '' +
      'Manufacture_Year:' +
      parseFields(VehicleBack?.Output[0].data, 'model') +
      ',' +
      '' +
      'Usage_Type:' +
      '1001' +
      ',' +
      'Sum_Insured:' +
      sumInsured +
      ',' +
      'Customer_Type:' +
      '100' +
      ',' +
      '' +
      'User_FName:' +
      parseFields(DrivingFront.Output[0].data, 'name') +
      ',' +
      'User_LName:' +
      '' +
      ',' +
      '' +
      'User_Nationality:' +
      parseFields(VehicleFront?.Output[0]?.data, 'nationality') +
      ',' +
      '' +
      'User_Address:' +
      ',' +
      '' +
      'Quote_No:' +
      (planName === 'Plan 1' ? quoteNo : quoteNo) +
      ',' +
      '' +
      'Quote_Processed_By:' +
      '' +
      ',' +
      'Payment_Receipt_No:' +
      '' +
      ',' +
      '' +
      'Plate_Code:' +
      parseFields(VehicleFront?.Output[0]?.data, 'plate_no') +
      ',' +
      'Plate_Category:' +
      '' +
      ',' +
      '' +
      'Color:' +
      '002' +
      ',' +
      'V_Registered_Date:' +
      parseFields(VehicleFront?.Output[0]?.data, 'reg_date') +
      ',' +
      '' +
      'Agency:' +
      '' +
      ',' +
      'V_Plate_No:' +
      parseFields(VehicleFront?.Output[0]?.data, 'plate_no') +
      ',' +
      'Ins_Type:' +
      '100' +
      ',' +
      '' +
      'Owner:' +
      parseFields(VehicleFront?.Output[0]?.data, 'owner') +
      ',' +
      'Nationality:' +
      parseFields(VehicleFront?.Output[0]?.data, 'nationality') +
      ',' +
      '' +
      'Reg_Date:' +
      parseFields(VehicleFront?.Output[0]?.data, 'reg_date') +
      ',' +
      'Ins_Exp_Date:' +
      parseFields(VehicleFront?.Output[0]?.data, 'ins_exp') +
      ',' +
      '' +
      'Exp_Date:' +
      parseFields(VehicleFront?.Output[0]?.data, 'exp_date') +
      ',' +
      'TC_No:' +
      parseFields(VehicleFront?.Output[0]?.data, 't_c_no') +
      ',' +
      '' +
      'Model:' +
      parseFields(VehicleBack?.Output[0].data, 'model') +
      ',' +
      'Origin:' +
      parseFields(VehicleBack?.Output[0].data, 'origin') +
      ',' +
      '' +
      'Body_Type:' +
      parseFields(VehicleBack?.Output[0].data, 'origin1') +
      ',' +
      'Vehicle_Type:' +
      parseFields(VehicleBack?.Output[0].data, 'vehicle_type') +
      ',' +
      '' +
      'Engine_No:' +
      parseFields(VehicleBack?.Output[0].data, 'engine_no') +
      ',' +
      'Chassis_No:' +
      parseFields(VehicleBack?.Output[0].data, 'chassis_no') +
      ',' +
      '' +
      'No_Of_Passengers:' +
      parseFields(VehicleBack?.Output[0].data, 'number_of_pass') +
      ',' +
      'D_License_No:' +
      parseFields(DrivingFront.Output[0].data, 'license_no') +
      ',' +
      '' +
      'D_Name:' +
      parseFields(DrivingFront.Output[0].data, 'name') +
      ',' +
      'D_Nationality:' +
      parseFields(DrivingFront.Output[0].data, 'nationality') +
      ',' +
      '' +
      'D_DOB:' +
      parseFields(DrivingFront.Output[0].data, 'date of birth') +
      ',' +
      'D_Exp_Date:' +
      parseFields(DrivingFront.Output[0].data, 'exp date') +
      ',' +
      '' +
      'D_Issue_Date:' +
      parseFields(DrivingFront.Output[0].data, 'issue date') +
      ',' +
      'D_POI:' +
      parseFields(DrivingFront.Output[0].data, 'place of issue') +
      ',' +
      '' +
      'V_License_Front_Image:' +
      '' +
      ',' +
      'V_License_Back_Image:' +
      '' +
      ',' +
      'D_License_Front_Image:' +
      '' +
      ',' +
      'D_License_Back_Image:' +
      '' +
      ',' +
      'Emirates_Front_Image:' +
      '' +
      ',' +
      '' +
      'Emirates_Back_Image:' +
      '' +
      ',' +
      'Possesion_Letter:' +
      '' +
      ',' +
      'Test_Result:' +
      '' +
      ',' +
      'Car_Image_1:' +
      '' +
      ',' +
      'Car_Image_2:' +
      '' +
      ',' +
      '' +
      'Car_Image_3:' +
      '' +
      ',' +
      'Car_Image_4:' +
      '' +
      ',' +
      'Insurance_Policy_Document_URL: ' +
      docLink +
      ',' +
      'Transaction_Date:' +
      new Date() +
      ',' +
      '' +
      'Transaction_Time:' +
      '' +
      ',' +
      'Transaction_Hint:' +
      '' +
      ',' +
      'Order_ID:' +
      paymentResponse?.Transaction?.OrderID +
      ',' +
      '' +
      'Payment_Mode:' +
      '' +
      ',' +
      'Amount:' +
      '' +
      ',' +
      'Customer_Name:' +
      '' +
      ',' +
      'Order_Name:' +
      '' +
      ',' +
      'Username:' +
      '' +
      ',' +
      '' +
      'Password:' +
      '' +
      ',' +
      'Transaction_Status:';

    console.log('this is raw email data ', body);

    var myHeaders1 = new Headers();
    myHeaders1.append('Content-Type', 'application/json');
    let raw1 = JSON.stringify({
      to: 'murad.abushaikha@cns-me.com',
      cc: ['insurecue-dl@techforce.ai'],
      subject: 'Data generated in the flow',
      body: body,
    });

    var requestOptions2 = {
      method: 'POST',
      headers: myHeaders1,
      body: raw1,
      redirect: 'follow',
    };

    fetch(
      'https://chatbotapi.development.techforce.ai/v1/chatbot/mail/techforce',
      requestOptions2,
    )
      .then((response) => response.text())
      .then(async (result) => {
        console.log(result, 'email');
      })
      .catch((error) => console.log('error', error));

    console.log('this is raw data for save function----->> ', raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://132.145.186.226:5000/insurecue/inserttoDB', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        // alert(result.message);
        console.log('result of saving final data ', result);
      })
      .catch((error) => console.log('error while saving final data', error));
  }

  function formEndDate(originalDate) {
    let date = new Date(originalDate);
    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(date.getMonth() + 1);
    date = new Date(date);
    return date.get;
  }

  async function handleUserData() {
    if (isPhone === '' || isEmail === '') {
      // Alert.alert('Error', 'Please fill all the fileds');
    } else {
      let objData = {
        phone: isPhone,
        email: isEmail,
      };
      await AsyncStorage.setItem('LoginData', JSON.stringify(objData));

      await setIsUserData(true);

      const response = fetch(
        `https://insurecueapi.techforce.ai/insurecue/inserttoDB`,
        {
          method: 'POST',
          body: JSON.stringify({
            Phone_No: isPhone,
            Email_ID: isEmail,
            Insurance_Type: insuranceType,
          }),
        },
      )
        .then((response) => response.json())
        .then((response) => console.log('this is resp ', response))
        .catch((er) => {
          er.response, console.log(er, 'error');
        });
      console.log('response in getting', response);
    }
  }

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={{backgroundColor: 'white'}}>
        <View style={{marginVertical: 20, marginHorizontal: 15}}>
          {console.log(isModal, 'pp')}
          {isModal === false ? (
            <View>
              {console.log('here')}
              {isForm === false ? (
                <>
                  <View style={{marginBottom: 60}}>
                    <View style={styles.BotQuestion}>
                      <Text style={styles.BotText}>
                        Hello, I’m Bob and I’m here to help you get the best car
                        insurance quote suited to your needs.
                      </Text>
                    </View>
                    <View style={styles.BotQuestion}>
                      <Text style={styles.BotText}>
                        Firstly, are you looking for comprehensive or
                        third-party cover?
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        // setshowChat2(true);

                        setInsuranceType('Comprehensive');
                      }}
                      style={styles.boxQuestion}>
                      <Image
                        source={Gear}
                        style={{
                          width: 30,
                          height: 30,
                          marginTop: 10,
                          marginLeft: 10,
                        }}
                      />
                      <Text style={styles.boxQText}>Comprehensive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setInsuranceType('Third-Party');
                      }}
                      style={styles.boxQuestion}>
                      <Image
                        source={thirdParty}
                        style={{
                          width: 40,
                          height: 35,
                          marginTop: 8,
                          marginLeft: 10,
                        }}
                      />
                      <Text style={styles.boxQText}>Third-Party</Text>
                    </TouchableOpacity>
                    {insuranceType ? (
                      <View style={{flexDirection: 'row-reverse'}}>
                        <View style={styles.answerBox}>
                          <Text style={[styles.answerText, {paddingLeft: 20}]}>
                            {insuranceType === 'Comprehensive'
                              ? 'Comprehensive'
                              : 'Third-Party'}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    {insuranceType !== null ? (
                      <View
                        style={[
                          styles.BotQuestion,
                          {paddingBottom: isUserData ? 30 : 0},
                        ]}>
                        <Text style={[styles.boxQText, {color: 'white'}]}>
                          Personal Information
                        </Text>
                        <View>
                          <Text
                            style={[
                              styles.label,
                              {color: 'white', marginVertical: 10},
                            ]}>
                            Phone Number
                          </Text>
                          <TextInput
                            value={isPhone}
                            keyboardType={'numeric'}
                            onChangeText={(value) => setPhone(value)}
                            placeholderTextColor="grey"
                            placeholder="Enter Phone Number "
                            style={[
                              styles.textInputstyle,
                              {backgroundColor: 'white', borderRadius: 4},
                            ]}
                            editable={true}
                          />

                          <Text
                            style={[
                              styles.label,
                              {color: 'white', marginVertical: 10},
                            ]}>
                            Email Id
                          </Text>
                          <TextInput
                            value={isEmail}
                            onChangeText={(value) => setEmail(value)}
                            placeholderTextColor="grey"
                            placeholder="Enter Email Id"
                            style={[
                              styles.textInputstyle,
                              {backgroundColor: 'white', borderRadius: 4},
                            ]}
                            editable={true}
                          />
                        </View>
                        {!isUserData ? (
                          <TouchableOpacity
                            style={[styles.button, {borderRadius: 4}]}
                            onPress={() => handleUserData()}>
                            <Text
                              style={{
                                alignSelf: 'center',
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 'bold',
                              }}>
                              Submit
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    ) : null}

                    {isUserData && insuranceType ? (
                      <>
                        <View style={styles.BotQuestion}>
                          <Text style={styles.BotText}>
                            Please provide me with a copy of your vehicle
                            licence (front and back)
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row-reverse'}}>
                          <View style={styles.answerBox}>
                            {VehicleBack !== '' && VehicleFront !== '' ? (
                              <View style={styles.row}>
                                <View style={styles.checkboxRight}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </View>
                                <Text style={styles.answerText}>
                                  Vehicle License uploaded
                                </Text>
                              </View>
                            ) : null}
                          </View>
                        </View>
                        <View style={{flexDirection: 'row-reverse'}}>
                          <View style={styles.answerBox}>
                            <View style={styles.row}>
                              <TouchableOpacity
                                style={
                                  VehicleFront !== ''
                                    ? styles.checkboxRight
                                    : styles.checkbox
                                }>
                                {console.log(VehicleFront, 'fromt')}
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  ✓
                                </Text>
                              </TouchableOpacity>
                              <Text style={styles.answerText}>
                                <ImageUploadModal
                                  {...{
                                    sendStateToParent: setVehicalFront,
                                    title: 'Front',
                                    background: 'no',
                                    color: imageUrl ? 'yes' : 'no',
                                    data: 'Vehicle_License_Card_Front',
                                    // data:''
                                  }}
                                />
                              </Text>
                            </View>

                            <View style={styles.row}>
                              <TouchableOpacity
                                //  onPress={()=>{setVehicalBack(true)}}
                                style={
                                  VehicleBack !== ''
                                    ? styles.checkboxRight
                                    : styles.checkbox
                                }>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  ✓
                                </Text>
                              </TouchableOpacity>

                              <Text style={styles.answerText}>
                                <ImageUploadModal
                                  {...{
                                    sendStateToParent: setVehicalBack,
                                    title: 'Back',
                                    background: 'no',
                                    color: imageUrl ? 'yes' : 'no',
                                    data: 'vehicle_License_back_card',

                                    // data:''
                                  }}
                                />
                              </Text>
                            </View>
                          </View>
                        </View>
                      </>
                    ) : null}
                    {VehicleFront ? (
                      VehicleBack ? (
                        <>
                          <View style={styles.BotQuestion}>
                            <Text style={styles.BotText}>
                              Can I have a copy of your Driving License (Front
                              and Back)
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row-reverse'}}>
                            <View style={styles.answerBox}>
                              {DrivingBack !== '' &&
                              DrivingFront !== '' &&
                              isDocNameValid ? (
                                <View style={styles.row}>
                                  <View style={styles.checkboxRight}>
                                    <Text
                                      style={{
                                        color: 'white',
                                        fontSize: 14,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      ✓
                                    </Text>
                                  </View>
                                  <Text style={styles.answerText}>
                                    Driving License uploaded
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>
                          <View style={{flexDirection: 'row-reverse'}}>
                            <View style={styles.answerBox}>
                              <View style={styles.row}>
                                <TouchableOpacity
                                  // onPress={()=>{setDrivingFront(true)}}
                                  style={
                                    DrivingFront !== '' && isDocNameValid
                                      ? styles.checkboxRight
                                      : styles.checkbox
                                  }>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </TouchableOpacity>
                                <Text style={styles.answerText}>
                                  <ImageUploadModal
                                    {...{
                                      sendStateToParent: setDrivingFront,
                                      title: 'Front',
                                      background: 'no',
                                      color: imageUrl ? 'yes' : 'no',
                                      data: 'Driving_License_Card_Front',
                                    }}
                                  />
                                </Text>
                              </View>

                              <View style={styles.row}>
                                <TouchableOpacity
                                  // onPress={()=>{setDrivingBack(true)}}
                                  style={
                                    DrivingBack !== ''
                                      ? styles.checkboxRight
                                      : styles.checkbox
                                  }>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </TouchableOpacity>

                                <Text style={styles.answerText}>
                                  <ImageUploadModal
                                    {...{
                                      sendStateToParent: setDrivingBack,
                                      title: 'Back',
                                      background: 'no',
                                      color: imageUrl ? 'yes' : 'no',
                                      // data: 'Driving_License_Card_Back',
                                      data: '',
                                      // Driving_License_Card_Front
                                      // vehicle_License_back_card
                                    }}
                                  />
                                </Text>
                              </View>
                            </View>
                          </View>
                        </>
                      ) : null
                    ) : null}
                    {DrivingBack ? (
                      DrivingFront && isDocNameValid ? (
                        !isDrivingLicenseExpired ? (
                          <>
                            <View style={styles.BotQuestion}>
                              <Text style={styles.BotText}>
                                Great thank you, now please provide a copy of
                                your Emirates ID (front and back) to proceed.
                              </Text>
                            </View>
                            <View style={{flexDirection: 'row-reverse'}}>
                              <View style={styles.answerBox}>
                                {EmiratesBack !== '' && EmiratesFront !== '' ? (
                                  <View style={styles.row}>
                                    <View style={styles.checkboxRight}>
                                      <Text
                                        style={{
                                          color: 'white',
                                          fontSize: 14,
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        ✓
                                      </Text>
                                    </View>
                                    <Text style={styles.answerText}>
                                      Emirates ID uploaded
                                    </Text>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                            <View style={{flexDirection: 'row-reverse'}}>
                              <View style={styles.answerBox}>
                                <View style={styles.row}>
                                  <TouchableOpacity
                                    // onPress={()=>{setEmiratesFront(true)}}
                                    style={
                                      EmiratesFront !== ''
                                        ? styles.checkboxRight
                                        : styles.checkbox
                                    }>
                                    <Text
                                      style={{
                                        color: 'white',
                                        fontSize: 14,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      ✓
                                    </Text>
                                  </TouchableOpacity>
                                  <Text style={styles.answerText}>
                                    <ImageUploadModal
                                      {...{
                                        sendStateToParent: setEmiratesFront,
                                        title: 'Front',
                                        background: 'no',
                                        color: imageUrl ? 'yes' : 'no',
                                        data: '',
                                      }}
                                    />
                                  </Text>
                                </View>

                                <View style={styles.row}>
                                  <TouchableOpacity
                                    // onPress={()=>{setEmiratesBack(true)}}
                                    style={
                                      EmiratesBack !== ''
                                        ? styles.checkboxRight
                                        : styles.checkbox
                                    }>
                                    <Text
                                      style={{
                                        color: 'white',
                                        fontSize: 14,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      ✓
                                    </Text>
                                  </TouchableOpacity>
                                  <Text style={styles.answerText}>
                                    <ImageUploadModal
                                      {...{
                                        sendStateToParent: setEmiratesBack,
                                        title: 'Back',
                                        background: 'no',
                                        color: imageUrl ? 'yes' : 'no',
                                        data: '',
                                      }}
                                    />
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </>
                        ) : null
                      ) : null
                    ) : null}

                    {formSubmitted === true && DrivingBack !== '' ? (
                      showCarImageUpload ? (
                        <>
                          <View style={styles.BotQuestion}>
                            <Text style={styles.BotText}>
                              {getYear() < time || getYear() === ''
                                ? `I noticed that your insurance has expired, please take a picture of your car and upload it so I can help you find the possible best quote.`
                                : `I see that you are looking to upgrade to comprehensive, please take a picture of your car and upload it so that I can assist you in finding the best possible deal.`}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row-reverse'}}>
                            <View style={styles.answerBox}>
                              {Carverified === true ? (
                                <View style={styles.row}>
                                  <View style={styles.checkboxRight}>
                                    <Text
                                      style={{
                                        color: 'white',
                                        fontSize: 14,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      ✓
                                    </Text>
                                  </View>
                                  <Text style={styles.answerText}>
                                    Car Pictures uploaded
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>

                          <View style={{flexDirection: 'row-reverse'}}>
                            <View style={styles.answerBox}>
                              <View style={styles.row}>
                                <TouchableOpacity
                                  // onPress={()=>{setcarImage1(true)}}
                                  style={
                                    carImage1 !== ''
                                      ? styles.checkboxRight
                                      : styles.checkbox
                                  }>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </TouchableOpacity>
                                <Text style={styles.answerText}>
                                  <ImageUploadModal
                                    {...{
                                      sendStateToParent: setcarImage1,
                                      title: '1',
                                      background: 'no',
                                      color: imageUrl ? 'yes' : 'no',
                                      data: '',
                                    }}
                                  />
                                </Text>
                              </View>

                              <View style={styles.row}>
                                <TouchableOpacity
                                  //  onPress={()=>{setcarImage2(true)}}
                                  style={
                                    carImage2 !== ''
                                      ? styles.checkboxRight
                                      : styles.checkbox
                                  }>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </TouchableOpacity>

                                <Text style={styles.answerText}>
                                  <ImageUploadModal
                                    {...{
                                      sendStateToParent: setcarImage2,
                                      title: '2',
                                      background: 'no',
                                      color: imageUrl ? 'yes' : 'no',
                                      data: '',
                                    }}
                                  />
                                </Text>
                              </View>
                              <View style={styles.row}>
                                <TouchableOpacity
                                  //  onPress={()=>{setcarImage3(true)}}
                                  style={
                                    carImage3 !== ''
                                      ? styles.checkboxRight
                                      : styles.checkbox
                                  }>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </TouchableOpacity>

                                <Text style={styles.answerText}>
                                  <ImageUploadModal
                                    {...{
                                      sendStateToParent: setcarImage3,
                                      title: '3',
                                      background: 'no',
                                      color: imageUrl ? 'yes' : 'no',
                                      data: '',
                                    }}
                                  />
                                </Text>
                              </View>
                              <View style={styles.row}>
                                <TouchableOpacity
                                  // onPress={()=>{setcarImage4(true)}}
                                  style={
                                    carImage4 !== ''
                                      ? styles.checkboxRight
                                      : styles.checkbox
                                  }>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontSize: 14,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    ✓
                                  </Text>
                                </TouchableOpacity>

                                <Text style={styles.answerText}>
                                  <ImageUploadModal
                                    {...{
                                      sendStateToParent: setcarImage4,
                                      title: '4',
                                      background: 'no',
                                      color: imageUrl ? 'yes' : 'no',
                                    }}
                                  />
                                </Text>
                              </View>
                            </View>
                          </View>
                        </>
                      ) : insuranceType !== 'Third-Party' ? (
                        <>
                          <View style={styles.BotQuestion}>
                            <Text style={styles.BotText}>
                              {getYear() < time || getYear() === ''
                                ? `I noticed that your insurance has expired, please take a picture of your car and upload it so I can help you find the possible best quote.`
                                : `I see that you are looking to upgrade to comprehensive, please take a picture of your car and upload it so that I can assist you in finding the best possible deal.`}
                            </Text>
                          </View>
                          {getYear() < time && (
                            <>
                              <View style={{flexDirection: 'row-reverse'}}>
                                <View style={styles.answerBox}>
                                  {Carverified === true ? (
                                    <View style={styles.row}>
                                      <View style={styles.checkboxRight}>
                                        <Text
                                          style={{
                                            color: 'white',
                                            fontSize: 14,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                          }}>
                                          ✓
                                        </Text>
                                      </View>
                                      <Text style={styles.answerText}>
                                        Car Pictures uploaded
                                      </Text>
                                    </View>
                                  ) : null}
                                </View>
                              </View>

                              <View style={{flexDirection: 'row-reverse'}}>
                                <View style={styles.answerBox}>
                                  <View style={styles.row}>
                                    <TouchableOpacity
                                      // onPress={()=>{setcarImage1(true)}}
                                      style={
                                        carImage1 !== ''
                                          ? styles.checkboxRight
                                          : styles.checkbox
                                      }>
                                      <Text
                                        style={{
                                          color: 'white',
                                          fontSize: 14,
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        ✓
                                      </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.answerText}>
                                      <ImageUploadModal
                                        {...{
                                          sendStateToParent: setcarImage1,
                                          title: '1',
                                          background: 'no',
                                          color: imageUrl ? 'yes' : 'no',
                                          data: '',
                                        }}
                                      />
                                    </Text>
                                  </View>

                                  <View style={styles.row}>
                                    <TouchableOpacity
                                      //  onPress={()=>{setcarImage2(true)}}
                                      style={
                                        carImage2 !== ''
                                          ? styles.checkboxRight
                                          : styles.checkbox
                                      }>
                                      <Text
                                        style={{
                                          color: 'white',
                                          fontSize: 14,
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        ✓
                                      </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.answerText}>
                                      <ImageUploadModal
                                        {...{
                                          sendStateToParent: setcarImage2,
                                          title: '2',
                                          background: 'no',
                                          color: imageUrl ? 'yes' : 'no',
                                          data: '',
                                        }}
                                      />
                                    </Text>
                                  </View>
                                  <View style={styles.row}>
                                    <TouchableOpacity
                                      //  onPress={()=>{setcarImage3(true)}}
                                      style={
                                        carImage3 !== ''
                                          ? styles.checkboxRight
                                          : styles.checkbox
                                      }>
                                      <Text
                                        style={{
                                          color: 'white',
                                          fontSize: 14,
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        ✓
                                      </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.answerText}>
                                      <ImageUploadModal
                                        {...{
                                          sendStateToParent: setcarImage3,
                                          title: '3',
                                          background: 'no',
                                          color: imageUrl ? 'yes' : 'no',
                                          data: '',
                                        }}
                                      />
                                    </Text>
                                  </View>
                                  <View style={styles.row}>
                                    <TouchableOpacity
                                      // onPress={()=>{setcarImage4(true)}}
                                      style={
                                        carImage4 !== ''
                                          ? styles.checkboxRight
                                          : styles.checkbox
                                      }>
                                      <Text
                                        style={{
                                          color: 'white',
                                          fontSize: 14,
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        ✓
                                      </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.answerText}>
                                      <ImageUploadModal
                                        {...{
                                          sendStateToParent: setcarImage4,
                                          title: '4',
                                          background: 'no',
                                          color: imageUrl ? 'yes' : 'no',
                                        }}
                                      />
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </>
                          )}
                        </>
                      ) : null
                    ) : null}
                    {/* Carverified === true && getYear() < time  */}
                    {Carverified === true || !Carverified ? (
                      <>
                        <View style={styles.BotQuestion}>
                          <Text style={styles.BotText}>
                            Please Upload your test result report to continue
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row-reverse'}}>
                          <View style={styles.answerBox}>
                            <View style={styles.row}>
                              <TouchableOpacity
                                // onPress={()=>{setTesResult(true)}}
                                style={
                                  TestResult !== ''
                                    ? styles.checkboxRight
                                    : styles.checkbox
                                }>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 14,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  ✓
                                </Text>
                              </TouchableOpacity>
                              <Text style={styles.answerText}>
                                <ImageUploadModal
                                  {...{
                                    sendStateToParent: setTesResult,
                                    title: 'Test Result Uploaded',
                                    background: 'no',
                                    color: imageUrl ? 'yes' : 'no',
                                  }}
                                />
                              </Text>
                            </View>
                          </View>
                        </View>
                      </>
                    ) : null}
                    {console.log(date - registrationDate, 'how much')}
                    {TestResult !== '' ? (
                      <>
                        {date - registrationDate < 3 &&
                        insuranceType !== 'Third-Party' ? (
                          <>
                            <View style={styles.BotQuestion}>
                              <Text style={styles.BotText}>
                                I’ve noticed that you are eligible for an agency
                                repair, would you like to consider this option?
                              </Text>
                            </View>
                          </>
                        ) : null}
                        <View style={{flexDirection: 'row-reverse'}}>
                          {repair !== '' ? (
                            <View style={styles.answerBox}>
                              <Text style={styles.answerText}>{repair}</Text>
                            </View>
                          ) : null}
                        </View>
                        {repair === 'Yes' ? (
                          <>
                            <View style={styles.BotQuestion}>
                              <Text style={styles.BotText}>
                                Have you had any accidents in the last 3 years?
                              </Text>
                            </View>
                            <View style={{flexDirection: 'row-reverse'}}>
                              {accident !== '' ? (
                                <View style={styles.answerBox}>
                                  <Text style={styles.answerText}>
                                    {accident}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </>
                        ) : null}
                        {accident === 'Yes' ? (
                          <View style={styles.BotQuestion}>
                            <Text style={styles.BotText}>
                              I’m very sorry to hear that, unfortunately due to
                              this you won’t be eligible for this option.
                            </Text>
                          </View>
                        ) : null}
                        {accident === 'No' ? (
                          <View style={styles.BotQuestion}>
                            <Text style={styles.BotText}>
                              That’s great to hear, I’ll be able to proceed with
                              this option for you.
                            </Text>
                          </View>
                        ) : null}

                        {isLoading ? (
                          <View
                            style={[
                              styles.BotQuestion,
                              {
                                flexDirection: 'column',
                                height: 'auto',
                              },
                            ]}>
                            <Text style={styles.BotText}>{isLoading}</Text>

                            {!isAPIError && (
                              <View style={{padding: 8, alignItems: 'center'}}>
                                <Bubbles size={3} color="#ff8c69">
                                  <ActivityIndicator />
                                </Bubbles>
                              </View>
                            )}
                          </View>
                        ) : null}
                      </>
                    ) : null}
                  </View>
                  {/* details  */}
                </>
              ) : (
                <>
                  <Text style={styles.FormHeading}>
                    Please check if the following details are correct
                  </Text>
                  <KeyboardAvoidingView style={styles.FormContainer}>
                    <View style={styles.formView}>
                      <Text style={styles.labelText}>License Number :</Text>
                      {console.log(DrivingFront.Output[0], 'back side')}
                      <TextInput
                        value={licenceNo}
                        onChangeText={(value) => setlicenceNo(value)}
                        placeholderTextColor="grey"
                        placeholder={`${
                          DrivingFront
                            ? parseFields(
                                DrivingFront.Output[0].data,
                                'license_no',
                              )
                            : ''
                        }`}
                        // placeholder="Samah Hamza"
                        style={styles.textInputstyle}
                        editable={true}
                      />
                    </View>
                    <View style={styles.formView}>
                      <Text style={styles.labelText}>DOB:</Text>
                      {/*<TextInput
                        onChangeText={(value) => setDob(value)}
                        value={Dob}
                        placeholderTextColor="grey"
                        placeholder={`${DrivingFront ? parseFields(DrivingFront.Output[0].data, "date of birth") : ""}`}
                        style={styles.textInputstyle}
                        editable={true}
                      />*/}
                      <DatePicker
                        style={{width: '100%'}}
                        date={Dob}
                        mode="date"
                        placeholder={`${
                          DrivingFront
                            ? parseFields(
                                DrivingFront.Output[0].data,
                                'date of birth',
                              )
                            : ''
                        }`}
                        format="DD-MM-YYYY"
                        minDate="01-01-1900"
                        maxDate="01-01-2080"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                          dateInput: styles.dateInput,
                          placeholderText: styles.dateInputPlaceholder,
                        }}
                        onDateChange={(date) => {
                          setDob(date);
                        }}
                      />
                    </View>
                    <View style={styles.formView}>
                      <Text style={styles.labelText}>Name:</Text>
                      <TextInput
                        onChangeText={(value) => setVehicleName(value)}
                        value={vehicleName}
                        placeholderTextColor="grey"
                        placeholder={`${
                          DrivingFront
                            ? parseFields(DrivingFront.Output[0].data, 'name')
                            : ''
                        }`}
                        // placeholder="Sedan"
                        style={styles.textInputstyle}
                        editable={true}
                      />
                    </View>
                    <View style={styles.formView}>
                      <Text style={styles.labelText}>Issue Date:</Text>
                      {/*<TextInput
                        onChangeText={(value) => setDrivingIssueDate(value)}
                        value={drivingIssueDate}
                        placeholderTextColor="grey"
                        placeholder={`${DrivingFront ? parseFields(DrivingFront.Output[0].data, "issue date") : ""}`}
                        // placeholder="Sedan"
                        style={styles.textInputstyle}
                        editable={true}
                      />*/}
                      <DatePicker
                        style={{width: '100%'}}
                        date={drivingIssueDate}
                        mode="date"
                        placeholder={`${
                          DrivingFront
                            ? parseFields(
                                DrivingFront.Output[0].data,
                                'issue date',
                              )
                            : ''
                        }`}
                        format="DD-MM-YYYY"
                        minDate="01-01-1990"
                        maxDate="01-01-2080"
                        showIcon={false}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: styles.dateInput,
                          placeholderText: styles.dateInputPlaceholder,
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                          setDrivingIssueDate(date);
                        }}
                      />
                    </View>
                    <View style={styles.formView}>
                      <Text style={styles.labelText}>Expiry Date:</Text>
                      {/*<TextInput
                        onChangeText={(value) => setDrivingExpiryDate(value)}
                        value={drivingExpiryDate}
                        placeholderTextColor="grey"
                        placeholder={`${DrivingFront ? parseFields(DrivingFront.Output[0].data, "exp date") : ""}`}
                        // placeholder="Sedan"
                        style={styles.textInputstyle}
                        editable={true}
                      />*/}
                      <DatePicker
                        style={{width: '100%'}}
                        date={drivingExpiryDate}
                        mode="date"
                        placeholder={`${
                          DrivingFront
                            ? parseFields(
                                DrivingFront.Output[0].data,
                                'exp date',
                              )
                            : ''
                        }`}
                        format="DD-MM-YYYY"
                        minDate="01-01-1990"
                        maxDate="01-01-2080"
                        showIcon={false}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: styles.dateInput,
                          placeholderText: styles.dateInputPlaceholder,
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                          setDrivingExpiryDate(date);
                        }}
                      />
                    </View>
                  </KeyboardAvoidingView>
                </>
              )}
            </View>
          ) : VehicleBack !== '' ? (
            <>
              <Text style={styles.FormHeading}>
                Please check if the following details are correct
              </Text>
              <KeyboardAvoidingView style={styles.FormContainer}>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Model Number:</Text>
                  {/* {console.log(VehicleFront?.Output[0]?.data[5])}
              {console.log(VehicleBack?.Output[0].data[2],'back side')} */}
                  <TextInput
                    value={modelNo}
                    onChangeText={(value) => setmodelNo(value)}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleBack
                        ? parseFields(VehicleBack?.Output[0]?.data, 'model')
                        : ''
                    }`}
                    // placeholder="Samah Hamza"
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Country of Origin:</Text>
                  <TextInput
                    onChangeText={(value) => setCountryOrigin(value)}
                    value={countryOrigin}
                    placeholderTextColor="grey"
                    // placeholder="19/04/1998"
                    placeholder={`${
                      VehicleBack
                        ? parseFields(VehicleBack?.Output[0]?.data, 'origin')
                        : ''
                    }`}
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}> Body Type:</Text>
                  <TextInput
                    onChangeText={(value) => setBodyType(value)}
                    value={bodyType}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleBack
                        ? parseFields(VehicleBack?.Output[0].data, 'origin1')
                        : ''
                    }`}
                    // placeholder="Sedan"
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Vehicle Type:</Text>
                  <TextInput
                    onChangeText={(value) => setvehicleType(value)}
                    value={vehicletype}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleBack
                        ? parseFields(
                            VehicleBack?.Output[0].data,
                            'vehicle_type',
                          )
                        : ''
                    }`}
                    // placeholder="4"
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Engine Number:</Text>
                  <TextInput
                    onChangeText={(value) => setEngineNo(value)}
                    value={engineNo}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleBack
                        ? parseFields(VehicleBack?.Output[0].data, 'engine_no')
                        : ''
                    }`}
                    // placeholder="20/01/2020"
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Chasis Number:</Text>
                  <TextInput
                    onChangeText={(value) => setchasisNo(value)}
                    value={chasisNo}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleBack
                        ? parseFields(VehicleBack?.Output[0].data, 'chassis_no')
                        : ''
                    }`}
                    // placeholder="Dubai"
                    style={[styles.textInputstyle, {textAlign: 'left'}]}
                    editable={true}
                  />
                </View>
              </KeyboardAvoidingView>
            </>
          ) : (
            <>
              <Text style={styles.FormHeading}>
                Please check if the following details are correct
              </Text>
              <KeyboardAvoidingView style={styles.FormContainer}>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Owner:</Text>
                  <TextInput
                    value={ownerName}
                    onChangeText={(value) => setOwnerName(value)}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(VehicleFront?.Output[0]?.data, 'owner')
                        : ''
                    }`}
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Plate Number:</Text>
                  {/* {console.log(VehicleBack,'data')} */}

                  {/* {console.log(VehicleBack?.Output[0].data[2],'back side')} */}
                  <TextInput
                    value={plateNo}
                    onChangeText={(value) => setPlateNo(value)}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(VehicleFront?.Output[0]?.data, 'plate_no')
                        : ''
                    }`}
                    // placeholder="Samah Hamza"
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>

                <View style={styles.formView}>
                  <Text style={styles.labelText}>Nationality:</Text>
                  <TextInput
                    onChangeText={(value) => setnationality(value)}
                    value={nationality}
                    placeholderTextColor="grey"
                    // placeholder="19/04/1998"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(
                            VehicleFront?.Output[0]?.data,
                            'nationality',
                          )
                        : ''
                    }`}
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}> Expiry Date:</Text>
                  {/*<TextInput
                    onChangeText={(value) => setExpiryDate(value)}
                    value={expiryDate}
                    placeholderTextColor="grey"
                    placeholder={`${VehicleFront ? parseFields(VehicleFront?.Output[0]?.data, "exp_date") : ""}`}
                    // placeholder="Sedan"
                    style={styles.textInputstyle}
                    editable={true}
                  />*/}
                  <DatePicker
                    style={{width: '100%', color: 'salmon'}}
                    date={expiryDate}
                    mode="date"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(VehicleFront?.Output[0]?.data, 'exp_date')
                        : ''
                    }`}
                    format="DD-MM-YYYY"
                    minDate="01-01-1990"
                    maxDate="01-01-2080"
                    showIcon={false}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: styles.dateInput,
                      placeholderText: styles.dateInputPlaceholder,
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      setExpiryDate(date);
                    }}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Insurance Expiry Date:</Text>
                  {/*<TextInput
                    onChangeText={(value) => setInsuranceExpData(value)}
                    value={InsuranceExpData}
                    placeholderTextColor="grey"
                    placeholder={`${VehicleFront ? parseFields(VehicleFront?.Output[0]?.data, "ins_exp") : ""}`}
                    // placeholder="4"
                    style={styles.textInputstyle}
                    editable={true}
                  />*/}
                  <DatePicker
                    style={{width: '100%'}}
                    date={InsuranceExpData}
                    mode="date"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(VehicleFront?.Output[0]?.data, 'ins_exp')
                        : ''
                    }`}
                    format="DD-MM-YYYY"
                    minDate="01-01-1990"
                    maxDate="01-01-2080"
                    showIcon={false}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: styles.dateInput,
                      placeholderText: styles.dateInputPlaceholder,
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      setInsuranceExpData(date);
                    }}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Policy Number:</Text>
                  <TextInput
                    onChangeText={(value) => setpolicyno(value)}
                    value={policyno}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(
                            VehicleFront?.Output[0]?.data,
                            'policy_no',
                          )
                        : ''
                    }`}
                    // placeholder="20/01/2020"
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Registration Date:</Text>
                  {/*<TextInput
                    onChangeText={(value) => setregistrationDate(value)}
                    value={registrationDate}
                    placeholderTextColor="grey"
                    placeholder={`${VehicleFront ? parseFields(VehicleFront?.Output[0]?.data, "reg_date") : ""}`}
                    // placeholder="Dubai"
                    style={[styles.textInputstyle, { textAlign: "left" }]}
                    editable={true}
                  />*/}
                  <DatePicker
                    style={{width: '100%'}}
                    date={registrationDate}
                    mode="date"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(VehicleFront?.Output[0]?.data, 'reg_date')
                        : ''
                    }`}
                    format="DD-MM-YYYY"
                    minDate="01-01-1990"
                    maxDate="01-01-2080"
                    showIcon={false}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: styles.dateInput,
                      placeholderText: styles.dateInputPlaceholder,
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      setregistrationDate(date);
                    }}
                  />
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>Previous Insurance Type:</Text>
                  <View
                    style={{
                      borderColor: '#ddd',
                      borderWidth: 1,
                      marginTop: 5,
                      borderRadius: 10,
                      color: '#ddd',
                    }}>
                    <Picker
                      selectedValue={vehicleInsuranceType}
                      style={{height: 40, width: '100%', color: '#848484'}}
                      onValueChange={(itemValue, itemIndex) =>
                        setVehicleInsuranceType(itemValue)
                      }>
                      <Picker.Item label="Select" value="" />
                      <Picker.Item
                        label="Comprehensive"
                        value="Comprehensive"
                      />
                      <Picker.Item label="Third Party" value="Third-Party" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.formView}>
                  <Text style={styles.labelText}>T C No:</Text>
                  <TextInput
                    value={t_c_no}
                    onChangeText={(value) => setTCNo(value)}
                    placeholderTextColor="grey"
                    placeholder={`${
                      VehicleFront
                        ? parseFields(VehicleFront?.Output[0]?.data, 't_c_no')
                        : ''
                    }`}
                    style={styles.textInputstyle}
                    editable={true}
                  />
                </View>
              </KeyboardAvoidingView>
            </>
          )}
        </View>
        {showChat2 === true ? (
          <Chat2
            insRange={insRange}
            saveData={saveFinalData}
            isAgencyRenewal={repair}
            InsType={insuranceType}
            vehicleTypeMaster={vehicleTypeMaster}
            vehicleBack={vehicleBack}
            vehicleFront={vehicleFront}
            drivingFront={drivingFront}
            userData={userData}
            vehicleSpecType={vehicleSpecType}
          />
        ) : null}
        {/*showChat2 === true VehicleFront={VehicleFront} VehicleBack={VehicleBack} DrivingFront={DrivingFront}*/}
      </ScrollView>
      {isForm === true ? (
        <TouchableOpacity
          onPress={() => {
            handleData('drivingFront');
            console.log(props.navigation.navigate, 'pp here here');
          }}
          style={{
            backgroundColor: '#fa7973',
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      ) : null}
      {console.log(VehicleFront, 'vv', isModal)}
      {VehicleFront !== '' && isModal === true ? (
        <TouchableOpacity
          onPress={() => {
            console.log('2 clicked');
            handleData('vehicleFront');
          }}
          style={{
            backgroundColor: '#fa7973',
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      ) : null}
      {VehicleBack !== '' && isModal === true ? (
        <TouchableOpacity
          onPress={() => {
            console.log('3 clicked');
            handleData('vehicleBack');
            console.log('here');
          }}
          style={{
            backgroundColor: '#fa7973',
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      ) : null}

      {isQuestion === true && insuranceType !== 'Third-Party' ? (
        <>
          <TouchableOpacity
            onPress={() => {
              setAccident('No');
              setIsQuestion(false);
            }}
            style={{
              backgroundColor: '#fa7973',
              height: 35,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              No
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              repair == 'Yes' ? setAccident('Yes') : setRepair('Yes');

              setIsQuestion(false);
            }}
            style={{
              backgroundColor: '#fa7973',
              height: 35,
              justifyContent: 'center',
              position: 'absolute',
              bottom: 37,
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              Yes
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  BotQuestion: {
    backgroundColor: '#0e0551',
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 8,
    borderTopLeftRadius: 5,
  },
  BotText: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 8,
    fontFamily: 'Mukta-Regular',
  },
  boxQuestion: {
    backgroundColor: '#f1f2f2',
    marginVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  boxQText: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    color: '#0e0551',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  answerBox: {
    // flexDirection:'row',
    marginHorizontal: 10,
    backgroundColor: '#f1f2f2',
    borderRadius: 20,
    borderTopRightRadius: 5,
    marginVertical: 8,
    minWidth: 80,
  },
  answerText: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#0e0551',
  },
  FormHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    width: '100%',
    marginTop: 40,
  },
  FormContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  textInputstyle: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 2,
    borderColor: '#ddd',
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#474747',
  },
  formView: {
    marginVertical: 8,
  },
  checkbox: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginLeft: 20,
  },
  checkboxRight: {
    backgroundColor: 'green',
    width: 20,
    height: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginLeft: 20,
  },
  dateInput: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 2,
    borderColor: '#ddd',
    width: '100%',
    height: 33,
    alignItems: 'flex-start',
  },
  dateInputPlaceholder: {
    color: '#848484',
  },
  button: {
    backgroundColor: '#fa7a72',
    marginHorizontal: 50,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
});
ChatScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: () => (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={BobImg}
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#d4f4fc',
            borderRadius: 50,
            marginRight: 5,
            marginLeft: -5,
          }}
        />

        <Text style={{alignSelf: 'center'}}>Bob</Text>
      </View>
    ),
  };
};

export default ChatScreen;
