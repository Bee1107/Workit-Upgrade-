import React,{useRef} from 'react'
import { enableScreens } from 'react-native-screens'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/AuthFlow/MainScreen'
import LoginScreen from '../screens/AuthFlow/LoginScreen'
import SignupScreen from '../screens/AuthFlow/SignupScreen'
import ResetPasswordScreen from '../screens/AuthFlow/ResetPasswordScreen'
import EmailVerificationScreen from '../screens/AuthFlow/EmailVerificationScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MyRunningServicesScreen from '../screens/MyRunningServicesScreen'
import FilterServiceScreen from '../screens/FilterServiceScreen'
import MyBidsScreen from '../screens/MyBidsScreen'
import SearchAddressScreen from '../screens/SearchAddressScreen'
import SearchServiceScreen from '../screens/SearchServiceScreen'
import PrincipalScreen from '../screens/PrincipalScreen'
import JobDetailScreen from '../screens/JobDetailScreen'
import ServiceDetailScreen from '../screens/ServiceDetailScreen'
import RunningJobScreen from '../screens/RunningJobScreen'
import RunningJobWorkerScreen from '../screens/RunningJobWorkerScreen'
import PrincpalServicesScreen from '../screens/PrincpalServicesScreen'
import ServiceFilterScreen from '../screens/ServiceFilterScreen'
import HistorialScreen from '../screens/HistorialScreen'
import PostJobStep1Screen from '../screens/PostJobScreen/Step1'
import PostJobStep2Screen from '../screens/PostJobScreen/Step2'
import PostJobStep3Screen from '../screens/PostJobScreen/Step3'
import SupportScreen from '../screens/SupportScreen'
import SupportDetailScreen from '../screens/SupportDetailScreen'
import WorkerProfileScreen from '../screens/WorkerProfileScreen'
import AddAddressScreen from '../screens/AddAddressScreen'
import SelectAddress from '../screens/SelectAddressScreen'
import EditGridGalleryScreen from '../screens/EditGridGalleryScreen'
import CategoryPickerScreen from '../screens/CategoryPickerScreen'
import BankAccountScreen from '../screens/ProfileFlow/BankAccountScreen'
import MyAddressScreen from '../screens/ProfileFlow/MyAddressScreen'
import MyServicesScreen from '../screens/ProfileFlow/MyServicesScreen'
import AddBankAccountBankScreen from '../screens/ProfileFlow/AddBankAccountBankScreen'
import MyProfileDataScreen from '../screens/ProfileFlow/MyProfileDataScreen'
import ChangePasswordScreen from '../screens/ProfileFlow/ChangePasswordScreen'
import EvaluationScreen from '../screens/ProfileFlow/EvaluationScreen'
import WorkerDataScreen from '../screens/ProfileFlow/WorkerDataScreen'
import CalendarScreen from '../screens/CalendarScreen'
import CalendarDetailScreen from '../screens/CalendarDetailScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ExploreJobScreen from '../screens/ExploreJobScreen'
import TermsScreen from '../screens/AuthFlow/TermsScreen'
import PaymentScreen from '../screens/PaymentScreen'
import Step1Screen from '../screens/WorkerFormFlowScreen/Step1Screen'
import EnabledDistrictsScreen from '../screens/EnabledDistrictsScreen'
import EditDateScreen from '../screens/EditDateScreen'
import AddServiceScreen from '../screens/AddServiceScreen'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './rootNavigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { images } from '../assets'
import Header from '../components/Header'
import HeaderChat from '../components/HeaderChat'
import ChatScreen from '../screens/ChatScreen'
import ChatListScreen from '../screens/ChatListScreen'
import CustomTab from '../components/CustomTab'
import SplashScreen from '../screens/SplashScreen'
import StatsScreen from '../screens/StatsScreen'
import PaymentHistorialScreen from '../screens/PaymentHistorialScreen'
import EvaluateScreen from '../screens/EvaluationScreen'
import analytics from '@react-native-firebase/analytics'
import GalleryScreen from '../screens/GalleryScreen'
import BidDetailScreen from '../screens/BidDetailScreen'

