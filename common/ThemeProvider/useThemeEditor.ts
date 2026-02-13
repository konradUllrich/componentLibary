import { useNavigate, useSearch } from "@tanstack/react-router";

type SearchParams = Record<string, string | undefined>;

/**
 * Custom hook for managing theme editor state in URL
 */
export function useThemeEditor() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as SearchParams;
  
  const isOpen = search.themeEditor === "open";
  
  const toggle = () => {
    const newSearch = { ...search };
    if (isOpen) {
      delete newSearch.themeEditor;
    } else {
      newSearch.themeEditor = "open";
    }
    navigate({ search: newSearch });
  };
  
  return { isOpen, toggle };
}
