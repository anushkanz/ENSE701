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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var bcrypt = require('bcryptjs');
const jose = require("jose");
const dotenv = require("dotenv");
dotenv.config();
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
        this.saltOrRounds = 10;
    }
    test() {
        return 'User route testing';
    }
    async findAll() {
        return await this.userModel.find().exec();
    }
    async findOne(id) {
        return await this.userModel.findById(id).exec();
    }
    async create(createUserDto) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(createUserDto.password, salt);
        let data = {
            ...createUserDto,
            password: hash
        };
        return await this.userModel.create(data);
    }
    async update(id, createUserDto) {
        return await this.userModel.findByIdAndUpdate(id, createUserDto).exec();
    }
    async delete(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
    async login(createUserDto) {
        const user = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (user?._id) {
            if (bcrypt.compareSync(createUserDto.password, user.password)) {
                const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                const alg = "HS256";
                const currentUser = { "fname": user.fname, "lname": user.lname, "email": user.email };
                const jwt = await new jose.SignJWT({ id: user.id, name: user.fname, lname: user.lname, email: user.email })
                    .setProtectedHeader({ alg })
                    .setIssuedAt()
                    .setExpirationTime("72h")
                    .setIssuer('http://localhost:3000')
                    .setAudience('http://localhost:3000')
                    .sign(secret);
                return {
                    jwt: jwt,
                    type: user?.type ? user?.type : 1
                };
            }
            else {
                return 'Username and Password not correct';
            }
        }
        else {
            return 'We are unable to locate your account.';
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map