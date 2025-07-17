import { RegisterForm } from "../features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className=" flex mx-8 size-1/2 max-w-lg justify-center">
      <div className=" flex mt-8 w-full justify-center ">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
