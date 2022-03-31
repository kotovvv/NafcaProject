import critical from "critical";

export const critic = () => {
  return critical.generate({
    base: 'dist/',
    src: 'index.html',
    target: {
      // html: 'index-critical.html',
      css: 'css/critical.css',
    },
    width: 1300,
    height: 900,
    ignore: {
      atrule: ['@font-face'],
    }
  });

}