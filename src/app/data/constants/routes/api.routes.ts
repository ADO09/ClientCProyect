import { enviroment as ENV } from './../../../../environments/enviroments.dev';

export const API_ROUTES = {
    AUTH: { 
        LOGIN:`${ENV.url}generalRoutes/LogIn`
    },
    USUARIOS:{
        CLIENT:`${ENV.url}clientesP`,
        FISIOS:`${ENV.url}clientesF`,
        ONEFISIOS:`${ENV.url}clientesF/`,
        ONECLIENT:`${ENV.url}clientesP/`,
        PUNTUACIONFISIO:`${ENV.url}clientesF/puntuacion/`
    },
    CITASF:{
        CITASFISIO:`${ENV.url}cita/listCitaFisio/`,
        CITASFISIOHISTORY:`${ENV.url}cita/listCitaFisioH/`,
        CITASFISIOHISTORYBALANCE:`${ENV.url}cita/listCitaFisioHBalance/`,
        UPDATECITAFISIO:`${ENV.url}cita/`,
        DELETECITAFISIO:`${ENV.url}cita/`,
        CITASCOUNT:`${ENV.url}cita/countCitas/`,
        
    }, CITASC:{
        ADDCITAFISIO:`${ENV.url}cita/`,
        CITASCLIENT:`${ENV.url}cita/listCitaClient/`,
        CITASCLIENTHISTORY:`${ENV.url}cita/listCitaClientH/`,
    },
    PLANES:{
        PLANES:`${ENV.url}planRehabilitacion/`,
        PLANESONEFISIO:`${ENV.url}planRehabilitacion/planFisio/`,
    },
    EXPEDIENTESMEDICOS:{
        EXPEDIENTERG:`${ENV.url}expedienteMedico/`
    },
    MAILER:{
        MAILERGENRL:`${ENV.url}mailer`,
        MAILERMSSE:`${ENV.url}mailer/mssge`,
        MAILERCLIENTEAFISIO:`${ENV.url}mailer/mssgClienteFisio`,
        MAILERACPTFISIO:`${ENV.url}mailer/citAcptFis`,
        MAILERACPTCLIENT:`${ENV.url}mailer/citAcptClit`,
        MAILERBANEOCUENTA:`${ENV.url}mailer/baneoCuenta`,
        MAILERFORGOTPASSWORD:`${ENV.url}generalRoutes/forgotPassword/`
    },
    COMMENTSF: {
        COMMENTS:`${ENV.url}clientesF/comments/`,
        ADDCOMMENTS:`${ENV.url}clientesF/commentsADD`,
        ELMCOMMENT:`${ENV.url}clientesF/commentsDEL/`,
     

        
    },
    CHAT: {
        USERDATACHAT:`${ENV.url}generalRoutes/DataSendMessage/`,
    }
    

    
}