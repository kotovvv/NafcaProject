import deploy from "gulp-gh-pages";
/**
 ** Push build to gh-pages
 **/

export const pushgit = () => {
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`).pipe(deploy());
};
