import { LoginForm } from "../features/auth/components/LoginForm"; 

const LoginPage = () => {
  return (
    <div className="mx-auto max-w-md">
      <p className="text-sm text-muted-foreground">
        Enter your credentials to access your vault.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;