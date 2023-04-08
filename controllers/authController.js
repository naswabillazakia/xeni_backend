const { user } = require("../repository/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
jwtConifg = require("../config/auth.jwt");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await user.create({
        username,
        email,
        password: hashedPassword,
      });
      if (newUser === 0) {
        res.status(400).json({
          message: "failed",
          data: "User not created",
        });
      }
      res.status(201).json({
        message: "succes",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "failed",
        data: `${error}`,
      });
    }
  },
  login: async (req, res) => {
    try {
      const userFind = await user.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!userFind) {
        res.status(400).json({
          message: "failed",
          data: "User not found",
        });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        userFind.password
      );
      if (validPassword) {
        const token = jwt.sign({ id: userFind.id }, jwtConifg.secret, { expiresIn: jwtConifg.expiresIn });
        res.status(200).json({
          message: "succes",
          data: {
            token: token,
            user: userFind,
          },
        });
      } else {
        res.status(400).json({
          message: "failed",
          data: "Password not valid",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "failed",
        data: `${error}`,
      });
    }
  },

  me: async (req, res) => {
    const checkToken = req.headers["authorization"];
    const token = checkToken && checkToken.split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: "failed",
        data: "Access token not found",
      });
    } else {
      try {
        const decoded = jwt.verify(token, jwtConifg.secret);
        const userFind = await user.findOne({
          where: {
            id: decoded.id,
          },
        });
        res.status(200).json({
          message: "succes",
          data: userFind,
        });
      } catch (error) {
        res.status(403).json({
          message: "failed",
          data: "Invalid token",
        });
      }
    }
  },

    logout: async (req, res) => {
      try {
        // get the token from the request header
        const token = req.headers.authorization.split(' ')[1];
    
        // verify the token and get the user id
        const decoded = jwt.verify(token, jwtConifg.secret);
        const userId = decoded.userId;
    
        // update the user's token in the database
        await user.update({ token: null }, { where: { id: userId } });
    
        res.status(200).send('Logout successful');
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }    
    } 
};
