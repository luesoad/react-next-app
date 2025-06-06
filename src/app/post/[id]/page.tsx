import axios from "axios";
import { POST_API_IMAGE_URL, POST_API_URL } from "../../../utils/constants";

interface PostDetailProps {
    params: { id: string };
}

export default async function PostDetail({ params }: PostDetailProps) {
    const { id } = params;
    let post = null;
    let error = null;

    try {
        const response = await axios.get(`${POST_API_URL}${id}`);
        post = response.data;
    } catch (e) {
        error = "Error fetching post details";
    }

    if (error) return <div>{error}</div>;
    if (!post) return <div>Loading...</div>;

    return (
        <div className="max-w-screen-md mx-auto px-4 mt-4">
            <img
                src={`${POST_API_IMAGE_URL}${id}`}
                className="w-full h-64 object-cover mb-4"
                alt={post.title}
            />
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="mt-4 text-gray-700">{post.body}</p>
        </div>
    );
}
