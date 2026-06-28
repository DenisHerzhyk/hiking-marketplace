import { Resend } from "resend";
import Email from "./EmailConfirmationLayout";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const resendSDK = async () => {
  await resend.emails.send({
    from: "denis.herzhyk@gmail.com",
    to: "denis.herzhyk@gmail.com",
    subject: "hello from marketplace",
    react: <Email url="https://example.com" companyName="Versa" />,
  });
};
