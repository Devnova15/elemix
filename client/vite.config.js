import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

const replaceIncludes = (html, filename) => {
    const includeRegex = /<include src="(.+?)"><\/include>/g;
    return html.replace(includeRegex, (_, src) => {
        const filePath = path.resolve(path.dirname(filename), src);
        try {
            let fileContent = fs.readFileSync(filePath, "utf-8");
            fileContent = replaceIncludes(fileContent, filePath);
            return fileContent;
        } catch (err) {
            console.error(`Error including file ${filePath}: ${err}`);
            return "";
        }
    });
};

function htmlIncludePlugin() {
    return {
        name: "html-include-plugin",
        enforce: "pre",
        transformIndexHtml(html, { filename }) {
            return replaceIncludes(html, filename);
        },
    };
}

export default defineConfig({
    plugins: [htmlIncludePlugin()],
});