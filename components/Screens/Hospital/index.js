import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_HOSPITAL_LIST, GET_LAB_RESULT, TOKEN } from '../../../statics/APIs/custom'
import { TransactionHistoryList } from './components/TransactionHistoryList'
import { LabResultList } from './components/LabResultList'

export const HospitalScreen = (props) => {

  const { params } = props.navigation.state
  const [showData, setShowData] = useState('lab_result')

  const ConditionalRender = (type) => {
    setShowData(type);
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          marginVertical: 20
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          {params.name}
        </Text>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              ConditionalRender('lab_result')
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: showData === 'lab_result' ? '#F5FFFA' : 'lightgrey',
              margin: 10,
            }}
          >
            <View
              opacity={showData === 'transactions' ? 0.5 : 1}
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  // backgroundColor: showData === 'transactions' ? '#FFFFFF50' : '',
                  alignItems: 'center',
                  flex: 2
                }}
              >
                <Image
                  source={{ uri: `https://pic.onlinewebfonts.com/svg/img_533255.png` }}
                  resizeMode="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  flex: 1
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
                    Hasil Lab
                  </Text>
                  <Text style={{ color: 'white', fontSize: 10 }}>
                    {/* {idx % 2 === 0 ? 'Rumah Sakit' : 'Klinik'} */}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ConditionalRender('transactions')}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: showData === 'transactions' ? '#F5FFFA' : 'lightgrey',
              margin: 10,
            }}
          >
            <View
              opacity={showData === 'lab_result' ? 0.5 : 1}
              style={{
                flex: 1
              }}
            >

              <View
                style={{
                  // backgroundColor: showData === 'lab_result' ? '#FFFFFF50' : '',
                  alignItems: 'center',
                  flex: 2
                }}
              >
                <Image
                  source={{ uri: `https://pic.onlinewebfonts.com/svg/img_455828.png` }}
                  resizeMode="center"
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  flex: 1
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
                    Riwayat Transaksi
                  </Text>
                  <Text style={{ color: 'white', fontSize: 10 }}>
                    {/* {idx % 2 === 0 ? 'Rumah Sakit' : 'Klinik'} */}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView>
        {showData === 'lab_result' &&
          <View style={{ margin: 10 }}>
            <Text>Lab List</Text>
            <LabResultList props={props} />
          </View>
        }
        {showData === 'transactions' &&
          <View style={{ margin: 10 }}>
            <Text>Transaction List</Text>
            <TransactionHistoryList props={props} />
          </View>
        }
      </ScrollView>
      {/* <View>
        <Text>
          {showData === 'lab_result' ?
            <RenderLabResult />
            :
            <RenderTransaction />
          }
        </Text>
      </View> */}
    </View>
  )
}

