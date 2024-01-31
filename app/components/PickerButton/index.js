import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, StyleSheet, TouchableOpacity, Easing, Animated, FlatList, Platform, Image } from 'react-native'
import ActionButton from '../../components/ActionButton'
import Label from '../../components/text/Label'
import SearchInput from '../../components/SearchInput'
import colors from '../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../assets'

const getValue = (value, key) => {

    if (key !== undefined) {
        return value ? value[key] : undefined
    }

    return value ? value : undefined
}

const PickerButton = ({
    label,
    data,
    keyData,
    value,
    onChange = () => { },
    placeHolder,
    showSearcher = false,
    style = {}
}) => {


    const [currentValue, setCurrentValue] = useState(getValue(value, keyData))
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState(data)


    const position = useRef(new Animated.Value(-400)).current


    useEffect(() => {

        if (search !== '') {
            const filtered = data.filter(item => item.toUpperCase().indexOf(search.toUpperCase()) >= 0)
            if (filtered.length > 0) {
                setCurrentValue(filtered[0])
            }
            setFilterData(filtered)
        }


    }, [search])

    useEffect(() => {
        setCurrentValue(getValue(value, keyData))
    }, [value])

    const openPicker = () => {

        Animated.timing(position, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start()

        setSearch('')
        setFilterData(data)
        setVisible(true)
    }


    const onAcept = () => {

        Animated.timing(position, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear
        }).start(() => {
            setVisible(false)
        })



        const itemSelect = data.filter(item => {
            if (keyData === undefined) {
                return item === currentValue
            }
            return item[keyData] === currentValue
        })

        if (itemSelect.length === 0) {

            if (keyData === undefined) {

                setCurrentValue(data[0])
                onChange(data[0])
            } else {
                setCurrentValue(data[0][keyData])
                onChange(data[0][keyData])
            }

        } else {
            onChange(itemSelect[0])
        }
    }

    const onPressItem = item => () => {
        const newValue = keyData ? item[keyData] : item
        setCurrentValue(newValue)
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => { }}
                statusBarTranslucent={true}
            >
                <View style={styles.modal}>
                    <Animated.View style={{ bottom: position }}>
                        <SafeAreaView style={styles.bottomView} edges={['right', 'bottom', 'left']}>
                            {showSearcher && (
                                <View style={{ padding: 10 }}>
                                    <SearchInput text={search} onChange={setSearch} />
                                </View>
                            )}
                            <FlatList
                                data={filterData}
                                renderItem={({ item, index }) => (
                                    <View style={{ padding: 4 }}>
                                        <TouchableOpacity onPress={onPressItem(item)}>
                                            <View style={[styles.pickerItem, (((keyData ? item[keyData] : item) === currentValue) ? styles.pickerItemSelected : {})]}>
                                                <Label fontSize={16} color={colors.mainColor}>{keyData ? item[keyData] : item}</Label>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )}
                                style={{ height: 200 }}
                                keyExtractor={item => (keyData ? item[keyData] : item)}
                            />
                            <ActionButton
                                text="Aceptar"
                                style={styles.button}
                                onPress={onAcept}
                            />
                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>
            <View style={[styles.container, style]}>
                {label && <Label color={colors.mainColor} style={styles.label}>{label}</Label>}
                <TouchableOpacity onPress={openPicker} style={styles.input}>
                    <Label color={colors.black}>{(currentValue !== undefined && currentValue !== '') ? currentValue : placeHolder}</Label>
                    <Image source={images.arrowDropDown} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    containerKeyboard: {
        flex: 1,
    },
    input: {
        marginTop: 5,
        height: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        borderColor: '#CCC',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end'
    },
    bottomView: {
        backgroundColor: colors.white,
        borderTopColor: '#CCC',
        justifyContent: 'flex-end',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10
    },
    button: {
        borderRadius: 6,
        marginTop: 20,
        marginHorizontal: 10,
        marginBottom: Platform.OS === 'ios' ? 0 : 20
    },
    pickerItem: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    pickerItemSelected: {
        backgroundColor: colors.winterWhite,
        borderRadius: 10
    },

    label: {
        position: 'absolute',
        left: 20,
        backgroundColor: colors.white,
        zIndex: 9999,
        paddingHorizontal: 5
    },
    icon: {
        width: 15,
        height: 10,
        tintColor: colors.grayLigth,
    }
})

export default PickerButton