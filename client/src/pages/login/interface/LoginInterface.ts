import HeaderInterface from "../../../shared/header/interface/HeaderInterface";

interface ILoginUser {
  email: string;
  password: string;
}

interface LoginInterface {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}
export { ILoginUser, LoginInterface };
