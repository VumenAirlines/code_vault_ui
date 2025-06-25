import { RegisterForm } from "../features/auth/components/RegisterForm"; 

const RegisterPage = () => {
  return (
    <div className="mx-auto max-w-md">
      <p className="text-sm text-muted-foreground">
        Enter your credentials to sign up.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;