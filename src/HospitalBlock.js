import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, ImageBackground, ScrollView, StyleSheet, Button } from "react-native";
import axios from "axios";
import { GET_HOSPITAL_LIST, TOKEN } from "./statics/APIs/custom";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import mobileAds from 'react-native-google-mobile-ads';
import { AppOpenAd, InterstitialAd, RewardedAd, useInterstitialAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';



export const HospitalBlock = (props) => {
  const [hospitals, setHospitalList] = useState([])

  useEffect(() => {
    GetHospitalList()

    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
      });
  }, [])

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      // navigation.navigate('NextScreen');
    }
  }, [isClosed, navigation]);

  const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.Interstitial, {
    requestNonPersonalizedAdsOnly: true,
  });

  const url =
    "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf";

  // *IMPORTANT*: The correct file extension is always required.
  // You might encounter issues if the file's extension isn't included
  // or if it doesn't match the mime type of the file.
  // https://stackoverflow.com/a/47767860
  function getUrlExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  const extension = getUrlExtension(url);

  // Feel free to change main path according to your requirements.
  const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

  const options = {
    fromUrl: url,
    toFile: localFile,
  };

  const HandlePDF = () => {
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
      });
  }

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
      <View>
        <Button
          title="Navigate to next screen"
          onPress={() => {
            if (isLoaded) {
              show();
            } else {
              // No advert ready to show yet
              // navigation.navigate('NextScreen');
            }
          }}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hospitals.length > 0 && hospitals.map((hospital, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => HandlePDF()}
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
