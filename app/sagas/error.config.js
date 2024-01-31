export const errorMap = {
    'auth/user-not-found': 'Usuario no existe',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests': 'Intentaste muchas veces',
    'Sorry, Entered verification code not matched with our records': 'El Código no es válido',
    'The email address is already in use by another account.': 'El Correo ya esta registrado',
    'The user with the provided phone number already exists': 'Ya existe un usuario con este número de teléfono.'
}

export const getErrorFromCode = code => errorMap[code] || `Error desconocido: ${code}`
