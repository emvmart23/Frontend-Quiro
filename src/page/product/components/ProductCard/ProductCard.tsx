import { useState } from "react";

interface ProductCardProps {
  products: {
    image: string;
    title: string;
    price: string;
    description: string;
  }[];
}

export default function ProductCard({ products }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
  });

  const [quantity, setQuantity] = useState(1);

  const openModal = (product: {
    image: string;
    title: string;
    price: string;
    description: string;
  }) => {
    setModalContent(product);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToWhatsApp = () => {
    const message = `Hola, me interesa cotizar el producto "${modalContent.title}" con cantidad: ${quantity}.`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-10">Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
        {products.map((product, index) => (
          <div
            key={index}
            className="rounded-xl shadow-md flex flex-col items-center w-full max-w-xs h-auto overflow-hidden p-4"
            style={{ backgroundColor: "#DBE4E4" }}
          >
            <div
              className="w-full flex justify-center bg-[#166E63] bg-opacity-26 p-4"
              style={{
                border: "2px solid #166E63",
                borderRadius: "10px",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-42 my-3"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{product.title}</h3>
            <p className="text-gray-600">{product.price}</p>
            <p className="text-sm text-gray-500 mb-3">{product.description}</p>
            <button
              className="w-full bg-white hover:bg-gray-100 text-[#166E63] font-bold py-2 px-4 rounded border border-[#166E63] hover:border-transparent mt-7"
              onClick={() => openModal(product)}
            >
              Cotizar producto
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            {}
            <div className="bg-[#166E63] text-white text-center font-bold py-3 rounded-t-lg">
              Información del producto
            </div>
            <button
              className="absolute top-3 right-3 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow hover:bg-gray-200"
              onClick={closeModal}
              style={{ color: "#166E63" }}
            >
              ✖
            </button>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={modalContent.image}
                  alt={modalContent.title}
                  className="w-20 h-25"
                />
                <h2 className="text-lg font-bold">{modalContent.title}</h2>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">Cantidad:</p>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 px-3 py-1 rounded-l"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    className="bg-gray-200 px-3 py-1 rounded-r"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-[#166E63] text-white font-bold py-2 px-4 rounded mb-3 hover:bg-[#135a4e]"
                onClick={redirectToWhatsApp}
              >
                Cotizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
