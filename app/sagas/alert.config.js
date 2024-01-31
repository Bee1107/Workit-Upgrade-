export const alertConfig = {
    'GOOGLE_CONNECT.USER.ERROR':{
        title: 'Work It',
        getMessage: message => message,
        buttons:[
            {
                text:'text',
                event:''
            }
        ]
    },
    'POST.RESETPASSWORD.SUCCESS':{
        title: 'Work It',
        getMessage: () => {
            return 'Revisa tu correo y sigue las instrucciones'
        },
        buttons:[
            {
                text:'text',
                event:''
            }
        ]
    },
    'SIGNIN.USER.ERROR' : {
        title: 'Work It',
        getMessage: tag => tag,
        buttons:[
            {
                text:'text',
                event:''
            }
        ]
    },
    'POST.SUPPORT.START':{
        title: 'Work It',
        getMessage: () => '',
        buttons:[
            {
                text:'text',
                event:''
            }
        ]
    },
    'POST.SENDCODE.ERROR':{
        title: 'Work It',
        getMessage: tag => tag,
        buttons:[
            {
                text:'text',
                event:''
            }
        ]
    },
    'SIGNUP.USER.ERROR':{
        title: 'Work It',
        getMessage: tag => {
            const messages = {
                NOT_IMAGE: 'Tienes que agregar una imagen de perfil',
                'The user with the provided phone number already exists.': 'El número de telefono ya esta registrado',
                'The email address is already in use by another account.': 'El Correo ya esta registrado'
            }

            return messages[tag] || tag
        },
        buttons:[
            {
                text:'text',
                event:''
            }
        ]
    }
}

