import { signIn } from '@/api/login';
import LoginForm from '@/components/auth/LoginForm';

export default async function Login() {
  return <LoginForm />;
}
