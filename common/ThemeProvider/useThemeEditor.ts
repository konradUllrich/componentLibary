import { useSearchParams } from "../../Router/hooks";

/**
 * Custom hook for managing theme editor state in URL
 */
export function useThemeEditor() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen =
    new URLSearchParams(searchParams).get("themeEditor") === "open";

  const toggle = () => {
    if (isOpen) {
      setSearchParams((prev) => {
        prev.set("themeEditor", "");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("themeEditor", "open");
        return prev;
      });
    }
  };

  return { isOpen, toggle };
}
