import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import Newsfeed from "./Newsfeed";
import LoadingSpinner from "./LoadingSpinner";
import Sidebar from "./Sidebar";
import { graphql } from "relay-runtime";
import type { AppQuery as AppQueryType } from "./__generated__/AppQuery.graphql";

const AppQuery = graphql`
  query AppQuery {
    viewer {
      ...SidebarQuery
    }
    topStories {
      ...NewsfeedFragment
    }
  }
`;

export default function App(): React.ReactElement {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});
  return (
    <RelayEnvironment>
      <React.Suspense fallback={<LoadingSpinner />}>
        <div className="app">
          <Newsfeed />
          <Sidebar />
        </div>
      </React.Suspense>
    </RelayEnvironment>
  );
}
