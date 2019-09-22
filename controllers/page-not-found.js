const getPageNotFound = (rew, res) => {
  res.status(404).render('page-not-found', {docTitle: 'Page not found'});
};

module.exports = {
  getPageNotFound
};