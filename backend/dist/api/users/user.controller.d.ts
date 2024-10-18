import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    test(): string;
    findAll(): Promise<import("./user.schema").User[]>;
    findOne(id: string): Promise<import("./user.schema").User>;
    addUser(createUserDto: CreateUserDto): Promise<{
        action: string;
        message: string;
    }>;
    loginUser(createUserDto: CreateUserDto): Promise<"Username and Password not correct" | "We are unable to locate your account." | {
        jwt: string;
        type: string | number;
    }>;
    updateUser(id: string, createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(id: string): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
