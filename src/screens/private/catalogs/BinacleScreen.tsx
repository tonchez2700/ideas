import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import useForm from '../../../hooks/useForm';

import { CustomHeader } from '../../../components/Layout/CustomHeader';
import { CustomTable } from '../../../components/FlatList/CustomTable';
import CustomInput from '../../../components/CustomInput';

import { general } from '../../../theme/customTheme';
import { Navigation } from '../../../helpers/interfaces/appInterfaces';

const BinacleScreen = ({ navigation }: Navigation) => {
    const [binacles, setBinacles] = useState<any>();
    const navegacion = navigation;

    const [filterProspects, setFilterProspects] = useState();
    const [searchData, setSearchData] = useState(false);

    const { search, onChange } = useForm({
        search: '',
    });
    
    const clearInput = useCallback(() => onChangeText(''), []);

    const onChangeText = (value: string) => {
        onChange(value, 'search')
        if(value) {
            const newData: any = binacles.filter((item: any) => {
                const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
                const numberData = item.phone && item.phone;
                const textData = value.toLowerCase();
                return (itemData.indexOf(textData) > -1 || numberData.indexOf(textData) > -1);
            })
            setFilterProspects(newData);
            setSearchData(true);
        } else {
            setFilterProspects(binacles);
            setSearchData(false);
        }
    }
    
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='BITÁCORA'
            />
            <View style={ general.fullScreen }>
                <View style={ general.global_margin }>
                    <CustomInput
                        nameIcon={ !searchData ? 'search' : 'close'}
                        onChangeText={ onChangeText }
                        onPress={ clearInput }
                        placeholder='Buscar'
                        type='TERTIARY'
                        value={ search }
                    />
                </View>
                <CustomTable />
            </View>
        </KeyboardAvoidingView>
    )
}

export default BinacleScreen;
