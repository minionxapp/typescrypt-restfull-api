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
   
static async camelCase(str: string): Promise<string> {
   return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

static async snackCase(str: string): Promise<string> {
   return str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

static async fileNameFormat(inputString: string): Promise<string>  {
  return inputString
    .split("")
    .map((character, index) => {
      if(character === '_'){
          return '-';
      }else{
         if (character === character.toUpperCase()) {
           return (index !== 0 ? "-" : "") + character.toLowerCase();
         } else {
           return character;
         }

      }
    })
    .join("");
}
   /**
    * function camelCase(str: string): string {
     return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
   }
    * 
   function snakeToCamel(str: string): string {
  return str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

    */
}