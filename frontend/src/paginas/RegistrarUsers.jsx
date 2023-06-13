import { Link } from "react-router-dom"

const RegistrarUsers = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl">
       Crea tu cuenta,{" "}
        <span className="text-slate-700">empieza encargando citas</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-5">

        <div className="my-5">
          <label
            className="uppercase text-gray-600 font-bold block text-xl"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="w-full my-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 font-bold block text-xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full my-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 font-bold block text-xl"
            htmlFor="password"
          >
            password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full my-2 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 font-bold block text-xl"
            htmlFor="password"
          >
            Repetir password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repetir tu password"
            className="w-full my-2 p-3 border rounded-xl bg-gray-50"
          />

          <input
            type="submit"
            value="Regístrate"
            className="bg-sky-700 w-full py-3 text-white uppercase rounded-lg font-bold mt-5 hover:cursor-pointer hover:bg-sky-950 transition-colors"
          />
        </div>

        
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm "
          to="/olvide-password"
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  )
}

export default RegistrarUsers