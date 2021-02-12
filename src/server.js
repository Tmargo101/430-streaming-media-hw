// Import Node Modules
const http = require('http');
const url = require('url');

// Import our libraries
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

// Set Server Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL Object
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/party.mp4': mediaHandler.getParty,
  notFound: htmlHandler.getIndex,
};

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${3000}`);
