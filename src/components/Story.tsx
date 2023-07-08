import * as React from "react";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline, { type Props as PosterBylineProps } from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import Timestamp from "./Timestamp";
import { graphql } from "relay-runtime";
import type { StoryFragment$key } from "./__generated__/StoryFragment.graphql";
import { useFragment } from "react-relay";

type Props = {
  story: StoryFragment$key;
};

const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    poster {
      ...PosterBylineFragment
    }
    thumbnail {
      url
    }
  }
`;

export default function Story({ story }: Props): React.ReactElement {
  const data = useFragment(StoryFragment, story);

  return (
    <Card>
      <Heading>{data.title}</Heading>
      <PosterByline poster={data.poster} />
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
    </Card>
  );
}
