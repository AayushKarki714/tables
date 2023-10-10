import axios from "@/utils/axios";
import Table from "./Table";

export const metadata = {
  title: "Tables",
};

export default async function Home() {
  const members = await getMembersList()();
  return <Table initialData={members} />;
}

export function getMembersList() {
  return async () => {
    const res = await axios.get("/members/members/", {
      params: {
        member_type: "founder",
        page_size: 10,
      },
    });
    return res.data;
  };
}