enableScreens()

const options = { headerShown: false }

const tabBarOptions = {
  style: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0
  }
}

const SignupStack = createStackNavigator()
const CalendarStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const SelectAddressStack = createStackNavigator()
const RootStack = createStackNavigator()
const HomeTab = createBottomTabNavigator()
const RunningJobStack = createStackNavigator()
const ChatStack = createStackNavigator()
const PrincipalStack = createStackNavigator()
const ServiceStack = createStackNavigator()
const WorkerProfileStack = createStackNavigator()
const PostJobStack = createStackNavigator()
const CurrentJobStack = createStackNavigator()
const CurrentJobWorkerStack = createStackNavigator()

const PostJobStackScreen = () => (
  <PostJobStack.Navigator>
    <PostJobStack.Screen name="PostJobStep1" options={{ header: props => <Header {...props} close={true} title="PUBLICAR SERVICIO"  /> }}   component={PostJobStep1Screen} />
    <PostJobStack.Screen name="PostJobStep2" options={{ header: props => <Header {...props} title="PUBLICAR SERVICIO"  /> }}   component={PostJobStep2Screen} />
    <PostJobStack.Screen name="PostJobStep3" options={{ header: props => <Header {...props} title="PUBLICAR SERVICIO"  /> }}   component={PostJobStep3Screen} />
  </PostJobStack.Navigator>
)

const WorkerProfileStackScreen = () => (
  <WorkerProfileStack.Navigator>
    <WorkerProfileStack.Screen name="WorkerProfile"options={{headerTransparent:true, header: props => <Header {...props} close={true} isSpecial={true} isBlack={true} isTransparent={true}    /> }}   component={WorkerProfileScreen} />
    <WorkerProfileStack.Screen name="CategoryPicker" options={{header: props => <Header {...props} title="ELEGIR CATEGORIA"    /> }}   component={CategoryPickerScreen} />
    <WorkerProfileStack.Screen name="GalleryGrid" options={{header: props => <Header {...props} title="TU GALERIA"    /> }}   component={EditGridGalleryScreen} />
  </WorkerProfileStack.Navigator>
)


const CalendarStackScreen = () => (
  <CalendarStack.Navigator>
    <CalendarStack.Screen name="Calendar" options={{header: props => <Header {...props} title="Calendario" hideBackButton={true}   /> }}   component={CalendarScreen} />
    <CalendarStack.Screen name="CalendarDetail" options={{header: props => <Header {...props} title="Calendario"   /> }} component={CalendarDetailScreen} />
  </CalendarStack.Navigator>
)


const BeWorkerStackScreen = () => (
  <RunningJobStack.Navigator>
    <RunningJobStack.Screen name="BecomeWorker"  options={{header: props => <Header {...props} close={true} title="QUIERO SER WORKER"    /> }} component={Step1Screen} />
  </RunningJobStack.Navigator>
)

const ServiceStackScreen = () => (
  <ServiceStack.Navigator >
    <ServiceStack.Screen name="PrincipalServices"   options={{header: props => <Header {...props} title="SERVICIOS" hideBackButton={true}    /> }} component={PrincpalServicesScreen} />
    <ServiceStack.Screen name="PrincipalServicesFilter"   options={{header: props => <Header {...props} title="SERVICIOS"     /> }} component={ServiceFilterScreen} />
  </ServiceStack.Navigator>
)

