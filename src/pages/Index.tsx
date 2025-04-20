
import React from 'react'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DeliveryInfo from '@/components/home/DeliveryInfo'
import ProductGrid from '@/components/products/ProductGrid'
import Contacts from '@/components/home/Contacts'
import { Helmet } from 'react-helmet'

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Морепродукты оптом | Доставка по Москве и области</title>
        <meta name="description" content="Свежайшие морепродукты оптом от ведущих поставщиков. Доставка по Москве и области. Выгодные условия для оптовых покупателей." />
      </Helmet>

      <Header />
      <main>
        <Hero />
        <About />
        <ProductGrid />
        <DeliveryInfo />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
