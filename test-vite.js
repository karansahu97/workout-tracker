import { resolveConfig } from 'vite';
async function test() {
  const config = await resolveConfig({}, 'serve');
  console.log("Vite Root:", config.root);
  console.log("Vite Base:", config.base);
}
test();
