import { Controller, Post, Get, Body, Param,Delete   } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  @Get('findUser')
  findUserByEmail(@Body() body) {
    return this.userService.findByEmail(body.email);
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.name, body.email, body.password);
  }
  @Get('allUsers')
  findUsers() {
    return this.userService.findAll;
  }
  @Get('/:id')
  findUserById(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
  @Delete(':id')
  removeUser(@Param('id') id :string){
return this.userService.remove(parseInt(id))

  }
}
