import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { reissueToken, signIn as signInFromBackend } from './apis/authApi';
import { ACCESS_TOKEN_EXPIRES } from './constants/token';
import { JWT } from 'next-auth/jwt';

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const { accessToken, refreshToken } = await reissueToken(token.refreshToken!);

  if (accessToken && refreshToken) {
    return {
      ...token,
      accessToken,
      refreshToken,
      expires_at: Date.now() + ACCESS_TOKEN_EXPIRES,
    };
  }

  return {
    ...token,
    error: 'RefreshAccessTokenError' as const,
  };
};

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
    async jwt({ token, user, account }): Promise<JWT | null> {
      // if (user) {
      //   token.accessToken = user.accessToken;
      //   token.refreshToken = user.refreshToken;
      //   token.expires_at = Date.now() + ACCESS_TOKEN_EXPIRES;
      // }
      // return token;
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expires_at: Date.now() + ACCESS_TOKEN_EXPIRES,
          user,
        };
      }

      if (Date.now() < token.expires_at!) {
        return token;
      }

      return await refreshAccessToken(token);
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
