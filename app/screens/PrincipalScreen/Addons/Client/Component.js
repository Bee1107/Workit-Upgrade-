import React, { useEffect, useState } from 'react'
import { StyleSheet , View, RefreshControl, ScrollView, TouchableOpacity, Image} from 'react-native'
import { images } from '../../../../assets'
import Heading from '../../../../components/text/Heading'
import Label from '../../../../components/text/Label'
import colors from '../../../../utils/colors'
import { moneyFormat} from '../../../../utils/number'

import ColorCard from '../../../../components/ColorCard'
import Card from '../../../../components/card'
import ActionButton from '../../../../components/ActionButton'
import AvatarPicker from '../../../../components/AvatarPicker'
import PagerView from 'react-native-pager-view'
import PaginationDot from 'react-native-animated-pagination-dot'
import LinearGradient from 'react-native-linear-gradient'
import { shadeColor } from '../../../../utils/String'
import PagerTwoItems from '../../../../components/PagerTwoItems'
import Tooltip from '../../../../components/Tooltip'
import WalkThough from '../../../../components/WalkThrough'
import { WALK_THOUGH_CLIENT } from '../../../../utils/constants'
import HourLabel from '../../../../components/HourLabel'

const text1 = 'Publica la tarea que necesites realizar a un precio justo'
const text2 = 'Explora servicios que los Workers ofrecen para ti'

