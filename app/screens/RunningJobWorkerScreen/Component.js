import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Animated, Easing, ScrollView } from 'react-native'
import { images } from '../../assets'
import CardMap from '../../components/CardMap'
import JobTopInfoCard from '../../components/Commons/JobTopInfoCard'
import ContactCard from '../../components/Commons/ContactCard'
import BottomSlider from '../../components/Commons/BottomSlider'
import Header from '../../components/Header'
import colors from '../../utils/colors'
import Spinner from 'react-native-loading-spinner-overlay'

const RunningJobScreen = ({ route, get, jobDetail, isLoadingStatus, changeStatus}) => {

    const job = route.params.job
    const backgroundOpacity = useRef(new Animated.Value(1)).current
    const [headerImageVisible, setHeaderImageVisible] = useState(true)

    useEffect(() => {
        get({ jobId: job.job_id })
    }, [])
  
    const animateBackground = (toValue, visible) => {
        Animated.timing(backgroundOpacity, {
            toValue: toValue,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.linear
          }).start()
          setHeaderImageVisible(visible)
    }

    const onScroll = ({nativeEvent})=>{
        animateBackground((nativeEvent.contentOffset.y > 50) ? 0 : 1, !headerImageVisible)  
    }

    const headerOpacity = backgroundOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })

    return (
        <>
           <Spinner
                visible={isLoadingStatus}
                textContent={'Validando estado'}
                textStyle={styles.spinnerTextStyle}
                />
        <View style={styles.container}>

             <Animated.Image source={images.deco.header} style={[styles.header, {opacity: backgroundOpacity}]} resizeMethod="scale" />

            <ScrollView style={{flex:1}} scrollEventThrottle={20} onScroll={onScroll}>
                <View style={{flex: 1}}>
                    <JobTopInfoCard
                        jobDetail={jobDetail}
                    />
                    {jobDetail.status !== 'CANCELED' && (
                          <ContactCard
                          placeHolder="Escribele a tu cliente"
                          jobDetail={jobDetail}
                          userName={jobDetail.user ? `${jobDetail.user.name} ${jobDetail.user.father_last_name}` : undefined}
                          userImage={jobDetail.user ? jobDetail.user.profile_picture : undefined}
                          showEditDate={false}
                          />
                    )}
                  
                     {jobDetail.address && (
                    <View style={{paddingHorizontal: 20, marginTop: 20}}>
                        <CardMap isLoading={!jobDetail.address} address={jobDetail.address} />
                    </View>
  )}  
                </View>
            </ScrollView>



            {(jobDetail.status === 'ACCEPTED' && jobDetail.job_time <= Date.now()) && (
                 <BottomSlider onFinish={() => {
                     changeStatus({
                         job_id: jobDetail.job_id,
                         vendor_id: jobDetail.job_vendor_id,
                         status: 'STARTED'    
                    })
                 }} text="Confirmar inicio servicio" />
            )}


            {(jobDetail.status === 'STARTED' && jobDetail.started_by === 'HIRE') && (
                 <BottomSlider onFinish={() => {
                     changeStatus({
                         job_id: jobDetail.job_id,
                         vendor_id: jobDetail.vendor_id,
                         status: 'FINISHED'    
                    })
                 }} text="Finalizar servicio" />
            )}

              <Animated.View style={{flex: 1, width:'100%', alignSelf:'baseline', position: 'absolute', top:0, width: '100%', opacity: headerOpacity}}>
                <Header title={job.job_name} hideBackButton={true} />
            </Animated.View>
            
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between',
    },
    header:{
        flex:1,
        width: '100%',
        height: 300,
        position:'absolute',
        top: -40,
    },
})

export default RunningJobScreen