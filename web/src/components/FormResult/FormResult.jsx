import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import ProfileInformationForm from "./ProfileInformationForm";
import { api } from '../../api/api';

const useStyles = makeStyles({
  notificationContainer: {
    "& > p": {
      width: "100%",
    },
    "& svg": {
      minWidth: "16px",
      minHeight: "16px",
    },
    marginTop: 20,
    border: 'solid 0.5px #EBEBEBE6',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  messagesDisplay: {
    display: "flex",
    flexDirection: "column",
  },
  displayHeader: {
    display: "flex",
  },
  headerElement: {
    color: "#002856",
    width: "70%",
  },
  leftHeaderElement: {
    color: "#002856",
    width: "30%",
  },
  leftElement: {
    width: "30%",
  },
  element: {
    width: "70%",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  listItem: {
    marginTop: 8,
    borderTop: "0.5px solid #eee",
    paddingTop: 8,
  },
  button: {
    background: '#002856',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    border: 0,
    marginTop: 40,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    '&:hover': {
      background: '#406896',
    },
    padding: 12,
    width: '40%'
  }
});

const User = ({ name, value, groupId }) => {
  const [processo, setProcesso] = useState('');
  const [processIsLink, setProcessIsLink] = useState(false);
  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/grupo/${groupId}`);
      setProcesso(data.message);
      const re = /^\d$/;
      setProcessIsLink(re.test(data.message.split('')[0]));
    }
    load();

  }, [groupId]);

  return (
    <div style={{ borderBottom: 'solid 0.5px #EBEBEBE6', marginBottom: 8, width: '100%', paddingBottom: 'inherit' }}>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="h6" style={{ marginRight: 8 }}><b>Nome: </b></Typography>
        <Typography variant="body1">{name}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="h6" style={{ marginRight: 8 }}><b>Valor estimado a receber:</b></Typography>
        <Typography variant="body1">R$ {value}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography variant="h6" style={{ marginRight: 8 }}><b>Processo:</b></Typography>
        <Typography variant="body1">
          {
            processIsLink ?
              <a href="https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam" target="_blank" rel="noopener noreferrer" style={{ overflowWrap: 'anywhere' }}>
                {processo}
              </a>
              :
              <>
                {processo}
              </>
          }

        </Typography>
      </div>
    </div>
  );
};

const Messages = ({ messages, userExist }) => {
  const classes = useStyles();

  return (
    <div>
      {messages.length > 0 ? (
        <div className={classes.messagesDisplay}>
          <div className={classes.displayHeader}>
            <Typography
              variant="h6"
              classes={{ h6: classes.leftHeaderElement }}
            >
              Data
            </Typography>
            <Typography variant="h6" classes={{ h6: classes.headerElement }}>
              Assunto / Andamento
            </Typography>
          </div>
          <ul className={classes.list}>
            {messages.map(
              (m) =>
                m && (
                  <li key={m.id} className={classes.listItem}>
                    <div style={{ display: "flex" }}>
                      <Typography
                        variant="body1"
                        classes={{ body1: classes.leftElement }}
                      >
                        {m.data}
                      </Typography>
                      <Typography
                        variant="body1"
                        classes={{ body1: classes.element }}
                      >
                        <b>assunto</b>
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "30%" }}></div>
                      <Typography
                        variant="body1"
                        classes={{ body1: classes.element }}
                        style={{ overflowWrap: 'anywhere' }}
                      >
                        {m.texto}
                      </Typography>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      ) : userExist ? (
        <Typography color="error" variant="body1">
          Não existe nenhuma mensagem cadastrada para esse CPF.
        </Typography>
      ) : (
            <div></div>
          )}
    </div>
  );
};

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>
      {errorMessage && (
        <Typography color="error" variant="body1">
          <b>{errorMessage}</b>
        </Typography>
      )}
    </div>
  );
};

const FormResult = ({ user, messages, errorMessage, siape, setIsLoading }) => {
  const classes = useStyles();
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => { setOpenForm(!openForm) };
  const buttonMessage = openForm ? 'Fechar formulário' : 'Informe seus dados de contato para agilizar nossa comunicação!!!';
  return (
    <div className={classes.notificationContainer}>
      {errorMessage ?
        <ErrorMessage errorMessage={errorMessage} />
        :
        <>
          {user && <User name={user.int_nome} value={user.int_vlr_corrigido} groupId={user.grp_id} />}
          <Messages messages={messages} userExist={!!user} />
          <a target="_blank" rel="noopener noreferrer" href={user.int_associado === "S" ? "https://sindifes.org.br/recadastramento/" : "https://sindifes.org.br/filie-se/"}>
            <button className={classes.button} style={{ width: '100%', backgroundColor: 'tomato' }}>{user.int_associado === "S" ? "Ficha de recadastramento" : "Ficha de filiação"}</button>
          </a>
          <button onClick={handleOpenForm} className={classes.button} style={{overflowWrap: 'anywhere'}}>{buttonMessage}</button>
          {openForm &&
            <ProfileInformationForm siape={siape} setIsLoading={(value) => setIsLoading(value)}/>
          }
        </>
      }
    </div>
  );
};

export default FormResult;
