import { IsBoolean } from 'class-validator';

export class VoteDTO {
  @IsBoolean()
  vote: boolean;
}
