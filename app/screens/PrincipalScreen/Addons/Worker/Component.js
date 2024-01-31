import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView , View, RefreshControl } from 'react-native'
import PickerCategories from '../../../../components/PickerCategories'
import Heading from '../../../../components/text/Heading'
import ColorCard from '../../../../components/ColorCard'
import colors from '../../../../utils/colors'
import { images } from '../../../../assets'
import { useNavigation } from '@react-navigation/native'
import ActionButton from '../../../../components/ActionButton'
import SwipeUpDownModal from 'react-native-swipe-modal-up-down'
import CategoryPanel from '../../../../components/CategoryPanel'
import WalkThough from '../../../../components/WalkThrough'
import ServiceList from '../../../../components/ServiceList'
import PagerTwoItems from '../../../../components/PagerTwoItems'
import PagerTwoItems2 from '../../../../components/PagerTwoItems2'
import CardStat from './Addons/CardStat'
import Tooltip from '../../../../components/Tooltip'
import { WALK_THOUGH_WORKER } from '../../../../utils/constants'

const text3 = '¿Quieres ser Worker?, ofrece tus servicios'
const text4 = 'Ofrece tus servicios directamente a tus clientes'

const Worker = ({user, get, getJobs, getRunningJobs, services, works, getStats, assigned_jobs, onScroll}) => {

    const navigation = useNavigation()
    const [ShowComment, setShowModelComment] = useState(false)

    useEffect(() => {
        getJobs()
        getRunningJobs()
        getStats()
        get()
    }, [])

    const goService = () => {
        navigation.navigate('PostService')
    }

    const onRefresh = () => {
        getJobs()
        getRunningJobs()
        getStats()
        get()
    }
 

    const workerExclusive = () => (
        <>
        <WalkThough
            pages={WALK_THOUGH_WORKER}
            tooltipKey="home_wt_worker_1"
        />
        <View>
            
            {assigned_jobs.length > 0 && (
                <>
                    <View style={[styles.headerContainer, {marginTop: 20}]}>
                        <Heading color={colors.text.heading}  fontSize={20}>Solicitudes de servicios para ti</Heading>
                    </View>
                    <PagerTwoItems2 
                        navigateScreen="JobDetail"
                        jobs={assigned_jobs} />
                </>
            )}


            <View style={styles.headerContainer}>
                <Heading color={colors.text.heading} fontSize={20}>Mis categorias</Heading>
            </View>
            
            <View style={{paddingHorizontal: 20}}>
                <PickerCategories 
                    user={user} 
                    showSeeAll={true} 
                    showBadge={true}
                    editable={true}
                    onPress={({index, category}) => {
                        if(index === 3){
                            setShowModelComment(true)
                        } else {
                            navigation.navigate('Jobs', { category: category.category })
                        }
                }} />


                <Tooltip
                    message="Aquí podras encontrar tus categorias favoritas, te informaremos cuando existan servicios en tu zona y categorias"
                    style={{marginTop: 10}}
                    tooltipKey="home_tooltip_1"
                />

            </View>

           

            {works.length > 0 && (
                <>
                    <View style={[styles.headerContainer, {marginTop: 20}]}>
                        <Heading color={colors.text.heading}  fontSize={20}>Próximos servicios</Heading>
                    </View>
                    <PagerTwoItems 
                    navigateScreen="RunningJobWorker"
                    jobs={works} />
                </>
            )}

{services.length === 0 && (
    <>
    <View style={[styles.headerContainer, {marginTop: 20}]}>
                        <Heading color={colors.text.heading}  fontSize={20}>Mis servicios</Heading>
                    </View>
                <View style={{padding: 20}}>
                    <ColorCard 
                        text={text4} 
                        color={colors.card.turquise} 
                        image={images.deco.serviceGraph} 
                        labelColor="white" 
                        buttonText="Agregar Servicio"
                        style={{marginTop: 20}}
                        onPress={goService}
                        />
                </View>
                </>
            )}
           <CardStat />
      
            <View style={{marginTop: 20, paddingHorizontal: 20, marginBottom: (services.length === 0 ) ? 30: 0}}>
                <ActionButton 
                    text="Ver todo" onPress={() => {
                    navigation.navigate('MyStats')
                }}
                
                />
            </View>

           

            {services.length > 0 && (
                    <>
                     <View style={[styles.headerContainer, {marginTop: 20}]}>
                        <Heading color={colors.text.heading}  fontSize={20}>Mis servicios</Heading>
                    </View>
                        <ServiceList
                            services={services}
                        />
                        <View style={{marginTop: 20, paddingHorizontal: 20, marginBottom: 40}}>
                            <ActionButton text="Agregar Servicio" onPress={goService} />
                        </View>
                    </>
                )
            }
        </View>
        </>
    )

    const Root = user.type === 'WORK' ? ScrollView : View

    return (   
        <>
        
        
        <Root 
            style={styles.container} 
            onScroll={({ nativeEvent }) => onScroll(nativeEvent)}
            refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={onRefresh}
                />
              }
            >
             <SwipeUpDownModal
                modalVisible={ShowComment}
                PressToanimate={true}
                ContentModal={
                    <View style={styles.containerContent}>
                        <CategoryPanel
                            onChange={() => {
                                setShowModelComment(false)
                            }}
                        />
                    </View>
                }
                HeaderStyle={styles.headerContent}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                    <View style={styles.containerHeader}>
                        <View style={styles.capsule} />
                        <View style={{paddingHorizontal: 20, backgroundColor: colors.white, paddingVertical: 10, alignItems: 'center'}}>
                            <Heading fontSize={24} color={colors.text.title} >Todas nuestras categorias</Heading>
                        </View>
                    </View>
                }
                onClose={() => {
                    setShowModelComment(false)
                }}
                />
           
            <View style={styles.scrollContent}>
                {user.type === 'WORK' && workerExclusive()}
                {user.type === 'HIRE' && (
                    <CategoryPanel
                        onScroll={onScroll}
                        header={()=>(
                            <View style={{paddingHorizontal: 20}}>
                                <Heading color={colors.text.heading} fontSize={20} style={{marginTop: 10}}>Conviertete en Worker</Heading>
                                <ColorCard 
                                    text={text3} 
                                    color={colors.card.purple} 
                                    image={images.deco.people3} 
                                    labelColor="white" 
                                    buttonText="QUIERO SER WORKER"
                                    style={{marginTop: 20}}
                                    onPress={() => {
                                        navigation.navigate('BeWorkerFlow')
                                    }}
                                    />
                                <View style={{marginTop: 40, marginBottom: 20}}>
                                    <Heading color={colors.text.heading} fontSize={20} style={{marginTop: -10}}>Todas Nuestras Categorias</Heading>
                                </View>
                            </View>
                        )}
                            onChange={() => {
                                
                            }}
                    />
                )}
            </View>
        </Root>
        </>
    )
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
    },
    headerContainer:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerContent: {flex: 1, marginTop: 40,},
    containerHeader: {
      alignItems:'center',
      justifyContent: 'center',
      marginTop: 230,
      backgroundColor: colors.white,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,

    },
    capsule:{
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

export default Worker