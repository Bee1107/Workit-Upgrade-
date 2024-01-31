import React, { useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AvatarPicker from '../../components/AvatarPicker'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import ActionButton from '../../components/ActionButton'
import Card from '../card'
import colors from '../../utils/colors'
import { moneyFormat } from '../../utils/number'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import { dateToHumanFormat2, timeToHumanFormat } from '../../utils/date'
import Ranking from '../Ranking'
import CollapseLabel from '../CollapseLabel'
import { useDispatch, useSelector } from 'react-redux'
import { select, get } from '../../redux/action'



const BidCard = ({item, isTouchable = true, showUser = true, isWorkerView = false, onPress, onCancel, bid_id }) => {
  
    const navigation = useNavigation()
    const Root = isTouchable  ? TouchableOpacity : View
    const selectedBid = useSelector(state => state.bid.selected)
   
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get('single.bid', { bid_id }))
    }, [])
    
    const onCardPress = ()=>{
        const bid = selectedBid ? selectedBid : item

   
        const worker = {
            name: bid.vendor_name,
            userId: bid.vendor_id,
            work_images:[]
        }


        dispatch(select('user', worker))

        navigation.navigate('WorkerProfile', { screen:'WorkerProfile', params: { 
            worker,
            isLoading: true,
            bid: bid,
        }})
        
    }

    const bid = selectedBid ? selectedBid : item

    return (
        <>
        {bid === null && !selectedBid && (
            <View onPress={onCardPress} style={styles.container}>
                <Card padding={0} style={styles.cardNotContentContainer}>
                    <Image source={images.volumenIcon.notConent} style={{width: 160, height: 160}} resizeMode="contain" />
                    <Heading style={{marginTop: 20}}>Oferta no disponible o eliminada</Heading>
                </Card>
            </View>
            
        )}
        {bid === null && (null)}
        {bid !== null && (
             <Root onPress={onCardPress} style={styles.container}>

             <Card padding={0} style={styles.cardContainer}>
                 
                 {showUser && (
                     <View style={styles.avatarContainer}>
                         <View style={{alignItems: 'center', flexDirection:'row'}} >
                             <AvatarPicker url={bid.vendor_image}  sizeType="small"   showTicket={bid.have_vendor_document !== ''} />
                             <View style={{marginLeft: 10}}>
 
                                 <Label fontSize={18} color={colors.text.title}  >{bid.vendor_name}</Label>   
                                 <Ranking rank={bid.average_rating} />
                             </View> 
                         </View>
                         {isTouchable && (
                             <Image source={images.expandCard} style={{width: 20, height: 20, tintColor: colors.black}} resizeMode="contain" />
                         )}
                         
                     </View>
                 )}
                 
                 <View style={styles.descriptionContainer}>
                     <CollapseLabel
                        text={bid ? 'El Worker no dejo comentario' : bid.comment} 
                     />
                 </View>
                 
                 {bid.type !== 'direct' && (
                     <>
                 <View style={{width: '100%'}}>
                     
                     {bid.deliveryTime && bid.deliveryTimeMeasure && (
                         <View style={styles.row}>
                             <Label fontSize={14} >Demora</Label>
                             <Heading fontSize={16} color={colors.text.title}>{`${bid.deliveryTime} ${bid.deliveryTimeMeasure}`}</Heading>
                         </View>
                     )}
                     <View style={styles.row}>
                         <Label fontSize={14} >Contraoferta</Label>
                         <Heading fontSize={16} color={colors.text.title}>{moneyFormat(bid.counteroffer_amount)}</Heading>
                     </View>
 
                     <View style={styles.row}>
                         <Label fontSize={14} >Horario</Label>
                         <View style={{flexDirection:'row'}}>
                             <Heading color={colors.black} >{`${dateToHumanFormat2(new Date(bid.bidDate))} - ${timeToHumanFormat(new Date(bid.bidTime))}`}</Heading>
                         </View>
                     </View>
                 </View>
 
                 {bid.owner_status === 'POSTED' && !isWorkerView && (
                      <View style={styles.buttons}>
                         <ActionButton 
                             text="Rechazar"
                             onPress={() => {
                                 onCancel(bid)
                             }}
                             style={{flex: 1, marginRight: 10}}
                             backgroundColor={colors.capsule.red}
                             />
                         <ActionButton 
                             text="Aceptar"
                             onPress={onPress}
                             style={{flex: 1, marginLeft: 10}}
                             />
                     </View>
                 )}
        
                 {bid.vendor_status === 'ACCEPTED' && bid.owner_status === 'POSTED' && isWorkerView && (
                    <View style={styles.buttons}>
                    <ActionButton 
                        text="Cancelar mi oferta"
                        onPress={() => {
                            onCancel(bid)
                        }}
                        style={{flex: 1, marginRight: 10}}
                        backgroundColor={colors.capsule.red}
                        />
                
                    </View>
                 )}
                
             </>
                )}
 
             {bid.type === 'direct' && (
                 <View style={styles.buttons}>
                     <ActionButton 
                         text="Realizar Pago"
                         onPress={onPress}
                         style={{flex: 1, marginLeft: 10}}
                         />
                 </View>
 )}
                 
             </Card>
     </Root>
        )}
       </>
    )
}

const styles = StyleSheet.create({
   container: {
    padding: 20, 
    flex: 1,
   },
   cardContainer:{
        alignItems:'flex-start', 
        alignSelf: 'baseline', 
   },
   cardNotContentContainer:{
    alignItems:'center', 
    justifyContent: 'center',
    padding: 10
},
   avatarContainer:{
    width:'100%', 
    flexDirection:'row', 
    justifyContent: 'space-between',
    borderBottomColor: colors.grayLigth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
    paddingBottom: 20
   },
   descriptionContainer: {
    width:'100%', 
       padding: 20,
       borderBottomColor: colors.grayLigth,
       borderBottomWidth: StyleSheet.hairlineWidth,
   },
   row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  buttons:{
      flexDirection:'row', 
      justifyContent: 'space-between', 
      marginTop: 20, 
      marginBottom: 10,
      paddingHorizontal: 20
  }
})

export default BidCard