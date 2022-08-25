import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, ImageBackground, ScrollView, StyleSheet, Image } from "react-native";
import DoctorPhoto from '../../assets/doctor1.png'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import axios from "axios";
import { GET_MEMBERS } from "../statics/APIs";
import { WebView } from 'react-native-webview';
import { PromedikOrange } from '../statics'

export const LabResultBlock = (props) => {
  const [doctors, setDoctors] = useState([])
  const [loadmore, setLoadmore] = useState(0)

  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    GetDoctors()

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
    console.log(url, processing, '<<<<< url processing');
  }, [])

  const GetDoctors = async () => {
    try {
      const Doctors = await axios.get(GET_MEMBERS)
      if (Doctors.data) {
        setDoctors(Doctors.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        height: 300
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {doctors.length > 0 && doctors.map((doctor, idx) => {
          if (idx < 3) {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  // height: 150,
                }}
              >
                <View
                  style={{
                    borderRadius: 50,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    margin: 10
                  }}
                >
                  <Image
                    source={{ uri: `${doctor.avatar_urls.thumb}` }}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => Linking.openURL(doctor.link)}
                  style={{
                    margin: 10
                  }}
                >
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>
                      Pemeriksaan Darah
                    </Text>
                    <Text style={{ color: 'grey', fontSize: 12 }}>
                      {idx % 2 === 0 ? 'Darah Muda' : 'Darah Para Remaja'}
                    </Text>
                    <Text style={{ color: 'grey', fontSize: 10 }}>
                      {idx % 2 === 0 ? 'Merasa Gagah' : 'Tidak Mau Mengalah'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }
        })}
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('labResult')}
          >
            <Text style={{ color: PromedikOrange }}>Load More...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View >
  )
}
