import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(authHeader, "text")
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  console.log(req.params.id, req.user.id)
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin === true ) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).json("You are not an admin.");
    }
  });
};
