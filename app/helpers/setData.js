const graphQLAPI = 'http://localhost:8055/graphql';

const setData = async (mutation, data = {}, additionalPath = '') => {
  const query = JSON.stringify({
    query: mutation,
    variables: data,
  });

  const response = await fetch(`${graphQLAPI}${additionalPath}`, {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: query,
  });

  const responseJson = await response.json();
  return responseJson.data;
};

export default setData;
