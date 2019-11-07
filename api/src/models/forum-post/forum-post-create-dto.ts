import { IsString } from 'class-validator';

export class ForumPostCreateDTO {
  @IsString()
  title: string;
  @IsString()
  text: string;
}
