import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signIn as signInFromBackend } from './api/authApi';
import { ACCESS_TOKEN_EXPIRES } from './constants/token';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
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
            console.error('SignIn error:', response.error);
            throw new Error('Failed to SignIn');
          }

          const { accessToken, cookie } = response;
          const refreshToken = cookie.split(';')[0].split('=')[1];

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
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expires_at = Date.now() + ACCESS_TOKEN_EXPIRES;
      }
      return token;
      //   if (account && user) {
      //     return {
      //       ...token,
      //       accessToken: user.accessToken,
      //       refreshToken: user.refreshToken,
      //       expires_at: Date.now() + ACCESS_TOKEN_EXPIRES,
      //       user,
      //     };
      //   }

      //   if (Date.now() < token.expires_at!) {
      //     return token;
      //   }

      //   return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.expires_at = token.expires_at;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
