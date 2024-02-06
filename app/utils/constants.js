import { images } from '../assets'
import colors from '../utils/colors'


export const NOTIFCATION_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'key=AAAAyRtgDSw:APA91bGhuuU1PC7HkVPUu2CO1Ynm454TTfNRs4oKkn4i3gEva4Pudm46wgSJOAfXcllpm4_f4eYjC0cUZyztHmw8lPevTIoyIHkY3pAthke0OETZ7HK9dgYsFIAJy_rqkrKhYOxOyPHv'
}

export const NOTIFICATION_API_URL = 'https://fcm.googleapis.com/fcm/send'

export const BASE_URL = 'https://us-central1-workit-test-f1f92.cloudfunctions.net/app/api/'

export const MAPBOX_TOKEN = 'pk.eyJ1IjoidHJhbnNtaWdyYWRvIiwiYSI6ImNqb2s1d2M5azBjbHUzd21oNTlkNG10aDUifQ.M-QgjU7VUoR7Q8d2Sf2uLA'

export const MEASURES = [
    'Precio unico',
    'Unidad',
    'mt2',
    'Hora',
]

export const CITIES_CHILE = [
  {
      'region': 'Región de Arica y Parinacota',
      'comunas': ['Arica', 'Camarones', 'Putre', 'General Lagos']
  },
  {
      'region': 'Región de Tarapacá',
      'comunas': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica']
  },
  {
      'region': 'Región de Antofagasta',
      'comunas': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena']
  },
  {
      'region': 'Región de Atacama',
      'comunas': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco']
  },
  {
      'region': 'Región de Coquimbo',
      'comunas': ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado']
  },
  {
      'region': 'Región de Valparaíso',
      'comunas': ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María', 'Quilpué', 'Limache', 'Olmué', 'Villa Alemana']
  },
  {
      'region': 'Región del Libertador Gral. Bernardo O’Higgins',
      'comunas': ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche', 'Marchihue', 'Navidad', 'Paredones', 'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz']
  },
  {
      'region': 'Región del Maule',
      'comunas': ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas']
  },
  {
      'region': 'Región de Ñuble',
      'comunas': ['Cobquecura', 'Coelemu', 'Ninhue', 'Portezuelo', 'Quirihue', 'Ránquil', 'Treguaco', 'Bulnes', 'Chillán Viejo', 'Chillán', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay', 'Coihueco', 'Ñiquén', 'San Carlos', 'San Fabián', 'San Nicolás']
  },
  {
      'region': 'Región del Biobío',
      'comunas': ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío']
  },
  {
      'region': 'Región de la Araucanía',
      'comunas': ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria']
  },
  {
      'region': 'Región de Los Ríos',
      'comunas': ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno']
  },
  {
      'region': 'Región de Los Lagos',
      'comunas': ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena']
  },
  {
      'region': 'Región Aisén del Gral. Carlos Ibáñez del Campo',
      'comunas': ['Coihaique', 'Lago Verde', 'Aisén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O’Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez']
  },
  {
      'region': 'Región de Magallanes y de la Antártica Chilena',
      'comunas': ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos (Ex Navarino)', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine']
  },
  {
      'region': 'Región Metropolitana de Santiago',
      'comunas': ['Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'Santiago', 'San Joaquín', 'San Miguel', 'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'Colina', 'Lampa', 'Tiltil', 'San Bernardo', 'Buin', 'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor']
  }]


export const ALL_COUNTRY = 'Todo Chile'
export const RM = 'Región Metropolitana'
export const RM_CITIES = [
    'Cerrillos', 
    'Cerro Navia', 
    'Conchalí', 
    'El Bosque', 
    'Estación Central', 
    'Huechuraba', 
    'Independencia', 
    'La Cisterna', 
    'La Florida', 
    'La Granja', 
    'La Pintana', 
    'La Reina', 
    'Las Condes', 
    'Lo Barnechea', 
    'Lo Espejo', 
    'Lo Prado', 
    'Macul', 
    'Maipú', 
    'Ñuñoa', 
    'Pedro Aguirre Cerda', 
    'Peñalolén', 
    'Providencia', 
    'Pudahuel', 
    'Quilicura', 
    'Quinta Normal', 
    'Recoleta', 
    'Renca', 
    'Santiago', 
    'San Joaquín', 
    'San Miguel', 
    'San Ramón', 
    'Vitacura', 
    'Puente Alto', 
    'Pirque', 
    'San José de Maipo', 
    'Colina', 
    'Lampa', 
    'Tiltil', 
    'San Bernardo', 
    'Buin', 
    'Calera de Tango', 
    'Paine', 
    'Melipilla', 
    'Alhué', 
    'Curacaví', 
    'María Pinto', 
    'San Pedro', 
    'Talagante', 
    'El Monte', 
    'Isla de Maipo', 
    'Padre Hurtado', 
    'Peñaflor']

export const TYPE_ACCOUNT_BANK = [
    {
        label: 'Cuenta Corriente',
        index: 1,
    }, 
    {
        label: 'Cuenta Vista / Cuenta Rut',
        index: 2
    }, 
    {
        label: 'Cuenta Ahorro',
        index: 3
    }]

