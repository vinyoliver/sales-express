module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('danger', 'Please Sign In.');
        res.redirect('/users/sign-in');
    }
}