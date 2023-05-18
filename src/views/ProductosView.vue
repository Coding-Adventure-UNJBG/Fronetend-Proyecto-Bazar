<template>
    <div class="productos p-5">
      <h1 class="text-center custom-tittle">Vista de Productos</h1>
      <form class="row g-3">
        <div class="col-md-5">
          <label for="inputbuscar" class="form-label custom-tittle">Buscar Producto</label>
          <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Ingrese el nombre para buscar..." >
          <button class="btn btn-secondary" type="button" id="inputbuscar"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        </div>
        </div>
        <div class="col-md-6 d-flex justify-content-start align-items-end">
          <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar">Nuevo Producto</button>
        </div>
      </form>
      <div class="col-12 table-responsive dimension-tabla">
        <table class="table table-bordered h-25">
          <thead>
            <tr class="table-secondary">
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Proveedor</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Unidad</th>
              <th scope="col">Estado</th>
              <th scope="col">Imagen</th>
              <th scope="col">Comentario</th>
              <th scope="col">Ver</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-light">
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>0</td>
              <td>1</td>
            </tr>
            <tr class="table-light">
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>0</td>
              <td>1</td>
            </tr>
            <tr class="table-light">
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>Tests</td>
              <td>0</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row p-3">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="input-group mb-3">
              <span class="input-group-text custom-tittle"> Total de Productos</span>
              <input type="text" class="form-control text-end" disabled value="124">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group mb-3">
              <span class="input-group-text custom-tittle"> Total de Unidades</span>
              <input type="text" class="form-control text-end"  disabled value="124">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group mb-3">
              <span class="input-group-text custom-tittle"> Ingreso Total S/.</span>
              <input type="text" class="form-control text-end"  disabled value="124.10">
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <style>
  .productos{
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
  }
  </style>
