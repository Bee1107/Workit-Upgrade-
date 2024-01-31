import React, { useState} from 'react'
import { View, StyleSheet } from 'react-native'
import InputText from '../../../components/InputText'
import ActionButton from '../../../components/ActionButton'
import Label from '../../../components/text/Label'
import colors from '../../../utils/colors'
import PickerButton from '../../../components/PickerButton'
import { BANKS, TYPE_ACCOUNT_BANK } from '../../../utils/constants'
import Spinner from 'react-native-loading-spinner-overlay'

const AddBankAccountBankScreen = ({ post, isLoading }) =>{ 


    const [bank, setBank] = useState({})
    const [typeAccount, setTypeAccount] = useState({})
    const [rut, setRut] = useState('')
    const [name, setName] = useState('')
    const [numberAccount, setNumberAccount] = useState('')
   

    const addAccount = () => {

        const payload = {
            RUT: rut,
            full_name: name,
            bank: bank.label,
            sbif: bank.sbif,
            account_number: numberAccount,
            account_type: typeAccount.index
        }

        post(payload)
    }

    const isDisabledButton = () => {
        if(rut === '' || name === '' || numberAccount === '' || bank === {} || typeAccount === {}) return true
    }

    return (
        <View style={styles.container}>

            <Spinner
                visible={isLoading}
                textContent={'Guardando...'}
                textStyle={styles.spinnerTextStyle}
                />


             <InputText
                label="Nombre"
                text={name}
                onChange={setName}
                placeholder="Nombre Completo" 
                style={styles.input}
                />
            <InputText
                label="RUT"
                text={rut}
                onChange={setRut}
                placeholder="Rut" 
                style={styles.input}
                />

            <PickerButton
                  label={'Banco'}
                  data={BANKS}
                  keyData="label"
                  value={bank}
                  onChange={(value) => {
                    setBank(value)
                  }}
                  placeHolder="Elige tu banco"
                  style={styles.input}
                  />
              <PickerButton
                  label={'Tipo'}
                  data={TYPE_ACCOUNT_BANK}
                  keyData="label"
                  value={typeAccount}
                  onChange={(value) => {
                      setTypeAccount(value)
                  }}
                  placeHolder="Tipo de Cuenta"
                  style={styles.input}
                  />
            <InputText
                label="Cuenta"
                text={numberAccount}
                onChange={setNumberAccount}
                placeholder="Número de cuenta" 
                keyboardType = "numeric"
                style={styles.input}
                />


            <View style={styles.disclaimer}>
                <Label color={colors.black} fontSize={12}>Esta información debe ser completada solo la primera vez que proporcionará un Servicio, luego esta información se guardará en su perfil y podrá editarla en su perfil si es necesario</Label>
            </View>
            <ActionButton 
            text="Guardar" 
            onPress={addAccount}
            style={{width:'100%', marginTop: 10}}
            isDisabled={isDisabledButton()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 10
    },
    option: {
        paddingTop: 50
    },
    button:{
        width: '100%',
        backgroundColor:'#000', 
        borderRadius: 6,
        marginTop: 20
    },
    input:{
        marginTop: 10
    },
    disclaimer:{
        backgroundColor: colors.winterWhite,
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    spinnerTextStyle: {
        color: 'white',
    }
})


export default AddBankAccountBankScreen