import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signIn as signInFromBackend } from './api/authApi';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: '이메일', type: 'text', placeholder: '이메일을 입력해주세요.' },
        password: { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await signInFromBackend({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (response.error) {
            console.error('Auth error:', response.error);
            throw new Error('Failed to login');
          }

          const { accessToken, cookie } = response;
          const refreshToken = cookie.split(';')[0].split('=')[1];

          console.log('Auth success:', credentials.email);
          console.log('Access token:', accessToken);
          console.log('Refresh token:', refreshToken);

          return {
            id: credentials.email as string,
            email: credentials.email as string,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
