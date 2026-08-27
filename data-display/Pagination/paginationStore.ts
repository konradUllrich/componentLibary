import { create } from "zustand";

/**
 * Scope — a plain, shareable pagination store. Unlike `useUrlPagination`
 * (`hooks/usePagination/useUrlPagination.tsx`), the store returned by
 * `createPaginationStore` has no implicit URL sync — pass it via
 * props/module scope/context to whatever components need it, and opt into
 * URL sync explicitly with `usePaginationSync` (`./usePaginationSync.ts`)
 * if needed. Prefer `useUrlPagination` unless you specifically need a
 * store reference you can share and read from outside a component (e.g.
 * from a TanStack Query key builder). For automatic cross-instance sync
 * without manually threading the store, see `createPagination`
 * (`hooks/usePagination/createPagination.ts`).
 */
export type PaginationStore = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    setPageSize: (size: number) => void;
    setTotalItems: (count: number) => void;
    reset: () => void;
};

export function createPaginationStore(defaultPageSize = 10) {
    return create<PaginationStore>((set, get) => {
        const recalc = (state: Partial<PaginationStore> = {}) => {
            const { page, totalPages } = { ...get(), ...state };
            return {
                ...state,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            };
        };

        return {
            page: 1,
            pageSize: defaultPageSize,
            totalItems: 0,
            totalPages: 0,
            hasNext: false,
            hasPrevious: false,

            setPage: (page) =>
                set((state) => {
                    const newPage = Math.max(1, Math.min(page, state.totalPages || 1));
                    return recalc({ page: newPage });
                }),

            nextPage: () =>
                set((state) => {
                    const newPage = Math.min(
                        state.page + 1,
                        state.totalPages || state.page
                    );
                    return recalc({ page: newPage });
                }),

            prevPage: () =>
                set((state) => {
                    const newPage = Math.max(state.page - 1, 1);
                    return recalc({ page: newPage });
                }),

            setPageSize: (size) =>
                set((state) => {
                    const totalPages = Math.ceil(state.totalItems / size);
                    return recalc({
                        pageSize: size,
                        totalPages,
                        page: 1, // reset to first page when pageSize changes
                    });
                }),

            setTotalItems: (count) =>
                set((state) => {
                    const totalPages = Math.ceil(count / state.pageSize);
                    const newPage = Math.min(state.page, totalPages || 1);
                    return recalc({
                        totalItems: count,
                        totalPages,
                        page: newPage,
                    });
                }),

            reset: () =>
                set(() =>
                    recalc({
                        page: 1,
                        pageSize: defaultPageSize,
                        totalItems: 0,
                        totalPages: 0,
                    })
                ),
        };
    });
}
