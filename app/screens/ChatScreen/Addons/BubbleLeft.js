import React from 'react'
import { View, StyleSheet } from 'react-native'
import Label from '../../../components/text/Label'
import Colors from '../../../utils/colors'
import { timeToHumanFormat } from '../../../utils/date'
import { CachedImage } from 'react-native-img-cache'

const BubbleLeft = props => {

    const { item } = props 
    
    return (
        <View style={styles.container}>
            <View style={styles.bubbleContainer}>
              
                <View style={styles.bubble}>
                    {item.image && item.image.length > 0 && (
                        <CachedImage source={{uri: item.image}} style={styles.image} />
                    )}
                    <View style={{paddingHorizontal: 15, paddingBottom: 5, }}>
                        <Label color={'black'} style={styles.label}>{item.message}</Label>
                        <Label fontSize={12} color={Colors.gray} style={styles.timeAgo}>{timeToHumanFormat(new Date(item.date))}</Label>
                   </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 5
    },
    bubbleContainer:{
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    bubble:{
        backgroundColor: Colors.chat.buble.left,
        padding: 10,
        paddingLeft: 10,
        borderRadius: 20,
        borderTopLeftRadius: 5,
        maxWidth: 300

       
    },
    label:{
        color: 'black',
        maxWidth: 280
    },
    tail:{
        width: 16,
        height: 16,
        marginTop: 10
    },
    timeAgo:{
        alignSelf:'flex-end'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10
    }
})

export default BubbleLeft