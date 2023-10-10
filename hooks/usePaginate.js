import { useState } from "react";

export default function usePaginate(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  function getPaginateProps({ total, pageSize, ...otherProps }) {
    return {
      total,
      pageSize,
      current: page,
      onChange: (page) => setPage(page),
      ...otherProps,
    };
  }
  return { page, setPage, getPaginateProps };
}
