import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SectionList, TouchableOpacity, RefreshControl } from 'react-native'

import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import SemiHeading from '../../components/text/SemiHeading'
import colors from '../../utils/colors'
import AvatarPicker from '../../components/AvatarPicker'
import { useNavigation } from '@react-navigation/native'
import EmptyImageVIew from '../../components/EmptyImageVIew'
import { images } from '../../assets'

const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: item.read? colors.white:colors.notification.background}]}>
            <View style={{width: 60, height: 60}}>
           
                <AvatarPicker 
                    url={item.sender_image}
                    sizeType="small"
                    style={{zIndex: 0}}
                />
                {!item.read && <View style={styles.greenBadge}></View>}
            </View>
            <View style={{flex: 1, marginLeft: 10}}>
                <Heading style={styles.title} color={colors.text.title}>{item.sender_name}</Heading>
                <Label style={styles.title} color={colors.text.subtitle}>{`${item.notification_body} ${item.notification_type}`}</Label>
            </View>
    </TouchableOpacity>
)
  
const NotificationScreen = ( { get, list, oldList, read, badge, badgeOld, selectUser,  isLoading }) =>{ 

    const navigation = useNavigation()
    const [height, setHeight] = useState(300)

    useEffect(() => {
       get() 
    }, [])

    const onLayout = ({nativeEvent}) => {
        setHeight(nativeEvent.layout.height)
    }
    const onItemPress = item => () => {

        const { notification_type, job_id, bid_id, sender_id, sender_name } = item
        const job = {
            job_id
        }

        switch(notification_type){
            case 2:
                selectUser({
                    name: sender_name,
                    userId: sender_id,
                    work_images:[]
                })
               
                navigation.navigate('WorkerProfile', { screen:'WorkerProfile', params: { 
                    isLoading: true,
                    bid_id
                }})
            break
            case 4:
                navigation.navigate('BidDetail', { 
                    job:{
                        job_id: job_id
                    },
                    bid: {
                        bid_id
                    }
                  })
            break
            default:
                navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job }})
            break
        }

        if(!item.read){
            read(item)
        }
        
    }

    const getSections = () => {
        if(list.length <= 0 && oldList.length <= 0) return []
        return [
            {
                sectionIndex:0,
                title: 'Hoy',
                data: list,
                badge
            },
            {
                sectionIndex:1,
                title: 'Noticaciones antiguas',
                data: oldList,
                badde: badgeOld
            }
        ]
    }

    const renderItem = ({ item }) => (
        <Item
            item={item}
            onPress={onItemPress(item)}
        />
    )

 

    const renderSectionHeader = ({ section: { title, badge } }) => (
        <View style={styles.header}>
            <SemiHeading color={colors.text.title}>{title}</SemiHeading>
            {badge > 0 && (
                <View style={styles.badge}>
                    <Heading color="white">{badge}</Heading>
                </View>
            )}
        </View>
    )

    const onRefresh = () => get() 

    return (
        <View style={styles.container} onLayout={onLayout} >
            <SectionList
                sections={getSections()}
                keyExtractor={({sectionIndex}, index) => `${sectionIndex}_${index}`}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                  refreshing={isLoading}
                  onRefresh={onRefresh}
                />
                }
                renderSectionHeader={renderSectionHeader} 
                ListEmptyComponent={<EmptyImageVIew 
                    image={images.volumenIcon.notification}
                    message="No tienes notificaciones"
                    style={{  height }}
                />}
            />           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCC',
        backgroundColor: colors.winterWhite
    },
    option: {
        paddingTop: 50
    },
    badge:{
        width: 24,
        height: 24,
        backgroundColor: colors.red.normal,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    item:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCC',
        padding: 20,
        backgroundColor: colors.white
    },
    greenBadge:{
        position:'absolute',
        right:0, 
        bottom: 0,
        backgroundColor: colors.badge, 
        borderRadius: 30, 
        width: 15, 
        height:15,
        borderWidth: 2,
        borderColor: 'white',
        zIndex: 9999
    }
})


export default NotificationScreen