import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import useTheme from 'misc/hooks/useTheme';
import Typography from 'components/Typography';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

const getClasses = createUseStyles((theme) => ({
  buttons: {
    display: 'flex',
    gap: `${theme.spacing(1)}px`,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
    width: '300px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
}));

function LoginV2() {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = getClasses({ theme });

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography 
          align='center'
          variant='subTitle'
        >
          {formatMessage({ id: 'page.login.signInSinUp.title' })}
        </Typography>
        <div className={classes.buttons}>
          <GoogleLoginButton/>
        </div>
      </div>
    </div>
  );
}

export default LoginV2;
