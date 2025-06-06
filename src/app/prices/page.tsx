"use client";
import React from "react";
import PageContainer from "../../components/PageContainer";

const Prices: React.FC = () => {
    return (
        <PageContainer>
            <h1 className="text-4xl font-extrabold text-[color:var(--dark-purple)] mb-4">
                Prices
            </h1>
            <p className="text-lg text-[color:var(--tw-prose-body)]">
                Find the perfect plan for your needs. Transparent, fair and flexible
                pricing!
            </p>
        </PageContainer>
    );
};

export default Prices;
