// Files in public/ are served under the deploy base (e.g. /Portofolio/ on GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
