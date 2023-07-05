import * as Yup from 'yup'

export const signUpSchema=Yup.object({
    sellername:Yup.string().min(2).max(25).required("please enter your name"),
    email:Yup.string().email().required("please enter your email"),
    password:Yup.string().min(6).required("please enter your password"),
    phone:Yup.string().min(10).required("please enter your phone number"),


})
export const signIn=Yup.object({
    email:Yup.string().email().required("please enter your email"),
    password:Yup.string().min(6).required("please enter your password"),

})
export const UserSignup=Yup.object({
    email:Yup.string().email().required("please enter your email"),
    password:Yup.string().min(6).required("please enter your password"),
    phone:Yup.string().min(10).required("please enter your phone number"),


})
export const UserLogin=Yup.object({
    email:Yup.string().email().required("please enter your email"),
    password:Yup.string().min(6).required("please enter your password"),


})