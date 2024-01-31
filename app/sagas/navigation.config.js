export const routes = {
    'POST.PAYMENT.ERROR':{
        route: () =>  '',
        type: 'goBack',
    },
    'DELETE.MEJOBS.SUCCESS':{
        route: () =>  '',
        type: 'goBack',
    },
    'DELETE.MEJOBS.ERROR':{
        route: () =>  '',
        type: 'goBack',
    },
    'GET.JOB.EVAL.SUCCESS':{
        route: () =>  'EvaluateUser',
        type: 'navigate',
    },
    'POST.SERVICE.SUCCESS':{
        route: () =>  '',
        type: 'goBack',
    },
    'POST.WORKER.SUCCESS':{
        route: () =>  '',
        type: 'goBack',
        next:{
            route: () => 'WorkerProfile',
            type: 'navigate',
        }
    },
    'POST.POSTJOB.SUCCESS':{
        route: () => '',
        type:'goBackAbsolute'
    },
    'POST.BANK.SUCCESS':{
        route: () =>  '',
        type: 'goBack'
    },
    'POST.SENDCODE.SUCCESS':{
        route: () =>  'Main',
        type: 'replace'
    },
    'READ.USER.SUCCESS': {
        route: user =>  {
           if(user && user.is_email_verified && user.is_email_verified === 0){
               return 'emailVerification'
           }
            return 'Main'
        },
        type: 'replace'
    },
    'READ.USER.ERROR': {
        route: () =>  'Auth',
        type: 'replace'
    },
    'SIGNUP.USER.SUCCESS': {
        route: () =>  'emailVerification',
        type: 'replace'
    },
    'SIGNIN.USER.SUCCESS': {
        route: () =>  'Main',
        type: 'replace'
    },
    'GOOGLE_CONNECT.USER.SUCCESS': {
        route: () =>  'Main',
        type: 'replace'
    },
    'FB_CONNECT.USER.SUCCESS': {
        route: () =>  'Main',
        type: 'replace'
    },
    'APPLE_CONNECT.USER.SUCCESS': {
        route: () =>  'Main',
        type: 'replace'
    },
    'LOGOUT.USER.SUCCESS':{
        route: () => 'Auth',
        type: 'replace'
    },
    'POST.ADDRESS.SUCCESS':{
        route: () => '',
        type:'goBackAbsolute'
    },
}