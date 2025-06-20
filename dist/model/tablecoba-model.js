"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTablecobaResponse = toTablecobaResponse;
//toTablecobaResponse
function toTablecobaResponse(tablecoba) {
    return {
        id: tablecoba.id,
        first_name: tablecoba.first_name,
        last_name: tablecoba.last_name,
        email: tablecoba.email,
        phone: tablecoba.phone,
        address: tablecoba.address,
        username: tablecoba.username,
    };
}
