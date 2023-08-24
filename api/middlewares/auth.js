import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     // console.log(authHeader, "text")
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated!");
//   }
// };

// export const verifyTokenAndAuthorization = (req, res, next) => {
//   console.log(req.params.id, req.user.id)
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin === true ) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };


// Verify JWT token middleware
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC); // Replace with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Verify token and authorization middleware
export const verifyTokenAndAuthorization = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
  
    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SEC);
      console.log(decoded)
      
      // Check if the user ID is present in params or if the user is an admin
      if (req.params.userId === decoded.userId || decoded.isAdmin) {
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
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
