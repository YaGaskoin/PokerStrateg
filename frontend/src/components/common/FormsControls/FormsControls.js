import React from 'react'
import css from './FormsControls.module.css'
import {requiredField} from "../../../utils/validators/validators";
import {Field} from "redux-form";


export const FormControl = (Element) => ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={css.form_control}>
            <div className={hasError ? css.error : ""}>
                <Element {...input} {...props}/>
                <br/>
                {hasError && <span> {meta.error}</span>}
            </div>


        </div>
    )
}
export const Textarea = FormControl('textarea');


export const Input = FormControl('input');

export const createField = (placeholder, name, validators, component, type = '') => {
    return <Field component={component} validate={validators}
           name={name} type={type} placeholder={placeholder}/>
}

export const createFieldAdvanced = ({name, value = null, component = Input, type = null, placeholder = null, validators = []}) =>{
     return <Field component={component} validate={validators}
           name={name} type={type} placeholder={placeholder} value={value}/>

}