const PrincipalStackScreen = () => (
  <PrincipalStack.Navigator >
    <PrincipalStack.Screen name="PrincipalMain"  options={{ headerShown: false }} component={PrincipalScreen} />
    <PrincipalStack.Screen name="CategoryPicker" options={{header: props => <Header {...props} title="ELEGIR CATEGORIA"    /> }}   component={CategoryPickerScreen} />
    <PrincipalStack.Screen name="Jobs"   options={{header: props => <Header {...props} title="SERVICIOS"     /> }} component={ExploreJobScreen} />
    <PrincipalStack.Screen name="Chat"   options={{header: props => <HeaderChat {...props}  /> }} component={ChatScreen} />
    <PrincipalStack.Screen name="MyStats"  options={{header: props => <Header {...props} title="ESTADISTICAS"    /> }} component={StatsScreen} />
    <PrincipalStack.Screen name="Notification" options={{header: props => <Header {...props} title="NOTIFICACIONES"    /> }}   component={NotificationScreen} />
  </PrincipalStack.Navigator>
)

const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen name="ChatList" options={{header: props => <Header {...props} title="Chat" hideBackButton={true}   /> }}   component={ChatListScreen} />
    <ChatStack.Screen name="Chat" options={{header: props => <HeaderChat {...props} title="Chat"   /> }}   component={ChatScreen} />
    
  </ChatStack.Navigator>
)

const SelectAddressStackScreen = () => (
  <SelectAddressStack.Navigator>
    <SelectAddressStack.Screen name="SelectAddress" options={{header: props => <Header {...props} title="SELECCIONAR DIRECCIÓN" close={true}   /> }}  component={SelectAddress} />
    <SelectAddressStack.Screen name="SearchAddress" options={{header: props => <Header {...props} title="BUSCAR DIRECCIÓN"     /> }}  component={SearchAddressScreen} />
    <SelectAddressStack.Screen name="AddAddress" options={{header: props => <Header {...props} title="BUSCAR DIRECCIÓN"   /> }}  component={AddAddressScreen} />
    
    
  </SelectAddressStack.Navigator>
)


const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
      <ProfileStack.Screen name="MyRunningServices" options={{header: props => <Header {...props} title="SERVICIOS EN CURSO"    /> }} component={MyRunningServicesScreen} />
      <ProfileStack.Screen name="MyBids" options={{header: props => <Header {...props} title="MIS OFERTAS"    /> }} component={MyBidsScreen} />
      <ProfileStack.Screen name="RunningJobs" options={{header: props => <Header {...props} title="Historial de servicios"    /> }}   component={HistorialScreen} />
      <ProfileStack.Screen name="MyPaymentsHistorial" options={{header: props => <Header {...props} title="HISTORIAL DE PAGO"    /> }} component={PaymentHistorialScreen} />
      <ProfileStack.Screen name="AddAccountBank"  options={{header: props => <Header {...props} title="AGREGAR CUENTA BANCARIA"    /> }} component={AddBankAccountBankScreen} />
      <ProfileStack.Screen name="MyStats"  options={{header: props => <Header {...props} title="ESTADISTICAS"    /> }} component={StatsScreen} />
      <ProfileStack.Screen name="ProfileData"  options={{header: props => <Header {...props} title="MIS DATOS"    /> }} component={MyProfileDataScreen} />
      <ProfileStack.Screen name="WorkerData"  options={{header: props => <Header {...props} title="DATOS DEL WORKER "    /> }} component={WorkerDataScreen} />
      <ProfileStack.Screen name="ChangePassword"  options={{header: props => <Header {...props} title="CAMBIAR CONTRASEÑA"    /> }} component={ChangePasswordScreen} />
      <ProfileStack.Screen name="MyAddress"  options={{header: props => <Header {...props} title="MIS DIRECCIONES"    /> }} component={MyAddressScreen} />
      <ProfileStack.Screen name="MyServices"  options={{header: props => <Header {...props} title="MIS SERVICIOS"    /> }} component={MyServicesScreen} />
      <ProfileStack.Screen name="AccountBank"  options={{header: props => <Header {...props} title="CUENTA BANCARIA"    /> }} component={BankAccountScreen} />
      <ProfileStack.Screen name="Evaluations"  options={{header: props => <Header {...props} title="EVALUACIONES "    /> }} component={EvaluationScreen} />
      <ProfileStack.Screen name="Support"  options={{header: props => <Header {...props} title="SOPORTE"    /> }} component={SupportScreen} />
      <ProfileStack.Screen name="SupportDetail"  options={{header: props => <Header {...props} title="SOPORTE"    /> }} component={SupportDetailScreen} />
      <ProfileStack.Screen name="Terms" options={{ header: props => <Header {...props} title="TÉRMINOS Y CONDICIONES"  />}} component={TermsScreen} />
  </ProfileStack.Navigator>
)

