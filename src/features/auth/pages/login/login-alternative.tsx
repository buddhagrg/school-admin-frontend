import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const LoginAlternative = () => {
  const mainSite = import.meta.env.VITE_MAIN_SITE;
  const items = [
    {
      label: `Don't have an account?`,
      isLinkExternal: true,
      link: '/request-access',
      action: 'Request access'
    },
    {
      label: `Want to see how it works?`,
      isLinkExternal: true,
      link: '/book-demo',
      action: 'Book a demo'
    },
    {
      label: `Forgot your password?`,
      isLinkExternal: false,
      link: '/password-reset',
      action: 'Reset it'
    }
  ];

  return items.map(({ label, link, action, isLinkExternal }) => {
    const path = isLinkExternal ? mainSite + link : link;
    return (
      <Typography variant='body2' color='text.secondary' key={link} mb={1}>
        {label} {` `}
        <Link className='link-text' to={path}>
          {action}
        </Link>
      </Typography>
    );
  });
};
