import { getMembersList } from "@/app/Table";
import { useQuery } from "@tanstack/react-query";

export function useMembersList(filters) {
  return useQuery({
    queryKey: ["members", "list", filters],
    queryFn: getMembersList(filters),
    keepPreviousData: true,
  });
}
