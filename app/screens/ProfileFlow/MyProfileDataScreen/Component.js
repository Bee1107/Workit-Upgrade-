import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay'
import {useNavigation} from '@react-navigation/native'
import colors from '../../../utils/colors'
import Card from '../../../components/card'
import InputText from '../../../components/InputText'
import Label from '../../../components/text/Label'
import ActionButton from '../../../components/ActionButton'
import ActionSheetUpload from '../../../components/ActionSheetUpload'
import Heading from '../../../components/text/Heading'
import AvatarPicker from '../../../components/AvatarPicker'
import { images } from '../../../assets'
import { validationFields } from '../../../utils/validation'

const MyProfileDataScreen = ({isLoading, user, upload, update, selectUser}) => {
  const actionSheet = useRef(null)
  const navigation = useNavigation()
 
  const [phone, setPhone] = useState(user.contact_number)
  const [oldPhone, setOldPhone] = useState(user.contact_number)

  useEffect(() => {
    setOldPhone(user.contact_number)
  }, [user.contact_number])

  const isDisabled = () => {
    const { isValid } = validationFields([{
      type:'phone',
      value: phone
    }])

    return !isValid || (phone === oldPhone)
  }
  
  return (
    <ScrollView
      style={{flex: 1, padding: 20, backgroundColor: colors.white}}
      contentInset={{bottom: 40}}
      >

      
      <ActionSheetUpload 
        innerRef={actionSheet} 
        onUpload={ response => {
          upload({image: response, photoField: 'profile_picture'})
        }} />

      <Spinner
        visible={isLoading}
        textContent={'Guardando...'}
        textStyle={styles.spinnerTextStyle}
      />
        <View style={styles.sectionHeader} >
            <Heading color={colors.text.title}>Configuración</Heading>
        </View>
       <Card>

            {user!== null && user.type === 'WORK' && (
              <TouchableOpacity style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CCC'}} onPress={() => {
                selectUser(user)
                navigation.navigate('WorkerProfile', { screen:'WorkerProfile', params: { editable: true }})
              }}>
                  <View  style={styles.item}>
                        <View style={{flexDirection: 'row',}}>
                            <Image source={images.profile_menu.workerProfile} style={{width: 20, height: 20}} resizeMode="contain" />
                            <Label style={styles.itemLabel}>Perfil de Worker</Label>
                        </View>
                        <Image source={images.arrow.gray} style={{width: 20, height: 20}} resizeMode="contain" />
                    </View>
                  
              </TouchableOpacity>
            )}
            {user!== null && user.type === 'WORK' && (
            <TouchableOpacity onPress={()=>{
              navigation.navigate('WorkerData')
            }} style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CCC'}}>
                <View  style={styles.item}>
                    <View style={{flexDirection: 'row',}}>
                        <Image source={images.profile_menu.worker} style={{width: 20, height: 20}} resizeMode="contain" />
                        <Label style={styles.itemLabel}>Datos del Worker</Label>
                    </View>
                    <Image source={images.arrow.gray} style={{width: 20, height: 20}} resizeMode="contain" />
                </View>
            </TouchableOpacity>
             )}
            <TouchableOpacity onPress={()=>{
              navigation.navigate('ChangePassword')
            }}>
            <View  style={styles.item}>
                    <View style={{flexDirection: 'row',}}>
                        <Image source={images.signup.lock} style={{width: 20, height: 20}} resizeMode="contain" />
                        <Label style={styles.itemLabel}>Cambiar contraseña</Label>
                    </View>
                    <Image source={images.arrow.gray} style={{width: 20, height: 20}} resizeMode="contain" />
                </View>
            </TouchableOpacity>
        </Card>
        <View style={styles.sectionHeader} >
            <Heading color={colors.text.title}>Datos Generales</Heading>
        </View>
        <Card>
            <View style={styles.topCard}>
              <AvatarPicker showEdit={true} sizeType="small" url={user.profile_picture} onPress={() => {
                if(actionSheet !== null){
                  actionSheet.current.show()
                }
              }} />
              <View style={{marginLeft: 10}}>
                <Heading fontSize={16} color={colors.text.title}>{`${user.name} ${user.father_last_name} ${user.mother_last_name}`}</Heading>
                <Label fontSize={14} color={colors.text.subtitle}>{user.email}</Label>
                <Label fontSize={14} color={colors.text.subtitle}>{user.nationality}</Label>
              </View>
            </View>
            <InputText
                placeholder="Escribe tu telefono"
                prefix="🇨🇱 +56"
                label="Teléfono"
                text={phone}
                onChange={setPhone}
                style={{marginTop: 10}}
            />
        </Card>
        <ActionButton 
            text="Guardar Datos"
            isDisabled={isDisabled()} 
            style={{marginTop: 30}}
            onPress={() => {
              update({contact_number: phone})
            }}
            />
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.winterWhite,
    padding: 20
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 19,
    paddingLeft: 20
  },
  itemLabel: {
    color: '#CCC',
    marginLeft: 27
  },
  sectionHeader:{
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  topCard:{
    flexDirection:'row',
    alignItems: 'center'
  }
});

export default MyProfileDataScreen
