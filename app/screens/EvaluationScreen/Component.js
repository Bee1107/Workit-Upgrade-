import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView  } from 'react-native'
import InputText from '../../components/InputText'
import Button from '../../components/ActionButton'
import RatingButton from '../../components/RatingButton'
import { useNavigation } from '@react-navigation/native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import colors from '../../utils/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AvatarPicker from '../../components/AvatarPicker'

const EvaluationScreen = ( { post, route }) =>{ 

    const navigation = useNavigation()

    const [comment, setComment] = useState('')
    const [eval1, setEval1] = useState(-1)
    const [eval2, setEval2] = useState(-1)
    const [eval3, setEval3] = useState(-1)

    const questions = [
        {
            index: 1,
            question: route.params.type === 'worker' ? 'Calidad del servicio' : '¿El servicio era el esperado?',
            action: setEval1
        },
        {
            index: 2,
            question:  route.params.type === 'worker' ? '¿El Worker fue amable?' : '¿El cliente fue amable?',
            action: setEval2
        },
        {
            index: 3,
            question:  route.params.type === 'worker' ? '¿El precio fue justo?' : 'El servicio valia el precio',
            action: setEval3
        }
    ]

   

    const onPressOutside = () => Keyboard.dismiss()

    const isDisabled = () => eval1 === -1 || eval2 === -1 || eval3 === -1

    const evaluate = omitted => {

        const payload = {
            comment,
            eval1,
            eval2,
            eval3,
            omitted,
            job: route.params.job,
            rate_from: route.params.rate_from,
            rate_to: route.params.rate_to,
            type: route.params.type,
        }
        

        post(payload)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <TouchableWithoutFeedback  onPress={onPressOutside}>
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={{ paddingHorizontal: 10}}
                        extraHeight={140}
                        scrollEnabled={true}>
                    
                        <View style={{alignItems: 'center', padding: 10}}>
                            <AvatarPicker
                                url={route.params.job.vendor_image}
                                sizeType="small"
                            />
                            <Heading>{route.params.job.vendor_name}</Heading>
                            <Label>{route.params.job.job_name}</Label>
                        </View>
           
                        <View style={{marginTop: 20}}>

                            {questions.map(e => (
                                <View key={`key_${e.index}`} style={styles.questionItem}>
                                    <Label style={{ flex: 1}}>{e.question}</Label>
                                    <View style={{width: 160, marginLeft: 4}}>
                                        <RatingButton onPress={index => {e.action(index)}} />
                                    </View>
                                </View>
                            ))}
                        
                        </View>
                        <View style={{marginTop: 40}}>
                            <InputText 
                                label="¿Tienes algo que contarnos?"
                                placeholder="Tú comentario"
                                multiline={true}
                                text={comment}
                                numberOfLines={4}
                                height={100}
                                onChange={setComment}    
                            />
                        </View>
         
                    </KeyboardAwareScrollView>
                    <View style={styles.bottom}>
                        <View style={{paddingHorizontal: 20}}>
                            <Button
                                text="Evaluar"
                                style={styles.button}
                                isDisabled={isDisabled()}
                                onPress={() => {
                                    evaluate(false)
                                    navigation.goBack(null)
                                }}
                                />

                            <Button
                                text="Omitir"
                                style={styles.button}
                                onPress={() => {
                                    evaluate(true)
                                    navigation.goBack(null)
                                
                                }}
                                />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        flexDirection:'column'
    },
    button:{
        width: '100%',
        marginTop: 20
    },
    bottom:{
        width:'100%',  
        position: 'absolute', 
        bottom:0, 
        borderTopColor:'#CCC', 
        backgroundColor: colors.white, 
        borderTopWidth: StyleSheet.hairlineWidth, 
        paddingVertical: 10
    },
    questionItem:{
        flexDirection:'row', 
        alignItems:'center',
        padding: 10, 
        justifyContent:'space-between'
    }
})


export default EvaluationScreen