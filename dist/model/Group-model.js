"use strict";
//CreateModel
//Group-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGroupResponse = toGroupResponse;
//toGroupResponse
function toGroupResponse(group) {
    return {
        id: group.id,
        name: group.name,
        desc: group.desc,
        pic: group.pic,
        status: group.status,
    };
}
