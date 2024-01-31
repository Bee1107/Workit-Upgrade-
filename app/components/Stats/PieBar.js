import React, { useState} from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native'
import Label from '../text/Label'
import SemiHeading from '../text/SemiHeading'
import LinearGradient from 'react-native-linear-gradient'
import ActionButton from '../../components/ActionButton'
import colors from '../../utils/colors'

const getFixData = (data, total) => {
    const newData = data.filter(({type}) => (type/total * 100).toFixed() >= 20)
    const newDataOther = data.filter(({type}) => (type/total * 100).toFixed() < 20)
    if(newDataOther.length > 0){
        return [...newData,...[
            {
                name: 'Otros',
                type: newDataOther.reduce((a,c)=> a + c.type,0),
                color: ['#EB3349','#F45C43'],
            }
        ]]
    } else {
        return [...newData]
    }
   
}


const PieBar = ({ data, style={} }) => {

    const total = data.reduce((a,{ type })=> a + type,0)
    const original = data
    const fixData = data.length > 2 ?  getFixData(data, total) : data

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
                style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <FlatList
                        data={original}
                        renderItem={({item}, index)=>
                             (
                                <View key={`key_${index}`} style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                    <Label fontSize={14}>{item.name}</Label>
                                    <SemiHeading fontSize={16}>{`${(item.type/total * 100).toFixed()}%`}</SemiHeading>
                                </View>
                            )
                        }
                        keyExtractor={(item) => `key_${item.name}`}
                    />
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
            <TouchableOpacity onPress={() => {
                setModalVisible(true)
            }}>
                <>
                <View style={[styles.container, style]}>
                <View style={styles.bar}>
                    {fixData.map((e, index) => (
                        <LinearGradient 
                            key={`key_${index}`} 
                            colors={e.color} 
                            start={{ x: 0, y: 0 }} 
                            end={{ x: 1, y: 0 }} 
                            style={{flex: e.type, height: 40}}  >
                            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                                {e.icon && <Image source={e.icon} style={{tintColor:'white'}} />}
                                {e.uri && <Image source={{uri: e.uri}} style={{width: 20, height: 20}} />}
                            </View>
                        </LinearGradient>
                    ))}
                </View>
            </View>
            <View style={{marginTop: 10}}>
                <View style={styles.bar2}>
                    {fixData.map((e, index) => (
                        <View key={`key_${index}`} style={{flex: e.type, alignItems:'center', justifyContent:'center'}}>
                            <SemiHeading fontSize={14}>{`${(e.type/total * 100).toFixed()}%`}</SemiHeading>
                            <Label fontSize={12}>{e.name}</Label>
                        </View>
                    ))}
                </View>
            </View>
                </>
            </TouchableOpacity>
            
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderRadius: 20,
    },
    bar:{
        flexDirection:'row',
        overflow:'hidden',
        borderRadius: 20,
    },
    bar2:{
        flexDirection:'row',
        alignItems: 'center'
    },
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

export default PieBar

