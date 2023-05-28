export const checkFormData = (formData)=>{
    const errors = {}
    const emailValidator = /\S+@\S+\.\S+/

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