const PrincipalScreen = ({ navigation, getRunningJobs, works, get, jobs, onScroll }) => {

    const [page, setPage] = useState(0)

    useEffect(() =>{
        getRunningJobs()
        get()
    }, [])

    const goPostJob = () => {
        navigation.navigate('PostJob')
    }

    const goServices = () => {
        navigation.navigate('Services', { screen:'PrincipalServices' })
    }

    const goDetail = job => () => {
        navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job } })
    }

    const onRefresh = () => {
        getRunningJobs()
        get()
    }
 
    return (   
        <>
       <WalkThough
            pages={WALK_THOUGH_CLIENT}
            tooltipKey="home_wt_client_1"
        />
        <ScrollView 
            style={{flex: 1}} 
            contentInset={{bottom: 40}} 
            onScroll={({nativeEvent}) => onScroll(nativeEvent)}
            refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={onRefresh}
                />
              }
            >
            <View>
                
                {jobs.length > 0 && (
                     <>
                     <View style={{paddingHorizontal: 20}}>
                        <Heading color={colors.text.heading} fontSize={20}>Tus solicitudes de servicios</Heading>
                     </View>
                     
                     <PagerView 
                        initialPage={0}
                        style={styles.pagerView} 
                        onPageScroll={ ({ nativeEvent}) => {
                            setPage(nativeEvent.position)
                        }}>
                        {jobs.map(job => {
                          return (
                            <View key={`job_${job.job_id}`} style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <Card padding={0} style={{flex: 1, backgroundColor:'#164EED'}}>
                                 
                                <LinearGradient colors={['#164EED', shadeColor('#164EED', 40)]} style={styles.gradient} >
                                <Image source={images.engineQuarter} style={{width: 140, height: 140, position: 'absolute', bottom:0, right:0, tintColor:'#1142DA'}}   />
                                  
                                <TouchableOpacity onPress={goDetail(job)} style={{padding: 10, flex: 1,}}>
                                        
                                        <Heading color="white" fontSize={20}>{job.job_name}</Heading>
                                       
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginTop: 15}}>
                                            <HourLabel
                                                jobDetail={job}
                                                showLine={false}
                                                overrideColor="white"
                                            />
                                           
                                            <View style={[styles.capsule, { backgroundColor: job.category.color1}]}>
                                                <Image source={{ uri: job.category.image}} style={{width: 24, height: 24}} resizeMode="contain"  />
                                                <Label color="white" fontSize={12} style={{marginLeft: 5, flex: 1}}>{job.category_name}</Label>
                                            </View>
                                        </View>
                                      
                                       
                                        <View style={{flex: 1, width:'100%', flexDirection:'row', alignItems:'flex-end', justifyContent: 'space-between',position:'absolute',left:0, bottom: 0}}>
                                            <View style={{padding: 10}}>
                                               
                                                {job.workersBids && job.workersBids.length > 0 && (
                                                    <>
                                                        {job.type==='direct' && <Label color="white">Servicio aceptado</Label>}
                                                        {job.type!=='direct' && <Label color="white">Ofertas Activas</Label>}
                                                        <View style={styles.bidders}>
                                                        {job.workersBids.map(({vendor_image}) => (
                                                            <AvatarPicker 
                                                                sizeType="tiny" 
                                                                url={vendor_image} 
                                                                style={styles.floatAvatar} />
                                                        ))}
                                                        </View>
                                                    </>
                                                )}

                                                {!(job.workersBids && job.workersBids.length > 0) && (
                                                    <Label color="white" style={{marginBottom: 5}}>{job.type === 'direct' ? 'Esperando respuesta': 'Esperando ofertas'}</Label>
                                                )}
                                                
                                            </View>
                                            {job.initial_amount === null && (
                                                <Heading color="white" fontSize={40}>$?</Heading>
                                            )}
                                            {job.initial_amount !== null && (
                                                <Heading color="white" fontSize={40}>{moneyFormat(job.initial_amount)}</Heading>
                                            )}
                                            
                                        </View>
                                        
                                    </TouchableOpacity>
                                    </LinearGradient>
                                    
                                </Card>
                            </View>
                          )  
                        })}
                     </PagerView>

                   

                     {jobs.length > 1 && (
                        <View style={{alignItems: 'center', paddingHorizontal: 20}}>
                            
                            <PaginationDot 
                                activeDotColor={colors.mainColor} 
                                curPage={page} 
                                maxPage={jobs.length}
                                sizeRatio={1.0}
                            />
                        </View>
                     )}

                    <Tooltip
                        message="Aquí es donde puedes ver tus servicios publicados, esperando a que los Workers envien sus ofertas."
                        style={{ marginHorizontal: 20}}
                        tooltipKey="home_client_1"
                    />

                     <ActionButton 
                        text="PUBLICA EL SERVICIO QUE NECESiTAS" 
                        onPress={goPostJob}
                        style={{marginTop: 20, marginHorizontal: 20}}
                        />
                    </>
                )}
                

               

                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>

                {works.length > 0 && (
                <>
                    <View style={[styles.headerContainer, {marginTop: 20}]}>
                        <Heading color={colors.text.heading}  fontSize={20}>Próximos servicios</Heading>
                    </View>
                    <PagerTwoItems
                    navigateScreen="RunningJob"
                    jobs={works} />
                </>
            )}

                {jobs.length === 0 && (
                    <>
                        <Heading color={colors.text.heading} fontSize={20} style={{marginTop: works.length > 0 ? 20 : 0}}>¿Qué necesitas?</Heading>
                        <ColorCard 
                            text={text1} 
                            color={colors.card.green}
                            image={images.deco.people}
                            onPress={goPostJob}   
                            buttonText="PÚBLICA LO QUE NECESITAS"
                            style={{marginTop: 10}}
                            />
                    </>
                )}
                
              

                <Heading color={colors.text.heading} fontSize={20} style={{marginTop: 40}}>Conecta con Workers y Servicios</Heading>
                    <ColorCard 
                        text={text2} 
                        color={colors.card.yellow} 
                        image={images.deco.people2} 
                        labelColor="black" 
                        buttonText="EXPLORAR SERVICIOS"
                        style={{marginTop: 10}}
                        onPress={goServices}
                        />
                </View>
                
            </View>
        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
   
    gradient:{
    width:'100%',
     height:'100%',
        borderRadius: 10
    },
   
    item:{
        borderColor: '#CFE5FF',
        backgroundColor:'#E9F3FF',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems:'center'
    },
    lottie:{
        width: 260,
        height: 260,
        alignSelf:'center'
    },
    card:{
        borderRadius: 17,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 12,
        padding: 20,
        height: 200
    },
    capsule:{
        maxWidth: 140,
        flexDirection: 'row',
        backgroundColor: colors.card.green,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems:'center'
    },
    pagerView:{
        height: 220,
    },
    bidders:{ 
        flexDirection: 'row',
        height: 30,
        marginTop: 5
    },
    floatAvatar:{
        position: 'absolute',
    }
})

export default PrincipalScreen