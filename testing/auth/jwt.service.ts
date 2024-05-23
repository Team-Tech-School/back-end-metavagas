import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest
      .fn()
      .mockReturnValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcm5pYV9tZXRhX3ZhZ2FzIiwic3ViIjoidXNlcnNfYXV0aCIsImF1ZCI6ImFybmlhX3VzZXJzX21ldGFfdmFnYXMiLCJ1c2VySWQiOjMsInVzZXJFbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicm9sZSI6ImFkdmVydGlzZXIiLCJpYXQiOjE3MTYyNDgzMTMsImV4cCI6MTcxNjI0ODkxM30.wb6MNNVht501W0fuViiQTz6dIE3Seu6ssahzxBUUCP8',
      ),
  },
};
