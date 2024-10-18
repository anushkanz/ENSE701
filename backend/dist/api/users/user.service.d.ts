import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
export declare class UserService {
    private userModel;
    saltOrRounds: number;
    jwtService: any;
    constructor(userModel: Model<User>);
    test(): string;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(createUserDto: CreateUserDto): Promise<"Username and Password not correct" | "We are unable to locate your account." | {
        jwt: string;
        type: string | number;
    }>;
}
