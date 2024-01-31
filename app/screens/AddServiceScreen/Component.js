import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import InputText from '../../components/InputText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionButton from '../../components/ActionButton'
import { ScrollView } from 'react-native-gesture-handler'
import PickerButton from '../../components/PickerButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChipSelector from '../../components/ChipSelector'
import Label from '../../components/text/Label'
import InputBigNumber from '../../components/InputBigNumber'
import ActionSheetUpload from '../../components/ActionSheetUpload'
import colors from '../../utils/colors'
import { stringToInt } from '../../utils/number'
import { images } from '../../assets'
import {  MEASURES, CITIES_CHILE, ALL_COUNTRY } from '../../utils/constants'


const HelpLabel = ({children}) => <Label 
                                    fontSize={12} 
                                    style={{textAlign: 'center', marginTop: 10}}>{children}</Label>
                
const currentDistrict = ({addresses}) =>  {
    
    if(!addresses) return []

   const result =  addresses
        .map(({district}) => district)
        .map(district =>  CITIES_CHILE.find(({comunas}) => comunas.includes(district)))
        .filter(obj => obj)
        .map(({region}) => region)
   
  
    return  [ALL_COUNTRY, ...new Set(result), ...new Set(addresses.map(({district}) => district).filter(item => item !== null))]
}



const AddServiceScreen = ({ user, post, categories, get, subcategories, getSubcategories  }) => {


    const actionSheet = useRef(null)

    const [name, setName] = useState('')
    const [aproach, setAproach] = useState([])
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState()
    const [subcategory, setSubcategory] = useState()
    const [amount, setAmount] = useState(0)
    const [image, setImage] = useState()
    const [measure, setMesuare] = useState(MEASURES[0])
    const [districts, setDistricts] = useState(currentDistrict(user))

    useEffect(() => {
        get()
    }, [])

    useEffect(() => {
        setDistricts(currentDistrict(user))
    }, [user])

    useEffect(() =>{
        if(categories.length > 0){
            setCategory(categories[0])
            getSubcategories({ categoryId: categories[0].category_id })
        }
    }, [categories])

    useEffect(() =>{
        if(subcategories.length > 0){
            setSubcategory(subcategories[0])
        }
    }, [subcategories])


    const getAproachData = () => {
        if(!category && !subcategory){
            return []
        }
       
        return subcategory ? subcategory.types : category.types
    }

    const getIsDisabled = () => {

        if(!category || amount==='' || amount===0 || name === '' || description === '' || districts.length <= 0 || aproach.length <= 0){
            return true
        } 

        return false
    }

    const onContinue = () => {
       
        const payload = {
            name,
            description,
            amount: stringToInt(amount),
            image,
            category,
            subcategory: subcategory ? subcategory : {},
            aproach,
            measure,
            districts
        }
        post(payload)
     
    }
  
    return (   
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>
            <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']} >
            
            <ActionSheetUpload 
            maxWidth={1000}
            maxHeight={1000}
            innerRef={actionSheet} 
            onUpload={ response => {
                setImage(response)
            }} />

            
            <ScrollView style={{backgroundColor: colors.white}}>

                <View style={{padding: 20, backgroundColor:'rgba(0,0,0,0)'}}>

                <InputText
                    label="¿Qué Ofreces?"
                    placeholder={ Platform.OS === 'ios' ? 'ej: Armado de mueble, Servicio de Gasfiteria, etc' : 'ej: Armado de mueble'}
                    text={name}
                    onChange={setName}
                />

                <InputText
                    label="Descripción del servicio"
                    placeholder="ej: Reparación de Cocina"
                    multiline={true}
                    text={ description}
                    onChange={setDescription}
                    style={{marginTop: 10}}
                    height={200}
                    alignText="top"
                />

                <ChipSelector
                    label="Comunas disponibles"
                    data={currentDistrict(user)}
                    selected={districts}
                    style={{marginTop: 20}}
                    onSelected={setDistricts}
                />

                <HelpLabel>
                    Selecciona las comunas en las que estas entregando el servicio
                </HelpLabel>

                <TouchableOpacity style={styles.photoContainer} onPress={() =>{
                        if(actionSheet !== null){
                            actionSheet.current.show()
                          }
                   }}>
                  
                        <Label color={colors.mainColor} style={styles.label}>Foto Referencia</Label>
                        {image && (
                            <Image source={{uri: image.uri}} style={styles.image} />
                        )}
                        {!image && (
                            <Image source={images.chat.camera} style={styles.image} resizeMode="contain" />
                        )}
                        
                </TouchableOpacity>
               
                <HelpLabel>
                    Toma una fotografía para acompañar tu servicio
                </HelpLabel>

                <PickerButton
                    label={'Categoria'}
                    data={categories}
                    keyData="category_name"
                    value={category}
                    onChange={ value => {
                        setCategory(value)
                        setSubcategory(undefined)
                        getSubcategories({ categoryId: value.category_id })
                    }}
                    placeHolder="Seleccionar categoria"
                    style={{ marginTop: 10}}
                    />
                {subcategories.length > 0 && (
                    <PickerButton
                    label={'Subcategoria'}
                    data={subcategories}
                    keyData="subcategory_name"
                    value={subcategory}
                    onChange={(value) => {
                        setSubcategory(value)
                    }}
                    placeHolder="Selecionar subcategoria"
                    style={ { marginTop: 10}}
                />
                )}
 
                <View style={{marginTop: 10}}>
                   
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <InputBigNumber
                                label="Precio"
                                text={amount}
                                onChange={setAmount}
                                style={{flex: 1}}
                                fontSize={30}
                            />
                            
                        <PickerButton
                                label={'Por'}
                                data={MEASURES}
                                value={measure}
                                onChange={(value) => {
                                    setMesuare(value)
                                }}
                                placeHolder=""
                                style={{ width: 140}}
                            />
                    </View>
                    <HelpLabel>
                        Debes especificar un precio y un tipo, ejemplo: $4.000 por mt2
                    </HelpLabel>
                </View>

                <ChipSelector
                    label="Tipo de servicio"
                    data={getAproachData()}
                    style={{marginTop: 20}}
                    selected={aproach}
                    onSelected={setAproach}
                />
               
                <HelpLabel>
                    Selecciona los tipos que quieres ofrecer para este servicio
                </HelpLabel>
            
            </View>
            </ScrollView>

            <View style={{padding: 20, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#CCC'}}>
                <ActionButton text="Continuar" isDisabled={getIsDisabled()} style={{marginTop: 10}} onPress={onContinue} />
            </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    label:{
        marginLeft: 20,
    },
    image:{
        borderRadius: 10,
        width: 36,
        height: 36
    },
    photoContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    }
})

export default AddServiceScreen