import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

function createClient({ headers }) {
  return new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: operation => {
      operation.setContext({
        headers: {
          ...headers,
          authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      });
    },
  });
}

export default withApollo(createClient);
