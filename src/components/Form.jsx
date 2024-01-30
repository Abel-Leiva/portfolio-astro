import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

import { useState } from "react";

import Loader from "./Loader.jsx";
const serviceId = "service_w1ivuru";
const templateId = "template_x1urdpx";
const publickey = "uDbWg3CSPOZhYDph2";
const Form = () => {
  const [visibleSpiner, setVisibleSpiner] = useState(false);
  const [templateParams, setTemplateParams] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const handleChangue = (event) => {
    const { name, value } = event.target;

    setTemplateParams({ ...templateParams, [name]: value });
  };

  const submit = (event) => {
    setVisibleSpiner(true);
    event.preventDefault();
    emailjs.send(serviceId, templateId, templateParams, publickey).then(
      (response) => {
        setVisibleSpiner(false);
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado con éxito!",
          text: "Recibirás una respuesta pronto. ¡Gracias!",
          color: "#1c1917",
          confirmButtonColor: "#65a30d",
          allowOutsideClick: false,
        });
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED...", err);
      }
    );

    setTemplateParams({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <section className="text-center">
      {visibleSpiner ? (
        <Loader />
      ) : (
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contacto
          </h2>
          <form onSubmit={submit} className="space-y-8">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-zinc-200 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={templateParams.email}
                onChange={handleChangue}
                className="shadow-sm bg-gray-50 border focus:ring border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="tuemail@correo.com"
                name="email"
                required
              />
            </div>
            <div>
              <label
                for="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={templateParams.nombre}
                onChange={handleChangue}
                className="shadow-sm bg-gray-50 border focus:ring  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                placeholder="Nombre..."
                name="nombre"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows="6"
                value={templateParams.mensaje}
                onChange={handleChangue}
                className="block p-2.5 w-full text-sm text-gray-900 focus:ring bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Mensaje..."
                name="mensaje"
              ></textarea>
            </div>
            <button
              disabled={
                templateParams.nombre == "" &&
                templateParams.email == "" &&
                templateParams.mensaje == ""
              }
              type="submit"
              className={`   ${
                templateParams.nombre === "" ||
                templateParams.email === "" ||
                templateParams.mensaje === ""
                  ? "py-3 px-5 text-sm font-medium text-center text-zinc-300 rounded-lg bg-zinc-600 "
                  : "py-3 px-5 text-sm font-medium text-center text-zinc-200 rounded-lg bg-sky-700 sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-300 hover:bg-sky-800"
              }`}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Form;
