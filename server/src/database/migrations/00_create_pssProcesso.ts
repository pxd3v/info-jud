import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("tb_pss_processo", (table) => {
    table.integer("prc_id").primary();
    table.string("prc_causa", 100).notNullable();
    table.string("prc_num_justica", 50).notNullable();
    table.string("prc_link").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("tb_pss_processo");
}
