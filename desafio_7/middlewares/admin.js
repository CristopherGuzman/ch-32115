module.exports = adminAuth = (req, res, next) => req.body.admin ? next() : res.json({Error: 'Not authorized'})
