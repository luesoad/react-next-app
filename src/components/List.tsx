"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Post } from "../types/Post";
import ListItem from "./MediaCard";
import Button from "./Button";
import useLoading from "./../hooks/useLoading";
import { POST_API_IMAGE_URL, POST_API_URL } from "../utils/constants";
import * as Progress from "@radix-ui/react-progress";

interface ListProps {
  showPosts: boolean;
}

const List: React.FC<ListProps> = ({ showPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const { loading, executeWithLoading } = useLoading();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showPosts) {
      fetchPosts();
    } else {
      setPosts([]);
      setVisibleCount(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPosts]);

  const fetchPosts = async () => {
    setError(null);
    try {
      const response = await axios.get<Post[]>(POST_API_URL);
      const postsWithImages = response.data.map((post) => ({
        ...post,
        image: `${POST_API_IMAGE_URL}${post.id}`,
      }));
      setPosts(postsWithImages);
    } catch (err) {
      setError("Error fetching data");
    }
  };

  const loadMorePosts = async () => {
    return new Promise<void>((resolve) => {
      setVisibleCount((prev) => {
        const next = prev + 10;
        resolve();
        return next;
      });
    });
  };

  useEffect(() => {
    if (!showPosts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < posts.length &&
          !loading
        ) {
          executeWithLoading(loadMorePosts);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [visibleCount, posts.length, loading, showPosts, executeWithLoading]);

  if (loading && visibleCount === 10)
    return (
      <div className="p-4">
        <Progress.Root className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <Progress.Indicator
            className="h-full transition-all"
            style={{ width: "100%" }}
          />
        </Progress.Root>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-lg text-red-600 font-semibold">{error}</span>
      </div>
    );

  return (
    <div className="mt-8">
      {showPosts && (
        <>
          <div className="card-grid-container">
            <div className="card-grid">
              {posts.map((post) => (
                <ListItem key={post.id} {...post} image={post.image} />
              ))}
            </div>
          </div>

          {visibleCount < posts.length && !loading && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => executeWithLoading(loadMorePosts)}
                variant="secondary"
                disabled={loading}
                loading={loading}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
