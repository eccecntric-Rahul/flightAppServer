import jwt from "express-jwt";

const requireSignIn= jwt({
        secret: process.env.SECRET_KEY,
        algorithms: ["HS256"],
        getToken: function fromHeaderOrQuerystring (req) {
          if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
              return req.headers.authorization.split(' ')[1];
          } else if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;
        }
});



export default requireSignIn;