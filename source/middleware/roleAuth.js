const checkRole = (roles) => (req, res, next) => 
  !roles.includes(res.user.role) ? res.status(401).json({error: `Apologies, only ${roles}s can access this resource`}) : next()

export default checkRole