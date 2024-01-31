import React, {useState} from 'react'
import { TouchableOpacity, Image, Modal, View, StyleSheet } from 'react-native'
import { images } from '../../assets'
import Heading from '../text/Heading'
import Label from '../text/Label'
import ActionButton from '../ActionButton'
import colors from '../../utils/colors'

const HelpButton = ({config}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const onPress = () => {
        setModalVisible(true)
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Heading>{config.title}</Heading>
            <Label style={{marginTop: 10}}>{config.description}</Label>
            <ActionButton
                text="Entendido"
                onPress={() => {
                    setModalVisible(false)
                }}
                style={{marginTop: 20}}
            />
          </View>
        </View>
      </Modal>
            <Image source={images.helpButton} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      paddingHorizontal: 20,
      backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalView: {
      width: '100%',
      margin: 20,
      backgroundColor: colors.white,
      borderRadius: 10,
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
export default HelpButton