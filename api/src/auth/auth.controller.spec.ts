import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../core/services/users.service';
import { AuthController } from './auth.controller';
import { UserLoginDTO } from '../models/user-login-dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let systemUnderTest: AuthController;

  const usersService = {
    register() {},
  };

  const authService = {
    signIn() {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    systemUnderTest = module.get<AuthController>(AuthController);
  });

  describe('login', () =>{
    it('should call authService.signIn() once with correct user ', async() => {


      // ARRANGE PHASE

      const testUserDTO: UserLoginDTO = {
        email: "mytest@test.com",
        password: "password",
      };

      const fakeToken = 'token';

      const serviceSignInSpy = jest.spyOn(authService, 'signIn')
        .mockImplementation(() => Promise.resolve(fakeToken));

      // ACT PHASE

      await systemUnderTest.login(testUserDTO);

      // ASSERT PHASE

      expect(serviceSignInSpy).toBeCalledTimes(1);
      expect(serviceSignInSpy).toHaveBeenCalledWith(testUserDTO);

      serviceSignInSpy.mockRestore();

    })

    it('should return the correct token from the signIn Service ', async() => {


      // ARRANGE PHASE

      const testUserDTO: UserLoginDTO = {
        email: "mytest@test.com",
        password: "password",
      };

      const fakeToken = 'token';

      const serviceSignInSpy = jest.spyOn(authService, 'signIn')
        .mockImplementation(() => Promise.resolve(fakeToken));

      // ACT PHASE

      const correctToken = await systemUnderTest.login(testUserDTO);

      // ASSERT PHASE

      expect(correctToken).toEqual({ token: fakeToken});
      expect(serviceSignInSpy).toHaveBeenCalledWith(testUserDTO);

      serviceSignInSpy.mockRestore();

    })

    it('should return the correct token from the signIn Service ', async() => {


      // ARRANGE PHASE

      const testUserDTO: UserLoginDTO = {
        email: "mytest@test.com",
        password: "password",
      };

      const serviceSignInSpy = jest.spyOn(authService, 'signIn')
        .mockImplementation(() => Promise.resolve(null));

      // ACT PHASE
      try {
      await systemUnderTest.login(testUserDTO);
      } catch (err){
        expect(err).toBeInstanceOf(BadRequestException);
      }

      // ASSERT PHASE ON TOP WITH ACT PHASE.


      serviceSignInSpy.mockRestore();

  })
});
});