// components/BooksBlock.js

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, ImageBackground, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { GET_DOCTOR_LIST, TOKEN } from "../statics/APIs/custom";

export const BooksBlock = (props) => {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    GetDoctors()
  }, [])

  const GetDoctors = async () => {
    try {
      const Doctors = await axios.get(GET_DOCTOR_LIST, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      if (Doctors.data) {
        setDoctors(Doctors.data.data.rows)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      // style={{
      //   margin: 10
      // }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
          Dokter
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctors.length > 0 && doctors.map((doctor, idx) => {
            return (
              <TouchableOpacity
                onPress={() => console.log('dokter touched')}
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
                  source={{ uri: `${doctor.profilePhoto}` }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                >
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: '#F96D15'
                        // backgroundColor: '#46959A'
                      }}
                    >
                      <Text numberOfLines={1} style={{ color: 'white', fontSize: 14 }}>
                        {`Dokter ${doctor.firstName}`}
                      </Text>
                      <Text style={{ color: 'white', fontSize: 10 }}>Andrologist</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  );
};