import { IsString } from 'class-validator';

export class FindUserDTO {
    @IsString()
    id: string;
}
