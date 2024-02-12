import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';




@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    private readonly secretKey: string = process.env.JWT_SECRET || 'default_secret_key';

    async createUser(userDetails: CreateUserParams) {
        const { password, ...rest } = userDetails;
        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = this.userRepository.create({
            ...rest,
            password: hashedPassword,
            createAt: new Date(),
        });

        return this.userRepository.save(newUser);
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            return user; // User is valid
        }
    
        return null; 
    }
    
    generateToken(user: User): string {
        const payload = { userId: user.id, email: user.email };

        const options: jwt.SignOptions = {
            expiresIn: '1h',
        };

        return jwt.sign(payload, this.secretKey, options);
    }
}
