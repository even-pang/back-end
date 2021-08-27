const menuList = "select * from tb_menu where menu_gb = 'ADMIN' and use_yn = 'Y' order by top_menu_no, menu_lvl,ord";

module.exports = {
    menuList,
}