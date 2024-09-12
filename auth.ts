import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { reissueToken, signIn as signInFromBackend } from './api/authApi';
import { ACCESS_TOKEN_EXPIRES } from './constants/token';
import { JWT } from 'next-auth/jwt';

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    console.log('호출됨!!!', token.refreshToken!);
    console.log('호출됨@@22!!!', token.accessToken);

    // return {
    //   ...token,
    //   accessToken: token.accessToken,
    //   refreshToken: token.refreshToken,
    //   accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES,
    // };

    const response = await reissueToken(token.refreshToken!);

    console.log('응답!!!', response);

    if (response.error) {
      console.error('ReissueToken error:', response.error);
      throw new Error('Failed to ReissueToken');
    }

    const { accessToken, cookie } = response;

    const refreshToken = cookie.split(';')[0].split('=')[1];

    console.log('토큰이 갱신되었습니다.', Date.now() + ACCESS_TOKEN_EXPIRES);

    return {
      ...token,
      accessToken,
      refreshToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES,
    };
  } catch (error) {
    console.error('에러발생!!!', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

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
            console.error('SignIn error:', response.error);
            throw new Error('Failed to SignIn');
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
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      console.log('**** Access token expires on *****', token.accessTokenExpires, new Date(token.accessTokenExpires));

      console.log('현재: ', Date.now(), new Date(Date.now()));

      if (Date.now() < token.accessTokenExpires) {
        console.log('**** returning previous token ******');
        return token;
      }

      // Access token has expired, try to update it
      console.log('!!!!!**** Update Refresh token ******');
      // return token;
      return await refreshAccessToken(token);
    },
    session({ session, token }) {
      // console.log(`In session callback - Token is ${JSON.stringify(token)}`);

      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
