$(document).ready(function() {
  $("#tabla").DataTable({
    pageLength: 5,
    pagingType: "numbers"
  });
});

var userId = JSON.stringify(moment().format());

var app = new Vue({
  el: "#app",
  data: {
    usuarios: [],
    persona: {
      id: userId,
      nombre: "",
      fechaNac: "",
      edad: "",
      sexo: "",
      email: ""
    },
    dateString: "1983/30/12",
    miStorage: localStorage
  },
  methods: {
    guardarUsuario: function() {
      var today = new Date();
      var birthDate = new Date(app.persona.fechaNac);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.persona.edad = age;
      var forms = document.getElementsByClassName("needs-validation");
      Array.prototype.filter.call(forms, function(form) {
        form.addEventListener("submit", function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            localStorage.setItem(app.persona.id, JSON.stringify(app.persona));
            app.usuarios.push(JSON.stringify(app.persona));
          }
          form.classList.add("was-validated");
        });
      });
    },
    leerLocalStorage: function() {
      (elements = Object.keys(localStorage)), (i = elements.length);
      while (i--) {
        this.usuarios.push(JSON.parse(localStorage.getItem(elements[i])));
      }
    },
    borrarUsuario: function(id) {
      localStorage.removeItem(id);
    },
    modificarUsuario: function(id) {
      document.querySelector(".popUp").style.display = "flex";
      this.persona = JSON.parse(localStorage.getItem(id));
      //console.log (this.persona);
    },
    cargarUsuario: function() {
      document.querySelector(".popUp").style.display = "flex";
    },
    cancelarBtn: function() {
      document.querySelector(".popUp").style.display = "none";
      var forms = document.getElementsByClassName("needs-validation");
      Array.prototype.filter.call(forms, function(form) {
        form.addEventListener("reset", function() {
          form.classList.remove("was-validated");
        });
      });
    }
  }
});

this.app.leerLocalStorage();
