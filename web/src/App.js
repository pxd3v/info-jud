import React from 'react';
import CustomForm from './components/CustomForm/CustomForm';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: '#282c34',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '75%',
    alignSelf: 'center',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 2px 4px #F2F2F2E6',
    opacity: 1,
    border: '0.5px solid #EBEBEBE6',
    marginTop: 20,
    marginBottom: 20
  },
  goBack: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    color: "#002856",
    flex: 1
  },
  goBackText: {
    fontSize: 20,
  },
  img: {
    width: '75%',
    marginTop: 20,
    alignSelf: 'center'
  },
  top: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '5px 0',
    borderBottom: '1px solid #eee',
  },
  topContainer: {
    width: '75%',
    display: 'flex'
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    margin: 0
  },
  listItem: {
    marginRight: 8
  }
})

const App = ( ) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.top}>
          <div className={classes.topContainer}>
              <a href="https://sindifes.org.br/" className={classes.link}>
                <div className={classes.goBackText}>
                  <Typography variant="h6">Voltar para Sindifes</Typography>
                </div>
              </a>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <a href="https://mg.cut.org.br/"><img src="https://sindifes.org.br/wp-content/themes/v1/assets/images/cut_pb.jpg" alt=""/></a>
                </li>
                <li>
                  <a href="https://fasubra.org.br/"><img src="https://sindifes.org.br/wp-content/themes/v1/assets/images/fasubra_pb.jpg" alt=""/></a>
                </li>
              </ul>
          </div>
      </div>
      <img src="https://sindifes.org.br/wp-content/uploads/2019/04/Capa-site-1-1140x200.png" className={classes.img} alt="Capa-site"/>
      <div className={classes.container}>
          <CustomForm />
      </div>
    </div>
  );
}

export default App;
