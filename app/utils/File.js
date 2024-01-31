import storage from '@react-native-firebase/storage'
import { Platform } from 'react-native'

export const uploadImageToStorage = (path, name) => {
    const reference = storage().ref(name)
    return reference.putFile(path)
        .then(() => 
           reference.getDownloadURL()
        )
}

export const getPlatformPath = (data) => {
    const { path, uri } = data
    const value = path ? path : uri
    return  Platform.select({ android: { value }, ios: { value: uri } })
}

export const getFileName = (name, path) => {

    if (name != null) { return name }

    if (Platform.OS === 'ios') {
        return `~${path.substring(path.indexOf('/Documents'))}`.split('/').pop()
    }
    
    return path.split('/').pop()
}
