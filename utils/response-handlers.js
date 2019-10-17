const handleError = (error) => {
  console.log(error);
};

function objectPath(obj, path) {
  if(!path) { return obj; }
  path = path.split('.');
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (!obj) { return;}
  }
  return obj;
}

const logSuccess = (text = 'Success:', pathToSHowInConsole) => {
  return (response) => {
    console.log(`${text}: >>>`, JSON.stringify(objectPath(response, pathToSHowInConsole), null, 4), '<<<');
    return response;
  }
};

module.exports = {
  logSuccess,
  handleError
};