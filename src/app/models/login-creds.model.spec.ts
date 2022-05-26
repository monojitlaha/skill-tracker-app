import { LoginCreds } from './login-creds.model';

describe('LoginCreds', () => {
  it('should create an instance', () => {
    expect(new LoginCreds("username", "password")).toBeTruthy();
  });
});
