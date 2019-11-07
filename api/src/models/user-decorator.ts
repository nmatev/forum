import { createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator((req) => {
  return req.user;
});
