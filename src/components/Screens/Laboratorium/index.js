import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GET_LAB_RESULT, TOKEN } from '../../../statics/APIs/custom';

export const LaboratoriumScreen = (props) => {
  console.log(props, '<<<< laboratorium screen props');
  const [labResult, setLabResult] = useState([])

  useEffect(() => {
    GetLabResult()
  }, [setLabResult])


  const GetLabResult = async () => {
    try {
      const LabResultAPI = await axios.get(GET_LAB_RESULT(11), {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      if (LabResultAPI.data) {
        setLabResult(LabResultAPI.data.data.rows)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: '10' }}>Hasil Lab</Text>
      <View>
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            overflow: 'hidden',
            // backgroundColor: showData === 'lab_result' ? '#F5FFFA' : 'lightgrey',
            backgroundColor: '#F5FFFA',
            margin: 10,
          }}
        >
          <View>
            <Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})