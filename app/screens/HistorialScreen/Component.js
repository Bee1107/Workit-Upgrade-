import React, { useEffect, useState} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import JobColorCard from '../../components/JobColorCard'
import colors from '../../utils/colors'
import SegmentedControl from '../../components/SegmentedControl'
import { images } from '../../assets'
import EmptyImageVIew from '../../components/EmptyImageVIew'

const HistorialScreen = ({ isLoading, getHistorialVendor, ownerList, vendorList, getHistorialOwner, user }) => {

    const navigation = useNavigation()
    const [menu, setMenu] = useState(0)
    const [height, setHeight] = useState(300)
    useEffect(() => {
        getHistorialVendor()
    }, [])
   
    const onLayout = ({nativeEvent}) => {
        setHeight(nativeEvent.layout.height)
    }

    const renderItem = ({ item }) => (
        <View style={{padding: 5, paddingHorizontal: 10}}>
            <JobColorCard
            item={item}
            onPress={() => {
                if(menu === 0){
                    navigation.navigate('RunningJobWorker', { screen:'CurrentJob', params:{ job: item }})
                } else {
                    navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job: item } })
                }
               
            }}
        />
        </View>
    )

    const onChange = index => {
        setMenu(index)
        if(index === 0){
            getHistorialVendor()
        } else {
            getHistorialOwner() 
        }
    }
    
    return (   
        <SafeAreaView
          style={styles.container}>
            <Spinner
                visible={isLoading}         
                textContent={'Cargando...'}
                textStyle={styles.spinnerTextStyle}
            />
            {user.type === 'WORK' && (
                 <View>
                    <SegmentedControl
                        labels={['Worker','Cliente']}
                        onChange={onChange}
                    />
                </View>
            )}
           
            <FlatList
            onLayout={onLayout}
                data={menu===0? vendorList : ownerList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                    <EmptyImageVIew 
                            image={ images.volumenIcon.historial }
                            message={'Tu historial esta vacio'}
                            style={{  height }}
                        />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1, 
        backgroundColor:colors.white
    },
    spinnerTextStyle: {
        color: '#FFF'
    },

})

export default HistorialScreen