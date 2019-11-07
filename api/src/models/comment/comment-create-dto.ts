import { IsString } from 'class-validator';

export class CommentCreateDTO {
    @IsString()
    text: string;
}