export const BANKS = [
    {
        label:'BancoEstado',
        sbif:'0012'
    },
    {
        label:'Banco de Chile / Banco Edwards / Citi',
        sbif:'0001'
    },
    {
        label:'Banco Internacional',
        sbif:'0009'
    },
    {
        label:'Scotiabank Chile',
        sbif:'0014'
    },
    {
        label: 'Banco de Crédito e Inversiones',
        sbif:'0016'
    },
    {
        label:'Corpbanca',
        sbif:'0027'
    },
    {
        label : 'Banco Bice',
        sbif : '0028'
    },
    {
        label:'HSBC Bank',
        sbif:'0031'
    },
    {
        label:'Banco Santander',
        sbif:'0037'
    },
    {
        label:'Banco Itaú Chile',
        sbif:'0039'
    },
    {
        label: 'Banco Security',
        sbif:'0049'
    },
    {
        label: 'Banco Falabella',
        sbif : '0051'
    },
    {
        label: 'Banco Ripley',
        sbif:'0053'
    },
    {
        label : 'Rabobank Chile',
        sbif : '0054'
    },
    {
        label : 'Banco Consorcio',
        sbif: '0055'
    },
    {
        label: 'Banco Penta',
        sbif:'0056'
    },
    {
        label: 'Banco Paris',
        sbif:'0057'
    },
    {
        label: 'BBVA',
        sbif:'0504'
    }
]

export const DATA_PROFILE = [
    {
      sectionIndex:0,
      title:'Mi cuenta',
      data: [{
        title: 'Mis datos',
        navigate: 'ProfileData',
        icon: images.profile_menu.profile
      },
      {
        title: 'Mis evaluaciones',
        icon: images.profile_menu.evaluation,
        navigate: 'Evaluations',
        isWorker: true
      },
      {
        title: 'Cuenta Bancaria',
        navigate: 'AccountBank',
        icon: images.profile_menu.bank,
        isWorker: true
      },
      {
        title: 'Mis estadisticas',
        navigate: 'MyStats',
        icon: images.profile_menu.stat,
        isWorker: true
      },
      {
        title: 'Historial de pago',
        navigate: 'MyPaymentsHistorial',
        icon: images.profile_menu.credit
      },
      {
        title: 'Mis direcciones',
        navigate: 'MyAddress',
        icon: images.profile_menu.addresses
      },
      {
        title: 'Soporte',
        navigate: 'Support',
        icon: images.profile_menu.support
      } ]
    },
    {
      sectionIndex:1,
      title:'Servicios',
      data: [
        {
          title: 'Mis ofertas como Worker',
          icon: images.profile_menu.bids,
          navigate: 'MyBids',
          isWorker: true
        },
        {
          title: 'Historial de servicios',
          icon: images.profile_menu.historial,
          navigate: 'RunningJobs',
        },
        {
          title: 'Mis Servicios',
          navigate: 'MyServices',
          icon: images.profile_menu.service,
          isWorker: true
        }
      ]
    },
    {
      sectionIndex:2,
      title: 'Información',
      data: [
        {
          title: 'Quiero ser Worker',
          navigate: 'BeWorkerFlow',
          icon: images.profile_menu.worker,
          isWorker: false
        },
        {
          title: 'términos y condiciones',
          navigate: 'Terms',
          icon: images.profile_menu.term
        },
        {
          title: 'Cerrar Sesión',
          icon: images.profile_menu.logout,
          hideArrow: true,
          color: colors.text.title
        }
      ]
    }
  ]

  export const WALK_THOUGH_CLIENT = [
    {
      image: images.walkthough.wt_1,
      title: 'Bienvenido a Work It!',
      content: 'Bienvenido a la plataforma donde podrás contratar y prestar todo tipo de servicios.'
    },
    {
      image: images.walkthough.wt_2,
      title: 'Subasta de servicios',
      content: 'Si eres cliente te ofrecemos la modalidad de subasta de servicios, donde podrás solicitar servicios a tu medida, ofreciendo un precio justo por este, para luego recibir ofertas de diferentes Workers.'
    },
    {
      image: images.walkthough.wt_3,
      title: 'Contratación directa de servicios',
      content: 'En este sistema podrás navegar todas nuestras categorías, seleccionando el Worker y el servicio más adecuado para tu necesidad.'
    },
    {
      image: images.walkthough.wt_4,
      title: 'Si eres Worker',
      content: 'Podrás ofrecer tus servicios dentro de tu perfil para que los clientes te contraten, por otro lado podrás ofertar en las solicitudes de servicios dentro de cada categoría.'
    }
  ]   

                          
  export const WALK_THOUGH_WORKER = [
    {
      image: images.walkthough.wt_6,
      title: 'Explora las solicitudes de servicios',
      content: 'Dirígete a tus categorías de interés y dentro de ellas encontraras distintas solicitudes de servicios que podrán interesarte, ¡haz la mejor oferta!.'
    },
    {
      image: images.walkthough.wt_5,
      title: 'Ofrece tus servicios',
      content: '¡Hay mucha gente que necesita tus servicios!, Publícalos y no te olvides de revisar la aplicación todos los días, para no dejar pasar nuevas oportunidades.'
    },
    {
      image: images.walkthough.wt_8,
      title: 'Solicitudes directas',
      content: 'Si tienes alguna solicitud de servicio directo hacia ti, ya sea bajo el sistema de subasta o contratación directa de tus servicios, podrás visualizarlo en la parte superior del home Worker.'
    },
    {
      image: images.walkthough.wt_7,
      title: 'Recomendaciones',
      content: 'No olvides ser cortes y educado,  para obtener buenas evaluaciones y ser recomendado para que a futuro logres aumentar la demanda de tus servicios. ¡Exito!'
    }
  ]