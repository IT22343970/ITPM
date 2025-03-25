module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'), // Ensure this line is correct
    require('autoprefixer'),
    // Ensure there are no references to 'postcss-flexbugs-fixes'
  ],
}
