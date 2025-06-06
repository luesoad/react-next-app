export type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface BaseFormFieldProps<T = string> {
  id: string;
  name: string;
  label: string;
  value: T;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
