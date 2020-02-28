import pkg from "./package.json"
// import { terser } from 'rollup-plugin-terser';

export default {
    input: "src/useFormist.js",
    //   plugins: [terser()],
    external: ["react", "react-dom"],
    output: [
        { file: pkg.main, format: "cjs" },
        { file: pkg.module, format: "es" },
    ],
}
