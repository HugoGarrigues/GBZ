import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: false, required: false })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;
}
