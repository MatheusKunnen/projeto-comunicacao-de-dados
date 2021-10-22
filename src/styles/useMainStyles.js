import { makeStyles } from '@material-ui/core/styles';

const useMainStyles = makeStyles((theme) => ({
  homePageRoot: {
    width: '100vw',
    height: '100vh',
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  servidorPageRoot: {
    width: '10vw',
    height: '100vh',
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  clientePageRoot: {
    width: '100vw',
    height: '100vh',
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    background: '#FFF',
  },
  homePageBtnImg: {
    fontSize: '5rem',
    marginRight: '1rem',
  },
}));

export default useMainStyles;
