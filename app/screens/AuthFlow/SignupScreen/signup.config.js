import { images } from '../../../assets'

export const config = {
    name: {
        label:'Nombre',
        icon: images.signup.user,
        value: '',
        index: 0
    },
    father_last_name: {
        label:'Apellido Paterno',
        icon: images.signup.user,
        value: '',
        index: 1
    },
    mother_last_name: {
        label:'Apellido Materno',
        icon: images.signup.user,
        value: '',
        index: 2
    },
    contact_number:{
        label:'Número de telefono',
        icon: images.signup.phone,
        value: '',
        prefix: '🇨🇱 +56',
        index: 3,
        type:'phone'
    },
    email:{
        label:'Correo',
        icon: images.signup.email,
        value: '',
        index: 4,
        type:'email',
    },
    password:{
        label:'Contraseña',
        secureTextEntry:true,
        icon: images.signup.lock,
        value: '',
        index: 5
    },
    repassword:{
        label:'Confirmar Contraseña',
        secureTextEntry:true,
        icon: images.signup.lock,
        value: '',
        index: 6
    },
    nationality:{
        label:'Nacionalidad',
        icon: images.signup.flag,
        value: '',
        index: 7
    }
}