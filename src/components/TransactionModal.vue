<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Nueva Transacción</h2>
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="tipoTransaccion">Tipo de Transacción</label>
            <select id="tipoTransaccion" v-model="form.tipoTransaccion" @change="handleTransactionTypeChange" required>
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
          </div>
          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="form.rol" @change="fetchUsuarios" required>
              <option v-if="form.tipoTransaccion === 'Ingreso'" value="Cliente">Cliente</option>
              <option v-if="form.tipoTransaccion === 'Ingreso'" value="Visitante">Visitante</option>
              <option v-if="form.tipoTransaccion === 'Egreso'" value="Colaborador">Colaborador</option>
              <option v-if="form.tipoTransaccion === 'Egreso'" value="Administrador">Administrador</option>
            </select>
          </div>
          <div class="form-group" v-if="form.rol !== 'Visitante'">
            <label for="nombreUsuario">Buscar Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              v-model="searchQuery"
              @input="filterUsuarios"
              placeholder="Escribe para buscar un usuario"
              autocomplete="off"
              required
            />
            <!-- Mostrar la lista solo si hay texto en el buscador -->
            <ul v-if="searchQuery && filteredUsuarios.length > 0" class="autocomplete-list">
              <li
                v-for="usuario in filteredUsuarios"
                :key="usuario.id"
                @click="selectUsuario(usuario)"
                class="autocomplete-item"
              >
                {{ usuario.nombre_usuario }}
              </li>
            </ul>
          </div>
          <div class="form-group">
            <label for="metodoPago">Método de Pago</label>
            <input type="text" id="metodoPago" v-model="form.metodoPago" required />
          </div>
          <div class="form-group">
            <label for="monto">Monto</label>
            <input type="number" id="monto" v-model="form.monto" required />
          </div>
          <div class="form-group">
            <label for="detalles">Detalles</label>
            <input type="text" id="detalles" v-model="form.detalles" required />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      form: {
        rol: "",
        nombreUsuario: "", // Este ahora almacenará el user_id
        metodoPago: "",
        monto: "",
        detalles: "",
        estatus: "Procesando",
        tipoTransaccion: "Ingreso",
      },
      usuarios: [], // Lista completa de usuarios obtenidos de la API
      filteredUsuarios: [], // Lista filtrada para el buscador
      searchQuery: "", // Texto ingresado en el buscador
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async fetchUsuarios() {
      if (this.form.rol && this.form.rol !== "Visitante") {
        try {
          const response = await api.obtenerUsuariosPorTransaccion(this.form.tipoTransaccion, this.form.rol);
          console.log("Usuarios obtenidos:", response);

          // Guardamos los objetos completos
          this.usuarios = response;
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
          this.usuarios = [];
        }
      } else {
        this.usuarios = [];
      }
    },
    filterUsuarios() {
      // Filtra los usuarios según el texto ingresado en el buscador
      const query = this.searchQuery.toLowerCase();
      this.filteredUsuarios = this.usuarios.filter((usuario) =>
        usuario.nombre_usuario.toLowerCase().includes(query)
      );
    },
    selectUsuario(usuario) {
      // Selecciona un usuario de la lista y actualiza el formulario
      this.form.nombreUsuario = usuario.id; // Guarda el ID del usuario
      this.searchQuery = usuario.nombre_usuario; // Muestra el nombre en el campo de búsqueda
      this.filteredUsuarios = []; // Limpia la lista de sugerencias
    },
    async submitForm() {
      try {
        const transaccionData = {
          tipo_transaccion: this.form.tipoTransaccion,
          usuario_id: this.form.nombreUsuario, // Aquí es el user_id
          metodo_pago: this.form.metodoPago,
          monto: parseFloat(this.form.monto),
          detalles: this.form.detalles,
          estatus: this.form.estatus,
        };

        console.log("Datos a enviar:", transaccionData);

        const response = await api.registrarTransaccion(transaccionData);
        console.log("Transacción registrada:", response);

        this.$emit("submit", transaccionData);
        this.closeModal();
      } catch (error) {
        console.error("Error al registrar transacción:", error);
      }
    },
    handleTransactionTypeChange() {
      this.form.rol = "";
      this.usuarios = [];
      this.filteredUsuarios = [];
      this.searchQuery = "";
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.form-container {
  max-height: 70vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
  position: relative; /* Añadido para posicionar correctamente la lista de autocompletado */
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd; /* Añadido para mejor visibilidad */
  border-radius: 4px; /* Añadido para consistencia */
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Hacer que el botón ocupe todo el ancho */
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.autocomplete-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  position: absolute;
  width: calc(100% - 2px); /* Ajuste para considerar el borde */
  z-index: 1000;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 100%; /* Posiciona la lista justo debajo del input */
  left: 0;
}

.autocomplete-item {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.autocomplete-item:last-child {
  border-bottom: none;
}

.autocomplete-item:hover {
  background-color: #f4f4f4;
}

/* Estilos adicionales para mejor visualización */
#nombreUsuario {
  width: calc(100% - 18px); /* Ajuste para padding y bordes */
}

/* Media query para pantallas pequeñas */
@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    padding: 15px;
  }
  
  .form-group input,
  .form-group select {
    padding: 10px;
  }
}
</style>