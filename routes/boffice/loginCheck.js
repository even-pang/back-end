exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인이 필요합니다.');
        res.redirect(`/boffice?loginError=${message}`);
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('이미 로그인되었습니다.');
        res.redirect(`/boffice/menu/menuList?menu_no=64&error=${message}`);
    }
};