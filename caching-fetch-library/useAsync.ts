import { useState } from 'react';
import { UseCachingFetchResponse } from './cachingFetch';

export const useAsync = (defaultData: unknown | null) => {
    const [data, setData] = useState<UseCachingFetchResponse>({
        data: defaultData ?? null,
        error: null,
        isLoading: false,
    });

    const run = async (asyncFn: () => Promise<any>) => {
        try {
            setData({ data: null, error: null, isLoading: true });
            const response = await asyncFn();
            const result = { data: response, error: null, isLoading: false };
            setData(result);
            return result;
        } catch (error: any) {
            const result = { data: null, error: new Error(error), isLoading: false };
            setData(result);
            return result;
        }
    };

    return {
        ...data,
        run,
    };
};
