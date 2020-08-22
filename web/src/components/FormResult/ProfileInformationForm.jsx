import {
    makeStyles
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Input, Typography, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { api } from '../../api/api';

const useStyles = makeStyles({
    root: {
        textAlign: 'start',
        marginTop: 16,
        border: 'solid 1px #DDD',
        padding: 16,
        width: '85%'
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
        padding: 4,
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
        textAlign: 'center'
    },
    cpf: {
        display: 'flex'
    },
    cpfInput: {
        flex: 1
    }

})

const ProfileInformationForm = (props) => {
    const classes = useStyles()
    const [sent, setSent] = useState(false);
    const updateUserData = async (cpf, dataDeNascimento, email, celular) => {
        const response = await api({ method: 'POST', url: `/user/${props.siape}`, data: { cpf, dataDeNascimento, email, celular }});
        if(response.status === 204){
            setSent(true);
        }
    };
    const handleCloseSnackbar = () => {
        setSent(false);
    }

    return (
        <>
            <div className={classes.root}>
                <Snackbar open={sent} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleCloseSnackbar} severity="success" color="info">
                     Informações atualizadas com sucesso!
                    </Alert>
                </Snackbar>
                <Typography variant="h4" className={classes.formTitle}> Informações Pessoais </Typography>
                <Formik
                    initialValues={{ dataDeNascimento: '', email: '', cpf: '', celular: '' }}
                    validationSchema={Yup.object({
                        dataDeNascimento: Yup.date(),
                        email: Yup.string()
                            .email('Insira um formato de email válido.'),
                        cpf: Yup.string()
                            .matches("^[0-9]+$", "Apenas digitos são permitidos no cpf."),
                        celular: Yup.string()
                            .matches("^[0-9]+$", "Apenas digitos são permitidos no celular."),
                    })}
                    onSubmit={async ({ dataDeNascimento, email, cpf, celular }, { setSubmitting }) => {
                        setSubmitting(true);
                        props.setIsLoading(true);
                        await updateUserData(cpf, dataDeNascimento, email, celular);
                        props.setIsLoading(false);
                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, isSubmitting, errors, submitCount, touched, handleBlur }) => (
                        <Form className={classes.form}>
                            <div className={classes.formControl}>
                                <div className={classes.input}>
                                    <div className={classes.inputLabel}>
                                        <Typography>Data de nascimento</Typography>
                                        <Typography className={errors.dataDeNascimento && touched.dataDeNascimento && errors.dataDeNascimento ? classes.error : {}}>*</Typography>
                                    </div>
                                    <Input
                                        type="date"
                                        name="dataDeNascimento"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.dataDeNascimento}
                                        placeholder={'Digite a sua data de nascimento'}
                                        error={errors.dataDeNascimento && touched.dataDeNascimento && errors.dataDeNascimento}
                                    />
                                    <Typography className={classes.error}>
                                        {errors.dataDeNascimento && touched.dataDeNascimento && errors.dataDeNascimento}
                                    </Typography>
                                </div>
                                <div className={classes.input}>
                                    <div className={classes.inputLabel}>
                                        <Typography>Email</Typography>
                                        <Typography className={errors.email && touched.email && errors.email ? classes.error : {}}>*</Typography>
                                    </div>
                                    <Input
                                        type="text"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder={'Digite o seu email'}
                                        error={errors.email && touched.email && errors.email}
                                    />
                                    <Typography className={classes.error}>
                                        {errors.email && touched.email && errors.email}
                                    </Typography>
                                </div>
                                <div className={classes.input}>
                                    <div className={classes.inputLabel}>
                                        <Typography>Cpf</Typography>
                                        <Typography className={errors.cpf && touched.cpf && errors.cpf ? classes.error : {}}>*</Typography>
                                    </div>
                                    <Input
                                        type="text"
                                        name="cpf"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cpf}
                                        placeholder={'Digite o seu cpf'}
                                        error={errors.cpf && touched.cpf && errors.cpf}
                                    />
                                    <Typography className={classes.error}>
                                        {errors.cpf && touched.cpf && errors.cpf}
                                    </Typography>
                                </div>
                                <div className={classes.input}>
                                    <div className={classes.inputLabel}>
                                        <Typography>Celular</Typography>
                                        <Typography className={errors.celular && touched.celular && errors.celular ? classes.error : {}}>*</Typography>
                                    </div>
                                    <Input
                                        type="text"
                                        name="celular"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.celular}
                                        placeholder={'Digite o seu celular'}
                                        error={errors.celular && touched.celular && errors.celular}
                                    />
                                    <Typography className={classes.error}>
                                        {errors.celular && touched.celular && errors.celular}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.submmitButtonContainer}>
                                <div className={classes.submmitButton}>
                                    <button type="submit" disabled={isSubmitting} className={classes.button}>
                                        Enviar
                          </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default ProfileInformationForm;
