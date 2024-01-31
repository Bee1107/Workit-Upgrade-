import React, { useState } from 'react'
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import Label from '../../../../components/text/Label'
import Heading from '../../../../components/text/Heading'
import SemiHeading from '../../../../components/text/SemiHeading'
import Card from '../../../../components/card'
import AvatarPicker from '../../../../components/AvatarPicker'
import colors from '../../../../utils/colors'
import PagerView from 'react-native-pager-view'
import { useNavigation } from '@react-navigation/native'
import Ranking from '../../../../components/Ranking'
import { images } from '../../../../assets'
import PaginationDot from 'react-native-animated-pagination-dot'
import { cutString } from '../../../../utils/String'
import { getRating } from '../../../../utils/number'

const windowWidth = Dimensions.get('window').width

const PagerWorkers = ({  workers, selectUser }) => {

    const navigation = useNavigation()
    const [page, setPage] = useState(0)

    const onPressCard = worker => () => {
        const newWorker = {...worker, userId: worker.id}
        console.log('newWorker', newWorker)
        selectUser(newWorker)
        navigation.navigate('WorkerProfile', { screen:'WorkerProfile', params: {  worker: newWorker }})
    }

    return (
        <>
        {workers.length > 0&& (
            <>
                <View style={{paddingHorizontal: 20}}>
                    <Heading color={colors.text.heading} fontSize={20}>Workers</Heading>
                </View>
                <PagerView 
                initialPage={0}
                style={styles.pagerView} 
                onPageScroll={ ({ nativeEvent}) => {
                    setPage(nativeEvent.position)
                }}>
                {workers.map(worker => (
                    <TouchableOpacity onPress={onPressCard(worker)} key={`key_${worker.id}`} style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Card padding={0} style={{flex: 1}}>
                            <View style={{borderRadius: 10, flex:1, overflow:'hidden'}}>
                                <ImageBackground style={{width: '100%', height: '100%', borderRadius: 10}}  source={images.deco.custom_header} >
                                    <Image source={{uri: worker.cover_picture}} style={{width: '100%', height: 80}} />
                                    <View style={styles.bottomCard}>
                                        <View style={{ alignItems:'center', justifyContent:'space-between', flexDirection: 'row'}}>
                                            <SemiHeading color={colors.text.heading} fontSize={20}>{`${worker.name} ${worker.father_last_name}`}</SemiHeading>
                                            <Ranking rank={getRating(worker)}  />
                                        </View>
                                        <Label numberOfLines={3} style={{ marginTop: 10 }}>{cutString(worker.profile_description, 160)}</Label>
                                    </View>
                                </ImageBackground>
                            </View>
                            <AvatarPicker  showTicket={worker.have_document !== ''} sizeType="small" shadow={false} url={worker.profile_picture} style={{ position: 'absolute', top: 40, left: 20}} />
                        </Card>
                    </TouchableOpacity>
                ))}
                </PagerView>
                <View style={{flex:1, alignItems: 'center'}}>
                    <PaginationDot 
                        activeDotColor={colors.mainColor} 
                        curPage={page} 
                        maxPage={workers.length}
                        sizeRatio={1.0}
                    />
                </View>
        </>
        )}
       
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    avatar:{
        position: 'absolute',
        top: 90,
        left: windowWidth / 4 - 40
    },
    itemContent:{
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10
    },
    capsule: {
        backgroundColor: colors.winterWhite,
        borderRadius: 10,
        padding: 5,
        marginTop: 10
    },
    header:{
        padding: 10,
    },
    pagerView:{
        height: 240,
    },
    bottomCard:{
        backgroundColor: colors.white,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        paddingTop: 20,
        height: '100%',
    }
})

export default PagerWorkers