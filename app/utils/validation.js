const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isPasswordValid = password => password.length >= 6
const isNotEmpty = text => text !== ''
export const isPhone = phone => phone && phone.length === 9

const map = {
    email: isEmail,
    password: isPasswordValid,
    phone: isPhone
}

export const validationFields = fields => {

    const errors = fields.map(({value, type, message}) => {
        const validationFunc = map[type] || isNotEmpty
        return {isValid: validationFunc(value), message }
    }).filter(({isValid})=>!isValid)

    return { isValid : errors.length === 0, errors }
}