var regExp = {
    accountReg: /^([a-zA-Z_])\w{5,19}$/,
    passwordReg: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/,
    phoneReg : /^1[34578]\d{9}$/,

}

export default regExp