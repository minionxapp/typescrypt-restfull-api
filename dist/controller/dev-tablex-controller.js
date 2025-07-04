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
exports.Dev_tablexController = void 0;
const dev_tablex_service_1 = require("../service/dev-tablex-service");
class Dev_tablexController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield dev_tablex_service_1.Dev_tablexService.create(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static get(req /*sudah login*/, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get");
            try {
                const dev_tablexId = Number(req.params.dev_tablexId);
                const response = yield dev_tablex_service_1.Dev_tablexService.get(req.user, dev_tablexId);
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
                request.id = Number(req.params.dev_tablexId);
                const response = yield dev_tablex_service_1.Dev_tablexService.update(req.user, request);
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
                const dev_tablexId = Number(req.params.dev_tablexId);
                const response = yield dev_tablex_service_1.Dev_tablexService.remove(req.user, dev_tablexId);
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
                    desc: req.query.desc,
                    project_id: Number(req.query.project_id),
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield dev_tablex_service_1.Dev_tablexService.search(req.user, request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //===========================added============
    static getByProjectId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getByProjectId");
            try {
                const dev_tablexId = Number(req.params.dev_tablexId);
                const response = yield dev_tablex_service_1.Dev_tablexService.getByProjectId(req.user, dev_tablexId);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.Dev_tablexController = Dev_tablexController;
