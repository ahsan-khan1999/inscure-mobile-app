import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  AppState,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  Slider,
  Share,
  Image, ActivityIndicator,
} from "react-native";
import BobImg from "../assets/imgpsh_fullsize_anim.jpeg";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import LoaderUI from "../components/LoaderUI";
import { useState } from "react";
import { Bubbles } from 'react-native-loader';
import Email from "../assets/mail.png";
import Whatsapp from "../assets/whatsapp.png";
// import Pdf from 'react-native-pdf';
// import PDFView from 'react-native-view-pdf';
import PDFView from "react-native-view-pdf/lib/index";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";



const useMount = (func) => React.useEffect(() => func(), []);
const useInitialURL = () => {
  const [url, setUrl] = React.useState(null);
  const [processing, setProcessing] = React.useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();

  });

  return { url, processing };
};

const ChatScreen2 = (props) => {
  const [loader, setLoader] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [planName, setplanName] = React.useState("");
  const [isQuestion, setIsQuestion] = React.useState(false);
  const [planRange, setplanRange] = React.useState("");
  const [paynow, setpayNow] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [sliderPrice, setsliderPrice] = useState("");
  const [buyPolicy, setBuyPolicy] = useState("");
  const [policyData, setPolicyData] = React.useState("");
  const [payurl, setpayurl] = React.useState("");
  const [payError, setpayError] = React.useState(false);
  const [paymentAmount, setpaymentAmount] = React.useState("");
  const { url: initialUrl, processing } = useInitialURL();
  const [QuoteNo, setQuoteNo] = React.useState("");
  const [biguri, setbiguri] = React.useState("");
  const [documentName, setdocumentName] = React.useState("");
  const [paymentResponse, setPaymentResponse] = React.useState("");
  const [carModelData, setCarModelData] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [VehicleFront, setVehicleFront] = React.useState("");
  const [VehicleBack, setVehicleBack] = React.useState("");
  const [DrivingFront, setDrivingFront] = React.useState("");
  const [fidelityLogin, setFidelityLogin] = React.useState("");
  const [fidelityQuotation, setFidelityQuotation] = React.useState("");
  const [fidelityQuoteWithPlan, setFidelityQuoteWithPlan] = React.useState("");
  const [fidelityAdditionalInfo, setFidelityAdditionalInfo] = React.useState("");
  const [fidelityApprovePolicy, setFidelityApprovePolicy] = React.useState("");
  const [fidelityPolicy, setfidelityPolicy] = React.useState("");
  const [userData, setuserData] = React.useState("");
  const [vehicleTypeMaster, setVehicleTypeMaster] = React.useState("");
  const [isPlanLoaded, setIsPlanLoaded] = React.useState("");
  const [vehicleModelData, setVehicleModelData] = React.useState("");
  const [awnicRawData, setAwnicRawData] = React.useState("");
  const [policyDocLink, setPolicyDocLink] = React.useState("");
  const [customSliderPrice, setCustomSliderPrice] = React.useState("");
  const [isAPIError, setIsAPIError] = React.useState(false);

  async function openGateWay(transactionID) {
    const { addNewOrderGatewayToken } = props;
    const url = `https://insurcue.com/payment.php?TransactionID=${transactionID}`;
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      // props.dispatch(setPaymentStatus('checked'))
      Linking.openURL(url);
    }
  }

  // const VehicleFront = {
  //   "modelName": "Vehicle_License_Card_Front",
  //   "userName": "tfai_trainer",
  //   "sessionId": 4745,
  //   "Output": [
  //     {
  //       "tableData": [],
  //       "data": [
  //         {
  //           "fieldName": "place_of_issue",
  //           "fieldValue": ""
  //         },
  //         {
  //           "fieldName": "owner",
  //           "fieldValue": "MUNA SHAMBEYA HASAN ALBLOOSHI"
  //         },
  //         {
  //           "fieldName": "nationality",
  //           "fieldValue": "EMIRATES"
  //         },
  //         {
  //           "fieldName": "t_c_no",
  //           "fieldValue": "1980084521"
  //         },
  //         {
  //           "fieldName": "exp_date",
  //           "fieldValue": "05-02-2021"
  //         },
  //         {
  //           "fieldName": "reg_date",
  //           "fieldValue": "10-09-2019"
  //         },
  //         {
  //           "fieldName": "ins_exp",
  //           "fieldValue": "05-03-2021"
  //         },
  //         {
  //           "fieldName": "mortgage",
  //           "fieldValue": ""
  //         },
  //         {
  //           "fieldName": "plate_no",
  //           "fieldValue": "12/49055"
  //         },
  //         {
  //           "fieldName": "policy_no",
  //           "fieldValue": "SH2030/20/00182"
  //         },
  //         {
  //           "fieldName": "private",
  //           "fieldValue": ""
  //         },
  //         {
  //           "fieldName": "veh_type",
  //           "fieldValue": ""
  //         }
  //       ]
  //     }
  //   ]
  // };
  // const VehicleBack = {
  //   "modelName": "vehicle_License_back_card",
  //   "userName": "tfai_trainer",
  //   "sessionId": 4746,
  //   "Output": [
  //     {
  //       "tableData": [],
  //       "data": [
  //         {
  //           "fieldName": "origin",
  //           "fieldValue": "JAPAN"
  //         },
  //         {
  //           "fieldName": "model",
  //           "fieldValue": "2015"
  //         },
  //         {
  //           "fieldName": "number_of_pass",
  //           "fieldValue": "5"
  //         },
  //         {
  //           "fieldName": "vehicle_type",
  //           "fieldValue": "ALFA ROMEO 159"
  //         },
  //         {
  //           "fieldName": "engine_no",
  //           "fieldValue": null
  //         },
  //         {
  //           "fieldName": "chassis_no",
  //           "fieldValue": "JTMDF9EV2FD151805"
  //         },
  //         {
  //           "fieldName": "origin1",
  //           "fieldValue": "Wagon"
  //         }
  //       ]
  //     }
  //   ]
  // }
  // const DrivingFront = {
  //   "modelName": "Driving_License_Card_Front",
  //   "userName": "tfai_trainer",
  //   "sessionId": 4790,
  //   "Output": [
  //     {
  //       "tableData": [],
  //       "data": [
  //         {
  //           "fieldName": "name",
  //           "fieldValue": "ABEER YOUNUS AALMULLA"
  //         },
  //         {
  //           "fieldName": "nationality",
  //           "fieldValue": "U.A.E."
  //         },
  //         {
  //           "fieldName": "place of issue",
  //           "fieldValue": "Umm AlQaiwain"
  //         },
  //         {
  //           "fieldName": "license_no",
  //           "fieldValue": "52016"
  //         },
  //         {
  //           "fieldName": "date of birth",
  //           "fieldValue": "30-Jan-95"
  //         },
  //         {
  //           "fieldName": "issue date",
  //           "fieldValue": "30-Jan-13"
  //         },
  //         {
  //           "fieldName": "exp date",
  //           "fieldValue": "03-Jan-27"
  //         }
  //       ]
  //     }
  //   ]
  // };


  async function setAsyncData() {
    // fetchVehicleType();

    let vehicleFront = JSON.parse(await AsyncStorage.getItem("VEhicleFront"));
    let vehicleBack = JSON.parse(await AsyncStorage.getItem("VEhicleBack"));
    let drivingFront = JSON.parse(await AsyncStorage.getItem("drivingFront"));
    let userData = JSON.parse(await AsyncStorage.getItem("LoginData"));
    setVehicleBack(vehicleBack);
    setVehicleFront(vehicleFront);
    setDrivingFront(drivingFront);
    setuserData(userData);
    // formatFidelityDateWithAlphaMonth(drivingFront.IssueDate)
    console.log("tets adtae ", typeof (vehicleFront.RegistrationDate));
    console.log("gthis is driving selected adate", vehicleFront.RegistrationDate);
    // if(props.vehicleTypeMaster){
    //   setVehicleTypeMaster(props.vehicleTypeMaster);
    //   console.log('this is vheicle type master data ',vehicleTypeMaster);
    // }

    console.log("testing async data");

  }

  // function fetchVehicleType(){
  //   let myHeaders = new Headers();
  //   myHeaders.append("Partner-Id", "DOWALI");
  //   myHeaders.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
  //   myHeaders.append("Content-Type", "application/json");
  //
  //   let raw = JSON.stringify({"masterType":"VEHICLE_MAKE_MODEL"});
  //
  //   let requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };
  //
  //   fetch("https://insurance.awnic.com/InsureApi/API/motor/masterData", requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       result = JSON.parse(result);
  //       setVehicleTypeMaster(result);
  //     })
  //     .catch(error => console.log('error', error));
  // }


  React.useEffect(() => {
    setAsyncData();
    if (planRange === "Yes") {
      console.log("this is vehicle Master Data");

      console.log("testing data");

      let myHeaders1 = new Headers();
      myHeaders1.append("Partner-Id", "DOWALI");
      myHeaders1.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
      myHeaders1.append("Content-Type", "application/json");

      let raw1 = JSON.stringify({ masterType: "VEHICLE_MAKE_MODEL" });

      let requestOptions1 = {
        method: "POST",
        headers: myHeaders1,
        body: raw1,
        redirect: "follow",
      };

      setIsPlanLoaded("Please wait while we fetch plans for you");
      fetch(
        "https://insurance.awnic.com/InsureApi/API/motor/masterData",
        requestOptions1,
      )
        .then((response) => response.text())
        .then((result) => {
          result = JSON.parse(result);
          setBuyPolicy(result);
          setVehicleTypeMaster(result);
          // console.log(result,'popopo')
          // console.log('this is buypolicy ',buyPolicy);
        })
        .catch((error) => {
          setIsPlanLoaded("Unable to fetch vehicle model in Master Data");
          setIsAPIError(true);
          alert(error);
          console.log("error in master data", error);
        });
    }
  }, [planRange]);

  React.useEffect(() => {
    if (buyPolicy) {
      console.log("test");
      let modelData = searchVehicleData();
      console.log("this is model data for testing ------+", modelData);
      // console.log('this is model data',modelData.makeCode);

      if (modelData) {

        var myHeaders = new Headers();
        myHeaders.append("Partner-Id", "DOWALI");
        myHeaders.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          makeCode: modelData.makeCode,
          modelCode: modelData.code,
          sumInsured: "0",
          mfgYear: VehicleBack ? (VehicleBack.ModelNumber).trim() : "",
          isAgencyYN: props.isAgencyRenewal === "Yes" ? "Y" : "N",
          isAWNICRenewalYN: "N",
          noClaimYear: "0",
        });


        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://insurance.awnic.com/InsureApi/API/motor/calcPremiumMulti",
          requestOptions,
        )
          .then((response) => response.text())
          .then((result) => {
            result = JSON.parse(result);
            if (result?.errorList === null) {
              console.log("this is policy data", result);
              setPolicyData(result);
              setIsPlanLoaded("");
            } else {
              let errorMsg = "";
              result.errorList.forEach(function(item) {
                errorMsg += item.desc + ".";
              });
              setIsPlanLoaded("Unable to fetch plan");
              setIsAPIError(true);
              alert(errorMsg);
            }

            console.log("this is nationality data ", nationality);
            console.log(result, "re re 3");
          })
          .catch((error) => {
            setIsPlanLoaded("Unable to fetch Calculated Premium");
            setIsAPIError(true);
            console.log("error in calc premium", error);
          });
      } else {
        alert("Unable to find vehicle model type");
        setIsPlanLoaded("Unable to find vehicle model type");
        setIsAPIError(true);
      }

    }

    console.log("testing is going on");
  }, [buyPolicy]);


  React.useEffect(() => {
    if (policyData && date) {
      var myHeaders = new Headers();

      let modelData = searchVehicleData();

      let t = VehicleFront ? VehicleFront.RegistrationDate : "";
      let registrationDate = formatDateWithoutAlphaAwnic(t);

      console.log("this is reg date", date);

      myHeaders.append("Partner-Id", "DOWALI");
      myHeaders.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
      myHeaders.append("Content-Type", "application/json");
      let quoteDate = Date.now();
      var raw = JSON.stringify({
        motorInsuredInfo: {
          customerType: "Individual",
          firstName: DrivingFront ? DrivingFront.Name : "",
          lastName: ".",
          contactNo: userData.phone,
          nationality: "1001",
          address: DrivingFront ? (DrivingFront.PlaceOfIssue === "" ? "Dubai" : DrivingFront.PlaceOfIssue) : "",
        },
        motorPolicyInfo: {
          quoteNo: `XAD${quoteDate}`,
          quoteProcessBy: "AL DOWALI",
          policyStartDate: formatDate(date),
          policyEndDate: formEndDate(date),
          productCode: policyData.premiumInfo[0].productCode,
          assuredCode: "150200",
          customerCode: "150200",
          brokerCode: "150200",
          paymentMode: "On Account",
          paymentReceiptNo: "",
        },
        motorPremiumInfo: {
          currency: "AED",
          currencyRate: 1,
          grossPremium: policyData.premiumInfo[0].finalPremiumAmt,
          vatAmount: policyData.premiumInfo[0].finalPremiumVat,
        },
        motorVehicleInfo: {
          isBrandNewYN: "N",
          plateNo: VehicleFront ? VehicleFront.Plateno : "",
          plateCode: "001",
          plateCategory: "001",
          registrationLocation: "02",
          transactionType: "Vehicle Renewal",
          isMortgageYN: VehicleFront ? (VehicleFront.Mortgage === "" ? "N" : "Y") : "N",
          makeCode: modelData.makeCode ?? "",
          modelCode: modelData.code ?? "",
          noOfCylinderCode: modelData.noOfCylinderCode ?? "",
          mfgYear: VehicleBack ? (VehicleBack.ModelNumber).trim() : "",
          bodyType: "236",
          chassisNo: VehicleBack ? VehicleBack.ChasisNumber : "",
          engineNo: VehicleBack ? VehicleBack.EngineNumber : "",
          color: "401",
          seatingCapacity: modelData.noOfPassenger ?? "",
          usageType: "101",
          sumInsured: sliderPrice,
          tcnNo: VehicleFront ? (VehicleFront.TCNo).trim() : "",
          registeredDate: registrationDate,
          isAgencyYN: props.isAgencyRenewal === "Yes" ? "Y" : "N",
          covers: [],
        },
      });

      setAwnicRawData(JSON.parse(raw));
      console.log("this is raw data ---->", raw);


      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://insurance.awnic.com/InsureApi/API/motor/buyPolicy",
        requestOptions,
      )
        .then((response) => response.text())
        .then(async (result) => {
          console.log(result, "buyplicy");
          let response = await JSON.parse(result);
          console.log("this is response data ", response);
          if (response.errorList === null) {
            setQuoteNo(response.motorPolicyInfo.policyDocId);

          } else {
            let errorMsg = "";
            response.errorList.forEach(function(item) {
              errorMsg += item.desc + ". ";
            });

            alert(errorMsg);
          }
          console.log("this is buy awnic policy data", response);

        })
        .catch((error) => {
          alert(error.toString());
          console.log("error in buy policy", error);
        });
    }
  }, [policyData, date]);


  React.useEffect(() => {
    if (sliderPrice !== "") {
      setIsQuestion(true);
    }
  }, [sliderPrice]);

  //executing fidelity apis

  React.useEffect(() => {
    console.log("this is vehicle back data ?????", VehicleBack);
    // if (props.vehicleBack.BodyType === "Sedan") {
    //   fetch("http://132.145.186.226:5000/insurecue/insuranceAccessToken?pUserId=brkapi@uic.com&pUserPassword=123456",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({}),
    //       redirect: "follow",
    //     })
    //     .then(response => response.text())
    //     .then(result => {
    //       result = JSON.parse(result);
    //       setFidelityLogin(result);
    //       console.log("this is logindata", result.result1);
    //     })
    //     .catch(error => console.log("error", error));
    // } else {
    //   alert("Pricing not available for selected models.");
    // }
  }, [planRange]);

  React.useEffect(() => {
    if (fidelityLogin?.result1?.Data[0]?.Token) {

      console.log("this is fidelity data ----> ", fidelityLogin);

      let modelData = searchVehicleData();
      console.log("without alpha", formatFidelityDateWithoutAlphaMonth("06-04-17"));
      console.log("with alpha", formatFidelityDateWithAlphaMonth("11-Jan-2021"));

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      //formatFidelityDateWithAlphaMonth(DrivingFront.IssueDate)
      //DrivingFront.DriverNationality

      var raw = JSON.stringify({
        "pData": {
          "Authentication": {
            "Token": fidelityLogin.result1.Data[0].Token,
            "UserId": "brkapi@uic.com",
          },
          "Data": {
            "AgentCode": "BRK0000264",
            "POLPREVEXPDT": formatFidelityDateWithoutAlphaMonth(VehicleFront.InsuranceExp),
            "POLPREVPOLNO": "",
            "POLPRODUCT": props.InsType === "Comprehensive" ? "4001_1" : "4021",
            "CLMFREEYR": 3,
            "VEHNOOFDOOR": "4",
            "POLPREVINSCOMP": "",
            "INSRCODE": "",
            "INSRNAME": DrivingFront.Name,
            "INSREMAIL": userData.email,
            "INSRDOB": formatFidelityDateWithAlphaMonth(DrivingFront.DOB),
            "INSRTYPE": "100",
            "INSRDRVLICENSENO": DrivingFront.LicenseNumber,
            "INSRDRVLICENSEDT": "10/04/2019",
            "INSRDRVLICENSEEMIRATE": "",
            "INSRMOBILENO": userData.phone,
            "INSRPHONENO": "",
            "INSRNATIONALITY": "039",
            "INSRTRADELICENSENO": "",
            "INSRPASSPORTNO": "",
            "INSREMPLOYER": "",
            "INSRADDRESS1": "DUBAI",
            "INSRADDRESS2": "Al Raffa",
            "INSRPOBOXNO": "",
            "INSREMIRATEID": "111111111111111",
            "INSRPROFESSION": "",
            "VEHTYPE": "1001",
            "VEHMANFYEAR": "2011",
            "VEHMAKE": "0304",
            "VEHMODEL": "0304027",
            "VEHTRIM": "LT",
            "VEHBODYTYPE": "082",
            "VEHENGINESIZE": "1.8 L",
            "VEHTRANSMISISION": "AUTOMATIC",
            "VEHREGION": "GCC",
            "VEHVALUE": 0,
            "VEHLOADINGCAP": "0",
            "VEHNOOFCYLINDER": "1004",
            "VEHNOOFPASSENGER": modelData.noOfPassenger ?? 5,
            "VEHMANFCOUNTRY": "",
            "VEHBRANDNEWYN": "N",
            "VEHDOF": formatFidelityDateWithoutAlphaMonth(VehicleFront.RegistrationDate),
            "VEHFROMDT": formatFidelityDateWithoutAlphaMonth(VehicleFront.InsuranceExp),
            "VEHAGENCYREPYN": "N",
            "VEHREGNEMIRATE": "DXB",
            "VEHCHASSISNO": VehicleBack.ChasisNumber,
            "VEHPLATECODE": "10512",
            "VATREGNO": "54687",
            "VEHREGNO": "48121",
            "VEHTCFNO": "13058658",
            "INSRNAMEL2": DrivingFront.Name,
            "REGISTRATION": 0,
            "VEHCOLOR": "002",
            "POLSCHEMECODE": "ALL",
          },
        },
      });

      console.log("this is quotation raw data ", raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://132.145.186.226:5000/insurecue/createquotation", requestOptions)
        .then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          if (result.data === undefined) {
            setFidelityQuotation(result);
            console.log("this is quotation data ", result);
          } else {
            console.log("this is create quotation ", result);
            alert("Unable to create fidelity quotation");
          }


        })
        .catch(error => console.log("error", error));
    }

  }, [fidelityLogin]);

  React.useEffect(() => {
    if (fidelityQuotation?.result1?.Covers) {
      console.log("this is fidelity quotation ", fidelityQuotation.result1.Covers);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let covers = [];
      fidelityQuotation.result1.Covers.forEach(function(item) {
        let coverDetails = {
          "Code": item.Code,
          "CvrType": item.CvrType,
          "Premium": item.Premium,
        };
        covers.push(coverDetails);
      });
      console.log("this is the cover arra", covers);

      var raw = JSON.stringify({
        "pData": {
          "Authentication": {
            "Token": fidelityLogin.result1.Data[0].Token,
            "UserId": "brkapi@uic.com",
          },
          "SelectedCoverData": [
            {
              "QuotNo": fidelityQuotation.result1.QuotationNo,
              "ProdCode": props.InsType ?? (props.InsType === "Comprehensive" ? "4001_1" : "4021") ?? "4021",
              "SelectedCovers": covers,
            },
          ],
        },
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://132.145.186.226:5000/insurecue/saveQuoteWithPlan", requestOptions)
        .then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          setFidelityQuoteWithPlan(result);
          console.log("this is fidelity with plan data ", result);
        })
        .catch(error => console.log("error", error));
    }
  }, [fidelityQuotation]);


  React.useEffect(() => {
    if (fidelityQuoteWithPlan?.result1) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("pData", "{\n" +
        " \t\"Authentication\": {\n" +
        "\t\t\"Token\": \"" + fidelityLogin.result1.Data[0].Token + "\",\n" +
        "\t\t\"UserId\": \"brkapiabu@uic.com\"\n" +
        "\t},\n" +
        " \t\"ApprovePolicyData\": {\n" +
        " \t\t\"QuotNo\": \"" + fidelityQuotation.result1.QuotationNo + "\"\n" +
        " \t}\n" +
        " }");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("https://iirisapi.fidelityunited.ae/IirisApiServices.asmx/ApprovePolicy", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log("this is approval policy ", result);
          setFidelityApprovePolicy(result);
        })
        .catch(error => console.log("error", error));
    }
  }, [fidelityQuoteWithPlan]);


  React.useEffect(() => {


    if (fidelityQuotation?.result1) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("pData", "{\n" +
        " \t\"Authentication\": {\n" +
        "\t\t\"Token\": \"" + fidelityLogin.result1.Data[0].Token + "\",\n" +
        "\t\t\"UserId\": \"brkapiabu@uic.com\"\n" +
        "\t},\n" +
        " \t\"ViewPolicySummaryData\": {\n" +
        " \t\t\"QuotNo\": \"" + fidelityQuotation.result1.QuotationNo + "\"\n" +
        " \t}\n" +
        " }");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch("https://iirisapi.fidelityunited.ae/IirisApiServices.asmx/ViewPolicySummary", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));


      console.log("testing policy data>>>>", fidelityLogin.result1.Data[0].Token);
      console.log("this is quote no >>>>>", fidelityQuotation.result1.QuotationNo);
      let xmls = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <ViewPolicySummary xmlns="http://www.assuretech.in/">
        <pData>{
          "Authentication": {
           "Token":  "${fidelityLogin.result1.Data[0].Token}",
           "UserId": "brkapiabu@uic.com"
         },
          "ViewPolicySummaryData": {
            "QuotNo": "${fidelityQuotation.result1.QuotationNo}"
          }
        }</pData>
      </ViewPolicySummary>
    </soap:Body>
  </soap:Envelope>`;

      axios
        .post("https://iirisapi.fidelityunited.ae/IirisApiServices.asmx", xmls, {
          headers: {
            SOAPAction: "http://www.assuretech.in/ViewPolicySummary",
            "Content-Type": "text/xml",
          },
        })
        .then((res) => {
          var parseString = require("xml2js").parseString; //here i'm using a library colled xml2js to parse the respanse from xml to js object
          var stripNS = require("xml2js").processors.stripPrefix;
          const options = {
            tagNameProcessors: [stripNS],
            explicitArray: false,
          };
          parseString(res.data, options, function(err, result) {
            if (JSON.parse(result.Envelope.Body.ViewPolicySummaryResponse
              .ViewPolicySummaryResult)?.Status === undefined) {
              setfidelityPolicy(
                JSON.parse(
                  result.Envelope.Body.ViewPolicySummaryResponse
                    .ViewPolicySummaryResult,
                ),
              );
            } else {
              axios
                .post("https://iirisapi.fidelityunited.ae/IirisApiServices.asmx", xmls, {
                  headers: {
                    SOAPAction: "http://www.assuretech.in/ViewPolicySummary",
                    "Content-Type": "text/xml",
                  },
                })
                .then((res) => {
                  var parseString = require("xml2js").parseString; //here i'm using a library colled xml2js to parse the respanse from xml to js object
                  var stripNS = require("xml2js").processors.stripPrefix;
                  const options = {
                    tagNameProcessors: [stripNS],
                    explicitArray: false,
                  };
                  parseString(res.data, options, function(err, result) {
                    if (JSON.parse(result.Envelope.Body.ViewPolicySummaryResponse
                      .ViewPolicySummaryResult)?.Status === undefined) {
                      setfidelityPolicy(
                        JSON.parse(
                          result.Envelope.Body.ViewPolicySummaryResponse
                            .ViewPolicySummaryResult,
                        ),
                      );
                    }
                    console.log("ABC 44", result.Envelope.Body.ViewPolicySummaryResponse
                      .ViewPolicySummaryResult);
                    //  console.log(result.Envelope.Body.ViewPolicySummaryResponse.ViewPolicySummaryResult,'return of body');//get the value from the respanse object
                  });

                })
                .catch((err) => {
                  console.error(err);
                  alert(err);
                });
            }


            console.log("ABC 42", result.Envelope.Body.ViewPolicySummaryResponse
              .ViewPolicySummaryResult);
            //  console.log(result.Envelope.Body.ViewPolicySummaryResponse.ViewPolicySummaryResult,'return of body');//get the value from the respanse object
          });

        })
        .catch((err) => {
          console.error(err);
          alert(err);
        });
    }
  }, [fidelityQuoteWithPlan]);


  // function for getting correct field from response data
  function parseFields(data, field) {
    let itemValue = "";
    data.forEach(function(item) {
      if (item.fieldName == field) {
        itemValue = item.fieldValue;
      }
    });
    return itemValue;
  }


  //function to search vehicle in buy policy data
  function searchVehicleData() {
    let modelData = "";

    console.log("master json data is here ----> ", props.vehicleTypeMaster);
    console.log("vehicle back data is here ----> ", VehicleBack);
    console.log("this is test$$$$", props.vehicleTypeMaster);
    if (VehicleBack && props.vehicleTypeMaster) {
      // let vehicleType = parseFields(props.VehicleBack.Output[0].data, "vehicle_type");
      let vehicleType = props.vehicleSpecType ?? VehicleBack.VehicleType ?? "";
      console.log("vdehicle type ---->", vehicleType);
      // let t = vehicleType.split(" ");
      // let pattern = new RegExp(vehicleType, 'i');
      // console.log('this is pattern ',pattern);
      props.vehicleTypeMaster.masterData.forEach(function(item) {
        item.model.forEach(function(model) {
          let m = model.name.toLowerCase();
          if (m.includes(vehicleType.toLowerCase())) {
            console.log("pattern matched here for model ", model.name);
            modelData = model;
            modelData["makeCode"] = item.code;
          }
        });
      });
    }
    console.log("this is testing data for model ", modelData);
    setVehicleModelData(modelData);
    return modelData;
  }


  function paymentRedirect() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
      Registration: {
        // Currency: "AED",
        // ReturnPath: "https://insurcue.com/response.php",
        // TransactionHint: "CPT:Y;VCC:Y;",
        // OrderID: "2021040100008",
        // Store: "0000",
        // Terminal: "0000",
        // Channel: "Web",
        // Amount: paymentAmount,
        // Customer: "Demo Merchant",
        // OrderName: "Paybill",
        // UserName: "Demo_fY9c",
        // Password: "Comtrust@20182018",
        Currency: "AED",
        ReturnPath: "https://insurcue.com/response.php",
        TransactionHint: "CPT:Y;VCC:Y;",
        OrderID: "202104010456",
        Store: "0000",
        Terminal: "0000",
        Channel: "Web",
        Amount: paymentAmount,
        Customer: "AL ITTIHAD DOWALI",
        OrderName: "Paybill",
        UserName:"CHANDRESH_DOWALI",
        Password:"Dowali@al032021"
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ipg.comtrust.ae:2443", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setpayError(false);
        setpayNow(false);
        let url = JSON.parse(result);
        console.log('transaction url -----',url.Transaction.TransactionID);
        openGateWay(url.Transaction.TransactionID);
        // console.log(`https://insurcue.com/payment.php?TransactionID=${url.Transaction.TransactionID}`,'url')
        // Linking.openURL(`https://insurcue.com/payment.php?TransactionID=${url.Transaction.TransactionID}`)
        setpayurl(url.Transaction.TransactionID);
        setbiguri("");
        setTimeout(function() {
          checkPayment(url.Transaction.TransactionID);
        }, 5000);
      })
      .catch((error) => console.log("error", error));
  }

  function checkPayment(TransactionID) {
    console.log(AppState, "appsata");
    if (AppState.currentState === "active") {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        Finalization: {
          TransactionID: TransactionID,
          // Customer: "Demo Merchant",
          // UserName: "Demo_fY9c",
          // Password: "Comtrust@20182018",
          Customer: "AL ITTIHAD DOWALI",
          UserName:"CHANDRESH_DOWALI",
          Password:"Dowali@al032021"
        },
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://ipg.comtrust.ae:2443", requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          console.log(result, "sucess");
          let respanse = await JSON.parse(result);
          console.log(respanse.Transaction.ResponseCode, "awaiting");
          if (respanse.Transaction.ResponseCode == "0") {
            setPaymentResponse(respanse);
            setpayNow(true);
            setpayError(false);
            // getbuypolicy();
            downloadDocument(QuoteNo);
          } else if (respanse.Transaction.ResponseCode !== "0") {
            setpayError(true);
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  async function actualDownload() {
    props.saveData(fidelityPolicy, policyData, paymentResponse, planName, vehicleModelData, awnicRawData, sliderPrice, policyDocLink, QuoteNo);
    if (planName === "Plan 2") {
      let fidelityDoc = JSON.stringify({
        pdfurl: fidelityPolicy.Documents[0][0].Schdule,
      });
      console.log("this is fidelity document ", fidelityPolicy);
      // getpolicyDocument(fidelityDoc);
      setPolicyDocLink(fidelityPolicy.Documents[0][0].Schdule);
      shareDoc(JSON.parse(result));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      // var raw = JSON.stringify({
      //   documentContent: biguri,
      //   documentName: 'Policy.pdf',
      // });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          documentContent: biguri,
          documentName: documentName,
        }),
        redirect: "follow",
      };

      fetch("https://insurcue.com/pdf.php", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result, "download");
          result = JSON.parse(result);
          // getpolicyDocument(result);
          setPolicyDocLink(result.pdfurl);
          shareDoc(result);
        })
        .catch((error) => console.log("error", error));
    }
    //if all data is proper call save data function here

  }

  function getpolicyDocument(doc) {
    let document = JSON.parse(doc);
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: documentName,
        fileCache: true,
        path: `/storage/emulated/0/Insurcue/${documentName}`,
        // path: `${dirs.DownloadDir} `+ '/'+ 'Downloads'+'.pdf',
      },
    })
      // .fetch('GET', `http://132.145.186.226:5000/insurecue/${resources}`, {})
      .fetch("GET", `${document.pdfurl}`, {})
      .then((res) => {
        console.log("The file saved to ", res.path());
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(document.pdfurl, "doc");
  }

  async function downloadFile() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload();
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file",
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const shareDoc = async (doc) => {

    try {
      const result = await Share.share({
        message:
        doc.pdfurl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error.message);
    }
  };


  // async function getbuypolicy() {
  //   var myHeaders = new Headers();
  //
  //   let userData = JSON.parse(await AsyncStorage.getItem("LoginData"));
  //
  //   let modelData = searchVehicleData();
  //
  //   let t = VehicleFront ? VehicleFront.RegistrationDate : "";
  //   let s = t.split("-");
  //   let d = new Date();
  //   d.setDate(s[0]);
  //   d.setMonth(s[1]);
  //   d.setFullYear(s[2]);
  //
  //   let registrationDate = formatDate(d);
  //
  //   myHeaders.append("Partner-Id", "DOWALI");
  //   myHeaders.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
  //   myHeaders.append("Content-Type", "application/json");
  //   let quoteDate = Date.now();
  //   var raw = JSON.stringify({
  //     motorInsuredInfo: {
  //       customerType: "Individual",
  //       firstName: DrivingFront ? DrivingFront.Name : "",
  //       lastName: ".",
  //       contactNo: userData.phone,
  //       nationality: "1001",
  //       address: DrivingFront ? DrivingFront.PlaceOfIssue : "",
  //     },
  //     motorPolicyInfo: {
  //       quoteNo: `XAD${quoteDate}`,
  //       quoteProcessBy: "AL DOWALI",
  //       policyStartDate: formatDate(date),
  //       policyEndDate: formEndDate(date),
  //       productCode: policyData.premiumInfo[0].productCode,
  //       assuredCode: "150218",
  //       customerCode: "150218",
  //       brokerCode: "150218",
  //       paymentMode: "On Account",
  //       paymentReceiptNo: "",
  //     },
  //     motorPremiumInfo: {
  //       currency: "AED",
  //       currencyRate: 1,
  //       grossPremium: policyData.premiumInfo[0].finalPremiumAmt,
  //       vatAmount: policyData.premiumInfo[0].finalPremiumVat,
  //     },
  //     motorVehicleInfo: {
  //       isBrandNewYN: "N",
  //       plateNo: VehicleFront ? VehicleFront.Plateno : "",
  //       plateCode: "001",
  //       plateCategory: "001",
  //       registrationLocation: "02",
  //       transactionType: "Vehicle Renewal",
  //       isMortgageYN: VehicleFront ? (VehicleFront.Mortgage === "" ? "N" : "Y") : "N",
  //       makeCode: modelData.makeCode ?? "",
  //       modelCode: modelData.code ?? "",
  //       noOfCylinderCode: modelData.noOfCylinderCode ?? "",
  //       mfgYear: VehicleBack ? VehicleBack.ModelNumber : "",
  //       bodyType: "236",
  //       chassisNo: VehicleBack ? VehicleBack.ChasisNumber : "",
  //       engineNo: VehicleBack ? VehicleBack.EngineNumber : "",
  //       color: "401",
  //       seatingCapacity: modelData.noOfPassenger ?? "",
  //       usageType: "101",
  //       sumInsured: sliderPrice,
  //       tcnNo: VehicleFront ? VehicleFront.TCNo : "",
  //       registeredDate: registrationDate,
  //       isAgencyYN: "N",
  //       covers: [],
  //     },
  //   });
  //
  //
  //   console.log("this is raw data ---->", raw);
  //
  //
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //
  //   fetch(
  //     "https://insurance.awnic.com/InsureApi/API/motor/buyPolicy",
  //     requestOptions,
  //   )
  //     .then((response) => response.text())
  //     .then(async (result) => {
  //       console.log(result, "buyplicy");
  //       let response = await JSON.parse(result);
  //       if (response.errorList === null) {
  //         setQuoteNo(response.motorPolicyInfo.policyDocId);
  //         downloadDocument(response.motorPolicyInfo.policyDocId);
  //       } else {
  //         let errorMsg = "";
  //         response.errorList.forEach(function(item) {
  //           errorMsg += ". " + item.desc;
  //         });
  //         alert(errorMsg);
  //       }
  //       console.log("this is buy awnic policy data", response);
  //
  //     })
  //     .catch((error) => {
  //       alert(error.toString());
  //       console.log("error", error);
  //     });
  // }

  function fetchNationality() {

    var myHeaders = new Headers();
    myHeaders.append("Partner-Id", "DOWALI");
    myHeaders.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "masterType": "NATIONALITY" });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://insurance.awnic.com/InsureApi/API/motor/masterData", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        if (result.errorList !== null) {
          setNationality(result.masterData);
        } else {
          alert("Unable to fetch nationalities");
        }

      })
      .catch(error => console.log("error", error));

  }

  function formatDate(originalDate) {
    console.log("test original date ", typeof (originalDate));
    console.log("test org date ", originalDate);
    // let s = originalDate.split("-");
    // originalDate = new Date();
    // originalDate.setDate(s[0]);
    // originalDate.setMonth(s[1]);
    // originalDate.setFullYear(s[2]);
    let date = new Date(originalDate);
    let formattedDate = "";
    let monthArr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    if (date) {
      let dateNum = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
      let month = monthArr[date.getMonth()];
      let year = date.getFullYear();
      formattedDate = dateNum + "-" + month + "-" + year;
    }
    return formattedDate;
  }

  function formatDateWithoutAlphaAwnic(originalDate) {
    let s = originalDate.split("-");
    let d = new Date();
    d.setDate(s[0]);
    d.setMonth(s[1]);
    d.setFullYear(s[2]);
    let date = new Date(d);
    let formattedDate = "";
    let monthArr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    if (date) {
      let dateNum = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
      let month = monthArr[date.getMonth()];
      let year = date.getFullYear();
      formattedDate = dateNum + "-" + month + "-" + year;
    }
    return formattedDate;
  }

  function formatFidelityDateWithAlphaMonth(date) {
    if (typeof (date) === "string") {
      let s = date.split("-");
      date = new Date();
      date.setDate(s[0]);
      date.setMonth(s[1]);
      date.setFullYear(s[2]);
    }

    let d = new Date(date);
    return (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
      "/" + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) +
      "/" + d.getFullYear();
  }

  function formatFidelityDateWithoutAlphaMonth(date) {
    let d;
    let s = date.split("-");
    d = new Date();
    d.setDate(s[0]);
    d.setMonth(s[1]);
    d.setFullYear(s[2]);

    return formatFidelityDateWithAlphaMonth(d);
  }

  function formEndDate(originalDate) {
    console.log("this end org date ", originalDate);
    console.log("this is end org adte type", typeof (originalDate));
    let date = new Date(originalDate);
    date.setFullYear(date.getFullYear() + 1);
    date.setMonth(date.getMonth() + 1);
    date = new Date(date);
    return formatDate(date);
  }

  function downloadDocument(quote) {
    var myHeaders = new Headers();
    myHeaders.append("Partner-Id", "DOWALI");
    myHeaders.append("Api-Key", "6gbW8thKLuAzyeNWrWXVBQ4Rq");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ docId: quote });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "https://insurance.awnic.com/InsureApi/API/motor/motorDownloadDocument",
      requestOptions,
    )
      .then((response) => response.text())
      .then(async (result) => {
        console.log(result, "download");
        let ABC = await JSON.parse(result);
        setbiguri(ABC.documentContent);
        setdocumentName(ABC.documentName);

        //send mail and save data
        props.saveData(fidelityPolicy, policyData, paymentResponse, planName, vehicleModelData, awnicRawData, sliderPrice, policyDocLink, QuoteNo);


        // saving final data into database
        //props.saveData(fidelityPolicy,paymentResponse);

        //console.log("response valid", result.documentName);
      })
      .catch((error) => console.log("error", error));
  }

  // async function sendMailForVerification(){
  //
  //   let loginData = JSON.parse(await AsyncStorage.getItem("LoginData"));
  //   let modelData = searchVehicleData();
  //
  //   let t = VehicleFront ? VehicleFront.RegistrationDate : "";
  //   let registrationDate = formatDateWithoutAlphaAwnic(t);
  //
  //
  //
  //   var raw = JSON.stringify(
  //     {
  //       to: "murad.abushaikha@cns-me.com",
  //       cc: ["insurecue-dl@techforce.ai"],
  //       subject: "Data generated in the flow",
  //       body: "Email_ID: " + loginData.email + ",<br>Phone_No: " + loginData.phone + ",<br>Company_Name: AWNIC ,<br>Policy_No: " + (VehicleFront ? VehicleFront.PolicyNumber : "") +
  //         ",<br>P_Start_Date: " + formatDate(date) + ",<br>P_End_Date: " + formEndDate(date) + ",<br>Make_Code: " + (modelData.makeCode ?? "") + "" +
  //         ",<br>Model_Code: " + (modelData.code ?? "") + ",<br>Manufacture_Year: " + (VehicleBack ? (VehicleBack.ModelNumber).trim() : "") + ",<br>Sum_Insured: " + sliderPrice + "" +
  //         ",<br>User_FName: " + DrivingFront ? DrivingFront.Name : "" + ",<br>User_LName: . ,<br>V_Registered_Date: " + registrationDate +
  //         ",<br>Agency: " + (props.isAgencyRenewal === "Yes" ? "Y" : "N") + ",<br>V_Plate_No: " + (VehicleFront ? VehicleFront.Plateno : "") + ",<br> Ins_Type: " + 100 +
  //         ",<br>Owner: " + Owner_name + ",<br>Nationality: " + Vnationality + ",<br>Policy_No: " + policy_number +
  //         ",<br>Reg_Date: " + registration_date1 + ",<br>Ins_Exp_Date: " + insure_date + ",<br>Exp_Date: " + EXP +
  //         ",<br>TC_No: " + TC1 + ",<br>Model: " + model_number + ",<br>Origin: " + Country_Origin +
  //         ",<br>Vehicle_Body_Type: " + body_type + ",<br>Vehicle_Type: " + vehicle_type +
  //         ",<br>Engine_No: " + engine_number + ",<br>Chassis_No: " + Chassis_Number +
  //         ",<br>No_Of_Passengers: " + Number_Passengers + ",<br>D_License_No: " + Licence_Number +
  //         ",<br>D_Name: " + Driving_name + ",<br>D_Nationality: " + Vnationality + ",<br>D_DOB: " + Date_Of_Birth +
  //         ",<br>D_Exp_Date: " + EXP + ",<br>D_Issue_Date: " + insure_date + ",<br>D_POI: " + Place_of_issue +
  //         ",<br>V_License_Front_Image: " + car_url + ",<br>V_License_Back_Image: " + back_url +
  //         ",<br>D_License_Front_Image: " + DF_url + ",<br>D_License_Back_Image: " + BB_url +
  //         ",<br>Emirates_Front_Image: " + Front_url + ",<br>Emirates_Back_Image: " + Eback_url +
  //         ",<br>Test_Result: " + test_url + ",<br> Transaction_Date: " + TodayDate + ",<br>Transaction_Time: " + currentTime +
  //         ",<br>Transaction_Hint: CPT:Y;VCC:Y; ,<br> Order_ID: " + Order + ",<br>Amount: " + amount +
  //         ",<br>Customer_Name: Demo Merchant ,<br>Order_Name: Paybill ,<br>Username: Demo_fY9c ,<br>Password: Comtrust@20182018 " +
  //         ",<br>Transaction_Status: " + PP + ",<br>Transaction_ID: " + Transaction_ID +
  //         ",<br>CompToThirdParty_URL1: " + tpImg1_url + ",<br>CompToThirdParty_URL2: " + tpImg2_url +
  //         ",<br>CompToThirdParty_URL3: " + tpImg3_url + ",<br>CompToThirdParty_URL4: " + tpImg4_url +
  //         ",<br>InsExpImg_URL1: " + insExpImg1_url + ",<br>InsExpImg_URL2: " + insExpImg2_url +
  //         ",<br>InsExpImg_URL3: " + insExpImg3_url + ",<br>InsExpImg_URL4: " + insExpImg4_url + ""
  //     }
  //   );
  //
  //   var requestOptions = {
  //     method: "POST",
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(
  //     "https://chatbotapi.development.techforce.ai/v1/chatbot/mail/techforce",
  //     requestOptions,
  //   )
  //     .then((response) => response.text())
  //     .then(async (result) => {
  //       console.log(result, "email");
  //
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  function setFinalSliderPrice() {
    if (customSliderPrice !== "") {
      setsliderPrice(customSliderPrice);
    } else {
      alert("Please enter car valuation");
    }
  }

  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
          {props.insRange.length > 1 ? (
            <>
              <View style={styles.BotQuestion}>
                <Text style={styles.BotText}>
                  With the current information you’ve submitted, we estimate that
                  your value is between
                </Text>
              </View>
              <View style={styles.boxQuestion}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    width: "70%",
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: "Mukta-Regular",
                      color: "salmon",
                    }}>
                    AED {props.insRange[0] ?? 1000}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Mukta-Regular",
                      color: "salmon",
                    }}>
                    AED {props.insRange[1] ?? 2000}
                  </Text>
                </View>
                <Slider
                  style={{ width: 250, height: 30 }}
                  minimumValue={props.insRange[0] ?? 1000}
                  step={1}
                  onValueChange={(e) => setsliderPrice(e)}
                  maximumValue={props.insRange[1] ?? 2000}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View></>) : (
            <>
              <View style={styles.BotQuestion}>
                <Text style={styles.BotText}>
                  Please enter car valuation for your car
                </Text>
              </View>
              <View style={styles.BotQuestion}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 5,
                    marginVertical: 5,
                    width: "70%",
                    alignItems: "center",
                  }}>

                  <Text style={{ color: "white" }}>
                    AED
                  </Text>
                  <TextInput
                    value={customSliderPrice}
                    keyboardType="numeric"
                    onChangeText={(value) => setCustomSliderPrice(value)}
                    placeholderTextColor="grey"
                    placeholder="Enter car valuation"
                    style={[styles.textInputstyle, {
                      margin: 0,
                      backgroundColor: "white",
                      paddingHorizontal: 10,
                      width: 100,
                    }]}
                    editable={true}
                  />


                  <TouchableOpacity
                    onPress={() => {
                      setFinalSliderPrice();
                    }}
                    style={{
                      backgroundColor: "#fa7a72",
                      width: 70,
                      borderRadius: 20,
                      alignSelf: "center",
                    }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        padding: 8,
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          {sliderPrice !== "" && props.insRange.length > 1 ? (
            <View
              style={[
                styles.boxQuestion,
                {
                  width: "35%",
                  backgroundColor: "#0e0551",

                },
              ]}>
              <Text
                style={{
                  fontFamily: "Mukta-Regular",
                  color: "white",
                  fontSize: 16,
                  padding: 10,

                }}>
                AED {sliderPrice}
              </Text>
            </View>
          ) : null}
          {console.log("this is the plan range", isPlanLoaded)}
          {isPlanLoaded === "" && planRange !== "" ? (
            <>
              <View style={{ marginTop: 10 }}>
                <View style={styles.BotQuestion}>
                  <Text style={styles.BotText}>
                    Great news! I’ve successfully found you several available
                    plans that are best suited to your needs. Take a look below.{" "}
                  </Text>
                </View>
                <Text style={styles.PlanText}>Plans</Text>
              </View>
              {console.log(policyData, "policy data")}
              {policyData?.premiumInfo?.map((i) => (
                <TouchableOpacity
                  onPress={() => {
                    setplanName("Plan 1"), setpaymentAmount(parseInt(i.finalPremiumAmt) + parseInt(i.finalPremiumVat));
                  }}
                  style={[
                    styles.boxQuestion,
                    { borderRadius: 10, marginHorizontal: 10 },
                    planName == "Plan 1"
                      ? { backgroundColor: "#ddd" }
                      : { backgroundColor: "#f1f2f2" },
                  ]}>
                  {/* {console.log(i.planDesc,'inside')} */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 5,
                    }}>
                    <View
                      Style={
                        {
                          //  padding:5
                        }
                      }>
                      <Text
                        style={{
                          fontFamily: "Mukta-Regular",
                          color: "salmon",
                          padding: 8,
                          fontWeight: "bold",
                          fontSize: 16,
                          backgroundColor: "white",
                          marginTop: 5,
                        }}>
                        AWNIC
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "transparent",
                      }}>
                      <View
                        style={{
                          width: 90,
                          height: 77,
                          borderBottomColor: "#0e0551",
                          borderBottomWidth: 0,
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderTopColor: "#0e0551",
                          borderTopWidth: 50,
                          //  position:'relative'
                        }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: 14,
                            top: -35,
                            zIndex: 2,
                            textAlign: "center",
                            //  position:'absolute'
                          }}>
                          AED {parseInt(i.finalPremiumAmt) + parseInt(i.finalPremiumVat)}
                        </Text>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: 0,
                          width: 0,
                          height: 0,
                          borderStyle: "solid",
                          borderLeftWidth: 45,
                          borderLeftColor: "transparent",
                          borderRightWidth: 45,
                          borderRightColor: "transparent",
                          borderTopWidth: 25,
                          borderTopColor: "#0e0551",
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: -12, marginHorizontal: 10 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}>
                      Add-On cover
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 14,
                        paddingVertical: 3,
                      }}>
                      * {i.covers[0].coverDesc}
                      {`\n`}* {i.covers[1].coverDesc} {`\n`}*{" "}
                      {i.covers[2].coverDesc} {`\n`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              {fidelityPolicy?.Data?.GrossPremium !== undefined ? (
                <TouchableOpacity
                  onPress={() => {
                    setplanName("Plan 2"),
                      setpaymentAmount(fidelityPolicy.Data?.GrossPremium);
                  }}
                  style={[
                    styles.boxQuestion,
                    planName == "Plan 2"
                      ? { backgroundColor: "#ddd" }
                      : { backgroundColor: "#f2f2f2" },
                  ]}>
                  {/*{console.log(fidelityPolicy.Data,'inside 2')}*/}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 5,
                    }}>
                    <View Style={{}}>
                      <Text
                        style={{
                          fontFamily: "Mukta-Regular",
                          color: "salmon",
                          padding: 8,
                          fontSize: 18,
                          backgroundColor: "white",
                        }}>
                        {" "}
                        Fidelity Insurance
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "transparent",
                      }}>
                      <View
                        style={{
                          width: 90,
                          height: 77,
                          borderBottomColor: "#0e0551",
                          borderBottomWidth: 0,
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderTopColor: "#0e0551",
                          borderTopWidth: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: 14,
                            textAlign: "center",
                            top: -35,
                            zIndex: 2,
                          }}>
                          AED {`${fidelityPolicy.Data?.GrossPremium}`}
                        </Text>
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: 0,
                          width: 0,
                          height: 0,
                          borderStyle: "solid",
                          borderLeftWidth: 45,
                          borderLeftColor: "transparent",
                          borderRightWidth: 45,
                          borderRightColor: "transparent",
                          borderTopWidth: 25,
                          borderTopColor: "#0e0551",
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: -10, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                      For 2 years
                    </Text>
                    <Text>
                      {/*
                       * {i.covers[0].coverDesc}{`\n`}
                       * {i.covers[1].coverDesc} {`\n`}
                       * {i.covers[2].coverDesc} {`\n`} */}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {planName !== "" ? (
                <View style={{ flexDirection: "row-reverse" }}>
                  <View style={[styles.answerBox, { flexDirection: "row" }]}>
                    <View style={styles.checkboxRight}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          alignSelf: "center",
                          justifyContent: "center",
                        }}>
                        ✓
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "salmon",
                        padding: 10,
                        fontSize: 14,
                        alignSelf: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}>
                      {planName}
                      {planName == "Plan 2"
                        ? "  Fidelity Insurance"
                        : "  AWNIC"}
                    </Text>
                  </View>
                </View>
              ) : null}
              {planName !== "" ? (
                <>
                  <View style={styles.BotQuestion}>
                    <Text style={styles.BotText}>
                      Wow, You have choosen the best plan
                    </Text>
                  </View>
                  <View style={styles.BotQuestion}>
                    <Text style={styles.BotText}>
                      Now choose the insurance start date
                    </Text>
                  </View>
                  <DatePicker
                    style={{ width: 150, color: "salmon" }}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2022-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                        borderRadius: 10,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      setDate(date);

                    }}
                  />
                </>
              ) : null}
              {date !== "" ? (
                <>
                  <View style={[styles.BotQuestion, { marginTop: 20 }]}>
                    <Text style={styles.BotText}>
                      Now all that’s left to do is make the payment and your
                      insurance is sorted!
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                      onPress={() => {
                        paymentRedirect();
                      }}
                      style={{
                        backgroundColor: '#fa7a72',
                        width: 100,
                        borderRadius: 20,
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 16,
                          padding: 8,
                        }}>
                        Pay Now
                    </Text>
                    </TouchableOpacity> */}
                  {(planName === "Plan 1") ? (QuoteNo !== "" ? ((paynow === true) ? null :
                    <TouchableOpacity
                      onPress={() => {
                        paymentRedirect();
                      }}
                      style={{
                        backgroundColor: "#fa7a72",
                        width: 100,
                        borderRadius: 20,
                        alignSelf: "center",
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 16,
                          padding: 8,
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>) : null) :
                    ((paynow === true) ? null :
                      <TouchableOpacity
                        onPress={() => {
                          paymentRedirect();
                        }}
                        style={{
                          backgroundColor: "#fa7a72",
                          width: 100,
                          borderRadius: 20,
                          alignSelf: "center",
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            padding: 8,
                          }}>
                          Pay Now
                        </Text>
                      </TouchableOpacity>)}
                  {payError == true ? (
                    <>
                      <View style={[styles.boxQuestion, { marginTop: 30 }]}>
                        {/* <WebView
          source={{ uri: payurl }}
          // onNavigationStateChange={onNavigationStateChange}
          style={{ height: 200 }}
          startInLoadingState={true}
        /> */}

                        {/* <View style={{width:40,height:40,justifyContent:'center',alignSelf:'center',marginTop:-15,backgroundColor:'#055e00',borderRadius:50}}>
           <Text style={{
             textAlign:'center',
             alignSelf:'center',
             fontSize:20,
             color:'white',

           }}>✓</Text>
         </View> */}
                        <Text
                          style={{
                            fontFamily: "Mukta-Regular",
                            color: "black",
                            fontSize: 18,
                            marginHorizontal: 10,
                            padding: 10,
                          }}>
                          Error Occured in Transaction, Please try Again
                        </Text>
                      </View>
                    </>
                  ) : null}
                  {paynow == true ? (
                    <>
                      <View style={[styles.boxQuestion, { marginTop: 30 }]}>
                        {/* <WebView
          source={{ uri: payurl }}
          // onNavigationStateChange={onNavigationStateChange}
          style={{ height: 200 }}
          startInLoadingState={true}
        /> */}

                        <View
                          style={{
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignSelf: "center",
                            marginTop: -15,
                            backgroundColor: "#055e00",
                            borderRadius: 50,
                          }}>
                          <Text
                            style={{
                              textAlign: "center",
                              alignSelf: "center",
                              fontSize: 20,
                              color: "white",
                            }}>
                            ✓
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: "Mukta-Regular",
                            color: "black",
                            fontSize: 18,
                            marginHorizontal: 10,
                            padding: 10,
                          }}>
                          Success! Thank you for allowing us to assist with your
                          car insurance.{" "}
                        </Text>
                      </View>
                      {/*<View style={[styles.boxQuestion]}>
                        <Text
                          style={{
                            fontFamily: "Mukta-Bold",
                            color: "black",
                            fontSize: 18,
                            marginHorizontal: 10,
                            padding: 5,
                            borderBottomColor: "grey",
                            borderBottomWidth: 0.5,
                          }}>
                          Details
                        </Text>
                        <View style={{ flexDirection: "row", width: "100%" }}>
                          <Text
                            style={{
                              // fontFamily:'Mukta-Regular',
                              color: "black",
                              fontSize: 12,
                              marginHorizontal: 5,
                              padding: 5,
                            }}>
                            Insured Policy{`\n`}
                            is Now valid
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Mukta-Regular",
                              color: "black",
                              fontSize: 16,
                              width: "70%",
                              padding: 5,
                              marginRight: 10,
                            }}>
                            : {date}
                          </Text>
                        </View>
                        <Text
                          style={{
                            // fontFamily:'Mukta-Regular',
                            color: "black",
                            fontSize: 12,
                            margin: 10,
                          }}>
                          You can call our customer care for any time to claim
                          the policy anytime.
                        </Text>
                      </View>*/}
                      {biguri == "" ? (
                        <LoaderUI />
                       ) : null
                        // (
                      //   <TouchableOpacity
                      //     style={{
                      //       justifyContent: "center",
                      //       backgroundColor: "#fa7a72",
                      //       marginHorizontal: 40,
                      //       borderRadius: 10,
                      //       marginVertical: 20,
                      //       marginBottom: 30,
                      //     }}
                      //     onPress={() => {
                      //       // downloadFile();
                      //       actualDownload();
                      //     }}>
                      //     <Text
                      //       style={{
                      //         color: "white",
                      //         textAlign: "center",
                      //         padding: 10,
                      //       }}>
                      //       Get Your Policy
                      //     </Text>
                      //   </TouchableOpacity>
                      // )
                        }
                      {/* <View style={styles.BotQuestion}>
        <Text style={styles.BotText}>
          Finally, how would you like to receive your copy of your insurance policy?
        </Text>

      </View>
      <Image source={Email}
      style={{
        marginVertical:10,
        alignSelf:'center',
        width:50,
        height:50
      }}/>
          <TextInput

           onChangeText={value => console.log(value)}
                placeholderTextColor="grey"
                placeholder="Email"
                style={styles.textInputstyle}
                editable={true}
          />

           <Image source={Whatsapp}
      style={{
        marginVertical:10,
        alignSelf:'center',
        width:50,
        height:50
      }}/>
           <TextInput

           onChangeText={value => console.log(value)}
                placeholderTextColor="grey"
                placeholder="Whatsapp"
                style={styles.textInputstyle}
                editable={true}
          /> */}
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : isPlanLoaded !== "" ? (<><View style={[styles.BotQuestion,{flexDirection:"column",height:"auto"}]}>
            <Text style={[styles.BotText]}>
              {isPlanLoaded}
            </Text>
            {!isAPIError && (<View style={{ padding: 8,alignItems:"center"}}>
              <Bubbles size={3} color="#ff8c69">
                <ActivityIndicator />
              </Bubbles>
            </View>)
            }
          </View>

          </>) : null}
        </View>
      </ScrollView>
      {isQuestion === true ? (
        <>
          <View style={{ paddingTop: 70 }}>
            <TouchableOpacity
              onPress={() => {
                setplanRange("No");
                setIsQuestion(false);
              }}
              style={{
                backgroundColor: "#fa7973",
                height: 35,
                justifyContent: "center",
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "center",
                  justifyContent: "center",
                }}>
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {

                setplanRange("Yes");
                setIsQuestion(false);
              }}
              style={{
                backgroundColor: "#fa7973",
                height: 35,
                justifyContent: "center",
                position: "absolute",
                bottom: 37,
                width: "100%",
              }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  alignSelf: "center",
                  justifyContent: "center",
                }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
      {/* {paynow === true?(
                      <>
                      <View style={{paddingTop:70}}>
                         <TouchableOpacity
                         onPress={()=>{
                   downloadFile()
                  }}
                  style={{backgroundColor:'#fa7973',height:35,justifyContent:'center', position:'absolute',bottom:0,width:'100%'}}>
                   <Text style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:16,
                   alignSelf:'center',justifyContent:'center'}}>
                      Submit
                    </Text>

                      </TouchableOpacity>


                      </View>
                      </>
                 ):null}
                   */}
    </>
  );
};

const styles = StyleSheet.create({
  BotQuestion: {
    backgroundColor: "#0e0551",
    width: "80%",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 8,
    borderTopLeftRadius: 5,
  },
  BotText: {
    color: "white",
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 8,
    fontFamily: "Mukta-Regular",
  },
  boxQuestion: {
    backgroundColor: "#f2f2f2",
    marginVertical: 10,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  boxQText: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    color: "#0e0551",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  answerBox: {
    // flexDirection:'row',
    marginHorizontal: 10,
    backgroundColor: "#f1f2f2",
    borderRadius: 20,
    borderTopRightRadius: 5,
    marginVertical: 8,
    minWidth: 80,
  },
  PlanText: {
    fontWeight: "bold",
    color: "#0e0551",
    fontSize: 28,
    fontFamily: "Mukta-Bold",
    textAlign: "center",
  },
  answerText: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#0e0551",
  },
  FormHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    width: "70%",
    marginTop: 40,
  },
  FormContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  textInputstyle: {
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 2,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    marginHorizontal: 20,
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#474747",
  },
  formView: {
    marginVertical: 8,
  },
  checkbox: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 50,
    alignSelf: "center",
    marginLeft: 20,
  },
  checkboxRight: {
    backgroundColor: "green",
    width: 20,
    height: 20,
    borderRadius: 50,
    alignSelf: "center",
    marginLeft: 20,
  },
});
ChatScreen2.navigationOptions = (navigationData) => {
  return {
    headerTitle: () => (
      <View style={{ flexDirection: "row" }}>
        <Image
          source={BobImg}
          style={{
            height: 30,
            width: 30,
            backgroundColor: "#d4f4fc",
            borderRadius: 50,
            marginRight: 5,
            marginLeft: -5,
          }}
        />

        <Text style={{ alignSelf: "center" }}>Bob</Text>
      </View>
    ),
  };
};

export default ChatScreen2;
