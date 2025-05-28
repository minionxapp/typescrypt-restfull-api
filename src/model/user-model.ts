import { User } from "@prisma/client"
export type UserResponse ={
    username : string;
    name : string;
    token? : string;
}

export type CreateUserRequest ={
    username : string;
    name : string;
    password : string;
}

export type LoginUserRequest ={
    username : string;
    password : string;
}

export type UpdateUserRequest ={
    name? : string;
    password? : string;
}

//unutk data responsenya
export function toUserResponse(user: User):UserResponse{
    return {
        name:user.name,
        username:user.username,
    }

}