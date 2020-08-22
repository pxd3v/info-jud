import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("tb_pss_grupo", (table) => {
    table.integer("grp_id").primary();

    table
      .integer("prc_id")
      .references("prc_id")
      .inTable("tb_pss_processo")
      .notNullable();
    
    table.string("grp_clientela", 100).notNullable();
    table.string("grp_situacao", 1).notNullable();
    table.string("grp_link").notNullable();
    table.string("grp_num_justica", 50).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("tb_pss_grupo");
}
