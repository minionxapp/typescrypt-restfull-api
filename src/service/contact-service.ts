import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { ContactResponse, CreateContactRequest, SearchContactRequest, toContactResponse, UpdateContactRequest } from "../model/contact-model";
import { Pageable } from "../model/page";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { User, Contact } from "@prisma/client";

//CreateContactRequest tidak ada user name --> kalo mau inser harus ada user,--> harus bikin object dulu
export class ContactService {
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)
        //menambahkan atribut username pada createRequest
        //buat object baru
        const record = {
            ...createRequest,//dari object yang ada
            ...{ username: user.name } //tambahkan username, dengan value dari object user
        }
        const contact = await prismaClient.contact.create({
            data: record
        })
        return toContactResponse(contact)
    }


    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustexist(user.username, id)
        return toContactResponse(contact)
    }



    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
        //cek kontak ada atau tidak
        await this.checkContactMustexist(user.username, request.id)
        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        })
        return toContactResponse(contact)

    }



    //function untuk getcontact biar bisa dipakai berulang
    static async checkContactMustexist(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username
            }
        })
        if (!contact) {
            throw new ResponseError(404, "Contact not found")
        }
        return contact
    }

    static async remove(user: User, id: number): Promise<ContactResponse> {
        await this.checkContactMustexist(user.username, id)
        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        })
        return contact
    }

   static async search(user: User, request: SearchContactRequest) : Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters = [];
        // check if name exists
        if(searchRequest.name){
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: searchRequest.name
                        }
                    },
                    {
                        last_name: {
                            contains: searchRequest.name
                        }
                    }
                ]
            })
        }
        // check if email exists
        if(searchRequest.email){
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // check if phone exists
        if(searchRequest.phone){
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
    // 

}