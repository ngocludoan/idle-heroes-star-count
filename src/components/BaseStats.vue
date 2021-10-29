<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { NButton } from "naive-ui";
import heroes from "../data/heroes.json";
import resources from "../data/resources.json";

interface IHero {
  name: string;
  amount: number;
  multiplier: number;
  multiplier2: number;
}

const hero_stat = ref([...heroes]);

const hero_sum = computed((): number => {
  let count = 0;

  for (const key in hero_stat.value) {
    count += Number((hero_stat.value as any)[key].amount);
  }

  return count;
});

const v4 = hero_stat.value[9];

const hero_multiplier = computed((): number => {
  let sum = 0;
  let count = 0;
  for (const key in hero_stat.value) {
    const amout = Number((hero_stat.value as any)[key].amount);
    const multiplier = Number((hero_stat.value as any)[key].multiplier);
    if ((hero_stat.value as any)[key].name !== "V4") {
      sum += amout * multiplier;
      count += 1;
    }
  }

  return Math.round((sum / (hero_sum.value - v4.amount)) * 10000) / 10000;
});

const formRef = ref(null);

const formValue = reactive({
  workshop: 4,
  map: 3,
  left: {
    already: 659,
    collector: 7,
    worker: 38,
    empty: 10,
    days: 3,
  },
  vip: true,
  pack: true,
  boss: false,
});

const result = ref({
  enova: 0,
  ingot: 0,
  willUnlock: 0,
  toUpgrade: 0,
});

const submit = (): void => {
  let x = 1;
  if (formValue.vip) x = 1.15;
  if (formValue.pack) x = 1.3;

  let currentBoss = null;
  let bossRewardIngot = 0;
  if (formValue.boss) {
    currentBoss = resources.boss.filter((item) => {
      if (formValue.map === item.level) {
        return item;
      }
    })[0];
  }

  const currentUnlock = resources.unlock.filter((item) => {
    if (formValue.map + 1 === item.level) {
      return item;
    }
  })[0];
  result.value.willUnlock = currentUnlock ? currentUnlock.cost : 0;

  const currentUpgrade = resources.upgrade.filter((item) => {
    if (formValue.workshop + 1 === item.level) {
      return item;
    }
  })[0];
  result.value.toUpgrade = currentUpgrade ? currentUpgrade.cost : 0;

  const currentCollector = resources.colector.filter((item) => {
    if (formValue.workshop === item.level) {
      return item;
    }
  })[0];
  const currentPlanet = resources.planets.filter((item) => {
    if (formValue.map === item.level) {
      return item;
    }
  })[0];

  const totalIngot =
    currentCollector.ingot * formValue.left.collector * 1.9 +
    currentPlanet.ingot *
      (formValue.left.worker + formValue.left.empty) *
      hero_multiplier.value;

  if (!!currentBoss) {
    bossRewardIngot = currentBoss.ingot;
  }
  result.value.ingot = formValue.left.already + totalIngot + bossRewardIngot;
};
</script>

<template>
  <div>
    <h2 class="text-3xl mb-2">Account information</h2>
    <h3 class="text-lg mb-3">Total of heores: {{ hero_sum }}</h3>
    <h3 class="text-lg mb-2">
      Total material multiplier: {{ hero_multiplier }}
    </h3>

    <n-table :single-line="false" class="c-table mb-3">
      <tbody>
        <tr>
          <th>Hero Level</th>
          <td v-for="(value, key) in hero_stat" :key="key">{{ value.name }}</td>
        </tr>
        <tr>
          <th>Multiplier (x)</th>
          <td v-for="(value, key) in hero_stat" :key="key">
            {{ value.multiplier }}
          </td>
        </tr>
        <tr>
          <th>Amount</th>
          <td v-for="(value, key) in hero_stat" :key="key">
            <n-input-number v-model:value="value.amount" min="0" />
          </td>
        </tr>
      </tbody>
    </n-table>
    <n-alert class="mb-2" title="Error!" type="error" v-if="hero_sum !== 15">
      Amount of heroes must be 15!
    </n-alert>

    <n-form
      :label-width="100"
      label-placement="left"
      :model="formValue"
      ref="formRef"
      class="my-8"
    >
      <div class="flex">
        <n-form-item label="Vip" path="vip">
          <n-switch v-model:value="formValue.vip" />
        </n-form-item>
        <n-form-item label="Pack" path="pack">
          <n-switch v-model:value="formValue.pack" />
        </n-form-item>
        <n-form-item label="Boss" path="boss">
          <n-switch v-model:value="formValue.boss" />
        </n-form-item>
      </div>

      <div class="flex">
        <n-form-item label="Workshop" path="workshop">
          <n-input-number
            v-model:value="formValue.workshop"
            placeholder="Workshop"
          />
        </n-form-item>
        <n-form-item label="Map" path="map">
          <n-input-number v-model:value="formValue.map" placeholder="Map" />
        </n-form-item>
        <n-form-item label="Already" path="left.already">
          <n-input-number
            v-model:value="formValue.left.already"
            placeholder="Already"
          />
        </n-form-item>
      </div>

      <div class="flex">
        <n-form-item label="Collectors" path="left.collector">
          <n-input-number
            v-model:value="formValue.left.collector"
            placeholder="Collector"
          />
        </n-form-item>
        <n-form-item label="Workers" path="left.worker">
          <n-input-number
            placeholder="Worker"
            v-model:value="formValue.left.worker"
          />
        </n-form-item>
        <n-form-item label="Empty" path="left.empty">
          <n-input-number
            placeholder="Worker"
            v-model:value="formValue.left.empty"
          />
        </n-form-item>
        <n-form-item label="Days" path="left.days">
          <n-input-number
            placeholder="Days"
            v-model:value="formValue.left.days"
          />
        </n-form-item>
      </div>

      <div class="flex justify-center mt-5 mt">
        <n-form-item>
          <n-button @click="submit" :disabled="hero_sum !== 15">
            Calculate
          </n-button>
        </n-form-item>
      </div>
    </n-form>

    <p class="text-3xl font-bold text-green-600 mb-3">
      Total ignot: {{ result.ingot }}
    </p>

    <p class="text-xl font-bold text-red-400 mb-3">
      Next map cost: {{ result.willUnlock }}
      <br />
      Next workshop cost: {{ result.toUpgrade }}
    </p>

    <p class="text-3xl font-bold text-red-700">
      Total cost: {{ result.willUnlock + result.toUpgrade }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.c-table {
  tr {
    &:first-of-type {
      td {
        font-weight: bold;
        font-size: 1.4rem;
        color: orangered;
      }
    }
  }
  td {
    text-align: center;
  }
}
</style>
