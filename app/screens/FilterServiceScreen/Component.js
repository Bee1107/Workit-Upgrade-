import React, {  useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import ActionButton from '../../components/ActionButton'
import PriceGenericSelector from '../../components/PriceGenericSelector'
import ChipSelector from '../../components/ChipSelector'

const windowWidth = Dimensions.get('window').width


const PrincpalServicesScreen = ({ subcategories, route }) => {

    const onFilter = route.params.onFilter
    const navigation = useNavigation()
    const [subcategory, setSubcategory] = useState()
    const [filterPrice, setFilterPrice] = useState(20000)
    
    useEffect(() => {
        setFilterPrice(route.params.filterPrice)
        setSubcategory(route.params.subcategory)
    }, [])

  

    return (
        <View style={styles.container}>
          <View style={{flex:1, marginTop: 20, paddingHorizontal: 20, justifyContent:'space-between'}}>
            <View>
                {subcategories.length > 0 && (

                <View style={{marginTop: 20}}>
                <Label color={colors.black}>Subcategorias</Label>
                <ChipSelector
                    data={subcategories.map(({subcategory_name}) => subcategory_name)}
                    selected={subcategory}
                    onSelected={setSubcategory}
                    />

                </View>
                )}

                <View style={{marginTop: 20}}>
                <Label color={colors.black}>Rango de precios</Label>
                <View style={{  height: 160, marginTop: -10}}>

                <PriceGenericSelector 
                    currentValue={filterPrice}
                    onChange={(value) => {
                        setFilterPrice(value)
                    }}
                />
                </View>
                </View>

            </View>
            <ActionButton 
                    text="Aplicar Filtro"
                    onPress={() => {
                        onFilter({filterPrice, subcategory})
                        navigation.goBack()
                    }}
                    style={{width:'100%', marginTop: 20, marginBottom: 60}}
                    />
        
        </View>
                             
        </View>
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