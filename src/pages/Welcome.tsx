import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { theme } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const {} = useModel('@@initialState');
  return (
    <PageContainer>
      <div
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            roc
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <a href="https://github.com/roc80/UserCenter">roc-UserCenter</a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
