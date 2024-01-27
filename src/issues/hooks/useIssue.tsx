import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

export const getIssueInfo = async (
  issueNumber: number
): Promise<Issue | null> => {
  try {
    await sleep(2);
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
  } catch (error) {
    return null;
  }
};

export const getIssueComments = async (
  issueNumber: number
): Promise<Issue[]> => {
  try {
    await sleep(2);
    const { data } = await githubApi.get<Issue[]>(
      `/issues/${issueNumber}/comments`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  const commentsQuery = useQuery({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  });

  return {
    commentsQuery,
    issueQuery,
  };
};
