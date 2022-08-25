import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, ImageBackground, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { GET_HOSPITAL_LIST, TOKEN } from "../statics/APIs/custom";

export const HospitalBlock = (props) => {
  const [hospitals, setHospitalList] = useState([])

  useEffect(() => {
    GetHospitalList()
  }, [])

  const GetHospitalList = async () => {
    try {
      const HospitalAPI = await axios.get(GET_HOSPITAL_LIST, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      if (HospitalAPI.data) {
        setHospitalList(HospitalAPI.data.data.rows)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row'
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hospitals.length > 0 && hospitals.map((hospital, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => props.navigation.navigate('Hospital', hospital)}
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: 'lightgrey',
                margin: 10
              }}
            >
              <ImageBackground
                source={{ uri: `${hospital.logo}` }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              >
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#46959A',
                      width: '100%',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 14 }}>
                      {hospital.name}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 10 }}>
                      {/* {idx % 2 === 0 ? 'Rumah Sakit' : 'Klinik'} */}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
