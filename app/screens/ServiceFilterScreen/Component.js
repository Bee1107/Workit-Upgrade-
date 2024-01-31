import React, { useEffect, useState} from 'react'
import { View, FlatList, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, Touchable } from 'react-native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import Card from '../../components/card'
import AvatarPicker from '../../components/AvatarPicker'
import colors from '../../utils/colors'
import { moneyFormat } from '../../utils/number'
import BigSearchInput from '../../components/BigSearchInput'
import { useNavigation } from '@react-navigation/native'
import PagerWorkers from './Addons/PagerWorkers'
import SkeletonPagerWorker from './Addons/SkeletonPagerWorker'
import { images } from '../../assets'
import EmptyImageVIew from '../../components/EmptyImageVIew'

const windowWidth = Dimensions.get('window').width


const Item = ({item, onPress}) => {
    return (
        <TouchableOpacity onPress={() => {
            onPress(item)
        }} style={{width:windowWidth / 2,padding:10}}>
        <Card padding={0}>
            <View style={{ height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow:'hidden',}}>
                <ImageBackground source={images.coverImage } style={{ height: 120}}>
                    {item.image !== '' && <Image source={{uri: item.image}} style={{width:'100%', height: 120}} />}
                </ImageBackground>
            </View>
            <View style={styles.itemContent}>
                <Heading color={colors.text.title}>{item.name}</Heading>
                <View style={[styles.capsule, { backgroundColor: item.category.color1}]}>
                    <Label fontSize={12} color={colors.white}>{`${item.category.category_name}`}</Label>
                </View>
                <View style={{flexDirection: 'row',marginTop: 10}}>
                    <Heading fontSize={13}>{`${moneyFormat(item.amount)}`}</Heading>
                    <Label fontSize={13}>{` por ${item.measure}`}</Label>
                </View>
            </View>
            <AvatarPicker showTicket={item.worker.have_document !== ''} url={item.worker.profile_picture} style={styles.avatar} sizeType="small" />
        </Card>
    </TouchableOpacity>
    )
}

const PrincpalServicesScreen = ({ isLoading, getSubcategories, subcategories, getWorkers, getServices, route, services, workers }) => {

    const navigation = useNavigation()
    const [subcategory, setSubcategory] = useState([])
    const [filterPrice, setFilterPrice] = useState(20000)


    useEffect(()=>{
        setSubcategory(subcategories.map(({subcategory_name}) => subcategory_name))
    }, [subcategories])

    useEffect(() => {
        const payload = {
            category: route.params.category
        }
        getWorkers(payload)
        getServices(payload)
        getSubcategories({ categoryId: route.params.category.category_id })
        
    }, [])

    const onPressItem = item  => navigation.navigate('ServiceDetail', { item } )

    const RenderItem = ({item}) => (
        <Item item={item} onPress={item => {
            onPressItem(item)
        }} />
    )

    const onFilter = ({filterPrice, subcategory}) => {
        setFilterPrice(filterPrice)
        setSubcategory(subcategory)
    }

    return (
        <>
        <View style={styles.container}>
            <View style={styles.header}>
                <BigSearchInput 
                    editable={false}
                    placeHolder="Buscar Servicios o Workers"
                    onPress={() => {
                        navigation.navigate('SearchService')
                    }} 
                />
            </View>
                    
          
            <FlatList
                data={services
                    .filter(({amount}) => {
                    return filterPrice > amount
                })
                .filter(item=> {
                    const subcategory_name = item.subcategory.subcategory_name
                    if(!subcategory || subcategory.length === 0) return true
                    return subcategory.includes(subcategory_name)
                })
              
            }
                numColumns={2}
                ListHeaderComponent={() => {
                return (
                    <>
                    {!isLoading && (
                    <>
                      
                        <PagerWorkers workers={workers} />
                        <View style={styles.headerServices}>
                            <Heading color={colors.text.heading} fontSize={20}>Servicios</Heading>
                            <TouchableOpacity onPress={() => {
                              navigation.navigate('FilterServices',  {onFilter, filterPrice, subcategory})
                            }}>
                            <Image source={images.settingFilter} style={{width: 24, height: 24}} />
                            </TouchableOpacity>
                        </View>
                    </>)
                    }
                    {isLoading && <SkeletonPagerWorker />}
                    </>
                )}}
                renderItem={RenderItem}
                keyExtractor={({id}) => id}
                ListEmptyComponent={() => (
                    <View style={{height: 300}}>
                        <EmptyImageVIew 
                            message="Aún no tenemos servicios en esta categoria"
                            image={images.volumenIcon.emptyService} 
                            buttonTitle="Agregar un nuevo servicio"
                        />
                    </View>
                )}
            />
        </View>
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
    headerServices: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    containerContent: {flex: 1, marginTop: 40,},
    containerHeader: {
        flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      marginTop: 230,
      backgroundColor: colors.white,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,

    },
    miniCapsule:{
        width: 30,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.black,
        marginVertical: 10,
    },
    headerContent:{
      marginTop: 0,
    },
    Modal: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.white,
        marginTop: 240,
    }
   
})

export default PrincpalServicesScreen