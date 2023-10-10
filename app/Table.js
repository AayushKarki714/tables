"use client";
import axios from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import usePaginate from "@/hooks/usePaginate";
import { useMembersList } from "@/hooks/member";
import Pagination from "@/components/Pagination";

export function getMembersList(params) {
  return async () => {
    const res = await axios.get("/members/members/", {
      params: {
        member_type: "founder",
        page_size: 10,
        ...params,
      },
    });
    return res.data;
  };
}

export default function Table() {
  let queryClient = useQueryClient();
  let { getPaginateProps, page } = usePaginate();
  let filters = { p: page };
  let { data, isPreviousData } = useMembersList(filters);

  // this works best if you have only prev and next buttons,
  useEffect(() => {
    if (!isPreviousData && data?.next) {
      queryClient.prefetchQuery({
        queryKey: ["members", "list", { p: page + 1 }],
        queryFn: getMembersList({ p: page + 1 }),
      });
    }
  }, [isPreviousData, data, queryClient, page]);

  return (
    <div>
      <div className="border">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SN</th>
              <th>Legal Name</th>
              <th>Sannyas Name</th>
              <th>Email</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.map(
              (
                { id, legal_name, sannyas_name, country_detail, email },
                index
              ) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{legal_name}</td>
                  <td>{sannyas_name || "---"}</td>
                  <td>{email || "---"}</td>
                  <td>{country_detail?.name || "---"}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-end">
          <Pagination
            {...getPaginateProps({
              total: data?.count,
              pageSize: 10,
            })}
          />
        </div>
      </div>
    </div>
  );
}
