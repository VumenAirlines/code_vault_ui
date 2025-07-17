import { LoginForm } from "../features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className=" flex mx-8 size-1/2 max-w-lg justify-center">
      <div className=" flex mt-8 w-full justify-center ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
