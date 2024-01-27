import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces";

const getIssues = async (): Promise<Issue[]> => {
  try {
    const { data } = await githubApi.get<Issue[]>("/issues");
    return data;
  } catch (error) {
    return [];
  }
};

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  return {
    issuesQuery,
  };
};
