import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Dimmer, Form, Icon } from 'semantic-ui-react';
import SearchResults from './SearchResults';
import { mapEdgesToNodes, PaginationNextQuery, PaginationPrevQuery, UserQuery } from '../lib/helpers';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async (client, query, variables) => {
    const { data, error, loading } = await client.query({
      query,
      variables,
    });

    return { data, error, loading };
  };

  const setDataInState = (data, loading) => {
    const searchNodes = mapEdgesToNodes(data.search);

    const searchData = {
      userCount: data.search.userCount,
      nodes: [...searchNodes],
    };

    setDataLoading(loading);
    setSearchResults(searchData);
    setPageInfo(data.search.pageInfo);
  };

  const handleSearchClick = async (e, client) => {
    e.preventDefault();

    setDataLoading(true);
    const { data, error, loading } = await getData(client, UserQuery, { searchValue });

    setDataInState(data, loading);
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handlePrevClick = async client => {
    if (!pageInfo.hasPreviousPage) return;

    setDataLoading(true);
    const { data, loading, error } = await getData(client, PaginationPrevQuery, {
      searchValue,
      cursorId: pageInfo.startCursor,
    });

    setDataInState(data, loading);
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = async client => {
    if (!pageInfo.hasNextPage) return;

    setDataLoading(true);
    const { data, loading, error } = await getData(client, PaginationNextQuery, {
      searchValue,
      cursorId: pageInfo.endCursor,
    });

    setDataInState(data, loading);
    setCurrentPage(currentPage + 1);
  };

  return (
    <ApolloConsumer>
      {client => (
        <>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Search for a User"
                type="text"
                onChange={e => handleChange(e)}
                loading={dataLoading}
              />
              <Form.Button secondary onClick={async e => handleSearchClick(e, client)}>
                Search!
              </Form.Button>
            </Form.Group>
          </Form>

          {searchResults && searchResults.nodes && (
            <div>
              <Dimmer.Dimmable dimmed={dataLoading}>
                <div>
                  <a
                    tabIndex="0"
                    role="link"
                    onKeyPress={async () => handlePrevClick(client)}
                    onClick={async () => handlePrevClick(client)}
                    disabled={!pageInfo.hasPreviousPage}
                  >
                    <Icon link name="angle left" color="black" disabled={!pageInfo.hasPreviousPage} />
                  </a>
                  Page: {currentPage} / {Math.ceil(searchResults.userCount / 10)}
                  <a
                    tabIndex="0"
                    role="link"
                    onKeyPress={async () => handleNextClick(client)}
                    onClick={async () => handleNextClick(client)}
                    disabled={!pageInfo.hasNextPage}
                  >
                    <Icon link name="angle right" color="black" disabled={!pageInfo.hasNextPage} />
                  </a>
                </div>
                <SearchResults data={searchResults} />
                <Dimmer inverted active={dataLoading} />
              </Dimmer.Dimmable>
            </div>
          )}
        </>
      )}
    </ApolloConsumer>
  );
};
export default Search;
