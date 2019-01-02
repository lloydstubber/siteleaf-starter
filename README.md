# Siteleaf Starter

### Starter template for Siteleaf builds, powered by Jekyll.

### WIP: PLEASE READ NOTE BELOW

## Getting up and Running
- Clone down and enter directory
- Install bundle via Ruby gems
- Run `bundle install`
- Run `npm install`
- Install the new `gulp-cli` with [these instructions](https://github.com/gulpjs/gulp/blob/master/docs/getting-started/1-quick-start.md)
- If you have problems installing that due to old Gulp versions, [follow this](https://github.com/gulpjs/gulp/issues/1610) to remove the `gulp.1` file and try again
- Then for development you'll need to run `gulp` and `bundle exec jekyll serve` at the same time. This is a WIP and will be streamlined into a single process with hot reloading soon

## Under the hood
- Jekyll
- Github Pages Support
- Gulp
- SCSS Minification/Compilation
- SCSS Compilation
- CSS Autoprefixer
- CSS Sourcemaps
- ES6 Support
- JS Minification
- JS Concat
- Error Notifications

## Note
Currently, this starter template cannot compile the CSS with front matter for Jekyll to then process. So once you're finished developing locally and you'd like to push live, follow these steps:
- Make sure bundle and gulp are still running.
- Gulp will have compiled your latest SCSS to CSS in the `assets/styles/main.css` file. So copy these contents to your clipboard.
- Then in the `assets/css/styles.scss` you'll see the below:
```

---
---

// your css below

```
- Jekyll needs the dashes (front matter) at the top of the file to compile it into the `_site/` folder so keep these and replace all the CSS below the front matter with what you've copied.
- Then push up your changes and you'll see your latest changes after publishing to Siteleaf :)