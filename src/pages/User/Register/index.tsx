import {Footer} from '@/components';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {FormattedMessage, history, SelectLang, useIntl, useModel, Helmet, Link} from '@umijs/max';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import {createStyles} from 'antd-style';
import {Alert, Form, message} from "antd";

const useStyles = createStyles(({token}) => {
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

const Lang = () => {
  const {styles} = useStyles();

  return (
    <div className={styles.lang} data-lang="">
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.RegisterResult>({
    id: 1,
    msg: ''
  });
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  useIntl();
  const [form] = Form.useForm();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      // 登录
      const result = await register({...values});
      if (result.id && result.id > 0) {
        const defaultRegisterSuccessMessage = result.msg;
        message.success(defaultRegisterSuccessMessage);
        console.log(result);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(result);
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };
  const {id, msg} = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          roc
        </title>
      </Helmet>
      <Lang/>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          form={form}
          submitter={
            {
              searchConfig: {
                submitText: '注册',
              },
            }
          }
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.jpg"/>}
          title="roc"
          subTitle={'roc\'s demo'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          {id <= 0 && (
            <LoginMessage
              content={msg}
            />
          )}
          {(
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码至少为8位'
                  },
                ]}
              />
              <ProFormText.Password
                name="repeatPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请再次输入密码！"
                      />
                    ),
                  },
                  {
                    validator: (_, value) => {
                      if (!value || form.getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    },
                  },
                ]}
              />
            </>
          )}
          <div>
            <a style={{
              float: 'right',
            }}>
              <Link to="/user/login">已有账号？点击登录</Link>
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
