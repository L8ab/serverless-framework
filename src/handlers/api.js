exports.handler = async (event) => {
  const { httpMethod, path, body } = event;
  
  try {
    let response;
    
    switch (httpMethod) {
      case 'GET':
        response = await handleGet(path);
        break;
      case 'POST':
        response = await handlePost(path, JSON.parse(body));
        break;
      default:
        response = { statusCode: 405, body: 'Method not allowed' };
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function handleGet(path) {
  return { message: 'GET request', path };
}

async function handlePost(path, data) {
  return { message: 'POST request', path, data };
}
