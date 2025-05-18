const service = require('../service/UserService');
const User = require('../dbModel/UserSchema');
const { authentiCateToken } = require('../service/UserService');

const UserAuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            // Validate input
            if (!name || !email || !password || !role ) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' }); // ✅ 409 is the right status code
            }

            // Register the user using service
            const newUser = await service.registerUser({ name, email, password, role });

            return res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
            });

        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    login: async (req, res)=>{
        try{
            const { email, password } = req.body;

        

            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

        
            const token = await service.login({ email, password });

            if(token === "User not found"){
                return res.status(404).json({ message: 'User not found' });
            }

            if(token === "User is blocked"){
                return res.status(403).json({ message: 'User is blocked' });
            }

            if (!token) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Set the token in a cookie
            res.cookie('token', token, { 
                httpOnly: true,
                secure : process.env.NODE_ENV === 'production', // Set to true in production
                sameSite: "lax",

             });

             

            return res.status(200).json({
                message: 'User logged in successfully',
                token,
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    authentiCateToken: async (req, res)=>{
        try{
            const token = req.body.token;
            const authService = await service.authentiCateToken(token);

            if(authService === "No token provided"){
                return res.status(401).json({ message: 'No token provided' });
            }

            if(authService === "User not found"){
                return res.status(404).json({ message: 'User not found' });
            }

            if(authService === "Token is not valid"){
                return res.status(401).json({ message: 'Token is not valid' });
            }

        }catch(error){
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    authMiddleware: async (req, res, next)=>{
        try{
            const token = req.cookies.accessToken;
            if (!token) return res.status(401).json({ message: "Not logged in" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
        
            if (!user) return res.status(404).json({ message: "User not found" });
            if (user.isBlocked) return res.status(403).json({ message: "User is blocked", blocked: true });
        
            req.user = user;
            next();
        }catch(err){
            return res.status(401).json({
                message: "Invalid token"
            })
        }
    },

    getAlluser: async (req, res) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

       
            const { id } = req.query;
            


            if (!token || !id) {
              return res.status(400).json({ message: "Missing token or user ID" });
            }
        
            const userData = await User.findById(id);

            if (!userData) {
              return res.status(404).json({ message: "User not found" });
            }
        
            if (userData.role === "admin") {
            if(userData.token === token){
              const users = await service.getAllUsers();
              return res.status(200).json({ data: users });
            }
            } else {
              return res.status(200).json({ data: [], message: "Access restricted to admin users only" });
            }
        
          } catch (error) {
            console.error("Server error:", error);
            return res.status(500).json({ message: "Failed to fetch users" });
          }
        }        
      
    ,
    userBlockById: async (req, res) => {
        try {
            const id  = req.body.id; // or req.body, depending on your route

            
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            user.isBlocked = true;
            await user.save();
    
            return res.status(200).json({
                message: "User blocked successfully",
                user
            });
        } catch (error) {
            console.error(error); // helpful for debugging
            return res.status(500).json({
                message: "Error blocking user"
            });
        }
    }
    ,

    userUnBlockedById:async (req, res) => {
        try {
            const id  = req.body.id; // or req.body, depending on your route
    
            const user = await User.findById(id); // use findById for _id
    
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            user.isBlocked = false;
            await user.save();
    
            return res.status(200).json({
                message: "User blocked successfully",
                user
            });
        } catch (error) {
            console.error(error); // helpful for debugging
            return res.status(500).json({
                message: "Error blocking user"
            });
        }
    }
    ,

    checkuserblockOrnot: async(req, res)=>{


       
        const { id } = req.query;
        const user = await User.findById(id);
    
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

 
        
        return res.status(200).json({
            isBlocked: user.isBlocked
        });
    }
    
};

module.exports = UserAuthController;
