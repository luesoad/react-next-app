import { useState, useRef } from "react";
import { FormErrors } from "../types/form";

type ValidateFn<T> = (values: T) => FormErrors<T>;
type SubmitFn<T> = (values: T) => Promise<void>;

interface UseFormOptions<T> {
  initialValues: T;
  validate: ValidateFn<T>;
  onSubmit: SubmitFn<T>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendFieldErrors, setBackendFieldErrors] = useState<FormErrors<T>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstErrorRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setBackendFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setBackendError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBackendError(null);
    setBackendFieldErrors({});
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit(values);
      setSubmitted(true);
    } catch (err: any) {
      setLoading(false);
      if (err.fieldErrors) {
        setBackendFieldErrors(err.fieldErrors);
        setErrors((prev) => ({ ...prev, ...err.fieldErrors }));
        if (firstErrorRef.current) firstErrorRef.current.focus();
      }
      setBackendError(err.message || "An error occurred. Please try again.");
      return;
    }
    setLoading(false);
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    backendError,
    setBackendError,
    backendFieldErrors,
    setBackendFieldErrors,
    loading,
    setLoading,
    submitted,
    setSubmitted,
    handleChange,
    handleSubmit,
    firstErrorRef,
  };
}
