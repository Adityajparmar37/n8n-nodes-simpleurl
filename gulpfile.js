const { src, dest } = require('gulp');

function buildIcons() {
	// Copy any icon files if they exist, otherwise just return empty stream
	return src('nodes/**/*.{png,svg}', { allowEmpty: true })
		.pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;
