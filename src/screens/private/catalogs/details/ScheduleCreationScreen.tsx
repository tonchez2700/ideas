import { StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'

interface Props extends NativeStackScreenProps<any, any>{};

const ScheduleCreationScreen = ({ route, navigation }: Props) => {
  return (
    <View>
      <Text>ScheduleCreationScreen</Text>
    </View>
  )
}

export default ScheduleCreationScreen

const styles = StyleSheet.create({})