import gql from 'graphql-tag';

export const UserQuery = gql`
  query User($searchValue: String!) {
    search(type: USER, first: 10, query: $searchValue) {
      userCount
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            id
            name
            login
            avatarUrl
            bio
            url
            location
            followers {
              totalCount
            }
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const PaginationNextQuery = gql`
  query PaginationNextQuery($searchValue: String!, $cursorId: String!) {
    search(type: USER, first: 10, after: $cursorId, query: $searchValue) {
      userCount
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            id
            name
            login
            avatarUrl
            bio
            url
            location
            followers {
              totalCount
            }
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const PaginationPrevQuery = gql`
  query PaginationPrevQuery($searchValue: String!, $cursorId: String!) {
    search(type: USER, last: 10, before: $cursorId, query: $searchValue) {
      userCount
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            id
            name
            login
            avatarUrl
            bio
            url
            location
            followers {
              totalCount
            }
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => ({
    cursor: edge.cursor,
    node: edge.node,
  }));
}
