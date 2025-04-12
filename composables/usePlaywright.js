import sampleData from '~/assets/sample-data.json';

const isProduction = process.env.NODE_ENV.match(/^(prerender|production)$/);

export default function () {
  return {
    fetchData: async () =>
      isProduction
        ? await useFetch('/playwright')
        : { data: sampleData, error: false },
  };
}
