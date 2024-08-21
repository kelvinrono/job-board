const User = require("../models/User");

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findByPk(req.user.id, {
            attributes: ['name', 'email', 'profilePicture', 'bio'],
          });

          if (!user) {
            return res.status(404).json({message: "User not found", status: false});
        }



        res.status(200).json({ message: "user retrieved succesfully",data: user, status: true});
        
    } catch (error) {
        res.status(500).json({message: "Error getting profile", status: false});
        console.error("Am error occurred",error);
    }

}

exports.updateProfile = async (req, res) => {
    
    try {
        const user  = await User.findByPk(req.user.id)

        if (!user) {
            return res.status(404).json({message: "User not found", status: false});
        }

        const {name, profilePicture, bio, skills} = req.body
        user.name = name || user.name;
        user.profilePicture = profilePicture || user.profilePicture;
        user.bio = bio || user.bio;
        user.skills = skills || user.skills;

        await user.save();

        res.status(200).json({message: "Profile updated successfully", status: true});
        
    } catch (error) {
        res.status(500).json({message: "Error updating profile", status: false});
        console.log("Error updating profile", error);
        
    }
}

exports.deleteProfile = async (req, res) => {

    try {
        const {id} = req.params
        
        const user  = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({message: "User not found", status: false});
        }

        user.deleted = true;
        await user.save();

        res.status(200).json({message: "Profile deleted successfully", status: true});
        
    } catch (error) {
        res.status(500).json({message: "Error deleting profile", status: false});
        console.log("Error deleting profile", error);
        
    }
}