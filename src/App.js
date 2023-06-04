import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Container as ModalContainer } from 'react-modal-promise';
import DefaultLayout from './layout/Default';
import Home from './pages/Room';

const App = () => {
  const layoutInfo = {
    header: {
      title: '게임'
    },
    content: {
      title: '배틀 오름차순'
    },
    footer: {
      copyright: 'Copyright 404toys. All rights reserved.'
    }
  };

  return (
    <DefaultLayout layoutInfo={layoutInfo}>
      <h2>{layoutInfo.content.title}</h2>
      <ModalContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/gift/:id" element={<Gift />} />
        <Route path="/list" element={<List />} /> */}
      </Routes>
    </DefaultLayout>
  );
};

export default App;
