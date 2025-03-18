export default function Subtitle({text}: { text: string }) {
    return (
        <h2 className="text-3xl underline underline-offset-8 tracking-tight decoration-green-600 decoration-dashed mb-8 text-center">
            {text}
        </h2>
    );
}