interface IauthContext {
  authLogin: boolean;
  setAuthLogin: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default IauthContext;
