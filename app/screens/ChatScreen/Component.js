import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Image, KeyboardAvoidingView } from 'react-native'
import RoundedInputText from '../../components/RoundedInputText'
import Label from '../../components/text/Label'
import Bubble from './Addons/Bubble'
import { images } from '../../assets'
import colors from '../../utils/colors'
import { UserChat } from '../../Hook/chat'
import database from '@react-native-firebase/database'
import ActionSheetUpload from '../../components/ActionSheetUpload'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { replacePhone, replaceEmail } from '../../utils/String'

const ChatScreen = ({ user, route, post, getUser, sendNotification }) => {

    const navigation = useNavigation()
    const actionSheet = useRef(null)
    const ref = useRef(null)
    let dbRef = null

    const [modalVisible, setModalVisible] = useState(false)
    const [image, setImage] = useState()
    const [message, setMessage] = useState('')
    const [message2, setMessage2] = useState('')
    const [timeoutWriting, setTimeoutWriting] = useState(null)
    
    const messages = UserChat(route.params.id)


    useEffect(() => {
        getUser({
            userId: route.params.sender_id
        })
    } , [])

    const onSend = () => {
        sendMessage({message})
        sendNotification({message, chatId: route.params.id})
    }

    const sendMessage = data => {
       
        const message = replaceEmail(replacePhone(data.message))

        const payLoad = {
            message: message,
            body: message,
            date: Date.now(),
            senderId: user.userId,
            receiver: route.params.sender_id,
        }

        if(data.image){
            payLoad.image = data.image
        }

        if(dbRef === null) dbRef = database()

        dbRef.ref(`chat/${route.params.id}`)
            .push()
            .set(payLoad)

        database()
            .ref(`/chatlist/${route.params.sender_id}/${route.params.id}`)
            .update({ 
                message, 
                updateAt: Date.now(),
                badge: database.ServerValue.increment(1),
                haveImage: data.image ? true : false
            })

        setMessage('')
    }

    const onConfirmSendImage = () => {
        setModalVisible(false)
        post({ image, callback: (image) => {
            sendMessage({message, image})
        } })
    }


    const onSendImage = () => {
        if(actionSheet !== null){
            actionSheet.current.show()
        }
    }

    useEffect(() => {
        if(dbRef === null) dbRef = database()
        dbRef
        .ref(`/chatlist/${user.userId}/${route.params.id}`)
        .update({badge: 0})
    }, [messages.length])

    useEffect(() => {

        if(message === '') return
        if(dbRef === null) dbRef = database()

        const userId = route.params.sender_id

        dbRef
            .ref(`/chatlist/${userId}/${route.params.id}`)
            .update({writing: true})

        if(timeoutWriting !== null){
            clearTimeout(timeoutWriting)
        }

        setTimeoutWriting(setTimeout(() => {
                                dbRef
                                    .ref(`/chatlist/${userId}/${route.params.id}`)
                                    .update({writing: false})
                            }, 1000))

    }, [message, message2])

  
    return (
        <KeyboardAvoidingView 
            keyboardVerticalOffset={100}
            behavior={'padding'}
            style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {}}>
                   
                   <TouchableWithoutFeedback onPress={() => {
                        setModalVisible(false)
                    }} style={{flex:1, backgroundColor:'red', position: 'absolute', width:'100%', height:'100%'}}>
                <View style={styles.modal}>
                    
                    <SafeAreaView style={styles.bottomView} edges={['right', 'bottom', 'left']}>
                            {image && (
                                <TouchableOpacity>
                                    <Image source={{uri: image.uri}} style={styles.image} />
                                </TouchableOpacity>
                               
                            )} 
                            <View style={[styles.chatInput, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}>
                                <View style={{flex: 1}}>
                                <RoundedInputText
                                    placeholder="Escribe algo..." 
                                    text={message2}
                                    onChange={setMessage2}
                                />
                                </View>
                                <TouchableOpacity onPress={onConfirmSendImage} style={{ width: 50, justifyContent:'center', alignItems:'center'}}>
                                    <Image source={images.chat.send} style={{width:32,height:32, tintColor: colors.mainColor}}  resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                    </SafeAreaView>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        
        <ActionSheetUpload 
            maxWidth={1000}
            maxHeight={1000}
            innerRef={actionSheet} 
            onUpload={ response => {
                setImage(response)
                setModalVisible(true)
            }} />

        <TouchableOpacity onPress={() => {
            navigation.navigate('EditDate')
        }} style={styles.changeDateButton}>
            <LinearGradient colors={['#EC6F66', '#F3A183']} style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', padding: 10, borderRadius: 10}}  >
                <View style={{flex:1, flexDirection:'row', marginRight: 10}}>
                    <Image source={images.volumenIcon.calendar2} style={{width:32,height:32}}  resizeMode="contain" />
                    <Label color="white" fontSize={12} style={{marginLeft: 10, flex: 1}}>Si han acordado cambiar la fecha u hora del servicio, deben cambiarlo acá</Label>
                 </View>
                 <Image source={images.arrowList} style={{width: 20,height: 20, tintColor:'white'}} resizeMode="contain" />
            </LinearGradient>  
        </TouchableOpacity>
       

        <FlatList
            ref={ref} 
            data={messages}
            onLayout={() => {}}
            inverted={true}
            keyExtractor={(item, index) =>  `key_${index}`}
            renderItem={({ item }) => <Bubble item={item} userId={user.userId} />}
            />
            <View style={styles.chatInput}>
                <View style={{flex: 1}}>
                <RoundedInputText
                    placeholder="Escribe algo..." 
                    text={message}
                    onChange={setMessage}
                />
                </View>
                {message !== '' && (
                    <TouchableOpacity onPress={onSend} style={{ width: 50, justifyContent:'center', alignItems:'center'}}>
                        <Image source={images.chat.send} style={{width:32,height:32, tintColor: colors.mainColor}}  resizeMode="contain" />
                    </TouchableOpacity>
                )}
                 {message === '' && (
                    <TouchableOpacity onPress={onSendImage} style={{ width: 50, justifyContent:'center', alignItems:'center'}}>
                        <Image source={images.chat.camera} style={{width:32,height:32, tintColor: colors.mainColor}}  resizeMode="contain" />
                    </TouchableOpacity>
                )}
            </View>
            </KeyboardAvoidingView>
    
    )
}

ChatScreen.options = {
    title:'Hola'
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    contentLabel:{
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexWrap:'wrap',
        borderRadius: 10,
        padding: 5,
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderColor: 'gray'
    },
    header:{
        flex: 1,
        padding: 10,
        justifyContent:'center'
    },
    headerTitle:{
        color: colors.white
    },
    chatInput:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: colors.white
 
    },
    modal:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 20,
        justifyContent: 'center'
    },
    image:{
      
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        width: '100%',
        height: 300
    },
    changeDateButton:{
        padding: 5,
        shadowColor: '#000',
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    }
})

export default ChatScreen