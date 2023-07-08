import * as React from "react";
import Story from "./Story";

import { graphql } from "relay-runtime";
import { useFragment, useLazyLoadQuery } from "react-relay";
import type { NewsfeedFragment$key as NewsfeedFragmentType } from "./__generated__/NewsfeedFragment.graphql";

const NewsfeedFragment = graphql`
  fragment NewsfeedFragment on Query {
    topStories {
      id
      ...StoryFragment
    }
  }
`;

export default function Newsfeed({
  newsfeed,
}: {
  newsfeed: NewsfeedFragmentType;
}) {
  const data = useFragment<NewsfeedFragmentType>(NewsfeedFragment, newsfeed);

  const stories = data.topStories;

  return (
    <div className="newsfeed">
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  );
}
