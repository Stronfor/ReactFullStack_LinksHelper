import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LinksPage } from './pages/LinksPage.js';
import { DetailPage } from './pages/DetailPage.js';
import { AuthPage } from './pages/AuthPage.js';
import { CreatePage } from './pages/CreatePage.js';

export const useRoutes = (isAuthenticated) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
            {/* Если пользователь авторизировался */}
          <Route path="/links" element={<LinksPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/create" />} />
        </>
      ) : (
        <>
            {/*  для не авторизированиго пользователя  */}
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};