export default {
  async redirects() {
    return [{ source: "/flashcards", destination: "/practice", permanent: true }];
  },
};
