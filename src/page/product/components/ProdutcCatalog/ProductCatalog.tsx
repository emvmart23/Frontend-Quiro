// interface ProductCatalogProps {
//   products: Products[];
// }

export default function ProductCatalog() {
  return (
    <div
      className="px-8 py-12 bg-white flex flex-col items-center text-center min-h-[400px]"
    >
      <img src="src/assets/Logo.png" alt="Logo" className="w-30 h-32 mb-3" />{" "}
      {/* Reducido el margen inferior */}
      <div className="border-l-2 border-[#166E63] h-10 my-3"></div>{" "}
      {/* Color cambiado y margen ajustado */}
      <p className="max-w-md px-4">
        Encuentra los productos esenciales para complementar tu bienestar y
        potenciar los resultados de tu quiromasaje.
      </p>
    </div>
  );
}
