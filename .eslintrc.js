module.exports = {
 "extends": "eslint-config-airbnb",
 "parserOptions": {
   "ecmaFeatures": {
     "jsx": true
   }
 },
 "parser": "babel-eslint",
 "rules": {
   "no-console": [1],
   "max-len": [1, 120, 2, {ignoreComments: true}],
   "semi": [2, "never"],
   "react/prop-types": [1],
   "react/jsx-uses-react": "error",
   "react/jsx-uses-vars": "error",
   "react/forbid-prop-types": 0
 },
 "plugins": [
   "react"
 ],
 "globals": {
   "__CLIENT__": true,
   "__SERVER__": true,
   "__PRODUCTION__": true,
   "__DEV__": true,
   "document": false,
   "escape": false,
   "navigator": false,
   "unescape": false,
   "window": false,
   "describe": true,
   "before": true,
   "after": true,
   "it": true,
 }
};