import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Issue, State } from "../interfaces";

interface Props {
  issue: Issue;
}

export const IssueItem: React.FC<Props> = ({ issue }) => {
  const { comments, user, title, state, number } = issue;

  const navigate = useNavigate();

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
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
            #{number} opened 2 days ago by{" "}
            <span className="fw-bold">{user.login}</span>
          </span>
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
