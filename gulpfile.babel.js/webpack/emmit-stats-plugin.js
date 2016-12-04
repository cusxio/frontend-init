import { resolve } from 'path';
import { readFileSync as read, writeFileSync as write, existsSync as exists } from 'fs';

export default function EmmitStatsPlugin(opts = {}) {
    this.output = opts.output || 'rev-manifest.json';
}

EmmitStatsPlugin.prototype.apply = function apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
        const stats = compilation.getStats().toJson();
        const manifest = {};

        stats.chunks.forEach((chunk, i) => {
            manifest[`${chunk.names[i]}.js`] = `${chunk.files[i]}`;
        });

        const file = resolve('.', 'public', this.output);

        if (exists(file)) {
            const oldManifest = JSON.parse(read(file, 'utf8'));
            const newManifest = Object.assign(oldManifest, manifest);

            write(
                file,
                JSON.stringify(newManifest, null, 2)
            );
        } else {
            write(
                file,
                JSON.stringify(manifest, null, 2)
            );
        }
        callback();
    });
};
