import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GET_TRANSACTION_HISTORY, TOKEN } from '../../../../../statics/APIs/custom';

export const TransactionHistoryList = ({ props }) => {
  const [trans, setTrans] = useState([])
  const { params } = props.navigation.state

  useEffect(() => {
    RenderTransactionAPI()
  }, [])


  const RenderTransactionAPI = async () => {
    try {
      const TransactionData = await axios.get(GET_TRANSACTION_HISTORY, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      if (TransactionData.data) {
        setTrans(TransactionData.data.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RenderMachine = (trans) => {
    let array = []
    if (trans.length > 0) {
      trans.map((data, idx) => {
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
      }}
    >
      <View style={{ flexDirection: 'row', width: '100%', flex: 1, marginVertical: 5 }}>
        <Text style={{ flex: 1 }}>No</Text>
        <Text style={{ flex: 3 }}>Konsultasi</Text>
        <Text style={{ flex: 2 }}>Lokasi</Text>
        <Text style={{ flex: 2 }}>View</Text>
      </View>
      <View style={{ borderTopWidth: 1, borderColor: '#8FBC8F', marginVertical: 5 }} />
      <View
        style={{
        }}
      >
        {RenderMachine(trans).length > 0 ?
          RenderMachine(trans).map((data, idx) => {
            return (
              <View key={idx} style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                <Text style={{ flex: 1, fontSize: 12 }}>{idx + 1}</Text>
                <Text style={{ flex: 3, fontSize: 12 }}>{data.type}</Text>
                <Text style={{ flex: 2, fontSize: 12 }}>{`dr. ${data.doctor.firstName}`}</Text>
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
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('Laboratorium', props)}
      >
        <View>
          <Text>
            Show Detail Laboratorium List
          </Text>
        </View>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({})