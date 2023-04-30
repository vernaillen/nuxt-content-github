export interface Commit {
  oid: string
  message: string
  committedDate: string
  author: {
    name: string
    email: string
    date: Date
  };
}

export interface CommitsResponse {
  repository: {
    ref: {
      target: {
        history: {
          edges: Array<{
            node: Commit;
          }>;
        };
      };
    };
  };
}
