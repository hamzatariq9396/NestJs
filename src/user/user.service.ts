import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}


  create(name: string, email: string, password: string) {
    const user = this.repo.create({ name, email, password });
    return this.repo.save(user);
  }

  async findAll(id: string): Promise<User[]> {
    return this.repo.find();
  }
async findOne(id: number) : Promise<User> {
    
    const user= await this.repo.findOneBy({id});
        if(!user){
        console.log("Not found Data")
        } 
        else {
            return user
        }
  }

  findByEmail(email: string):Promise<User[]>{
    return this.repo.findBy({email})
    
  }

  async update(id: number, attars: Promise<User[]>) {
    const user = await this.repo.findBy({ id });
    if (!user) {
      throw new Error('User is not Found');
    }
    Object.assign(user, attars);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      console.log("User  is bot found ")
    }
    return this.repo.remove(user);
  }
}
