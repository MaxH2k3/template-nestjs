import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from '../../application/services/user-service/user.service';
import { UserResponseDto } from '../../shared/models/user/user.response.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserFilterDto } from '../../shared/models/user/user.filter.dto';
import { pick } from 'lodash';
import { plainToInstance } from 'class-transformer';
import { ResponseAPI } from '../../shared/models/common/api-response.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: Prisma.UserCreateInput) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  @ApiQuery({ name: 'search', required: false, description: 'Search term' })
  @ApiQuery({ name: 'gender', required: false, description: 'User gender' })
  @ApiQuery({ name: 'dob', required: false, description: 'Date of birth' })
  @ApiQuery({ name: 'dod', required: false, description: 'Date of death' })
  @ApiQuery({ name: 'job', required: false, description: 'User job' })
  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: UserResponseDto,
  })
  async findAll(
    @Query() query: Record<string, any>,
  ): Promise<UserResponseDto[]> {
    const validKeys = Object.keys(new UserFilterDto()); // Get all valid keys
    const filteredQuery = pick(query, validKeys); // Pick only valid keys

    const filter = plainToInstance(UserFilterDto, filteredQuery);

    return this.userService.getUsers(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseAPI(200, 'Success', await this.userService.getUser(id));
  }

  //
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: Prisma.UserUpdateInput,
  // ) {
  //   return this.userService.update(id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
