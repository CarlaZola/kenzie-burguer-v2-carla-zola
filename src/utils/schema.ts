import * as yup from "yup";

export const schemaRegister = yup.object({
    name: yup
    .string()
    .required("Nome de usuário obrigatório")
    .min(3, "Nome com no mínimo 3 caracteres")
    .max(50, "Seu nome já está grande parça, releva aí"),
    email: yup
    .string()
    .email("Formato de email inválido")
    .required("Email inválido"),
    password: yup
    .string()
    .required("Insira uma senha")
    .matches(/.{6,}/, "Deve conter no mínimo 6 caracteres"),
    confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .oneOf(
        [yup.ref("password")],
        "As senhas não correspondem")
}).required()


export const schemaLogin = yup.object({
    email: yup
    .string()
    .email("Formato de email inválido")
    .required("Email inválido"),
    password: yup
    .string()
    .required("Senha inválida")
}).required()
  