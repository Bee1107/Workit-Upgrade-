import React, { useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import EmptyImageView from '../../../components/EmptyImageVIew'
import Card from '../../../components/card'
import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import colors from '../../../utils/colors'
import { images } from '../../../assets'
import { format } from 'rut.js'
import { dateToHumanFormat } from '../../../utils/date'

const accountType = [
    {
        label: 'Cuenta Corriente'
    },
    {
        label: 'Cuenta Vista / Cuenta Rut'
    },
    {
        label: 'Cuenta de Ahorro'
    }
]

const Item = ({ title, value}) => (
    <View style={styles.itemCard}>
        <View style={styles.itemCardInner}>
            <Heading fontSize={12}>{title}</Heading>
            <Label color={colors.text.subtitle} fontSize={14}>{value}</Label>
        </View>
    </View>
)

const BankAccountScreen = ( { get, bank, deleteAction }) =>{ 

    const navigation = useNavigation()

    useEffect(() => {
        get()
    }, [])
    const addAccount = () => {
        navigation.navigate('AddAccountBank')
    }

    const onDelete = () => {
        Alert.alert(
            '¿Estás seguro que quieres eliminar esta cuenta?',
            'Es necesario que mantengas una cuenta bancaria para que recibas los pagos, si deseas cambiar esta cuenta, debes eliminar esta cuenta y agregar la nueva.',
            [
                {
                    style: 'cancel',
                    text: 'Cancelar',
                    onPress: () => {
                        
                    },
                },
              {
                text: 'Ok',
                onPress: () => {
                    deleteAction()
                },
              },
              
            ],
            {cancelable: false, onDismiss: () => resolve()},
          )
    }
    return (
        <View style={styles.container}>
            {bank && (
                <Card style={{padding: 0}}>
                    <View style={{padding: 20}}>
                        <Heading>{bank.bank}</Heading>
                    </View>
                    <Item title="NOMBRE" value={bank.full_name} />
                    <Item title="Nº DE CUENTA" value={bank.account_number} />
                    <Item title="RUT" value={format(bank.RUT)} />
                    <Item title="TIPO DE CUENTA" value={accountType[bank.account_type - 1].label} />
                    <Item title="AÑADIDO" value={dateToHumanFormat(new Date(bank.created_at))} />
                    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                        <Heading color="white">ELIMINAR CUENTA</Heading>
                    </TouchableOpacity>
                </Card>
            )}
            {!bank && (
                <EmptyImageView 
                    image={images.volumenIcon.card} 
                    message= "No has Agregado una cuenta"
                    buttonTitle="AGREGAR CUENTA BANCARIA"
                    onPress={addAccount}
                    size={200}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        padding: 20
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
    itemCard:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.grayLigth
    },
    itemCardInner:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    deleteButton:{
        backgroundColor: colors.dangerColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    }
})


export default BankAccountScreen