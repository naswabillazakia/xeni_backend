const { user } = require("../repository/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/auth.jwt");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await user.create({
        username,
        email,
        password: hashPassword,
      });
      res.status(201).json({
        status: 201,
        message: "User successfully created",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },

  login: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: "Username or password is empty",
      });
    } 
    try {
      await user
        .findOne({
          where: {
            username: username,
          },
        })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              status: 400,
              message: "Username or password is wrong",
            });
          }

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return res.status(400).json({
                status: 400,
                message: "Username or password is wrong",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  username: user.username,
                  email: user.email,
                },
                jwtConfig.secret,
                {
                  expiresIn: "1h",
                },
              );

              req.session.token = token;

              return res.status(200).json({
                status: 200,
                message: "Login successfully",
                token: token,
              });
            }
            return res.status(400).json({
              status: 400,
              message: "Username or password is wrong",
            });
          });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },

  me: async (req, res) => {
    jwt.verify(req.session.token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }
      res.status(200).json({
        status: 200,
        message: "User successfully get",
        user: decoded,
      });
    });
  },

  logout : async (req, res) => {
    jwt.verify(req.session.token, jwtConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }
      req.session.destroy();
      res.status(200).json({
        status: 200,
        message: "Logout successfully",
      });
    });
  },
};
