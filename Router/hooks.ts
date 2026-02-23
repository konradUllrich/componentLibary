export { useSearch, useLocation, useParams, useRoute } from "wouter";
import { useSearchParams as useSearchParamsw } from "wouter";

/**
 * Hook for accessing and modifying search parameters in the URL.
 * Returns a tuple with the current search params string and a setter function.
 *
 * @returns {[string, (searchParams: Record<string, string>) => void]} Tuple containing search params and setter
 *
 * @example
 * const [searchParams, setSearchParams] = useSearchParams();
 * const query = new URLSearchParams(searchParams).get('q');
 */
export const useSearchParams = useSearchParamsw;
