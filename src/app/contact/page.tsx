"use client";
import React from "react";
import PageContainer from "../../components/PageContainer";
import ContactForm from "../../components/ContactForm";

const Contact: React.FC = () => {
    return (
        <PageContainer>

            <h1 className="text-4xl font-extrabold text-[color:var(--dark-purple)] mb-6 text-center">
                Contact
            </h1>
            <ContactForm />

        </PageContainer>
    );
};

export default Contact;
