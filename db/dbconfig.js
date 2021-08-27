require('dotenv').config();

module.exports = {
    user: process.env.NODE_ORACLEDB_USER || '계정아이디',
    password: process.env.NODE_ORACLEDB_PASSWORD || '비밀번호',
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || '호스트이름/자신의 sid'
};