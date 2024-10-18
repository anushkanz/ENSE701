import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
var bcrypt = require('bcryptjs');  // Import bcryptjs for password hashing
import * as jose from "jose";  // Import JOSE for JWT handling
import * as dotenv from 'dotenv';  // Import dotenv for environment variables
dotenv.config();  // Load environment variables

@Injectable()
export class UserService {
    
    saltOrRounds: number = 10;  // Salt rounds for bcrypt hashing
    jwtService: any;  // Placeholder for JWT service (could be refactored for clarity)
    
    // Inject the User model from Mongoose
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // A simple test method to verify service is working
    test(): string {
        return 'User route testing';
    }

    // Retrieve all users from the database
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    // Retrieve a specific user by their ID
    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    // Create a new user with hashed password
    async create(createUserDto: CreateUserDto) {
        // Generate salt and hash the password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(createUserDto.password, salt);
        
        // Prepare user data with hashed password
        let data = {
            ...createUserDto,
            password: hash
        };

        // Save new user to the database
        return await this.userModel.create(data);
    }

    // Update an existing user's information by their ID
    async update(id: string, createUserDto: CreateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, createUserDto).exec();
    }

    // Delete a user by their ID
    async delete(id: string) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }

    // Login method to authenticate a user
    async login(createUserDto: CreateUserDto) {
        // Find user by email
        const user = await this.userModel.findOne({ email: createUserDto.email }).exec();
        
        // Check if user exists
        if (user?._id) {
            // Compare provided password with the hashed password stored in DB
            if (bcrypt.compareSync(createUserDto.password, user.password)) {
                
                // Create JWT token if password matches
                const secret = new TextEncoder().encode(process.env.JWT_SECRET);  // Retrieve JWT secret from environment variables
                const alg = "HS256";  // Define algorithm for JWT signing
                const currentUser = {"fname":user.fname, "lname":user.lname, "email":user.email};
                const jwt = await new jose.SignJWT({id:user.id, name:user.fname, lname:user.lname, email:user.email})
                                .setProtectedHeader({alg})
                                .setIssuedAt()
                                .setExpirationTime("72h")  // Set token expiration time to 72 hours
                                .setIssuer('http://localhost:3000')
                                .setAudience('http://localhost:3000')
                                .sign(secret);
                
                // Return the generated token
                return {
                    jwt:jwt,
                    type: user?.type ? user?.type : 1
                };  
            } else {
                // Return error message if password does not match
                return 'Username and Password not correct';
            }
        } else {
            // Return error message if user not found
            return 'We are unable to locate your account.';
        }
    }
}
