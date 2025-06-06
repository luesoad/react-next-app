"use client";
import React, { useState } from "react";
import List from "../components/List";
import Button from "../components/Button";
import useLoading from "../hooks/useLoading";
import PageContainer from "../components/PageContainer";

const Home: React.FC = () => {
  const [showPosts, setShowPosts] = useState(false);
  const { loading, executeWithLoading } = useLoading();

  const handleButtonClick = () => {
    executeWithLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowPosts((prev) => !prev);
    });
  };

  return (
    <PageContainer>
      <h1 className="text-4xl font-extrabold text-[color:var(--dark-purple)] mb-3 text-center">
        Welcome to this React playground!
      </h1>
      <p className="text-lg text-[color:var(--tw-prose-body)] mb-6 text-center max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum,
        velit nec cursus cursus, enim nisi hendrerit enim, nec dictum mi urna
        non ipsum. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas.
      </p>
      <Button onClick={handleButtonClick} variant="primary" loading={loading}>
        {showPosts ? "Hide Posts" : "Load Posts"}
      </Button>
      <div className="mt-6">
        <List showPosts={showPosts} />
      </div>
    </PageContainer>
  );
};

export default Home;
