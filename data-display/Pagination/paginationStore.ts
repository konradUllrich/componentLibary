import { create } from "zustand";

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
                    // When totalPages is 0 (data not yet loaded), allow any page >= 1
                    // without clamping so the intended page is preserved until
                    // setTotalItems is called with the actual count.
                    // When totalPages > 0, clamp to the valid [1, totalPages] range.
                    const newPage = state.totalPages > 0
                        ? Math.max(1, Math.min(page, state.totalPages))
                        : Math.max(1, page);
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
