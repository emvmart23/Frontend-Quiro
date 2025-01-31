import React, { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-whithe-50 p-10">
      <h1 className="text-4xl font-semibold text-center mb-10" style={{ color: 'hsl(173, 67%, 26%)', fontFamily: 'Sora, sans-serif', fontSize: '40px' }}>
        CONTÁCTANOS
      </h1>

      <div className="mb-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.759051567578!2d-77.04281028556122!3d-12.046372991178007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d8a8d6ab25f%3A0xf5ab015406be84b!2sLima%2C%20Per%C3%BA!5e0!3m2!1ses!2sus!4v1642352054333!5m2!1ses!2sus"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          className="border-0 rounded-lg shadow-md"
        ></iframe>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ubicación</h3>
          <p className="text-gray-600 text-center">Avenida Siempre Viva, 123, Springfield</p>
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Email</h3>
          <p className="text-gray-600 text-center">contacto@empresa.com</p>
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Teléfono</h3>
          <p className="text-gray-600 text-center">(123) 456-7890</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
          <div className="w-full md:w-1/2 pr-8 mb-8 md:mb-0">
            <img
              src="https://i.pinimg.com/736x/89/d8/8f/89d88ffec53cdf2646ddf635c4560fc4.jpg"
              alt="Imagen de contacto"
              className="w-full h-100 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Número de Teléfono</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Escribe tu mensaje aquí"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-center">
              <button
  type="submit"
  className="w-full py-3 rounded-md transition duration-200 transform hover:scale-105 hover:bg-hsl(173, 67%, 26%)"
  style={{
    backgroundColor: 'hsl(173, 67%, 26%)',
    color: 'white',
  }}
>
  Enviar
</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-10 mt-16 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8" style={{ color: 'hsl(173, 67%, 26%)', fontFamily: 'Sora, sans-serif', fontSize: '40px' }}>
          Síguenos en Instagram
        </h2>

        <div className="grid grid-cols-5 gap-0">
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 1"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 2"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 3"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 4"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 5"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 6"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 7"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 8"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 9"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/3e/a1/dc/3ea1dca4569e6c88bba8dbf47b1c8883.jpg"
              alt="Integrante 10"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;