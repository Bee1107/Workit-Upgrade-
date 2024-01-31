import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import Heading from '../../components/text/Heading'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'
import ActionButton from '../../components/ActionButton'
import InputText from '../../components/InputText'
import { useNavigation } from '@react-navigation/native'

const SupportDetailScreen = ({ route, post }) => {

    const scrollViewRef = useRef();
    const [message, setMessage] = useState('')
    const [isHideHelp, setIsHideHelp] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        if (!isHideHelp) {

            scrollViewRef.current.scrollToEnd({ animated: true })

        }

    }, [isHideHelp])

    const postMessage = () => {
        post({
            message
        })
    }

    const { buttons } = route.params

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={80}
            style={{ flex: 1, backgroundColor: colors.white }}
        >
            <ScrollView ref={scrollViewRef} style={styles.container}>
                <View style={{ marginTop: 10 }}>
                    <Heading>{route.params.question}</Heading>
                    <Label style={{ marginTop: 10 }}>{route.params.response}</Label>
                    <View style={{ marginTop: 20 }}>
                        {buttons.length > 0 && buttons.map((e, index) => (
                            <ActionButton
                                key={`key_${index}`}
                                text={e.label}
                                onPress={() => {
                                    navigation.navigate(e.navigate)
                                }}
                                style={{ marginTop: 20 }}
                            />
                        ))}
                        {isHideHelp && (
                            <ActionButton
                                text="Ayuda"
                                onPress={() => {
                                    setIsHideHelp(false)
                                }}
                                style={{ marginTop: 20 }}
                            />
                        )}

                        {!isHideHelp && (
                            <>
                                <InputText
                                    label="Escribenos y te ayudamos"
                                    placeholder=""
                                    multiline={true}
                                    text={message}
                                    onChange={setMessage}
                                    style={{ marginTop: 20 }}
                                    height={120}
                                    onFocus={() => {
                                        scrollViewRef.current.scrollToEnd({ animated: true })
                                    }}
                                />
                                <ActionButton
                                    text="Enviar"
                                    onPress={postMessage}
                                    style={{ marginTop: 20 }}
                                />
                            </>
                        )}

                    </View>

                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default SupportDetailScreen