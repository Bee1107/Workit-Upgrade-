
import React, { useEffect, useState } from 'react'

import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import InputText from '../../components/InputText'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionButton from '../../components/ActionButton'
import MapboxGL from '@rnmapbox/maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../utils/colors'

const AddAddressScreen = ({selectedAddress, get, location, post, isLoading}) => {

    const [coordinate, setCoordinate] = useState([0,0])
    
    const [housenumber, setHouseNumber] = useState('')
    const [district, setDistrict] = useState('')
    const [departmentNumber, setDepartmentNumber] = useState('')
    const [reference, setReference] = useState('')

    useEffect(() => {
        
        if(location.geometry){
            setCoordinate([location.geometry.location.lng, location.geometry.location.lat])
        }
       
    }, [location])

    useEffect(() => {
        
        get(selectedAddress)
        

        if(selectedAddress.terms){

            const filtered = selectedAddress.terms.filter( e => !isNaN(e.value))
            if(filtered.length > 0){
                setHouseNumber(filtered[0].value)

                if(selectedAddress.terms[2]){
                    setDistrict(selectedAddress.terms[2].value)
                }

            } else {
                
                if(selectedAddress.terms[1]){
                    setDistrict(selectedAddress.terms[1].value)
                }

            }
        }


    }, [])

    return (
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
            <Spinner
                visible={isLoading}
                textContent={'Agregando Dirección'}
                textStyle={styles.spinnerTextStyle}
                />
            
            <KeyboardAvoidingView
                behavior="height"
               keyboardVerticalOffset={140}
               style={{flex: 1}}
            >
                <ScrollView>
                <MapboxGL.MapView style={{ height: 200}}  >
                    <MapboxGL.Camera 
                        zoomLevel={14}
                        centerCoordinate={coordinate}
                    />
                    <MapboxGL.PointAnnotation
                            key="pointAnnotation"
                            id="pointAnnotation"
                            coordinate={coordinate}>
                                <View style={{
                                    height: 24, 
                                    width: 24, 
                                    backgroundColor: colors.mainColor, 
                                    borderRadius: 12, 
                                    borderColor: colors.white, 
                                    borderWidth: 3
                                    }} />
                        </MapboxGL.PointAnnotation>
                </MapboxGL.MapView>

                <View style={{padding: 10, paddingBottom:20}}>

                   
                    <InputText
                        label="Dirección"
                        text={selectedAddress ? selectedAddress.description : ''}
                        placeholder="Escribe tu dirección" 
                    />
                
                    <InputText
                        label="Número"
                        text={housenumber}
                        placeholder="Escribe el número" 
                        onChange={setHouseNumber}
                    />

                    <InputText
                        label="Comuna"
                        text={district}
                        placeholder="Escribe tu comuna" 
                        onChange={setDistrict}
                    />
                      
                     <InputText
                        label="Casa / Departamento (Opcional)"
                        text={departmentNumber}
                        placeholder="ejemplo: 185B" 
                        onChange={setDepartmentNumber}
                    />
               
                    <InputText
                        label="Referencia (Opcional)"
                        text={reference}
                        placeholder="Indica una referencia de tu dirección" 
                        onChange={setReference}
                    />
                   
                    </View>
                </ScrollView>
               </KeyboardAvoidingView>
             <View style={styles.bottom}>
                <ActionButton
                    text="Confirmar"
                    style={styles.button}
                    isDisabled={housenumber === '' || district===''}
                    onPress={() => {
                        post({
                            housenumber,
                            departmentNumber,
                            reference,
                            district
                        })
                    }}
                    />
             </View>
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    button:{
        width: '100%',
        marginTop: 20
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    bottom:{
        paddingHorizontal: 10, 
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: colors.grayLigth,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.white
    }
})

export default AddAddressScreen