const HomeTabScreen = () => (
  <HomeTab.Navigator tabBarOptions={tabBarOptions} tabBar={props => <CustomTab {...props} />}>
      <HomeTab.Screen name="Home"  options={{title:'HOME', icon: images.tab.home}} component={PrincipalStackScreen} />
      <HomeTab.Screen name="ChatContainer" options={{title:'CHAT', icon: images.tab.chat}} component={ChatStackScreen} />
      <HomeTab.Screen name="Services" options={{header: props => <Header {...props}  /> , icon: images.tab.explore}}  component={ServiceStackScreen} />
      <HomeTab.Screen name="Calendario"  options={{title:'CALENDARIO', icon: images.tab.calendar}}   component={CalendarStackScreen} />
      <HomeTab.Screen name="ProfileStack" options={{title:'PERFIL', icon: images.tab.user}} component={ProfileStackScreen} />
    </HomeTab.Navigator>
)

const SignupStackScreen = () =>  (
  <SignupStack.Navigator mode="card">
    <SignupStack.Screen name="MainHome" options={{headerShown: false}} component={MainScreen} />
    <SignupStack.Screen name="Terms" options={{ header: props => <Header {...props} title="Términos y Condiciones"  />}} component={TermsScreen} />
    <SignupStack.Screen name="Signup" options={{headerTransparent:true, header: props => <Header {...props} title="" isTransparent={true}  />}} component={SignupScreen} />
    <SignupStack.Screen name="Login" options={{ header: props => <Header {...props} title="Ingreso con correo"  /> }} component={LoginScreen} />
    <SignupStack.Screen name="ResetPassword" options={{header: props => <Header {...props} title="Recuperar contraseña"    /> }} component={ResetPasswordScreen} />
    <SignupStack.Screen name="emailVerification" options={{headerTransparent:true,header: props => <Header {...props} title="Verificación de Correo" hideBackButton={true}    /> }} component={EmailVerificationScreen} />
  </SignupStack.Navigator>
)


const AddAddressStackScreen = () => (
  <SelectAddressStack.Navigator>
      <SelectAddressStack.Screen name="SearchAddress" options={{ header: props => <Header {...props} title="Buscar Dirección" close={true} /> }} component={SearchAddressScreen} />
      <SelectAddressStack.Screen name="AddAddress" options={{ header: props => <Header {...props} title="Confirmar Dirección"  /> }} component={AddAddressScreen} />
  </SelectAddressStack.Navigator>
)

const CurrentJobStackScreen = () => (
  <CurrentJobStack.Navigator>
    <CurrentJobStack.Screen name="CurrentJob" options={{ headerTransparent:true, header: props => <Header {...props} title="" close={true} isTransparent={true} /> }} component={RunningJobScreen} />
    <CurrentJobStack.Screen name="Chat" options={{ header: props => <HeaderChat {...props}  /> }} component={ChatScreen} />
  </CurrentJobStack.Navigator>
)
  
const CurrentJoWorkerbStackScreen = () => (
  <CurrentJobWorkerStack.Navigator>
    <CurrentJobWorkerStack.Screen name="CurrentJob" options={{ headerTransparent:true, header: props => <Header {...props} title="" close={true} isTransparent={true} /> }} component={RunningJobWorkerScreen} />
    <CurrentJobWorkerStack.Screen name="Chat" options={{ header: props => <HeaderChat {...props}  /> }} component={ChatScreen} />
  </CurrentJobWorkerStack.Navigator>
)

