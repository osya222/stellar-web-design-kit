
const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100" id="about">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">О нас</h2>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Наша компания работает напрямую с заказчиком, что существенно влияет на стоимость продукции. Нам не нужно тратить денежные средства на содержание розничного магазина и выплату заработной платы продавцам и грузчикам.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Сотрудничество с нами позволяет вам не только экономить на любимых деликатесах, но и получать продукцию в свежем виде.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Качество</h3>
              <p>Тщательный контроль на всех этапах доставки</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Надежность</h3>
              <p>10+ лет опыта работы с оптовыми поставками</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Сервис</h3>
              <p>Индивидуальный подход к каждому клиенту</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
