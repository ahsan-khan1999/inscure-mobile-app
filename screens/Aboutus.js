import React from 'react';
import {View, Text,Image, TouchableOpacity} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import BobImg from '../assets/imgpsh_fullsize_anim.jpeg';
import hamburger from '../assets/back.webp';
const About = props =>{
    return(
        <>
        <View style={{display:'flex',flexDirection:'row', marginTop: 25}}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('LandingScreen',{params:'redirect'})
                                    }>

                                    <Image source={hamburger} style={{ height: 22, width: 22, marginLeft: 5 }} />
                   </TouchableOpacity>
                     <Text style={{fontFamily:'Mukta-Bold',textAlign:'center',fontSize:28,marginLeft:20,marginTop:-12 }}>
                About us
            </Text>                
        </View>
        <View style={{display:'flex',justifyContent:'center',marginTop:100,marginHorizontal:20}}>
           
            <Text style={{fontFamily:'Mukta-Regular',fontSize:16,marginTop:5}}>
                Insurcue founded by a group of people who had worked 
                with and for some of the biggest insurers in UAE, and 
                saw from the inside why there is so little love for insurance.
                 We realized the only way to fix insurance was to get out and start over.
                  So we built Insurcue.

            </Text>

        </View>
        </>
    )
}

export default About;