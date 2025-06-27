import {Footer} from '@/components';
import {login} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {Helmet, history, Link, useModel} from '@umijs/max';
import {message} from 'antd';
import {createStyles} from 'antd-style';
import React from 'react';
import {flushSync} from 'react-dom';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      values.redirectUrl = urlParams.get('redirect_url') ?? undefined;
      const loginResponse = await login({ ...values });
      if (loginResponse.code === 20000) {
        if (loginResponse?.data?.redirectUrl) {
          // 跳转回原系统
          window.location.href = loginResponse?.data?.redirectUrl;
        } else {
          message.success(loginResponse.message);
          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        }
      } else {
        message.error(loginResponse.description);
      }
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  const getRegisterLink = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect_url');
    const registerPath = '/user/register';
    if (redirectUrl) {
      return `${registerPath}?redirect_url=${encodeURIComponent(redirectUrl)}`;
    }
    return registerPath;
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>欢迎登录</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="欢迎登录"
          subTitle={"用户中心"}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码至少为8位',
                  },
                ]}
              />
            </>
          }
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <div
              style={{
                float: 'right',
                marginBottom: 24,
              }}
            >
              <Link to={getRegisterLink()}>没有账号？去注册</Link>
            </div>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
