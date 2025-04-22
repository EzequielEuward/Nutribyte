// THUNK DE COBRO
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_COBRO = "https://localhost:7041/api/Cobros";
const API_USUARIO = "https://localhost:7041/api/Usuarios";

export const listarCobros = createAsyncThunk(
    'cobro/fetchCobrosConUsuario',
    async (_, { rejectWithValue }) => {
        try {
            const responseCobros = await axios.get(API_COBRO);
            const cobros = responseCobros.data;

            const responseUsuarios = await axios.get(API_USUARIO);
            const usuarios = responseUsuarios.data;

            const cobrosConUsuario = cobros.map((cobro) => {
                const usuario = usuarios.find((u) => u.idUsuario === cobro.usuarioId);
                return {
                    ...cobro,
                    usuario: usuario || {
                        username: "Desconocido",
                        persona: { nombre: "No encontrado" }
                    }
                };
            });

            return cobrosConUsuario;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const crearCobro = createAsyncThunk(
    'cobro/crearCobro',
    async (nuevoCobro, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_COBRO, {
                ...nuevoCobro,
                monto: Number(nuevoCobro.monto),
                usuarioId: Number(nuevoCobro.usuarioId),
                impuestos: Number(nuevoCobro.impuestos),
                descuento: Number(nuevoCobro.descuento),
                total: Number(nuevoCobro.total)
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const actualizarCobro = createAsyncThunk(
    'cobro/actualizarCobro',
    async (cobroActualizado, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_COBRO}/${cobroActualizado.cobroId}`,
                {
                    ...cobroActualizado,
                    monto: Number(cobroActualizado.monto),
                    usuarioId: Number(cobroActualizado.usuarioId),
                    impuestos: Number(cobroActualizado.impuestos),
                    descuento: Number(cobroActualizado.descuento),
                }
            );
            console.log("LA DATA WACHO ES ESTA" + response.data)
            return response.data;
        } catch (error) {
            console.error("Error en el thunk actualizarCobro:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const eliminarCobro = createAsyncThunk(
    'cobro/eliminarCobro',
    async (cobroId, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_COBRO}/${cobroId}`);
        return { cobroId };
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );