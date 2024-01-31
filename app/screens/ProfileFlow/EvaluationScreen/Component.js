import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import EmptyImageVIew from '../../../components/EmptyImageVIew'
import { images } from '../../../assets'
import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import Ranking from '../../../components/Ranking'
import SegmentedControl from '../../../components/SegmentedControl'
import colors from '../../../utils/colors'
import { cutString, getNameFormat } from '../../../utils/String'
import Card from '../../../components/card'
import AvatarPicker from '../../../components/AvatarPicker'


const Item = ({item}) => (
    <View style={styles.cardContainer}>
        <Card style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AvatarPicker
                        url={item.rate_from.profile_picture}
                        sizeType="tiny"
                        />
                     <Heading color={colors.text.title} style={{marginLeft: 10}}>{getNameFormat(item.rate_from)}</Heading>
                </View>
                <Ranking rank={(item.eval1 + item.eval2 + item.eval3)/3} />
                
            </View>
            <View style={{marginTop: 10}}>
                <Label color={colors.text.title}>{item.job.job_name}</Label>
                <Label color={colors.text.subtitle}>{cutString(item.comment, 400)}</Label>
            </View>
            
        </Card>
    </View>
)


const EvaluationScreen = ( { get, list, user }) =>{ 

    const [menu, setMenu] = useState(0)
    const [isShadow, setIsShadow] = useState(false)
    const [height, setHeight] = useState(300)

    useEffect(() => {
        get({type: menu===0 ? 'client' : 'worker'})
    }, [menu])

    const onLayout = ({nativeEvent}) => {
        setHeight(nativeEvent.layout.height)
    }

    const onScroll = nativeEvent => {
        setIsShadow(nativeEvent.contentOffset.y > 0)
    }

    const onChange = index => {
        setIsShadow(false)
        setMenu(index)
    }

    return (
        <View style={styles.container}>
            {user.type === 'WORK' && (
                <View style={[styles.segmentContainer, (isShadow ? styles.shadow : {})]}>
                    <SegmentedControl
                        labels={ ['Cliente', 'Worker']}
                        onChange={onChange}
                    />
                </View>
            )}
            
 
            <FlatList
            onLayout={onLayout}
                    data={list}
                    renderItem={({item})=><Item item={item} />}
                    style={{flex: 1}}
                    onScroll={({nativeEvent}) => onScroll(nativeEvent)}
                    ListEmptyComponent={() => (
                        <View style={{height }}>
                            <EmptyImageVIew
                                image={images.volumenIcon.evaluation}
                                message= "No hay evaluaciones"
                            />
                        </View>
                    )}
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
        paddingHorizontal: 10
    },
    option: {
        paddingTop: 50
    },
    button:{
        width: '100%',
        backgroundColor:'#000', 
        borderRadius: 6,
        marginTop: 20
    },
    cardContainer:{
        padding: 10
    },
    avatar:{
        width: 40, 
        height: 40,
        borderRadius: 20
    },
    segmentContainer:{
        backgroundColor: colors.white,
        zIndex: 999
    },
})


export default EvaluationScreen