import React from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import hamburger from '../assets/back.webp';
const Contact = props =>{
    return(
        <>
        <View style={{display:'flex',flexDirection:'row', marginTop: 25}}>
   <TouchableOpacity onPress={()=>props.navigation.navigate('LandingScreen',{params:'redirect'})
                                    }>

                                    <Image source={hamburger} style={{ height: 22, width: 22, marginLeft: 5 }} />
                   </TouchableOpacity>
                     <Text style={{fontFamily:'Mukta-Bold',textAlign:'center',fontSize:28,marginLeft:10,marginTop:-12 }}>
                Contact Us
            </Text>                
        </View>
        <View style={{display:'flex',justifyContent:'center',marginTop:50,marginHorizontal:20}}>
           
            <Text style={{fontFamily:'Mukta-Regular',fontSize:16,marginTop:5}}>
               Contact Us:
               34 Smart Insurcue Portal{`\n`}
               Office B 2-3{`\n`}
               Bur Dubai - Mankhool - Estimada{`\n`}
               Number: 00971589602508{`\n`}
               Dubai United Arab Emirates{`\n`}

            </Text>

        </View>
        </>
    )
}
export default Contact;