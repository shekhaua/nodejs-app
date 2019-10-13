const handleError = (error) => {
  console.log(error);
};

const logSuccess = (text = 'Success:') => {
  return (response) => {
    console.log(`${text}: >>>`, JSON.stringify(response, null, 4), '<<<');
    return response;
  }
};

module.exports = {
  logSuccess,
  handleError
};