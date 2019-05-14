/* eslint-disable react/prop-types */
import React from 'react';
import { List, Image } from 'semantic-ui-react';

const SearchResults = props => {
  const { data } = props;

  return (
    <>
      {data.userCount && (
        <div>
          <h3>Total Users found: {data.userCount}</h3>
        </div>
      )}
      {data.nodes && (
        <List divided>
          {data.nodes.map(({ node: githubUser }) => (
            <List.Item key={githubUser.id}>
              {githubUser.avatarUrl && (
                <Image src={`${githubUser.avatarUrl}`} alt={`${githubUser.name}'s avatar`} size="tiny" rounded />
              )}
              <List.Content>
                <List.Header>
                  <a href={githubUser.url} target="_blank" rel="noopener noreferrer">
                    {githubUser.login}
                  </a>
                </List.Header>
                <List.Description>
                  {githubUser.name}
                  <div>Followers: {githubUser.followers.totalCount}</div>

                  <div>Repositories: {githubUser.repositories.totalCount}</div>
                  <div>Location:{githubUser.location}</div>
                  <div>Bio: {githubUser.bio}</div>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
};

export default SearchResults;
