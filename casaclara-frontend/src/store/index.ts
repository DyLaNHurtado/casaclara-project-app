import { defineStore } from "pinia";
import type { Anuncio } from "../types/anuncio";

export const useAdStore = defineStore("adStore", {
  state: () => ({
    ads: [] as Anuncio[],
  }),
  actions: {
    fetchAds() {
      // Aquí puedes conectar con una API
      this.ads = [
        {
            id: 1, nombre: "Anuncio 1", categoria: "Inmuebles", precio: 100000,
            telefono: "",
            tipo: "particular",
            ubicacion: "",
            coordenadas: { lat: 0, lng: 0 },
            fotos: [],
            descripcion: ""
        },
      ];
    },
  },
});
