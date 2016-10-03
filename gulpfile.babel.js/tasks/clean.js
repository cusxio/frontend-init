import del from 'del';
import config from '../config';

export default function clean() {
    del([config.root.dest], { dot: true });
}

