import { Link } from "react-router-dom"
const NuevoPassword = () => {
  return (
    <>
    <h1 className="text-sky-600 font-black text-4xl">
     Restablece tu password,{" "}
      <span className="text-slate-700">hay citas que te esperan</span>
    </h1>
    <form className="my-10 bg-white shadow rounded-lg p-5">


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

        
      </div>

      <input
          type="submit"
          value="Resetea tu password"
          className="bg-sky-700 w-full py-3 text-white uppercase rounded-lg font-bold mt-5 hover:cursor-pointer hover:bg-sky-950 transition-colors"
        />

      
    </form>

  
  </>
  )
}

export default NuevoPassword