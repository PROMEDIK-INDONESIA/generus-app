import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GET_LAB_RESULT, TOKEN } from '../../../../../statics/APIs/custom';

export const LabResultList = ({ props }) => {
  const { params } = props.navigation.state

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

  const RenderMachine = (labResult) => {
    let array = []
    if (labResult.length > 0) {
      labResult.map((data, idx) => {
        if (data.hospital && data.hospital.id === params.id) {
          array.push(data)
        }
      })
    }
    return array
  }

  return (
    <View
      style={{
        backgroundColor: '#F0FFFF',
        borderRadius: 20,
        padding: 10,
        minHeight: 200
      }}
    >
      <View style={{ flexDirection: 'row', width: '100%', flex: 1, marginVertical: 5 }}>
        <Text style={{ flex: 1 }}>No</Text>
        <Text style={{ flex: 3 }}>Lab Test Name</Text>
        <Text style={{ flex: 2 }}>Lokasi</Text>
        <Text style={{ flex: 2 }}>View</Text>
      </View>
      <View style={{ borderTopWidth: 1, borderColor: '#8FBC8F', marginVertical: 5 }} />
      <View
        style={{
        }}
      >
        {RenderMachine(labResult).length > 0 ?
          RenderMachine(labResult).map((data, idx) => {
            return (
              <View key={idx} style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                <Text style={{ flex: 1, fontSize: 12 }}>{idx + 1}</Text>
                <Text style={{ flex: 3, fontSize: 12 }}>{data.name}</Text>
                <Text style={{ flex: 2, fontSize: 12 }}>{data.hospital.name}</Text>
                <Text style={{ flex: 2, fontSize: 12 }}>View</Text>
              </View>
            )
          })
          :
          <View style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
            <Text style={{ fontSize: '20', color: 'lightgrey', textAlign: 'center' }}>
              Empty
            </Text>
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

