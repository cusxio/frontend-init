import del from 'del';
import config from '../config';

export default function clean() {
    return del([config.root.dest], { dot: true });
}

