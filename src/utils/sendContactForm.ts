import { ContactFormValues } from "../types/form";

export async function sendContactForm(values: ContactFormValues) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (values.email === "fail@example.com") {
        reject({
          message: "Server validation failed.",
          fieldErrors: { email: "This email is already used." },
        });
      } else if (values.email === "error@example.com") {
        reject({ message: "Unexpected server error." });
      } else {
        resolve();
      }
    }, 1200);
  });
}
