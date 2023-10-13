"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = express_1.default.Router();
const authInstnce = new auth_middleware_1.default();
const userInstance = new user_controller_1.default();
// get an user
userRouter.get('/:uid', authInstnce.isAuthenticated, userInstance.getAnUser);
// delet an user
userRouter.delete('/:uid', authInstnce.isAuthenticated, userInstance.deletAnUser);
// update an user
userRouter.put('/:uid', authInstnce.isAuthenticated, userInstance.updateAnUser);
// get all user
userRouter.get('/', authInstnce.isAuthenticated, authInstnce.isAdmin, userInstance.getallUser);
exports.default = userRouter;
