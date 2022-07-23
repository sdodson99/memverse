/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    user?: User;
  }

  type User = {
    id: string;
    isMember: () => boolean;
  };
}
