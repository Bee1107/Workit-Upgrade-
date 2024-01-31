import React from 'react'
import { View, StyleSheet  } from 'react-native'
import Label from '../../../components/text/Label'
import Colors from '../../../utils/colors'
import { timeToHumanFormat } from '../../../utils/date'
import { CachedImage } from 'react-native-img-cache'

const BubbleRight = props => {

    const { item } = props 
    return (
        <View style={styles.container}>
            <View style={styles.bubbleContainer}>
                <View style={styles.bubble}>
                    {item.image && item.image.length > 0 && (
                        <CachedImage source={{uri: item.image}} style={styles.image} />
                    )}
                    <View style={{paddingHorizontal: 15, paddingBottom: 5}}>
                        <Label color={Colors.white} style={styles.label}>{item.message}</Label>
                        <Label fontSize={12} color={Colors.secondColor} style={styles.timeAgo}>{ timeToHumanFormat(new Date(item.date))}</Label>
                    </View>
                     
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 5,
        alignItems:'flex-end'
    },
    bubbleContainer:{
        flex: 1,
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
        flexDirection:'column',
        backgroundColor: Colors.chat.buble.right,

        padding: 5,
        borderRadius: 20,
        borderTopRightRadius: 5,
        maxWidth: 300,
    },
    label:{
        flex: 1,
        maxWidth: 260,
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

export default BubbleRight