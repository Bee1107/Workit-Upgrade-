import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native'


import Heading from '../../../../components/text/Heading'
import Label from '../../../../components/text/Label'
import { getNameFormat } from '../../../../utils/String'
import colors from '../../../../utils/colors'
import ActionButton from '../../../../components/ActionButton'

const InfoModal = ({ user, tooltipKey='', save, storage, read }) => {


  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    read()
}, [])

  useEffect(() => {
    setShowModal(true)
  },[])


  return (
      <>
    {storage[tooltipKey] && null}
    {!storage[tooltipKey] && (
        <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
         
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
    
            <Heading color={colors.mainColor} >{`${getNameFormat(user)}, bienvenido a tu perfil de Worker`}</Heading>
            
            <Label style={{ marginTop: 20}}>Este es tu perfil de Worker, esto lo podrán ver los usuarios cuando reciban tus ofertas, es importante que tengas un perfil lo más nutrido posible, con una descripción de ti y muchas fotos de tu servicio</Label>
            <ActionButton 
              text="Aceptar" 
              onPress={() => {
                setShowModal(false)
                save({
                    [tooltipKey]: true
                })
              }}
              style={{marginTop: 30}}  
            />
          </View>
        </View>
      </Modal>
    )}
   </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(1,1,1,0.5)',
    paddingHorizontal: 30
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

})

export default InfoModal
