const getPageNotFound = (rew, res) => {
  res.status(404).render('ejs_404', {docTitle: 'Page not found'});
};

module.exports = {
  getPageNotFound
};