import React, { useEffect} from 'react'
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import Card from '../../components/card'
import colors from '../../utils/colors'
import { images } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import JobColorCard from '../../components/JobColorCard'

const questions = [
    {
        question: 'Como solicitar un servicio',
        response: 'Para solicitar un servicio debes dirigirte al Home -> Cliente, aquí encontraras 2 sistemas de solicitudes de servicio, por subasta y contratación directa de servicios.\n\nEn el sistema de subasta de servicios, deberás completar un breve formulario con una descripción del servicio, dirección, fotos, rango de fechas y hora en que necesitas el servicio y por el último el precio que estás dispuesto a pagar por este servicio. Pronto comenzaras a recibir distintas ofertas de Workers que están dispuestos a realizar el servicio, podrás chequear sus perfiles y ofertas y seleccionar al más adecuado para tu necesidad.\n\nPor otro lado, en contratación directa de servicios, podrás navegar por todas las categorías, donde podrás revisar los perfiles de los Workers y los servicios que ofrecen con sus respectivos precios y solicitar el servicio en el rango de fecha y hora que más te acomode.',
        buttons: [
            {
                label: 'Quiero solicitar un servicio ahora',
                navigate: 'PostJob',
            },
            {
                label: 'Quiero explorar servicios publicados',
                navigate: 'Services',
            }
        ]
    },
    {
        question: 'Presto servicios y necesito convertirme en Worker',
        response: 'Si prestas algún servicio y necesitas registrarte como Worker, debes dirigirte al Home -> Worker, entras a convierte en Worker, llenas un breve formulario, donde podras crear tu perfil de worker con descripción de tu perfil, detallar tus certificaciones si es que las tienes y subir fotos de tus servicios, además tendras que cargar una imagen por ambos lados de tu cedula de identidad, seleccionar tus categorías de interés y opcionalmente para obtener la verificación de seguridad deberas subir tus antecedentes penales y automáticamente quedaras registrado como Worker. \n\nSi vemos incongruencias en tus datos te informaremos que tu perfil ha sido dada de baja.\n\nRecuerda que mientras mas completo sea tu perfil mas opciones tendras para conseguir clientes.',
        buttons:[{
            label: 'Quiero completar mi perfil Worker',
            navigate: 'BeWorkerFlow'
        }]
    },
    {
        question: 'Metodología de pago',
        response: `El pago en el sistema de subasta de servicios se realiza a través de la pasarela de pago de Work It App una vez que el cliente ha aceptado la oferta del Worker, Work It App retendrá el pago y se liberara el pago al worker automáticamente cuando ambas partes hayan finalizado el servicio con éxito.\n\nEn tanto, en el sistema de contratación de servicios directos, la metodología funciona prácticamente de la misma manera, una vez que el cliente solicite un servicio a un worker determinado y este acepte la solicitud, el cliente deberá pagar mediante la pasarela de pagos de Work IT App, reteniendo el pago hasta que ambas partes de finalicen el servicio con éxito, liberando el pago automáticamente al worker.\n\nLa comisión de Work It App, es del 6% de monto cancelado más la comisión de la pasarela de pagos Payku del 2,8% aproximadamente.
Esta comisión se le carga el Worker al momento de liberar su pago.
        `,
        buttons: []
    },
    {
        question: 'Revisar mis pagos',
        response: 'Sí tienes dudas sobre tus pagos, debes ir a al historial de pagos, que se encuentra en Perfil -> Historial de pagos.\n\nAquí podrás revisar los pagos que has realizado, como también los pagos que te has recibido si eres Worker.',
        buttons: [
            {
                label: 'Ir a mis historial de pagos',
                navigate: 'MyPaymentsHistorial'
            }
        ],
    },
    {
        question: 'Revisar cuenta bancaria para los depósitos ',
        response: 'Si eres worker, debes proporcionar una cuenta bancaria, en la cual se depositara el dinero de los servicios que hayas realizado.\n\nSi ya ingresaste tu cuenta bancaria y deseas modificarla, debes eliminar la actual cuenta e ingresar la nueva cuenta en la que deseas recibir tus depósitos.',
        buttons: [
            {
                label: 'Ir a cuenta bancaria ',
                navigate: 'AccountBank'
            }
        ],
    },
    {
        question: 'Revisar mis datos',
        response: 'Puedes modificar tus datos en Perfil -> Mis datos, solo puedes cambiar tu foto de perfil y tu teléfono, también puedes cambiar tu contraseña.\n\nSi eres Worker, puedes editar tu perfil, agregando una foto de portada, una descripción, imágenes de tus servicios.',
        buttons: [
            {
                label: 'Ir a mis datos',
                navigate: 'ProfileData'
            }
        ],
    },
]


const SupportScreen = ({  getHistorialVendor, getHistorialOwner, ownerList, vendorList   }) => {
 
    const navigation = useNavigation()

    useEffect(() => {
        getHistorialOwner()
        getHistorialVendor()
    }, [])

    return (   
        <ScrollView style={styles.container}>
             {(ownerList.length > 0 || vendorList.length > 0) && (
                  <Heading>¿Necesitas ayuda con tu último servicio?</Heading>
             )}
             {ownerList.length > 0 &&  (
                 <View style={{marginTop: 10}}>
                    <JobColorCard 
                        item={ownerList[ownerList.length - 1]}
                        onPress={() => {
                            navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job: ownerList[ownerList.length - 1] } })
                        }}
                        />
                 </View>
                
             )}

            {vendorList.length > 0 &&  (
                 <View style={{marginTop: 20}}>
                    <JobColorCard 
                        item={vendorList[vendorList.length - 1]}
                        onPress={() => {
                            navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job: vendorList[vendorList.length - 1] } })
                        }}
                        />
                 </View>
                
             )}
           
            <View style={{marginTop: 20}}>
                <Heading>¿Tienes alguna duda?</Heading>
                <Card style={{marginTop: 20}} padding={0}>
                    {questions.map((e, index) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate(e.navigate || 'SupportDetail', e)
                        }} key={`key_${index}`} style={[styles.itemQuestion, {
                            borderBottomWidth: questions.length === index + 1 ? 0 : StyleSheet.hairlineWidth }]}>
                            <Label style={{flex: 1, marginRight: 10}}>{e.question}</Label>
                            <Image source={images.arrowList} style={styles.icon} resizeMode="contain" />
                        </TouchableOpacity>
                    ))}
                </Card>
            </View>
            <Image source={images.volumenIcon.support} style={{height: 140, height: 140, marginTop: 40, alignSelf:'center'}} resizeMode="contain" />
            <View style={{height: 40}} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
  
    spinnerTextStyle: {
        color: '#FFF'
    },
    icon:{
        width: 24,
        height: 24,
        tintColor: colors.black,
    },
    itemQuestion:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomColor: colors.grayLigth,
        alignItems: 'center'
    }
})

export default SupportScreen