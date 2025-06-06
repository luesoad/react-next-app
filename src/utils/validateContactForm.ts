import { ContactFormValues, FormErrors } from "../types/form";

export function validateContactForm(
  values: ContactFormValues
): FormErrors<ContactFormValues> {
  const errors: FormErrors<ContactFormValues> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
  )
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  else if (values.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}
