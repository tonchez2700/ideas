import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearProgress } from 'react-native-elements';

interface Props {
    current: numeric
    total: numeric
    percentage: numeric
}

const ProgressBar = ({ current, total, percentage }: Props) => {

    return (
        <View style={{ width: '85%' }}>
            <View style={{ marginTop: 15, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'gray' }}>Progreso actual: ${current}</Text>
                <Text style={{ color: 'gray' }}>Meta: ${total}</Text>
            </View>
            <View>
                <LinearProgress
                    value={percentage / 100}
                    variant="determinate"
                    color="primary"
                />
            </View>
            <Text style={{ color: 'gray', marginVertical: 5 }}>{percentage.toFixed(2)}% Completado</Text>
        </View>
    );
}

export default ProgressBar;

const inputs = StyleSheet.create({

})