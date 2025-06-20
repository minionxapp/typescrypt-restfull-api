"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const fs_1 = require("fs");
class Util {
    static capitalizeFirstLetter(val) {
        return __awaiter(this, void 0, void 0, function* () {
            return (String(val).charAt(0).toUpperCase() + String(val).slice(1)).toString();
        });
    }
    static lowerFirstLetter(val) {
        return __awaiter(this, void 0, void 0, function* () {
            return (String(val).charAt(0).toLowerCase() + String(val).slice(1)).toString();
        });
    }
    static createFile(namaFile, contentFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, fs_1.writeFileSync)(namaFile, contentFile.toString(), {
                    flag: "w"
                });
            }
            catch (error) {
                console.log(error);
                return 'Create file Gagal';
            }
            return 'Ok';
        });
    }
    static camelCase(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        });
    }
    static snackCase(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        });
    }
    static fileNameFormat(inputString) {
        return __awaiter(this, void 0, void 0, function* () {
            return inputString
                .split("")
                .map((character, index) => {
                if (character === '_') {
                    return '-';
                }
                else {
                    if (character === character.toUpperCase()) {
                        return (index !== 0 ? "-" : "") + character.toLowerCase();
                    }
                    else {
                        return character;
                    }
                }
            })
                .join("");
        });
    }
}
exports.Util = Util;
