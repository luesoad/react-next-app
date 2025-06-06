"use client";
import React, { useEffect } from "react";
import { Box, Text } from "@radix-ui/themes";
import Button from "./Button";
import InputField from "./form/InputField";
import TextareaField from "./form/TextareaField";
import { ContactFormValues } from "../types/form";
import { validateContactForm } from "../utils/validateContactForm";
import CONTACT_FORM_INITIAL_VALUES from "../utils/constants";
import { sendContactForm } from "../utils/sendContactForm";
import { useForm } from "../hooks/useForm";

const MESSAGE_MAX = 500;

const ContactForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const {
        values,
        errors,
        backendError,
        backendFieldErrors,
        loading,
        submitted,
        handleChange,
        handleSubmit,
        firstErrorRef,
    } = useForm<ContactFormValues>({
        initialValues: CONTACT_FORM_INITIAL_VALUES,
        validate: validateContactForm,
        onSubmit: sendContactForm,
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0 && firstErrorRef.current) {
            firstErrorRef.current.focus();
        }
    }, [errors, firstErrorRef]);

    useEffect(() => {
        if (!onClose) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const isFormValid = () => Object.keys(errors).length === 0;

    const getFieldRef = (field: keyof ContactFormValues) => {
        if (
            (errors[field] || backendFieldErrors[field]) &&
            !firstErrorRef.current
        ) {
            return firstErrorRef;
        }
        return undefined;
    };

    return (
        <Box
            className="w-full p-8 rounded-2xl shadow-lg"
            style={{
                background: "var(--nyanza)",
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.10)",
            }}
            aria-live="polite"
        >
            {submitted ? (
                <div className="text-center py-16 flex flex-col" role="status">
                    <Text
                        as="h2"
                        size="5"
                        weight="bold"
                        style={{ color: "var(--dark-purple)" }}
                        className="mb-4"
                    >
                        Thank you!
                    </Text>
                    <Text color="green" size="4">
                        Thank you for your message!
                    </Text>
                </div>
            ) : (
                <>
                    <Text
                        as="h2"
                        size="5"
                        weight="bold"
                        mb="6"
                        style={{ color: "var(--dark-purple)" }}
                        className="mb-6"
                    >
                        Contact Us
                    </Text>
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col">
                        <InputField
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            required
                            value={values.name}
                            onChange={handleChange}
                            error={errors.name || backendFieldErrors.name}
                            aria-invalid={!!(errors.name || backendFieldErrors.name)}
                            aria-describedby={errors.name || backendFieldErrors.name ? "name-error" : undefined}
                            tabIndex={1}
                            ref={getFieldRef("name")}
                            autoFocus
                        />
                        <InputField
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            required
                            value={values.email}
                            onChange={handleChange}
                            error={errors.email || backendFieldErrors.email}
                            aria-invalid={!!(errors.email || backendFieldErrors.email)}
                            aria-describedby={errors.email || backendFieldErrors.email ? "email-error" : undefined}
                            tabIndex={2}
                            ref={getFieldRef("email")}
                        />
                        <TextareaField
                            id="message"
                            name="message"
                            label="Message"
                            required
                            value={values.message}
                            onChange={handleChange}
                            error={errors.message || backendFieldErrors.message}
                            aria-invalid={!!(errors.message || backendFieldErrors.message)}
                            aria-describedby={errors.message || backendFieldErrors.message ? "message-error" : undefined}
                            tabIndex={3}
                            ref={getFieldRef("message")}
                            maxLength={MESSAGE_MAX}
                            characterCount
                        />
                        <div className="mb-4">
                            {backendError && (
                                <div
                                    className="text-red-600 text-sm mb-2"
                                    role="alert"
                                    aria-live="assertive"
                                >
                                    {backendError}
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="align-self-center"
                            tabIndex={4}
                            disabled={!isFormValid() || loading}
                        >
                            Send Message
                        </Button>
                    </form>
                </>
            )}
        </Box>
    );
};

export default ContactForm;
