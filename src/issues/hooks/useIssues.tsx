import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue, State } from "../interfaces";

interface PropsUseIssues {
  state?: State;
  labels: string[];
}

interface PropsGetIssues extends PropsUseIssues {
  page: number;
}

const getIssues = async ({
  labels,
  page,
  state,
}: PropsGetIssues): Promise<Issue[]> => {
  try {
    await sleep(2);

    const params = new URLSearchParams();

    if (state) params.append("state", state);

    if (labels.length > 0) {
      const labelString = labels.join(",");
      params.append("labels", labelString);
    }

    params.append("page", page.toString());
    params.append("per_page", "5");

    const { data } = await githubApi.get<Issue[]>("/issues", { params });
    return data;
  } catch (error) {
    return [];
  }
};

export const useIssues = ({ state, labels }: PropsUseIssues) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels, page }],
    queryFn: () => getIssues({ labels, page, state }),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  return {
    //Props
    issuesQuery,

    //getters
    page: issuesQuery.isFetching ? "loading" : page,

    //methods
    nextPage,
    prevPage,
  };
};
