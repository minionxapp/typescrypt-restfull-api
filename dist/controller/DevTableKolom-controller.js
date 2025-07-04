"use strict";
//Create Controller
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
exports.DevTableKolomController = void 0;
const DevTableKolom_service_1 = require("../service/DevTableKolom-service");
class DevTableKolomController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Create.....");
            try {
                const request = req.body;
                console.log(request);
                const response = yield DevTableKolom_service_1.DevTableKolomService.create(req.user, request);
                console.log(response);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    static get(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devTableKolomId = Number(req.params.devTableKolomId);
                const response = yield DevTableKolom_service_1.DevTableKolomService.get(req.user, devTableKolomId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.devTableKolomId);
                const response = yield DevTableKolom_service_1.DevTableKolomService.update(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static remove(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devTableKolomId = Number(req.params.devTableKolomId);
                const response = yield DevTableKolom_service_1.DevTableKolomService.remove(req.user, devTableKolomId);
                res.status(200).json({
                    data: "OK"
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    name: req.query.name,
                    table_name: req.query.table_name,
                    desc: req.query.desc,
                    is_id: req.query.is_id,
                    is_null: req.query.is_null,
                    is_uniq: req.query.is_uniq,
                    default: req.query.default,
                    type: req.query.type,
                    table_id: Number(req.query.table_id),
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield DevTableKolom_service_1.DevTableKolomService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.DevTableKolomController = DevTableKolomController;
