import knex from "knex";
import moment from "moment";

const db = knex({
  client: "",
  connection: {
    host: "",
    user: "",
    password: "",
    database: "",
    timezone: "UTC",
    typeCast: function (field: any, next: any) {
      if (field.type == "DATETIME") {
        return moment(field.string()).format("YYYY-MM-DD HH:mm:ss");
      }
      return next();
    },
  },
  useNullAsDefault: true,
});

export default db;
