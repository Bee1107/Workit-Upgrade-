import React, { useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Heading from '../../components/text/Heading'
import colors from '../../utils/colors'
import CardMap from '../../components/CardMap'
import JobTopInfoCard from '../../components/Commons/JobTopInfoCard'
import BidCard from '../../components/BidCard'
import CarouselPhoto from '../../components/CarouselPhoto'
import { useSelector } from 'react-redux'
import WorkitScrollView from '../../components/WorkitScrollView'
import { SafeAreaView } from 'react-native-safe-area-context'

const RunningJobScreen = ({ route, get, deleteAction }) => {

    const job = route.params.job
    const bid = route.params.bid

    const jobDetail = useSelector(state => state.jobs.jobSelected)
    const isLoading = useSelector(state => state.jobs.isLoadingJobSelected)

    useEffect(() => {
        get({ jobId: job.job_id })
    }, [])

    const onCancelBid = (item) => {
        Alert.alert(
            'Cancelar',
            '¿Estás seguro de cancelar esta oferta?',
            [
              {
                text: 'No',
                onPress: () =>{
                  
                },
              }, 
              {
                text: 'Si',
                onPress: () => {
                    deleteAction({bid_id: item.bid_id})
                },
              },
            ],
            {cancelable: false, onDismiss: () => {}},
          )
      }
      

    return (
        <WorkitScrollView title={job.job_name}>
             <SafeAreaView style={{flex: 1}} edges={['right', 'bottom', 'left']}>
      
            <JobTopInfoCard
                jobDetail={jobDetail}
                hideStatus={true}
            />
            <View style={{paddingHorizontal: 20}}>
                <Heading  color={colors.text.title}>{ 'TU OFERTA'}</Heading>
            </View>

            <BidCard 
                item={bid}
                bid_id={bid.bid_id}
                isWorkerView={true}  
                isTouchable={false}  
                onCancel={onCancelBid}
            />

            {(job && job.images && job.images.length > 0 || isLoading) && (
                <View style={styles.boxContainer}>
                    <Heading color={colors.text.title}>IMAGENES DEL SERVICIO</Heading>
                    <CarouselPhoto 
                    images={job.images}
                    isLoading={isLoading}
                    />
                </View>
            )}

            {jobDetail.address && (
                <View style={styles.boxContainer}>
                    <CardMap isLoading={!jobDetail.address} address={jobDetail.address} />
                </View>
            )}  
            </SafeAreaView>
        </WorkitScrollView>
    )
}

const styles = StyleSheet.create({
    boxContainer:{
        paddingHorizontal: 20,
        marginTop: 20
    }
})

export default RunningJobScreen