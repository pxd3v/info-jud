import path from "path";
import moment from 'moment';

module.exports = {
  client: "",
  connection: {
    host: "",
    user: "",
    password: "",
    database: "",
    timezone: 'UTC',
    typeCast: function (field: any, next: any) {
      if (field.type == 'DATETIME') {
        return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
      }
      return next();
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    useNullAsDefault: true,
  };
