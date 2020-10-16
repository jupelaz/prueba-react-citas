import React, { useState } from "react";
import "./App.css";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

const App = () => {
  // Hooks de estado

  const [administrado, setAdministrado] = useState({
    tipoIdentificador: "",
    identificador: "",
    apellidos: "",
    nombre: "",
    codigoPais: "",
    numeroTelefono: "",
    correoElectronico: "",
    puestosTrabajo: "",
    empresa: "",
    centroTrabajo: "",
  });
  const [messages, setMessages] = useState();
  const [ventanaActual, setVentanaActual] = useState(1);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  //Validaciones

  const onChangeFormPaso1 = (e) => {
    setAdministrado({
      ...administrado,
      [e.target.id]: e.target.value,
    });
  };
  const onChangeFechaPaso2 = (e) => {
    setFechaSeleccionada(e.value);
  };

  //Navegacion

  const irAVentana1 = () => {
    setVentanaActual(1);
  };

  const irAVentana2 = () => {
    setVentanaActual(2);
  };

  // Renderizado

  return (
    <>
      {ventanaActual === 1 ? (
        <div className="paso1">
          <div className="tituloGeneralPantalla">
            <h3 className="textoTituloGeneralPantalla"> Cita Previa</h3>
          </div>
          <div className="subtituloGeneralPantalla">
            <h4>Paso 1</h4>
          </div>
          <h5>Datos de la persona destinataria del servicio</h5>
          <div className="p-field p-grid">
            <label
              htmlFor="lblTipoIdentificador"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Tipo Identificador
            </label>
            <div className="p-col">
              <InputText
                id="tipoIdentificador"
                type="text"
                value={administrado.tipoIdentificador}
                onChange={onChangeFormPaso1}
              />
            </div>
            <label
              htmlFor="lblIdentificador"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Identificador
            </label>
            <div className="p-col">
              <InputText
                id="identificador"
                type="text"
                value={administrado.identificador}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <div className="p-field p-grid">
            <label
              htmlFor="lblApellidos"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Apellidos
            </label>
            <div className="p-col">
              <InputText
                id="apellidos"
                type="text"
                value={administrado.apellidos}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <div className="p-field p-grid">
            <label
              htmlFor="lblNombre"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Nombre
            </label>
            <div className="p-col">
              <InputText
                id="nombre"
                type="text"
                value={administrado.nombre}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <h5>
            {" "}
            Le enviaremos una confirmación. Introduzca el número de teléfono
            móvil (obligatorio) y el correo electrónico (opcional){" "}
          </h5>
          <div className="p-field p-grid">
            <label
              htmlFor="lblCodigoPais"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Código Pais
            </label>
            <div className="p-col">
              <InputText
                id="codigoPais"
                type="text"
                value={administrado.codigoPais}
                onChange={onChangeFormPaso1}
              />
            </div>
            <label
              htmlFor="lblNumeroTelefono"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Número Telefono
            </label>
            <div className="p-col">
              <InputText
                id="numeroTelefono"
                type="text"
                value={administrado.numeroTelefono}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <h5> Datos del puesto de trabajo </h5>
          <div className="p-field p-grid">
            <label
              htmlFor="lblPuestosTrabajo"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Puestos de trabajo
            </label>
            <div className="p-col">
              <InputText
                id="puestosTrabajo"
                type="text"
                value={administrado.puestosTrabajo}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <div className="p-field p-grid">
            <label
              htmlFor="lblEmpresa"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Empresa
            </label>
            <div className="p-col">
              <InputText
                id="empresa"
                type="text"
                value={administrado.empresa}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <div className="p-field p-grid">
            <label
              htmlFor="lblCentroTrabajo"
              className="p-col-fixed"
              style={{ width: "100px" }}
            >
              Centro de trabajo
            </label>
            <div className="p-col">
              <InputText
                id="centroTrabajo"
                type="text"
                value={administrado.centroTrabajo}
                onChange={onChangeFormPaso1}
              />
            </div>
          </div>
          <Messages ref={(el) => setMessages(el)}></Messages>
          <Button label="Continuar" onClick={irAVentana2} />
        </div>
      ) : null}
      {ventanaActual === 2 ? (
        <div className="paso2">
          <h3> Cita Previa</h3>
          <h4>Paso 2</h4>
          <h5>Seleccione hora y fecha</h5>
          <p>{`${fechaSeleccionada}`}</p>
          <Calendar
            inline
            value={fechaSeleccionada}
            onChange={onChangeFechaPaso2}
          ></Calendar>
          <Messages ref={(el) => setMessages(el)}></Messages>

          <Button label="Anterior" onClick={irAVentana1} />
          <Button label="Continuar" onClick={irAVentana2} />
        </div>
      ) : null}
    </>
  );
};

export default App;
