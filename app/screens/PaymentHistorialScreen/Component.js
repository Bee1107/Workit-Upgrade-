import React, { useEffect, useState } from 'react'
import { View, SectionList, Image, StyleSheet } from 'react-native'
import Label from '../../components/text/Label'
import SemiHeading from '../../components/text/SemiHeading'
import colors from '../../utils/colors'
import { moneyFormat } from '../../utils/number'
import { images } from '../../assets'
import AvatarPicker from '../../components/AvatarPicker'
import Card from '../../components/card'
import { formatDate, formatLongDate } from '../../utils/date'
import { groupByKey } from '../../utils/array'
import EmptyImageVIew from '../../components/EmptyImageVIew'


const Item = ({ item }) => {


    return (

        <View  style={styles.item}>
            <Card>
            <View style={{flexDirection: 'row', flex : 1, width: '100%'}}>
                { <AvatarPicker url={`${item.opposite_user_image}`} shadow={false} sizeType="tiny" />}
                <View style={{marginLeft: 10, flex: 1}}>
                    <Label color={colors.text.title}>{item.opposite_user}</Label>
                    <Label color={colors.text.subtitle}>{item.detail}</Label>
                    <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={item.payment_received ? images.money.in : images.money.out} style={{width: 20, height: 20}} resizeMode="contain" />
                            {item.payment_received && (
                            <Label style={{marginLeft: 5}}>Pago recibido</Label>
                            )}
                            {!item.payment_received && (
                                <Label style={{marginLeft: 5}}>Pago realizado</Label>
                            )}
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            {item.payment_received && (
                                <>
                                <SemiHeading>{moneyFormat(parseFloat(item.amount) * 9024 / 10000)}</SemiHeading>
                                <Label>{`Comisión: ${moneyFormat(parseFloat(item.amount) * 976/1000)}`}</Label>
                                </>
                            )}
                            {!item.payment_received && (
                                <SemiHeading>{moneyFormat(item.amount)}</SemiHeading>
                            )}
                        </View> 
                    </View>
                </View>
            </View>
           
            </Card>
           
        </View>
    )
}

const PaymentHistorialScreen = ({ get, list }) => {

    const [height, setHeight] = useState(300)

    useEffect(() => {
        get()
    }, [])

    const onLayout = ({nativeEvent}) => {
        setHeight(nativeEvent.layout.height)
    }

    return (
        <View style={styles.container}>
            <SectionList
                onLayout={onLayout}
                sections={groupByKey(list.map(e=>({...e, date: formatDate(new Date(e.created_at))})),'date', formatLongDate)}
                keyExtractor={({sectionIndex}, index) => `${sectionIndex}_${index}`}
                renderItem={({item})=> <Item item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <SemiHeading color={colors.text.title}>{title}</SemiHeading>
                    </View>
                )}
                ListEmptyComponent={<EmptyImageVIew 
                    image={images.volumenIcon.paymentHistorial }
                    message={'Aún no tienes movimientos'}
                    style={{  height }}
                />}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: colors.white
    },
    gradient:{
        width:'100%', 
        height:'100%',
        borderRadius: 10
    },
    item:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    bottomCard:{
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.card.green,
        marginTop: 10,
        padding: 18
    },
    pagerView:{
        height: 240,
    },
    bidders:{ 
        flexDirection: 'row',
        height: 30,
        marginTop: 5
    },
    floatAvatar:{
        position: 'absolute',
    },
    sectionHeader:{
        backgroundColor:colors.winterWhite,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomColor: colors.grayLigth,
        borderBottomWidth: StyleSheet.hairlineWidth
      }
})

export default PaymentHistorialScreen