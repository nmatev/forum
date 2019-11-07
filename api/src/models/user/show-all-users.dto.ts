import { Expose } from 'class-transformer';

export class ShowAllUsersDTO {
@Expose()
id: string;

@Expose()
name: string;

@Expose()
email: string;

@Expose()
createdOn: Date;
}
