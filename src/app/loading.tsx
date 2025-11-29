import SeductiveLoader from "@/components/common/SeductiveLoader";

export default function Loading() {
    // Next.js automatically shows this component while the route is preparing
    // If the route prepares instantly, this is skipped.
    return <SeductiveLoader />;
}