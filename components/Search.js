import React, { useState } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
// import ErrorMessage from './ErrorMessage';

const UserQuery = gql`
  query User($searchValue: String!) {
    search(type: USER, first: 10, query: $searchValue) {
      userCount
      edges {
        node {
          ... on User {
            name
            login
            avatarUrl
            bio
            followers {
              totalCount
            }
            repositories(first: 10) {
              totalCount
              nodes {
                stargazers(first: 10) {
                  totalCount
                }
              }
            }

            # following  {
            #   nodes {
            #     name
            #     login
            #   }
            # }
          }
        }
      }
      #     edges {
      #       node {

      #       }
      #     }
    }
  }
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleClick = async (e, client) => {
    console.log('current search term :', searchValue);

    const { data } = await client.query({
      query: UserQuery,
      variables: { searchValue },
    });

    console.log('data :', data);
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <ApolloConsumer>
      {client => (
        <>
          <div>
            <label htmlFor="userSearch">
              <input name="userSearch" type="text" placeholder="Search for a User" onChange={e => handleChange(e)} />
            </label>
          </div>
          <div>
            <button type="button" onClick={async e => handleClick(e, client)}>
              Search!
            </button>
          </div>
        </>
      )}
    </ApolloConsumer>
    // <Query query={UserQuery}>
    //   {({ data, loading, error }) => {
    //     if (error) return <div>Error: {error}</div>;
    //     if (loading) return <div>loading...</div>;

    //     const users = data.user;
    //   }}

    // </Query>
  );
};
export default Search;
