import { IsString } from 'class-validator';

export class CommentUpdateDTO {
    @IsString()
    text: string;
}
