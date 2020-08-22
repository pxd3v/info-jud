import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("tb_pss_mensagem", (table) => {
    table.integer("msg_id").primary();

    table
      .integer("prc_id")
      .references("prc_id")
      .inTable("tb_pss_processo")
      .notNullable();
    
    table.text("msg_texto").notNullable();
    table.date("msg_data").notNullable();    
    table.string("msg_situacao", 1).notNullable();    
    table.string("msg_destino", 1).notNullable();    
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("tb_pss_mensagem");
}
