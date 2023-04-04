const user = require("../repository/model/user");

module.exports = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bycrypt.hash(req.body.password, 10);
      console.log("registered hashed password: ", hashedPassword);
      await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        profileUrl: req.body.profileUrl,
      });
      res.status(201).json({
        status: 201,
        message: "User registered succcesfully!",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
  login: async (req, res) => {
    try {
      const user = await users.findOne({
        where: {
          email: req.body.email,
        },
      });
      const email = user.email;
      const password = req.body.password;
      const hashedPassword = user.password;
      const match = await bycrypt.compare(password, hashedPassword);
      if (!match) {
        return res.status(401).json({
          status: 401,
          message: "The password did not match",
        });
      }

      const token = jwt.sign(
        { email },
        "fb6c8c05f15329aece60fb2e49773f96ab2e0c04e0770bda0c797c0e7119616fff9ce7673eda0602193819b14d8503cf92c9313cfaee6029546c0d3cba67ae7b"
      );

      res.status(200).json({
        status: 200,
        message: "Login success",
        user: {
          username: user.username,
          email: user.email,
          profileUrl: user.profileUrl
        },
        token: token
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Server error.",
      });
    }
  },
};