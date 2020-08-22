import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("tb_pss_interessado", (table) => {
    table.integer("int_id").primary();

    table
      .integer("prc_id")
      .references("prc_id")
      .inTable("tb_pss_processo")
      .notNullable();
      
    table
      .integer("grp_id")
      .references("grp_id")
      .inTable("tb_pss_grupo")
      .notNullable();

    table.string("int_nome", 60).notNullable();
    table.string("int_cpf", 11).notNullable();
    table.string("int_siape", 8).notNullable();
    table.integer("int_asscod");
    table.string("int_associado", 1).notNullable();
    table.string("int_situacao", 1).notNullable();
    table.decimal("int_vlr_inicial").notNullable();
    table.decimal("int_vlr_corrigido").notNullable();
    table.integer("int_qtd_meses").notNullable();
    table.string("int_sit_documento", 1).notNullable();
    table.string("int_sit_carta", 1).notNullable();
    table.string("int_sit_email", 1).notNullable();
    table.string("int_sit_processo", 1).notNullable();
    table.integer("int_idade").notNullable();
    table.date("int_dta_nascimento");
    table.string("int_observacao");
    table.string("int_email", 50);
    table.string("int_celular", 20);
    table.date("int_dta_acesso");
    

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("tb_pss_interessado");
}
