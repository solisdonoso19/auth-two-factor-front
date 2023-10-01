"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
export interface CountriesColumns {
  id: number;
  name: string;
  label: string;
}

export default function DashboardComponent() {
  const axios = require("axios");
  const [countries, setCountries] = useState([]);
  const columns: CountriesColumns[] = [
    {
      id: 1,
      name: "name.common",
      label: "Country",
    },
    {
      id: 2,
      name: "capital",
      label: "Capital",
    },
    {
      id: 3,
      name: "region",
      label: "Region",
    },
    {
      id: 4,
      name: "subregion",
      label: "Sub-Region",
    },
    {
      id: 5,
      name: "flag",
      label: "Flag",
    },
    {
      id: 6,
      name: "population",
      label: "Population",
    },
    {
      id: 7,
      name: "independent",
      label: "Is Indenpendent",
    },
  ];
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res: any) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    console.log(countries);
  }, [countries]);

  function obtenerValorPorRuta(objeto: any, ruta: string) {
    const partes = ruta.split("."); // Divide la cadena en partes
    let valor = objeto;

    for (const parte of partes) {
      if (valor && valor.hasOwnProperty(parte)) {
        valor = valor[parte];
      } else {
        valor = undefined;
        break;
      }
    }

    return valor;
  }

  return (
    <div className={styles.root}>
      <div className={styles.tableContainer}>
        <h1>Confidential Data - Countries of the world database</h1>
        <table className="table-auto">
          <thead>
            <tr>
              {columns.map((c: CountriesColumns) => {
                return <th key={"c" + c.id}>{c.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {countries.map((c: any) => {
              return (
                <tr key={c.idd.suffixes}>
                  {columns.map((c2: CountriesColumns) => {
                    const valor = obtenerValorPorRuta(c, c2.name);
                    return (
                      <td key={c2.label}>
                        {typeof valor === "boolean"
                          ? valor
                            ? "YES"
                            : "NO"
                          : valor}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
