import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Container as ModalContainer } from 'react-modal-promise';
import DefaultLayout from './layout/Default';
import Home from './pages/Home';
import Room from './pages/room/_index';
import RoomList from './pages/room/List';

const App = () => {
  const layoutInfo = {
    header: {
      title: '404toys'
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
      <ModalContainer />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/room/list" element={<RoomList />} />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
