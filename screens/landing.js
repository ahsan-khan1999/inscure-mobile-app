import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewBase,
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import Logo from '../assets/InsureCue-logo.png';
import CarImg from '../assets/hero-image-static.png';
import hamburger from '../assets/hamburger.png';
import CarIcon from '../assets/buy-me-insurance-icon.png';
import share from '../assets/work1.png';
import compare from '../assets/work2.png';
import saveImg from '../assets/work3.png';
import carBigImg from '../assets/car-2.png';
import Scan from '../assets/Intelligent-Scan-icon.png';
import Multiple from '../assets/Multiple-Insurance-icon.png';
import carCrash from '../assets/carinsu.png';
import shape1 from '../assets/shape1.png';
import shape2 from '../assets/shape2.png';
import shape3 from '../assets/shape3.png';
import Family from '../assets/family.png';
import CarGame from '../assets/car.png';
import Heart from '../assets/heart.png';
import Bike from '../assets/bike.png';
import Marine from '../assets/ImgNew.png';
import Home from '../assets/home.png';
import WorldTour from '../assets/world.png';
import Fire from '../assets/lit.png';
import peopleImg from '../assets/what-people-say-screen.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBackground} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true, //yaha true
      welcomeScreen: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      phone: '',
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
      welcomeScreen: true, //yaha true
    });
  };

  HideWelcome = () => {
    this.setState({
      welcomeScreen: false,
    });
  };
  componentDidMount() {
    let AuthData = AsyncStorage.getItem('LoginData');
    this.setState({phone: AuthData.phone});
    console.log(AuthData.phone, 'phonedata');
  }
  componentDidMount() {
    if (this.props.navigation.getParam('params') == 'redirect') {
      this.setState({
        isVisible: false,
        welcomeScreen: false,
      });
    } else {
      var that = this;
      setTimeout(function () {
        that.Hide_Splash_Screen();
      }, 3000);
      setTimeout(() => {
        that.HideWelcome();
      }, 6000);
    }
  }

  render() {
    let Splash_Screen = (
      <View style={styles.container}>
        <View
          style={{
            width: '80%',
            marginHorizontal: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={Logo} style={styles.ImageStyle} />
        </View>
      </View>
    );
    return (
      <>
        {this.state.isVisible ? (
          Splash_Screen
        ) : this.state.welcomeScreen ? (
          <View style={styles.container}>
            <Image source={CarImg} style={{width: '100%', height: 200}} />
            <View style={{marginHorizontal: 20}}>
              <Text
                style={{
                  color: 'salmon',
                  fontWeight: 'bold',
                  fontSize: 22,
                  marginTop: 30,
                  marginBottom: -5,
                }}>
                Welcome To
              </Text>
              <Image source={Logo} style={{width: 180, height: 80}} />
              <Text style={[styles.text, {marginTop: 15}]}>
                The New way to insure your cars.
              </Text>
              <Text style={styles.text}>
                No non-sense cover in just a few taps.
              </Text>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
                backgroundColor:
                  Dimensions.get('window').height / 6 ? '#e8fbfc' : 'white',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.dispatch(DrawerActions.openDrawer())
                }>
                <Image
                  source={hamburger}
                  style={{height: 22, width: 22, marginTop: 25, marginLeft: 5}}
                />
              </TouchableOpacity>
              <Image
                source={Logo}
                style={{width: 100, height: 45, marginLeft: 10, marginTop: 17}}
              />
            </View>
            <ScrollView style={{backgroundColor: 'white'}}>
              <View style={{backgroundColor: '#e8fbfc'}}>
                <Text style={styles.headingBold}>
                  It's the time to change{`\n`} all what you know about
                </Text>
                <Text style={[styles.headingColor, {color: '#4b51ec'}]}>
                  Car<Text style={{color: '#fa7a72'}}> Insurance</Text>{' '}
                </Text>
                <Text style={[styles.DetailText, {marginTop: 5}]}>
                  Shop, compare and save in under 3 minutes, without leaving
                  home. It's not just easy. It's smart and affordable, too
                </Text>
                <Image
                  source={CarImg}
                  style={{width: '100%', height: 200, marginTop: 10}}
                />
              </View>
              <View
                style={{
                  paddingTop: 50,
                  paddingBottom: 30,
                  backgroundColor: '#f0eded',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginHorizontal: 40,
                    textAlign: 'center',
                  }}>
                  How Does insurcue Works?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 50,
                  }}>
                  <View>
                    <Image source={share} style={{width: 45, height: 55}} />
                    <Text>Share</Text>
                  </View>

                  <View>
                    <Image source={compare} style={{width: 45, height: 55}} />
                    <Text>Compare</Text>
                  </View>

                  <View>
                    <Image source={saveImg} style={{width: 45, height: 55}} />
                    <Text>Save</Text>
                  </View>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 10,
                  }}>
                  Share
                </Text>
                <Text
                  style={{
                    marginHorizontal: 30,
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  We instantly show you the best quote with an excess to fit
                  your pocket, side-by-side from top providers for free.
                </Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'blue',
                    width: 100,
                    alignSelf: 'center',
                    marginTop: 20,
                  }}
                  onPress={() => {}}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      paddingVertical: 10,
                      fontSize: 16,
                    }}>
                    Let's do it
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 50}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 24,
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  Powerful Features
                </Text>
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginHorizontal: '6%',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#f0eded',
                      width: '48%',
                      borderRadius: 10,
                      borderTopColor: 'blue',
                      borderTopWidth: 8,
                      borderBottomColor: 'blue',
                      borderBottomWidth: 8,
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>{`Intelligent \n Scan`}</Text>
                    <Image
                      source={Scan}
                      style={{
                        width: 50,
                        height: 50,
                        alignSelf: 'center',
                        marginVertical: 15,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        marginHorizontal: 10,
                      }}>
                      Insurance application are long, really long. So we let you
                      start by scanning your license. Then we securely fill it
                      in for you.
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#f0eded',
                      width: '48%',
                      borderRadius: 10,
                      borderTopColor: 'blue',
                      borderTopWidth: 8,
                      borderBottomColor: 'blue',
                      borderBottomWidth: 8,
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>{`Multiple Insurance \n Partners`}</Text>
                    <Image
                      source={Multiple}
                      style={{
                        width: 50,
                        height: 50,
                        alignSelf: 'center',
                        marginVertical: 15,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        marginHorizontal: 10,
                      }}>
                      We are not an insurance company,but we search several of
                      them to find you the right insurance at the best price.
                    </Text>
                  </View>
                </View>
              </View>
              {/* insurcue 3 steps */}
              <View style={{marginTop: 20}}>
                <View>
                  <Text style={styles.crashSmallHead}>Why choose insurcue</Text>
                  <Text style={styles.crashMainHead}>
                    Your insurcue In{`\n`}
                    <Text>3</Text> Simple Steps
                  </Text>
                </View>
                <Image source={carCrash} style={{height: 200, width: '100%'}} />
                <View style={{marginTop: 20}}>
                  <View style={styles.crashTextView}>
                    <View>
                      {/* <Text style={styles.crashcount}>

                                 </Text> */}
                      <Image source={shape1} style={{width: 40, height: 40}} />
                    </View>

                    <View style={styles.crashTextStyle}>
                      <Text style={styles.crashTextHeading}>
                        Get your final quote in 90 seconds
                      </Text>
                      <Text style={styles.crashTextdisplay}>
                        Paying the right premium?
                        {`\n`}Chat to Insurcue and find out
                      </Text>
                    </View>
                  </View>
                  <View style={styles.crashTextView}>
                    <View>
                      {/* <Text style={styles.crashcount}>

                                 </Text> */}
                      <Image source={shape2} style={{width: 40, height: 40}} />
                    </View>

                    <View style={styles.crashTextStyle}>
                      <Text style={styles.crashTextHeading}>
                        Customise your quote
                      </Text>
                      <Text style={styles.crashTextdisplay}>
                        Choose your smart plan,
                        {`\n`}excess and start date and
                      </Text>
                    </View>
                  </View>
                  <View style={styles.crashTextView}>
                    <View>
                      {/* <Text style={styles.crashcount}>

                                 </Text> */}
                      <Image source={shape3} style={{width: 40, height: 40}} />
                    </View>

                    <View style={styles.crashTextStyle}>
                      <Text style={styles.crashTextHeading}>
                        Get covered instantly
                      </Text>
                      <Text style={styles.crashTextdisplay}>
                        Add your card, to get your car
                        {`\n`}insurance cover instantly.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* game changing price */}
              <View style={{marginTop: 40}}>
                <Text style={styles.gameHeading}>Buy Me Insurance</Text>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'salmon',
                        width: '35%',
                        borderRadius: 5,
                        marginVertical: 10,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.state.phone !== ''
                            ? this.props.navigation.navigate('Chat')
                            : this.props.navigation.navigate('Login')
                        }>
                        <Image
                          source={CarGame}
                          style={{
                            height: 50,
                            width: 50,
                            alignSelf: 'center',
                            marginVertical: 8,
                          }}
                        />
                        <Text style={styles.gameText}>Car{`\n`} Insurance</Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={Heart} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        Health{`\n`} Insurance
                                   </Text>
                                                </View> */}
                  </View>
                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                                                <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={Bike} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        Bike{`\n`} Insurance
                                   </Text>
                                                </View>
                                                <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={Marine} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        Marine{`\n`} Insurance
                                   </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                                                <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={WorldTour} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        Travel{`\n`} Insurance
                                   </Text>
                                                </View>
                                                <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={Home} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        Home{`\n`} Insurance
                                   </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={Fire} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        Fire{`\n`} Insurance
                                   </Text>
                                                </View>
                                                <View style={{ backgroundColor: 'salmon', width: '35%', borderRadius: 5, marginVertical: 10 }}>
                                                    <Image source={Family} style={{ height: 50, width: 50, alignSelf: 'center', marginVertical: 8 }} />
                                                    <Text style={styles.gameText}>
                                                        General{`\n`} Insurance
                                   </Text>
                                                </View>
                                            </View>

                                    */}
                </View>
              </View>
              {/* lightinh fast */}
              <View style={{marginTop: 30}}>
                <Text style={styles.gameHeading}>Lightning Fast</Text>
                <Text style={styles.peopleHead}>Buy in Seconds</Text>
                <Text style={styles.peopleText}>
                  Get prices on the app. Like what you see? Buy{`\n`}
                  instantly without phone calls or paperWork.
                </Text>
                <Image
                  source={peopleImg}
                  style={{height: 400, width: 1000, marginTop: 40}}
                />
                <View
                  style={{
                    backgroundColor: 'salmon',
                    marginVertical: 10,
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    What People Say...
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 12,
                      color: 'white',
                      textAlign: 'center',
                      marginVertical: 20,
                    }}>
                    WE'VE HELPED MANY PEOPLE {`\n`}
                    {`\n`}
                    14 DEC 2020{`\n`}
                    {`\n`}
                    And they actually enjoyed it. Instant Everything
                  </Text>
                </View>
              </View>

              <View style={{marginTop: 40}}>
                <Text style={styles.FaqHeading}>We'll Help You Switch</Text>
                <Text style={styles.SwitchText}>
                  Not happy with your current insurance policy, and need to find
                  the most attractive plan? We can help with that.
                </Text>
                <TouchableOpacity
                  style={styles.ButtonShadow}
                  onPress={() => {}}>
                  <Text style={styles.switchButtonText}>
                    Get my car cover price
                  </Text>
                </TouchableOpacity>
                <View style={{marginTop: 30}}>
                  <Image
                    source={carBigImg}
                    style={{
                      width: Dimensions.get('window').width,
                      height: 200,
                      padding: 20,
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 50, marginBottom: 90}}>
                <Text style={styles.FaqHeading}>FAQ's</Text>
                <TouchableOpacity
                  onPress={() => {
                    let visible = this.state.visible1;
                    this.setState({visible1: !visible});
                  }}
                  style={styles.FaqQuestion}>
                  <Text style={styles.FaqText}>
                    How are you going to save me money?
                  </Text>
                  <View style={styles.FaqButton}>
                    <Text style={styles.addStyle}>+</Text>
                  </View>
                </TouchableOpacity>
                {this.state.visible1 === true ? (
                  <View style={styles.FaqAnswer}>
                    <Text style={styles.FaqAnswerText}>
                      We use automated AI rather than call centers or brokers to
                      run and manage your policy, which costs us less and
                      translates into lower premiums for you. Don't forget we
                      take a low fixed fee, and Insurcue flat price, ensures
                      we'll never charge you more. Overall this means your price
                      could be considerably lower than what you would pay
                      elsewhere. But why take our word for it? It only takes 90
                      seconds to a get a final price.
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    let visible = this.state.visible2;
                    this.setState({visible2: !visible});
                  }}
                  style={styles.FaqQuestion}>
                  <Text style={styles.FaqText}>Is Insurcue licensed?</Text>
                  <View style={styles.FaqButton}>
                    <Text style={styles.addStyle}>+</Text>
                  </View>
                </TouchableOpacity>
                {this.state.visible2 === true ? (
                  <View style={styles.FaqAnswer}>
                    <Text style={styles.FaqAnswerText}>
                      Insurcue, is the first insurance compare smart platform
                      authorized and approved by the insurance authority.
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    let visible = this.state.visible3;
                    this.setState({visible3: !visible});
                  }}
                  style={styles.FaqQuestion}>
                  <Text style={styles.FaqText}>
                    How is this different to other insurance companies?
                  </Text>
                  <View style={styles.FaqButton}>
                    <Text style={styles.addStyle}>+</Text>
                  </View>
                </TouchableOpacity>
                {this.state.visible3 === true ? (
                  <View style={styles.FaqAnswer}>
                    <Text style={styles.FaqAnswerText}>
                      Insurcue is not an old insurance company trying to be
                      digital (by adding a website or an app, yet you can't get
                      much done without the call center). Insurcue is a
                      technology business, built from scratch, to bring you the
                      savings and control powered by AI.
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    let visible = this.state.visible4;
                    this.setState({visible4: !visible});
                  }}
                  style={styles.FaqQuestion}>
                  <Text style={styles.FaqText}>
                    How does Insurcue make money?
                  </Text>
                  <View style={styles.FaqButton}>
                    <Text style={styles.addStyle}>+</Text>
                  </View>
                </TouchableOpacity>
                {this.state.visible4 === true ? (
                  <View style={styles.FaqAnswer}>
                    <Text style={styles.FaqAnswerText}>
                      As a company, we get paid a commission by insurance
                      companies for policies we sell. But don’t worry: these
                      commissions are already baked into the price of all
                      insurance policies. This means you never pay extra to use
                      our service.
                      {`\n`}
                      We understand that commissions introduce a potential
                      conflict of interest. But we avoid that conflict by:
                      {`\n`}
                      <Text style={{fontWeight: 'bold'}}>
                        Being transparent: showing you all quotes from all
                        companies, so that you can decide what to buy (or not to
                        buy)
                      </Text>
                      {`\n`}
                      <Text style={{fontWeight: 'bold'}}>
                        Focusing on advice: every day we publish free resources
                        to help you make smart decisions about insurance.
                      </Text>
                    </Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() => {
                    let visible = this.state.visible5;
                    this.setState({visible5: !visible});
                  }}
                  style={styles.FaqQuestion}>
                  <Text style={styles.FaqText}>
                    What if I'm stuck? Where do I get help?
                  </Text>
                  <View style={styles.FaqButton}>
                    <Text style={styles.addStyle}>+</Text>
                  </View>
                </TouchableOpacity>
                {this.state.visible5 === true ? (
                  <View style={styles.FaqAnswer}>
                    <Text style={styles.FaqAnswerText}>
                      E-mail us on help@insurcue.com and we will get right on
                      it.
                    </Text>
                  </View>
                ) : null}
              </View>
            </ScrollView>
            {/* ending footer */}
            <View
              style={{
                backgroundColor: '#fa7973',
                width: '100%',
                height: 60,
                position: 'absolute',
                bottom: 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.state.phone !== ''
                    ? this.props.navigation.navigate('Chat')
                    : this.props.navigation.navigate('Login'),
                    console.log(this.props.navigation.getParam('params'), 'pp');
                }}
                style={{
                  borderRadius: 80,
                  backgroundColor: '#fa7973',
                  borderCOlor: '#fa7973',
                  marginTop: -25,
                  width: 50,
                  height: 50,
                  alignSelf: 'center',
                }}>
                <Image
                  source={CarIcon}
                  style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    marginTop: 3,
                  }}
                />
                {/* </View> */}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // this.state.phone !== ''?
                    this.props.navigation.navigate('Chat')
                    // : this.props.navigation.navigate('Login'),
                    console.log(this.props.navigation.navigate, 'pp');
                }}
                style={{backgroundColor: '#fa7973'}}>
                <Text style={styles.insuranceText}>Buy Me Insurance</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }
}
LandingPage.navigationOptions = (navigationData) => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ImageStyle: {
    alignSelf: 'center',
    width: 310,
    height: 140,
    // marginHorizontal:20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Mukta-Regular',
  },
  insuranceText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: -5,
    fontFamily: 'Mukta-Bold',
  },
  headingBold: {
    fontSize: 28,
    // fontWeight:'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 80,
    color: '#0e0551',
    lineHeight: 40,
    fontFamily: 'Mukta-ExtraBold',
  },
  headingColor: {
    fontFamily: 'Mukta-ExtraBold',
    fontSize: 30,
    textAlign: 'center',
  },
  DetailText: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: 'Mukta-Regular',
    marginHorizontal: 20,
    color: '#474a4e',
  },
  crashSmallHead: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  crashMainHead: {
    fontSize: 28,
    marginHorizontal: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  crashTextView: {
    flexDirection: 'row',
    marginLeft: 20,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
  },
  crashTextHeading: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  crashTextdisplay: {
    fontSize: 12,
    color: '#696969',
  },
  crashTextStyle: {
    marginHorizontal: 10,
  },
  crashcountView: {
    width: 40,
    height: 40,
    backgroundColor: 'salmon',
    borderRadius: 50,
  },
  crashcount: {textAlign: 'center', color: 'white', marginTop: 10},
  gameText: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  gameHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10,
  },
  peopleHead: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  peopleText: {
    fontSize: 12,
    color: '#696969',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  SwitchText: {
    textAlign: 'center',
    marginHorizontal: 30,
    fontSize: 12,
  },
  switchButtonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 12,
    paddingHorizontal: 20,
  },
  ButtonShadow: {
    borderRadius: 10,
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 20, heigth: 20},
    shadowOpacity: 0.9,
  },
  FaqQuestion: {
    flexDirection: 'row',
    backgroundColor: '#f4f7ff',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 2,
    marginVertical: 5,
    borderWidth: 0.1,
    borderColor: 'black',
  },
  FaqAnswer: {
    flexDirection: 'row',
    backgroundColor: '#f4f7ff',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 2,
    marginVertical: 5,
    borderWidth: 0.1,
    borderColor: 'black',
  },
  FaqAnswerText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  FaqButton: {
    // paddingVertical: 8,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  FaqText: {
    width: '75%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  FaqHeading: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 20,
  },
  addStyle: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default LandingPage;
