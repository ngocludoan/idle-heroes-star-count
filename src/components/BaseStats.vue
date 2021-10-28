<script setup lang="ts">
import { NButton } from "naive-ui";
</script>

<template>
  <div>
    <h2 class="text-3xl mb-3">Account information</h2>
    <h3 class="text-lg mb-3">Total material multiplier: 1</h3>

    <n-table :single-line="false" class="c-table">
      <tbody>
        <tr>
          <th>Hero Level</th>
          <td>10</td>
          <td>E1</td>
          <td>E2</td>
          <td>E3</td>
          <td>E4</td>
          <td>E5</td>
          <td>V1</td>
          <td>V2</td>
          <td>V3</td>
          <td>V4</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </n-table>
    <NButton class="mt-5 float-right">Setup</NButton>
    <p class="clear-right">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quis
      tempore sint numquam autem alias? Eius et in totam quaerat aliquid earum
      numquam, enim repellendus aliquam minus ab corrupti atque.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.c-table {
  tr {
    &::first-of-type {
      td {
        font-weight: bold;
      }
    }
  }
  td {
    text-align: center;
  }
}
</style>
