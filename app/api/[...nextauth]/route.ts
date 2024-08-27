import { instance } from '@/api/instance';
import { BASE_URL } from '@/constants/url';
import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const res = await instance('sign-in', {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        // 서버에서 받은 응답을 파싱
        const data = await res.json();

        if (res.ok && data.accessToken) {
          // Set-Cookie 헤더에서 리프레시 토큰을 추출
          const refreshTokenHeader = res.headers.get('Set-Cookie');
          return {
            accessToken: data.accessToken,
            refreshToken: refreshTokenHeader,
          };
        } else {
          throw new Error('Invalid Credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // 유저 데이터가 있으면 JWT 토큰이 새로 발급될 때마다 갱신
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // 세션 객체에 JWT 토큰 정보를 추가
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
};

export const { GET, POST } = NextAuth(authOptions);
