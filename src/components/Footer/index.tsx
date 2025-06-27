import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/roc80',
          blankTarget: true,
        },
        {
          key: 'roc',
          title: 'Roc\'s Space',
          href: 'https://rocli.cn',
          blankTarget: true,
        },
      ]}
      copyright={'roc'}
    />
  );
};

export default Footer;
