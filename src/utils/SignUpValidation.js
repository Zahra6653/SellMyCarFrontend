
export const checkFormData = (formData)=>{
    const errors = {}
    const nameValidator = /^([a-zA-Z0-9 _-]+)$/
    const emailValidator = /\S+@\S+\.\S+/

    if(!formData.firstName){
        errors.firstName = "Mandatory Field"
    }
    else if(!nameValidator.test(formData.firstName)){
        errors.firstName = "First name is not alphanumeric"
    }

    if(!formData.lastName){
        errors.lastName = "Mandatory Field"
    }
    else if(!nameValidator.test(formData.lastName)){
        errors.lastName = "Last name is not alphanumeric"
    }

    if(!formData.email){
        errors.email = "Mandatory Field"
    }
    else if(!emailValidator.test(formData.email)){
        errors.email = "Email must contain @"
    }

    if(!formData.password){
        errors.password = "Mandatory Field"
    }
    else if(formData.password.length < 6){
        errors.password = "Password must contain atleast 6 letters"
    }
    
    return errors
}