import { Appearance } from 'react-native'
const colorScheme = Appearance.getColorScheme()

const Colors = {
    buttons:{
        whiteTransparent: (colorScheme === 'dark') ?'rgba(46,46,46, 0.3)':'rgba(255,255,255, 0.3)',
    },
    notification:{
        background: (colorScheme === 'dark') ?'#252F3B':'#EFF3FF',
    },
    skeleton:{
        backgroundColor: 'gray',
        highlightColor: 'white'
    },
    rawTitle: '#2E2E2E',
    rawSubtitle: '#7F7F7F',
    text:{
        title: (colorScheme === 'dark') ?'white':'#2E2E2E',
        subtitle:  (colorScheme === 'dark') ?'#DFD8D8':'#7F7F7F',
        heading: (colorScheme === 'dark') ?'#F5F5F5':'#383838'
    },
    capsule:{
        blue:'#00ACFB',
        red: '#FF2625'
    },
    white: (colorScheme === 'dark')  ? '#313335' : '#FFFFFF' ,
    black: (colorScheme === 'dark')  ? '#F5F5F5' : '#000',
    grayLigth: '#CCC',
    gray: '#2E2E2E',
    darkGray: '#626262',
    textGray: '#888888',
    badge:'#FD7B6F',
    greenBadge: '#93E900',
    wizardGreen:'#41F5A7',
    red:{
        normal: '#FF0000'
    },
    green: {
        bar: '#239F23',
        ligth: '#CCF5F8'
    },
    category:{
       ligth: {
        color1: '#E8F9FB',
        color2: '#FFF5D7',
        color3: '#EBF6FE',
        color4: '#E7F7EB',
       },
       dark: {
        color1: '#00BCD4',
        color2: '#FFC107',
        color3: '#2196F3',
        color4: '#4AC367',
       },
    },
    buttonGreen:'#00CFDA',
    mainColor: '#00AFBE',
    secondColor: '#19164E',
    thirdColor: '#E277FF',
    dangerColor:'#EF5350',
    winterWhite: (colorScheme === 'dark') ?'#151515':'#F5F5F5',
    chat: {
        buble: {
            left: '#F5F6FA',
            right: '#00AFBE',
        },
    },
    card:{
        yellow: '#F9DF58',
        green: '#00CFDA',
        blue: '#0099FA',
        purple: '#AD7CFE',
        turquise: '#009987'
    }
}

export default Colors
