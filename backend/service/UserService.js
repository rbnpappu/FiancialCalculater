const user = require("../dbModel/UserSchema");
const financial_planning_data = require("../dbModel/Fiancial_Planning_Schema");
const jwt = require("jsonwebtoken");

const UserService = {
  async registerUser(userData) {
    try {
      const newUser = await user.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("Failed to register user");
    }
  },

  async login({ email, password }) {
    try {
      const registeredUser = await user.findOne({ email: email });

      if (!registeredUser) {
        return "User not found";
      }

      if (registeredUser.isBlocked) {
        return "User is blocked";
      }

      if (registeredUser) {
        if (registeredUser.password === password) {
          const token = jwt.sign(
            { id: registeredUser._id, role: registeredUser.role, name: registeredUser.name },
            process.env.JWT_SECRET
          );

          registeredUser.token = token;
          await registeredUser.save();

          return token;
        }
      }
    } catch (error) {
      throw new Error("Failed to Login");
    }
  },
  async authentiCateToken(token) {
    try {
      if (!token) {
        return "No token provided";
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await user.findById(decoded.id);
      if (!user) {
        return "User not found";
      }
      if (user.token !== token) {
        return "Token is not valid";
      }
      if (user.token === token) {
        return "Token is valid";
      }
    } catch (error) {
      return "Failed to authenticate token";
    }
  },
  async getAllUsers() {
    try {
      const users = await user.find();

      return users.filter((user) => user.role !== "admin");
    } catch (error) {
      return "Failed to fetch users";
    }
  },
  async getFinancialPlanningData(userId) {
    try {
      const financialData = await financial_planning_data.find({
        user: userId,
      });
      if (!financialData) {
        return "No data found";
      }
      return financialData;
    } catch (error) {
      return "Failed to fetch financial planning data";
    }
  },
};

module.exports = UserService;
