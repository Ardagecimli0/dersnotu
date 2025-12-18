import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Profil bilgilerini getir (özel route'lar önce gelmeli)
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.userId);
  }

  // Kullanıcının notlarını getir (özel route'lar önce gelmeli)
  @Get('profile/notes')
  @UseGuards(AuthGuard('jwt'))
  getUserNotes(@Req() req: any) {
    return this.usersService.getUserNotes(req.user.userId);
  }

  // Profil güncelle
  @Patch('profile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(@Req() req: any, @Body() updateDto: { profileImage?: string; bio?: string; username?: string }) {
    return this.usersService.updateProfile(req.user.userId, updateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
