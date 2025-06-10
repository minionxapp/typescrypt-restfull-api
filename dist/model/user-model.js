"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
//unutk data responsenya 
//unutk konversi dari user prisma menjadi user response
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
    };
}
