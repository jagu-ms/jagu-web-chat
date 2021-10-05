const createError = require('http-errors');

exports.profile = (req, res, next) => {
    const user = req.user;
    user.name = req.body.name;
    user.about = req.body.about;
    user.avatar = req.file ? req.file.filename : user.avatar;
    
    user.save()

    .then(updated => {
        sendUpdatedUser(updated);
        res.json();
    })
    .catch(next);
};

const sendUpdatedUser = (user) => {
    io.emit('update_user', user.getData());
};

exports.password = (req, res, next) => {
    // Get old and new password from request.
    const {password, newPassword} = req.body;
    let user = req.user;
    // Check if the password is wrong then create error.
    if (!user.checkPassword(password)){
        return next(createError(401, "Password incorrect"));
    }
    // Update password.
    user.password = newPassword;
    user.save().then(updated => res.json()) 
    .catch(next);
};