interface SlideCardProps {
    imageUrl: string;
    description: string;
    url?: string;
    id?: string;
    width?: number;
    height?: number;
}

export const SlideCard: React.FC<SlideCardProps> = ({ imageUrl, description }) => (
    <div
        className="flex flex-col h-72"
        style={{
            borderRadius: 0,
            border: "none",
            boxShadow: "var(--button-box-shadow)",
            background: "transparent",
            overflow: "visible",
        }}
    >
        <img
            src={imageUrl}
            alt={description}
            className="w-full h-48 object-cover"
            loading="lazy"
            style={{
                borderRadius: 0,
                border: "none",
                background: "transparent",
                display: "block",
            }}
        />
        <div className="p-2 text-center text-sm" style={{ background: "transparent", color: "var(--tw-prose-body)" }}>
            {description}
        </div>
    </div>
);
