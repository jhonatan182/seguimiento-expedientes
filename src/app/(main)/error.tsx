"use client";

export default function Error() {
  return (
    <div className="bg-gray-100 px-2 text-center h-fit ">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-red-500">500</h1>
        <p className="text-4xl font-medium text-gray-800">
          Error al cargar la página
        </p>
        <p className="text-xl text-gray-800 mt-4">
          Lamentamos el inconveniente. Por favor, intente de nuevo más tarde.
        </p>
      </div>
    </div>
  );
}
