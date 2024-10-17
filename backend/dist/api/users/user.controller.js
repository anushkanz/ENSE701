"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./create-user.dto");
const console_1 = require("console");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    test() {
        return this.userService.test();
    }
    async findAll() {
        try {
            return this.userService.findAll();
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No User found',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
    async findOne(id) {
        try {
            return this.userService.findOne(id);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No User found',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
    async addUser(createUserDto) {
        try {
            await this.userService.create(createUserDto);
            return { action: 'redirct', message: 'User added successfully' };
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unable to add this user',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
    async loginUser(createUserDto) {
        try {
            return await this.userService.login(createUserDto);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unable to login this user',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
    async updateUser(id, createUserDto) {
        try {
            await this.userService.update(id, createUserDto);
            return { message: 'User updated successfully' };
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Unable to update this User',
            }, common_1.HttpStatus.BAD_REQUEST, { cause: console_1.error });
        }
    }
    async deleteUser(id) {
        try {
            return await await this.userService.delete(id);
        }
        catch {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'No such a User',
            }, common_1.HttpStatus.NOT_FOUND, { cause: console_1.error });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map