import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue, State } from "../interfaces";

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  try {
    await sleep(2);

    const params = new URLSearchParams();

    if (state) params.append("state", state);

    if (labels.length > 0) {
      const labelString = labels.join(",");
      params.append("labels", labelString);
    }

    params.append("page", "1");
    params.append("per_page", "5");

    const { data } = await githubApi.get<Issue[]>("/issues", { params });
    return data;
  } catch (error) {
    return [];
  }
};

interface Props {
  state?: State;
  labels: string[];
}

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels }],
    queryFn: () => getIssues(labels, state),
  });

  return {
    issuesQuery,
  };
};
