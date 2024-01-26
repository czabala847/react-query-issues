export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: Description | null;
}

export enum Description {
  Empty = "",
  PullRequestsThatUpdateADependencyFile = "Pull requests that update a dependency file",
}
