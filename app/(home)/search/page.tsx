// "use client";

// import { Suspense, lazy } from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { useFilterStore } from "@/store/useFilterStore";
// import useSyncURLWithState from "@/hooks/use-filtered-url";
// import useProducts from "@/hooks/use-products";

// import SearchHeader from "@/components/search/search-header";
// import { Skeleton } from "@/components/ui/skeleton";

// const SearchSidebar = dynamic(() => import("@/components/search/search-sidebar"), { ssr: false });
// const SearchSortMenu = dynamic(() => import("@/components/search/search-sort-menu"), { ssr: false });
// const SearchFilterDrawer = dynamic(() => import("@/components/search/search-drawer"), { ssr: false });
// const SearchResults = lazy(() => import("@/components/search/seach-result"));

// const Search = () => {
//   const router = useRouter();
//   useSyncURLWithState();
//   const { priceRange, selectedBrands, selectedCategories, selectedRating, sort } = useFilterStore();

//   const filters = {
//     priceRange,
//     selectedBrands,
//     categoryNames: selectedCategories,
//     selectedRating,
//     sort,
//   };

//   const { data: products, error } = useProducts(filters);
//   const isLoading = false;

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div className="flex flex-col">
//       <SearchHeader resultCount={products?.length || 0} onBack={handleBack} />

//       <main className="flex-grow container mx-auto px-4 py-8">
//         <div className="hidden lg:block mb-6">
//           <Suspense fallback={<Skeleton className="h-10 w-full" />}>
//             <SearchSortMenu />
//           </Suspense>
//         </div>

//         <div className="flex flex-col md:flex-row gap-8">
//           <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0">
//             <div className="sticky top-24">
//               <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
//                 <SearchSidebar />
//               </Suspense>
//             </div>
//           </aside>

//           <div className="flex-grow">
//             <Suspense fallback={<ProductsSkeleton />}>
//               <SearchResults
//                 isLoading={isLoading}
//                 error={error}
//                 products={products}
//               />
//             </Suspense>
//           </div>
//         </div>
//       </main>

//       <Suspense fallback={null}>
//         <SearchFilterDrawer />
//       </Suspense>
//     </div>
//   );
// };

// const ProductsSkeleton = () => (
//   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//     {[...Array(8)].map((_, i) => (
//       <div key={i} className="space-y-2">
//         <Skeleton className="h-48 w-full" />
//         <Skeleton className="h-4 w-2/3" />
//         <Skeleton className="h-4 w-1/2" />
//       </div>
//     ))}
//   </div>
// );

// export default Search;


const page = () => {
  return (
    <div>
      Enter
    </div>
  );
}

export default page;