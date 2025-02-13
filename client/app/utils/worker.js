import { pipeline } from '@huggingface/transformers';

async function runCaptioner() {
  const captioner = await pipeline('image-to-text', 'Xenova/trocr-small-handwritten');
  const url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/handwriting.jpg';
  const output = await captioner(url);
  console.log(output);
}

runCaptioner().catch(console.error);