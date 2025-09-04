import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./key";
import { useState } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
}
interface IFetchUsersResult {
  totalCount: number;
  users: IUser[];
  totalPages: number;
}

export const useFetchUsers = (currentPage: number) => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const PAGE_SIZE = 2; // Number of items per page
  const queryInfo = useQuery<IFetchUsersResult>({
    queryKey: QUERY_KEYS.getPage(currentPage), // Use the query key from key.ts
    queryFn: async (): Promise<IFetchUsersResult> =>
      fetch(
        `http://localhost:8000/users?_page=${currentPage}&_limit=${PAGE_SIZE}`
      ).then(async (res) => {
        const totalCount = +(res.headers.get("X-Total-Count") ?? 0);

        const totalPages = 5;
        console.log(totalPages);

        const d = await res.json();
        return {
          totalCount,
          users: d,
          totalPages,
        };
      }),
    placeholderData: keepPreviousData,
  });
  return {
    ...queryInfo,
    data: queryInfo.data?.users,
    count: queryInfo.data?.totalCount,
    totalPages: queryInfo.data?.totalPages,
  };
};
