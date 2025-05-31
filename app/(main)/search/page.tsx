import SearchClient from "@/components/search/search-client";
export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: {
    query?: string | string[];
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const raw = searchParams.query;
  const q = Array.isArray(raw) ? raw.join(" ") : (raw ?? "");

  return {
    title: q ? `${q} - Search products` : "Search products",
    description: q
      ? `Browse our catalog for “${q}”`
      : "Search our full product catalog",
  };
}

export default function Search({ searchParams }: SearchPageProps) {
  return <SearchClient searchParams={searchParams} />;
}
