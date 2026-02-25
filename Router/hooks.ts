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

export const useParamState = <T>(
  paramName: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParamValue = (): T => {
    const params = new URLSearchParams(searchParams);
    const value = params.get(paramName);
    return (value !== null ? JSON.parse(value) : defaultValue) as T;
  };

  const setParamValue = (value: T) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, JSON.stringify(value));
    setSearchParams(params.toString());
  };

  return [getParamValue(), setParamValue];
};
