import express from 'express';
import productos from './productos.js';

class Funciones {
    getSiguienteId = ( productos ) => {
      let ultimoId = 0
      productos.forEach(producto => {
        if (producto.id > ultimoId){
          ultimoId = producto.id
        }
      });
      return ++ultimoId
    }
}
const funciones = new Funciones()

const app = express();
const PORT = 8080;

const server = app.listen(PORT, ()=>{
  console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/productos/listar", (req, res) => {
    if (productos.length == 0) {
        return res.status(404).json({ error: "no hay productos cargados" });
      }
    res.json(productos);
  });
  
  app.get("/api/productos/listar/:id", (req, res) => {
    const { id } = req.params;
    const producto = productos.find((producto) => producto.id == id);
    if (!producto) {
        return res.status(404).json({ error: "producto no encontrado" });
      }
    res.json(producto);
});
  
app.post("/api/productos/guardar", (req, res) => {
    const newUser = {
      id: funciones.getSiguienteId(productos),
      ...req.body,
    };
    productos.push(newUser);
    res.status(201).json(newUser);
  });
