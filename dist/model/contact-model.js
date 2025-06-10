"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toContactResponse = toContactResponse;
//konversi dari contact prisma menjadi contact response
function toContactResponse(contact) {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    };
}
