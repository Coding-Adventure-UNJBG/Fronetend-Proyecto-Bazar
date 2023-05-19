<template>
  <div class="productos p-5">
    <h1 class="text-center custom-tittle">Ventas del Día</h1>
    <form class="row g-3">
      <div class="col-md-10 d-flex justify-content-start align-items-end">
        <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar">Nueva Venta</button>
      </div>
      <div class="col-md-2 d-flex justify-content-start align-items-end">
        <div class="row">
          <div class="col-md-6">
            <label for="inputbuscar" class="form-label custom-tittle">Año:</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" >
            </div>
          </div>
          <div class="col-md-6">
            <label for="inputbuscar" class="form-label custom-tittle">Mes:</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" >
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="col-12 table-responsive dimension-tabla">
      <table class="table table-bordered h-25">
        <thead>
          <tr class="table-secondary">
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha</th>
            <th scope="col">Tipo de Pago</th>
            <th scope="col">Cantidad de Productos</th>
            <th scope="col">Monto Total</th>
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
            <td>0</td>
            <td>1</td>
          </tr>
          <tr class="table-light">
            <th scope="row">2</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr class="table-light">
            <th scope="row">3</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr class="table-light">
            <th scope="row">4</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr class="table-light">
            <th scope="row">5</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr class="table-light">
            <th scope="row">6</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>Tests</td>
            <td>0</td>
            <td>1</td>
          </tr>
          <tr class="table-light">
            <th scope="row">7</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
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
            <span class="input-group-text custom-tittle"> Total de Ventas</span>
            <input type="text" class="form-control text-end" disabled value="2">
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group mb-3">
            <span class="input-group-text custom-tittle"> Unidades Vendidas</span>
            <input type="text" class="form-control text-end"  disabled value="26">
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group mb-3">
            <span class="input-group-text custom-tittle"> Total Monetario S/.</span>
            <input type="text" class="form-control text-end"  disabled value="11 245.230">
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
