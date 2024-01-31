import React, { useEffect, useState, useRef } from 'react'
import { View, FlatList, StyleSheet, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Item from './Addons/Item'
import SkeletonItem from './Addons/SkeletonItem'
import ChipSelector from '../../components/ChipSelector'
import PriceSelector from './Addons/PriceSelector2'
import SegmentedControl from '../../components/SegmentedControl'
import { normalizeArray } from '../../utils/array'
import { RM_CITIES , RM } from '../../utils/constants'
import colors from '../../utils/colors'

const currentDistrict = ({addresses}) =>  addresses ?  [RM,...new Set(addresses.map(({district}) => district).filter(item => item !== null))] : []

const ExploreJobScreen = ({ post,isLoadingJobs, isLoading, save, storage, isEmpty, route, user, jobs, subcategories, getSubcategories }) => {

    const navigation = useNavigation()
    const [filterCategory, setFilterCategory] = useState( storage[[route.params.category.category_id]] ?   storage[[route.params.category.category_id]] : [])
    const [headerHeight, setHeaderHeight] = useState(300)
    const [isAnimate, setIsAnimate] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const position = useRef(new Animated.Value(0)).current
    const [segmentIndex, setSegmentIndex] = useState(0)
    const [districts, setDistricts] = useState(currentDistrict(user))
    const [price, setPrice] = useState(-1)

    useEffect(() => {
        if(route.params && route.params.category.category_id && filterCategory.length > 0){
            save({
                [route.params.category.category_id]: [...filterCategory]
            })
        }
        
        const subcategory_id = subcategories.filter(({subcategory_name})=> filterCategory.includes(subcategory_name)).map(({subcategory_id})=>subcategory_id)
    
        post({
            user_id: user.userId,
            subcategory_id,
            districts: []
        })

    }, [filterCategory])


    useEffect(() =>{
        getSubcategories({ categoryId: route.params.category.category_id})
     }, [route.params.category])


    useEffect(() => {
        if(!isLoading){
            if(isEmpty){
                
                post({
                    user_id: user.userId,
                    subcategory_id:[route.params.category.category_id],
                    districts: []
                })
               
            }
        }
     
       
    }, [subcategories, isLoading])

    useEffect(() => {
        if(isAnimate){
            Animated.timing(position, {
                toValue: isOpen ? 0 : -headerHeight,
                duration: 500,
                useNativeDriver: false,
              }).start()
        }
    },[isAnimate, isOpen])

    const onPressItem = item => () => {
        navigation.navigate('JobDetail',{ item })
    }

    const changePrice = value => {
        setPrice(value)
    }

    const onLayout= ({ nativeEvent:{layout}}) => {
        setHeaderHeight(layout.height)
    }


    const renderItem = ({ item }) => {
        const RootItem = isLoadingJobs ? SkeletonItem : Item
        return (
            <RootItem
                item={item}
                onPress={onPressItem(item)}
            />
        )
    }
    

    const showPanelsWithSubcategory = () => (
        <>

            {segmentIndex===0 && (
                <View style={{marginBottom: 20}}>
                    <ChipSelector
                        data={subcategories.map(({subcategory_name}) => subcategory_name)}
                        selected={filterCategory}
                        onSelected={setFilterCategory}
                    />
                </View>
            )}

            {segmentIndex === 1 && (
                <View style={{paddingHorizontal: 20, marginTop: -20}}>
                    <PriceSelector
                        onChange={changePrice}
                    />
                </View>
            )}

            {segmentIndex === 2 && (
                 <View style={{marginBottom: 20}}>
                      <ChipSelector
                        data={currentDistrict(user)}
                        selected={districts}
                        onSelected={setDistricts}
                    />
                 </View>         
            )}

        </>
    )

    const showPanelsWithoutSubcategory = () => (
        <>
            {segmentIndex === 0 && (
                <View style={{paddingHorizontal: 20}}>
                    <PriceSelector
                     onChange={changePrice}
                    />
                </View>
            )}

            {segmentIndex === 1 && (
                <View style={{marginBottom: 20}}>
                      <ChipSelector
                        data={currentDistrict(user)}
                        selected={districts}
                        onSelected={setDistricts}
                    />
                </View>
            )}

        </>
    )
    
    return (
        <View style={styles.container}>
            
             <FlatList
                data={isLoadingJobs ? [{},{},{},{}] : jobs.filter(({version, initial_amount, city}) => normalizeArray((districts.includes(RM)) ? [...RM_CITIES,...districts] :districts).includes(city) && version === 'v2' && initial_amount >= price)}
                renderItem={renderItem}
                keyExtractor={({ job_id }) => job_id}
                style={styles.container}
                scrollEnabled={!isLoadingJobs}
                ListHeaderComponent={() => <Animated.View style={{height: headerHeight}} />}
                onScroll={({nativeEvent})=>{
                    setIsAnimate(true)
                    setIsOpen(nativeEvent.contentOffset.y <= 0)
                }}
            />
            
            <Animated.View style={[styles.headerSearcher, {top: position}]} onLayout={onLayout}>
                {!isLoading && (
                    <View>
                        <SegmentedControl
                                type="small"
                                labels={isEmpty ? ['Precio', 'Comunas']:['Subcategorias', 'Precio', 'Comunas']}
                                selectedIndex={segmentIndex}
                                onChange={index => {
                                    setSegmentIndex(index)
                                }}
                            />
                    </View>
                )}
                {!isEmpty && showPanelsWithSubcategory()}
                {isEmpty && showPanelsWithoutSubcategory()}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    headerSearcher:{
        width:'100%',
        flex: 1,
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor: colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCC',
    },
})

export default ExploreJobScreen