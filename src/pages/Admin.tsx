
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Администрирование | МореПродукт</title>
      </Helmet>
      
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>
            <div className="p-4 border rounded-md bg-yellow-50 text-amber-700">
              <p>Функционал административной панели находится в разработке.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
