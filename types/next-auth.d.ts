// types/next-auth.d.ts

import 'next-auth';
import { User } from 'next-auth';
import 'next-auth/jwt';

// 커스텀 User 타입 정의
declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: User;
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpires: number;
    refreshToken?: string;
    error?: 'RefreshTokenError';
  }
}
