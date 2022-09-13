import React from 'react';
import {
  Navbar, Container, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

function Header() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const auth = useAuth();

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            {t('logo')}
          </Link>
        </Navbar.Brand>
        {auth.loggedIn
          ? <Button variant="danger" onClick={() => auth.logOut()}>{t('logout')}</Button>
          : null}
      </Container>
    </Navbar>
  );
}

export default Header;
