import { create } from "zustand";

export type PaginationStore = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number | null;
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
                hasNext: totalPages === null ? true : page < totalPages,
                hasPrevious: page > 1,
            };
        };

        return {
            page: 1,
            pageSize: defaultPageSize,
            totalItems: 0,
            totalPages: null,
            hasNext: true,
            hasPrevious: false,

            setPage: (page) =>
                set((state) => {
                    const newPage =
                        state.totalPages === null
                            ? Math.max(1, page) // no upper clamp when unknown
                            : Math.max(1, Math.min(page, state.totalPages));
                    return recalc({ page: newPage });
                }),

            nextPage: () =>
                set((state) => {
                    const newPage =
                        state.totalPages === null
                            ? state.page + 1
                            : Math.min(state.page + 1, state.totalPages);
                    return recalc({ page: Math.max(1, newPage) });
                }),

            prevPage: () =>
                set((state) => {
                    const newPage = Math.max(state.page - 1, 1);
                    return recalc({ page: newPage });
                }),

            setPageSize: (size) =>
                set((state) => {
                    const totalPages =
                        state.totalPages !== null
                            ? Math.ceil(state.totalItems / size)
                            : null;
                    return recalc({
                        pageSize: size,
                        totalPages,
                        page: 1, // reset to first page when pageSize changes
                    });
                }),

            setTotalItems: (count) =>
                set((state) => {
                    const totalPages = Math.ceil(count / state.pageSize);
                    const newPage = Math.max(1, Math.min(state.page, totalPages || 1));
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
                        totalPages: null,
                    })
                ),
        };
    });
}
