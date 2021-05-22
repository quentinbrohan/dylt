// eslint-disable-next-line import/prefer-default-export
export const IS_PROD_ENV = process.env.NODE_ENV === 'production';
export const IS_SERVER = (): boolean => typeof window === 'undefined';
