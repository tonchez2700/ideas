export const loginValidation = (values) => {
    const errors = {}
    if(!values.email) {
        errors.email = 'El correo no puede estar vacio.'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'El correo no tiene un formato válido.';
    }

    if(!values.password) {
        errors.password = 'La contraseña no puede estar vacia.'
    } else if(values.password.length < 6) {
        errors.password = 'La contraseña debe contar con al menos 6 caracteres.'
    }

    return errors
}

export const forgotPasswordValidation = (values) => {
    const errors = {}
    if(!values.email) {
        errors.email = 'El correo no puede estar vacio.'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'El correo no tiene un formato válido.';
    }

    return errors
}