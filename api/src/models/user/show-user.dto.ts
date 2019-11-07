import { Expose } from 'class-transformer';

export class ShowUserDTO {
@Expose()
id: string;

@Expose()
name: string;

@Expose()
email: string;

@Expose()
createdOn: Date;
}
