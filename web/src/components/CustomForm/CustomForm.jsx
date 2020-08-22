import {
  makeStyles
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Input, Typography, LinearProgress } from '@material-ui/core';
import FormResult from '../FormResult/FormResult';
import { api } from '../../api/api';

const useStyles = makeStyles({
  root: {
    textAlign: 'start',
    margin: 16,
  },
  form: {
    padding: `8px 0 8px 0`,
  },
  formControl: {
    width: '100%',
    padding: `8px 0 8px 0`,
    display: 'flex',
    flexDirection: 'column'
  },
  adornment: {
    marginRight: -12,
  },
  iconButton: {
    padding:4,
  },
  rememberCheckboxContainer: {
    padding: `24px 0 24px 0`,
  },
  submmitButtonContainer: {
    display: 'flex',
    marginTop: 20
  },
  submmitButton: {
    flexGrow: 1,
    padding: `0 48px 0 48px`,
    '&>button': {
      margin: 0,
    },
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  inputLabel: {
    marginBottom: 8,
    display: 'flex'
  },
  error: {
    color: '#FF0000'
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
    width: '80%',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 12
  },
  cpf: {
    display: 'flex'
  },
  cpfInput: {
    flex: 1
  },
  formSubtitle: {
    marginTop: 12,
    marginBottom: 12
  }
  
})

const CustomForm = () => {
  const classes = useStyles()
  const [errorMessage, setErrorMessage] = useState('')
  const [messages, setMessages] = useState([]);
  const [sent, setSent] = useState(false);
  const [user, setUser] = useState({});
  const [userSiape, setUserSiape] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const loadData = async (siape, cpf) => {
    setErrorMessage('');
    const {data} = await api({method: 'GET', url: '/messages', params: {cpf, siape}});
    if(!data.errorMessage) {
      setMessages(data.messages);
      setUser(data.user);
      setUserSiape(siape);
    } else {
      setErrorMessage(data.errorMessage);
    }
    setSent(true);
  };


  return (
    <>
      <div className={classes.root}>
        <div style={{display: 'flex', flexDirection: 'column', borderBottom: 'solid 0.5px #EBEBEBE6', paddingBottom: 16}}>
          <Typography variant="h4" classes={{root: classes.formTitle}}><b>Sistema de Consulta para o Processo do PSS</b></Typography>
          <Typography variant="body1"> O SINDIFES está disponibilizando um sistema de consulta exclusiva para o Processo do PSS. Por meio dele é possível saber sua situação na causa e quais as orientações do Sindicato para o seu caso. As informações são individuais e apresentam a situação específica do consultante, independente do grupo em que ele estiver. É importante que os interessados em continuarem no processo cumpram com as orientações.</Typography>
          <Typography variant="h5" classes={{root: classes.formSubtitle}}><b>Processo do PSS</b></Typography>
          <Typography variant="body1">O objeto da ação foi o desconto indevido da contribuição social previdenciária (PSS) sobre o adicional de 1/3 das férias dos seus substituídos (filiados).</Typography>
          <Typography variant="body1">O processo foi ganho pelo Sindicato no ano de 2009 e a Justiça Federal ofereceu um acordo com um deságio de 10% para acelerar os pagamentos.</Typography>
          <Typography variant="h5" classes={{root: classes.formSubtitle}}><b>Quem tem direito a ação</b></Typography>
          <Typography variant="body1">Todos os servidores da base do SINDIFES que tiveram desconto do PSS sobre 1/3 de férias no período de março de 2004 a dezembro de 2012 e que estiverem com a documentação e requisitos cumpridos. Alguns casos será necessário pedido de inclusão ou nova ação.</Typography>
          <Typography variant="body1"><br/>Outras informações pelo email: juridico@sindifes.org.br</Typography>
        </div>
        <Formik
          initialValues={{ siape: '', cpf: '' }}
          validationSchema={Yup.object({
            siape: Yup.string()
              .required('Por favor insira sua matrícula SIAPE.')
              .max(7, 'Sua matrícula SIAPE pode ter no máximo até 7 caractéres.'),
            cpf: Yup.string()
              .required('Por favor insira um cpf.')
              .matches("^[0-9]+$", "Apenas dígitos são permitidos no cpf.")
              .max(6, 'Informe apenas os 6 dígitos do seu cpf a partir do quarto dígito.'),
          })}
          onSubmit={async ({ cpf, siape }, { setSubmitting }) => {
            setSubmitting(true);
            setIsSubmiting(true);
            await loadData(siape, cpf);
            setIsSubmiting(false);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, isSubmitting, errors, submitCount, touched, handleBlur }) => (
            <Form className={classes.form}>
                <div className={classes.formControl}>
                  <div className={classes.input}>
                    <div className={classes.inputLabel}>
                      <Typography variant="h6">Matrícula SIAPE</Typography>
                      <Typography classes={errors.siape && touched.siape && errors.siape ? {root: classes.error} : {}}>*</Typography>
                    </div>
                    <Input
                        type="text"
                        name="siape"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.siape}
                        required={true}
                        placeholder={'Digite a sua matrícula SIAPE'}
                        error={errors.siape && touched.siape && errors.siape}
                        />
                    <Typography className={classes.error}>
                      {errors.siape && touched.siape && errors.siape}
                    </Typography>
                  </div>
                  <div className={classes.input}>
                    <div className={classes.inputLabel}>
                      <Typography variant="h6">CPF</Typography>
                      <Typography classes={errors.cpf && touched.cpf && errors.cpf ? {root: classes.error} : {}}>*</Typography>
                    </div>
                    <div className={classes.cpf}>
                      <Typography variant="h5" >***.</Typography>
                      <Input
                        type="text"
                        name="cpf"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cpf}
                        required={true}
                        placeholder={'Informe seis dígitos do seu CPF a partir do quarto dígito'}
                        error={errors.cpf && touched.cpf && errors.cpf}
                        className={classes.cpfInput}
                        />
                      <Typography variant="h5">-**</Typography>
                    </div>
                    <Typography className={classes.error}>
                      {errors.cpf && touched.cpf && errors.cpf}
                    </Typography>
                  </div>
                </div>
                <div className={classes.submmitButtonContainer}>
                    <div className={classes.submmitButton}>
                        <button type="submit" disabled={isSubmitting} className={classes.button}>
                            Consultar
                        </button>
                    </div>
                </div>
            </Form>
          )}
        </Formik>
        {
         sent && <FormResult user={user} messages={messages} errorMessage={errorMessage} siape={userSiape} setIsLoading={(value) => setIsSubmiting(value)}/>
        }
      </div>
      {isSubmiting && <LinearProgress />}
    </>
  );
};

export default CustomForm;
