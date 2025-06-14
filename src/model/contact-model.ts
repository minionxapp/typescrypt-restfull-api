//lihat schema nya
/*
model Contact {
 id         Int       @id @default(autoincrement())
 first_name String    @db.VarChar(100)
 last_name  String    @db.VarChar(100)
 email      String?   @db.VarChar(100)
 phone      String?   @db.VarChar(20)
 username   String    @db.VarChar(100)
 user       User      @relation(fields: [username], references: [username])
 addresses  Address[]

 @@map("contacts")
}

*/
import { Contact } from '@prisma/client'

export type ContactResponse = {
    id: number,
    first_name: string,
    last_name: string , //null menyesuaikan prisma
    email?: string | null,
    phone?: string | null

}

export type CreateContactRequest = {
    first_name: string,
    last_name: string,
    email?: string, 
    phone?: string

}

export type UpdateContactRequest = {
    id: number,
    first_name: string,
    last_name: string,
    email?: string,
    phone?: string
}

export type SearchContactRequest = {
    name?: string,
    email?: string,
    phone?: string,
    page : number,
    size : number
}
//konversi dari contact prisma menjadi contact response
export function toContactResponse(contact: Contact): ContactResponse {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    }

}
