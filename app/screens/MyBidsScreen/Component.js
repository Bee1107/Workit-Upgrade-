import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import SegmentedControl from '../../components/SegmentedControl'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import EmptyImageVIew from '../../components/EmptyImageVIew'
import JobColorCard from '../../components/JobColorCard'
import { bidToJobFormat } from '../../utils/format'


const MyRunningServicesScreen = ({ get, list }) => {

    const [menu, setMenu] = useState(0)
    const [height, setHeight] = useState(300)
    const navigation = useNavigation()

    useEffect(() => {
        get({type: menu === 0 ? 'POSTED':'REJECTED'})
    }, [menu])

    const onLayout = ({nativeEvent}) => {
        setHeight(nativeEvent.layout.height)
    }

    return (
        <View style={styles.container} >
             <SegmentedControl
                labels={['Activas', 'Rechazadas']}
                onChange={index => {
                    setMenu(index)
                }}
            />
             <FlatList
            data={list}
            onLayout={onLayout}
            renderItem={({item}, index)=>{
            return (
                <View style={{padding: 10}}>
                    <JobColorCard 
                        item={bidToJobFormat(item)} 
                        onPress={() => {
                  
                        navigation.navigate('BidDetail', { 
                            job:{
                                job_name: item.job_name,
                                job_id: item.job_id
                            },
                            bid: item
                        })
                 
                        }} />
                    </View>
                )
            }}
            keyExtractor={({job_id}) => `key_${job_id}`}
            style={{flex: 1}}
            ListEmptyComponent={() => (
                <EmptyImageVIew 
                        image={menu === 0 ? images.volumenIcon.aceptedBid : images.volumenIcon.rejectedBid}
                        message={menu === 0 ? 'No tienes ofertas activas': 'No tienes ofertas rechazadas'}
                        style={{  height }}
                    />
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
})

export default MyRunningServicesScreen