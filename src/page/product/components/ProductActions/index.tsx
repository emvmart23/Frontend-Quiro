export default function ProductActions() {
  return (
    <div className="flex justify-center items-center h-75vh] bg-[]">
      <div
        className="w-full max-w-7xl mx-auto mt-0 p-4 rounded-lg shadow-lg bg-[#DBE4E4]"
      >
        {" "}
        <div className="flex items-center justify-between">
          {/* Texto "LOS MEJORES PRODUCTOS" */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-black">
              LOS MEJORES <span className="text-[#166E63]">PRODUCTOS</span>
            </h1>
          </div>

          {/* Imagen principal */}
          <img
            src="src/assets/Main image.png"
            alt="Model showing product"
            className="w-1/3 object-contain"
          />

          {/* Sección "NUEVA Crema hidratante" */}
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              {/* Línea verde */}
              <div className="w-1 h-10 bg-[#166E63] mr-2"></div>
              {/* Texto NUEVA */}
              <h2 className="text-xl font-bold text-black">NUEVA</h2>
            </div>
            {/* Texto Crema hidratante */}
            <h2 className="text-xl font-bold text-[#166E63]">
              Crema hidratante
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Descubre nuestra nueva crema, perfecta para todo tipo de piel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