const Root = () => {
  
  const routeNameRef = useRef()

  const onReady = ()=>{
    routeNameRef.current = navigationRef.current.getCurrentRoute().name
  }
  
  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = navigationRef.current.getCurrentRoute().name
  
    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      })
    }
    routeNameRef.current = currentRouteName
  }

  return (
      <NavigationContainer 
        ref={navigationRef} 
        onReady={onReady}
        onStateChange={onStateChange}
        >
        <RootStack.Navigator mode="modal" >
          <RootStack.Screen options={options} component={SplashScreen} name="Splash" />
          <RootStack.Screen name="Auth" options={options}  component={SignupStackScreen} />
          <RootStack.Screen name="Main" options={options} component={HomeTabScreen} />
          <RootStack.Screen options={options} component={AddAddressStackScreen} name="AddAddressRoot" />
          <RootStack.Screen name="SelectAddress" options={options} component={SelectAddressStackScreen} />
          <RootStack.Screen name="PostJob" options={options} component={PostJobStackScreen} />
          <RootStack.Screen name="PostService" options={{ header: props => <Header {...props} title="AGREGAR SERVICIO" close={true}  />}} component={AddServiceScreen} />
          <RootStack.Screen name="WorkerProfile" options={options}  component={WorkerProfileStackScreen} />
          <RootStack.Screen name="BeWorkerFlow"  options={options} component={BeWorkerStackScreen} />
          <RootStack.Screen name="RunningJob" options={options} component={CurrentJobStackScreen} />
          <RootStack.Screen name="RunningJobWorker" options={options} component={CurrentJoWorkerbStackScreen} />
          <RootStack.Screen name="JobDetail" options={{headerTransparent:true, header: props => <Header {...props} close={true} title="" isTransparent={true}  /> }} component={JobDetailScreen} />
          <RootStack.Screen name="ServiceDetail" options={{headerTransparent:true, header: props => <Header {...props} close={true} title="" isTransparent={true}  /> }} component={ServiceDetailScreen} />
          <RootStack.Screen name="Payment" options={{ header: props => <Header {...props} close={true} title="Pago"  /> }} component={PaymentScreen} />
          <RootStack.Screen name="SearchService" options={{ header: props => <Header {...props} close={true} title="Busqueda"  /> }} component={SearchServiceScreen} />
          <RootStack.Screen name="EvaluateUser" options={{ header: props => <Header {...props} close={true} title="Evaluar"  /> }} component={EvaluateScreen} />
          <RootStack.Screen options={{ header:props => <Header {...props} close={true} title="Fotos"  /> }} component={GalleryScreen} name="Gallery" />
          <RootStack.Screen name="EditDate" options={{ header: props => <Header {...props} close={true} title="Editar fecha y hora"  /> }} component={EditDateScreen} />
          <RootStack.Screen name="EnabledDistricts" options={{ header: props => <Header {...props} close={true} title="Comunas disponibles"  /> }} component={EnabledDistrictsScreen} />
          <RootStack.Screen name="FilterServices" options={{ header: props => <Header {...props} close={true} title="Filtrar Servicios"  /> }} component={FilterServiceScreen} />
          <RootStack.Screen name="CurrentJob" options={{ headerTransparent:true, header: props => <Header {...props} title="" close={true} isTransparent={true} /> }} component={RunningJobScreen} />
          <RootStack.Screen name="BidDetail" options={{ headerTransparent:true, header: props => <Header {...props} title="" close={true} isTransparent={true} /> }} component={BidDetailScreen} />
          <RootStack.Screen name="AddAccountBank"  options={{header: props => <Header {...props} title="AGREGAR CUENTA BANCARIA" close={true}     /> }} component={AddBankAccountBankScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
  )
}

export default Root