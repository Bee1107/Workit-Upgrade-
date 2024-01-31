import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import { useChatList } from '../../Hook/chat'
import BigSearchInput from '../../components/BigSearchInput'
import ChatItem from './Addons/ChatItem'
import SemiHeading from '../../components/text/SemiHeading'
import { images } from '../../assets'

const ChatListScreen = props => {

    const navigation = useNavigation()
    const { user, route } = props
    const list = useChatList(user.userId)
    const [height, setHeight] = useState(400)
    const [search, setSearch] = useState('')
    const [contacts, setContacts] = useState([])

    useEffect(() =>{
        if(search !== ''){
            const filtered = list.filter(({user_profile}) => user_profile).filter( ({user_profile:{name}}) => name.toUpperCase().indexOf(search.toUpperCase()) >= 0)
            setContacts(filtered)
        } else {
            setContacts(list.filter(({user_profile}) => user_profile))
        }
      
    }, [search, list])

    useEffect(() => {
        if(route && route.params){

           

            if(route.params.chatId && list.length > 0){
               
                const selectedItem = list.find(e => e.job_id === route.params.chatId)
                
                if(selectedItem){
                    onPress(selectedItem)()
                }
                
            }
        }
       
    })
    
    const onPress = item => () => {
      
        navigation.navigate('Chat',  { 
            id: item.job_id, 
            sender_id: item.sender_id, 
            receiver_user_id: item.receiver_user_id,
            user:{
                name: item.user_profile.name,
                profile_picture: item.user_profile.avatar,
                jobName: item.job_name,
                job: {
                    job_id: item.job_id,
                    job_name: item.job_name,
                    images: []
                },
            }
        })
     
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <BigSearchInput
                    editable={true}
                    placeHolder="Buscar Chat"
                    onChange={setSearch}
                    />
            </View>
            <FlatList
                renderItem={({item}) => <ChatItem {...item} onPress={onPress(item)} />}
                data={contacts}
                keyExtractor={({job_id}) => job_id}
                style={{flex:1}}
                onLayout={({nativeEvent})=>{
                    setHeight(nativeEvent.layout.height)
                }}
                ListEmptyComponent={() => (
                    <View style={{flex:1, justifyContent: 'center', alignItems:'center', height }}>
                        <Image source={images.volumenIcon.chat} style={{width: 140, height: 140}} resizeMode="contain" />
                        <SemiHeading color={colors.text.subtitle} style={{ marginTop: 10 }}>No hay chats activos</SemiHeading>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    searchContainer : {
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.grayLigth
    },
})

export default ChatListScreen