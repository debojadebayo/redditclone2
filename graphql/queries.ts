import { gql } from "@apollo/client";


export const GET_SUBREDDIT_BY_TOPIC= gql`
    query SubredditQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic
            created_at 
            
    }
    }`