import React from 'react';
import './Default.scss';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

const Default = (props = {}) => {
  const { children, layoutInfo = {} } = props;

  return (
    <div id="App">
      <div className="direct-link">
        <a href="#mainContent">본문 바로가기</a>
      </div>

      <Header {...layoutInfo.header} />
      <Content {...layoutInfo.content}>{children}</Content>
      <Footer {...layoutInfo.footer} />
    </div>
  );
};

export default Default;
