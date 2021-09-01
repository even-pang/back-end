const menuList ="select a.*, (select count(*) from tb_menu where top_menu_no = a.menu_no and menu_lvl not in  (1,3)  and use_yn='Y') as child_cnt from tb_menu a where menu_gb = 'ADMIN' and use_yn = 'Y' order by top_menu_no, menu_lvl";

module.exports = {
    menuList,
}