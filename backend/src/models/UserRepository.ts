// UserRepository.ts
import { EntityRepository, Repository } from "typeorm";
import User from "../models/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
    async findByEmail(email: string): Promise<User | null> {
        return this.findOne({ where: { login: email } }); 
    }
}

export default UserRepository;
