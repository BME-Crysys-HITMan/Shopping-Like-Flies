
export type GetUserDto = {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    isAdmin: boolean,
}

export type RegisterDto = {
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    passwordConfirm: string,
}

export type LoginDto = {
    username: string,
    password: string,
}

export type ChangePasswordDto = {
    oldpassword: string,
    newpassword: string,
}

export type UpdateUserDto = {
    username: string,
    firstname: string,
    lastname: string,
}