"use client";
import React from "react";
import { Post } from "../types/Post";
import Link from "next/link";
import { Card, Inset } from "@radix-ui/themes";

const MediaCard: React.FC<Post & { image: string }> = ({
    title,
    id,
    image,
}) => (
    <Card
        className="
            w-full max-w-xs flex flex-col h-full
            bg-[color:var(--nyanza)]/90
            rounded-2xl
            shadow-lg
            hover:shadow-2xl
            transition-shadow duration-200
            overflow-hidden
            group
            mx-auto
            border-0
        "
        style={{ border: "none" }}
    >
        <Link href={`/post/${id}`}>
            <Inset clip="padding-box" side="top" pb="current">
                <img
                    src={image}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    alt={title}
                />
            </Inset>
            <div className="flex flex-1 flex-col min-h-0 h-full">
                <p className="text-lg font-semibold text-[color:var(--dark-purple)] mb-4">
                    {title}
                </p>
            </div>
        </Link>
    </Card>
);

export default MediaCard;
