import express, { response } from "express";
import knex from "./database/connection";
const routes = express.Router();
import path from "path";
import {} from "moment";
interface MessagesRequestBody {
  siape: string;
  cpf: string;
}

interface UserRequestBody {
  email: string;
  cpf: string;
  celular: string;
  dataDeNascimento: Date;
  siape: string;
}

interface User {
  int_id: number;
  prc_id: number;
  grp_id: number;
  int_nome: string;
  int_cpf: string;
  int_siape: string;
  int_asscod: number;
  int_associado: string;
  int_situacao: string;
  int_vlr_inicial: number;
  int_vlr_corrigido: number;
  int_qtd_meses: number;
  int_sit_documento: string;
  int_sit_carta: string;
  int_sit_email: string;
  int_sit_processo: string;
  int_idade: number;
  int_dta_nascimento?: Date;
  int_observacao?: string;
  int_email?: string;
  int_celular?: string;
  int_dta_acesso?: Date;
  int_recadastrado: string;
}

routes.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "web", "build", "index.html"));
});

routes.get("/messages", async (req, res) => {
  const { siape, cpf } = req.query;
  const users: User[] = await knex("tb_pss_interessado")
    .where({ int_siape: siape })
    .select("*");
  if (users.length === 0) {
    return res.json({
      errorMessage:
        "Você não teve retenção do desconto do PSS sobre 1/3 de férias no período de março de 2004 a dezembro de 2012. Caso ainda tenha dúvidas entre em contato com o SINDIFES pelo email: juridico@sindifes.org.br.",
    });
  }
  const user = users[0];

  const formatedUserCpf = user.int_cpf.split("").splice(3, 6).join("");

  if (formatedUserCpf !== cpf) {
    return res.json({
      errorMessage:
        "Senha informada não confere. Informe seis dígitos do CPF a partir do quarto digito.",
    });
  }

  const messages = await knex("tb_pss_mensagem")
    .where({ prc_id: user.prc_id })
    .orWhere({ prc_id: 0 })
    .select("*");

  await knex("tb_pss_interessado")
    .where({ int_siape: siape, int_cpf: user.int_cpf })
    .update("int_dta_acesso", new Date());

  if (messages) {
    const parsedMessages = messages
      .filter((m) => m.msg_situacao === "S")
      .filter(
        (m) => m.msg_recadastrado === user.int_recadastrado || m.prc_id === 0
      )
      .filter((m) => m.msg_filiado === user.int_associado || m.prc_id === 0)
      .map((message) => {
        const dataObject = new Date(message.msg_data);
        const dateStringArray = dataObject
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
        return {
          id: message.msg_id,
          texto: message.msg_texto,
          data: dateStringArray,
        };
      })
      .sort(function (a, b) {
        const dateA = new Date(a.data);
        const dateB = new Date(b.data);
        return dateA.getTime() - dateB.getTime();
      });
    return res.json({ user, messages: parsedMessages });
  }
});

routes.post("/user/:siape", async (req, res) => {
  const { siape } = req.params;
  const { dataDeNascimento, cpf, celular, email } = req.body as UserRequestBody;
  const users = await knex("tb_pss_interessado")
    .where({ int_siape: siape })
    .select("*");
  await knex("tb_pss_interessado")
    .where({ int_siape: siape })
    .update({
      int_cpf: cpf ? cpf : users[0].int_cpf,
      int_celular: celular ? celular : users[0].int_celular,
      int_email: email ? email : users[0].int_email,
      int_dta_nascimento: dataDeNascimento
        ? dataDeNascimento
        : users[0].int_dta_nascimento,
    });
  return res.status(204).json({});
});

routes.get("/obs/:siape", async (req, res) => {
  const { siape } = req.params;
  const obs = await knex("tb_pss_interessado")
    .where({ int_siape: siape })
    .select("int_observacao");
  return res.json(obs[0]);
});

routes.get("/grupo/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const group = await knex("tb_pss_grupo")
    .where({ grp_id: groupId })
    .select("grp_num_justica");
  return res.json({ message: group[0].grp_num_justica });
});

routes.get("*", function (req, res) {
  res.redirect("/");
});

export default routes;
