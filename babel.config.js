module.exports = {
  presets: ["@babel/typescript", "@babel/env"],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ],
  ignore: ["**/__tests__/", "packages/**/*.d.ts"]
};
