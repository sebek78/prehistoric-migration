<script>
  export let map;
  const waterClassStyle = "field-water";
</script>

<style>
  .map {
    width: 360px;
    margin: 0 auto;
    border: 2px solid black;
    display: flex;
    flex-wrap: wrap;
  }
  .field {
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    background-color: greenyellow;
    text-align: center;
    border: 1px solid grey;
  }
  .field-water {
    background-color: skyblue;
  }
</style>

<div>Mapa</div>
<div class="map">
  {#each map.fields as field}
    <div class="field {field.water && waterClassStyle}">
      {`id: ${field.id}, (${field.x},${field.y})`}
    </div>
  {/each}
</div>
