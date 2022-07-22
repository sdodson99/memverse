import { isProduction, getFirebaseConfig } from '..';

describe('configuration', () => {
  describe('isProduction', () => {
    afterEach(() => {
      process.env.NEXT_PUBLIC_ENVIRONMENT = undefined;
    });

    it('should return true when in production', () => {
      process.env.NEXT_PUBLIC_ENVIRONMENT = 'production';

      expect(isProduction()).toBeTruthy();
    });

    it('should return false when in not production', () => {
      process.env.NEXT_PUBLIC_ENVIRONMENT = 'staging';

      expect(isProduction()).toBeFalsy();
    });
  });

  describe('getFirebaseConfig', () => {
    it('should return config', () => {
      expect(getFirebaseConfig()).toBeDefined();
    });
  });
});
