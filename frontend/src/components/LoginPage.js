import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button, Form, Card, Container, Row, Col
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import useToast from '../hooks/toastHook.jsx';
import routes from '../routes';
import enterPic from '../imgs/enter_pic.png';

function LoginPage() {
  const [err, setErr] = useState('');
  const [authFailed, setAuthFailed] = useState(false);
  const toast = useToast();
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        setErr('');
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          toast.notify(t('network error'));
        }
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          setErr(error.message);
          return;
        }
        throw error;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">

                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={enterPic} alt={t('chatLogin')} />
                </Col>

                <Col>
                  <Card.Title className="text-center mb-5">
                    <h1>{t('login')}</h1>
                  </Card.Title>
                  <Form onSubmit={formik.handleSubmit} className="form-floating">
                    <Form.Group controlId="username" className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder={t('nickname')}
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={authFailed}
                        required
                        ref={inputRef}
                      />
                      <Form.Label>{t('nickname')}</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="username" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder={t('pass')}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label>{t('pass')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {err ? t(err) : null}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary">{t('login')}</Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('have not account')}
                  {' '}
                </span>
                <Link to="/signup">{t('registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;