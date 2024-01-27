import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../helpers";
import { getIssueComments, getIssueInfo } from "../hooks/useIssue";
import { Issue, State } from "../interfaces";

interface Props {
  issue: Issue;
}

export const IssueItem: React.FC<Props> = ({ issue }) => {
  const { comments, user, title, state, number, created_at, labels } = issue;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", number],
      queryFn: () => getIssueInfo(number),
    });

    queryClient.prefetchQuery({
      queryKey: ["issue", number, "comments"],
      queryFn: () => getIssueComments(number),
    });
  };

  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue);
  };

  const onMouseEnter = () => {
    preSetData();
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
      onMouseEnter={onMouseEnter}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        {/* <FiInfo size={30} color="red" /> */}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened {timeSince(created_at)} by{" "}
            <span className="fw-bold">{user.login}</span>
          </span>

          <div>
            {labels.map((label) => (
              <span
                style={{
                  backgroundColor: `#${label.color}`,
                  color: "black",
                }}
                key={label.id}
                className="badge rounded-pill m-1"
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt={user.login} className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
