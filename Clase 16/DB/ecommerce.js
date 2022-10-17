const optionSqlite = {
    client: "sqlite3",
    connection:{
        filename: "./DB/myDB.sqlite"

    },
    useNullAsDefault: true
};

module.exports = { optionSqlite }