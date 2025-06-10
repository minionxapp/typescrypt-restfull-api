import { writeFileSync } from "fs";

export class Util {

   static async capitalizeFirstLetter(val: string): Promise<string> {
      return (String(val).charAt(0).toUpperCase() + String(val).slice(1)).toString();
   }

   static async lowerFirstLetter(val: string): Promise<string> {
      return (String(val).charAt(0).toLowerCase() + String(val).slice(1)).toString();
   }
   static async createFile(namaFile: string, contentFile: string): Promise<string> {
      try {
         writeFileSync(namaFile, contentFile.toString(), {
            flag: "w"
         })

      } catch (error) {
         console.log(error)
         return 'Create file Gagal'
      }
      return 'Ok'
   }
   
}