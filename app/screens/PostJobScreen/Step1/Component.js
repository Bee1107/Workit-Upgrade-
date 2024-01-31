import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import InputText from '../../../components/InputText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import ActionButton from '../../../components/ActionButton'
import { ScrollView } from 'react-native-gesture-handler'
import PickerButton from '../../../components/PickerButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddressInput from '../../../components/AddressInput'
import AvatarPicker from '../../../components/AvatarPicker'
import Label from '../../../components/text/Label'
import colors from '../../../utils/colors'
import Wizard from '../Addons/wizard'

const SignupScreen = ({ push, categories, get, subcategories, getSubcategories, route  }) => {

    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [approach, setApproach] = useState()
    const [category, setCategory] = useState()
    const [subcategory, setSubcategory] = useState()
    const [placeholder, setPlaceholder] = useState('¿Qué necesitas?')

    useEffect(() => {
        if(route.params && route.params.user){
            setPlaceholder(`¿Qué necesitas de ${route.params.user.name}?`)
        }
       
        get()
    }, [])

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


    const getApproachData = () => {
        if(!category && !subcategory){
            return []
        }
       
        return subcategory ? subcategory.types : category.types
    }

    const getIsDisabled = () => {
        if(!category || !approach || name === '' || description === ''){
            return true
        } 

        return false
    }

    const onContinue = () => {
        push({
            name,
            description,
            approach,
            category,
            subcategory,
            worker_selected: (route.params && route.params.user) ? route.params.user.id : null,
        })

        navigation.navigate('PostJobStep2')
    }
  

    return (   
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>
            <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']} >
            
            <Wizard />

            <ScrollView style={{backgroundColor: colors.white}}>

                <View style={{padding: 20, backgroundColor:'rgba(0,0,0,0)'}}>

                
                <InputText
                        label={placeholder}
                        placeholder="ej: Armar un mueble, reparar, etc"
                        text={name}
                        onChange={setName}
                    />

                {route.params && route.params.user && (
                    <View style={{marginVertical: 10, flexDirection: 'row', backgroundColor: colors.winterWhite, padding: 10, paddingHorizontal: 20, borderRadius: 30, justifyContent: 'center'}}>
                        <AvatarPicker sizeType="tiny" url={route.params.user.profile_picture} />
                        <Label fontSize={12} style={{marginLeft: 10, marginRight: 10, alignSelf: 'baseline'}}>{`Recuerda que este servicio lo vera exclusivamente ${route.params.user.name} ${route.params.user.father_last_name}`}</Label>
                    </View>
                )}

                <InputText
                        label="Descripción del servicio"
                        placeholder="ej: Armar Litera y Mueble para la tele"
                        multiline={true}
                        text={ description}
                        onChange={setDescription}
                        style={{marginTop: 10}}
                        height={200}
                        alignText="top"
                    />


                <PickerButton
                    label={'Categoria'}
                    data={categories}
                    keyData="category_name"
                    value={category}
                    onChange={ value => {
                        setCategory(value)
                        setSubcategory(undefined)
                        setApproach(undefined)
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
            <PickerButton
                    label={'Tipo de servicio'}
                    data={getApproachData()}
                    value={approach}
                    onChange={(value) => {
                        setApproach(value)
                    }}
                    placeHolder="Seleccionar tipo"
                    style={{ marginTop: 10}}
                />

                <View style={{marginTop: 20}}>
                <AddressInput />
                </View>
                   
               
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
    header:{
        flex:1,
        width: '100%',
        height: 200,
        position:'absolute',
        top: -40,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    steps:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginHorizontal: 20
    },
    step:{
        backgroundColor:'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLine:{
        height: 2,
        width: '100%',
        position: 'absolute',
        top: 44,
        left:20,
        backgroundColor: 'gray',
        zIndex: 0,
    }
})

export default SignupScreen