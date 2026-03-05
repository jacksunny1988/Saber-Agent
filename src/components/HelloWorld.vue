<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    <div class="card">
      <button type="button" @click="count++">点击次数：{{ count }}</button>
      <p>
        编辑 <code>components/HelloWorld.vue</code> 来测试热更新
      </p>
    </div>
    <p class="read-the-docs">
      点击 Vite 和 Vue 的 logo 了解更多
    </p>
  </div>
</template>

<style scoped>
.hello-world {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #42b983;
  margin-bottom: 2rem;
}

.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #369970;
}

code {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
}

.read-the-docs {
  color: #888;
  font-size: 0.9rem;
  margin-top: 2rem;
}
</style>
