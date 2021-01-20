const back = require('androidjs').back;
const fs = require('fs');
const ytdl = require('ytdl-core');
require('magic-globals');

function error_log(msg) {
	back.send('error-log', msg);
}

// service define
// download-mp34 : download mp3, mp4 files
// download-mp3  : download mp3 file
// download-mp4  : download mp4 file

// if download result is ok return to service
// back.send('download-return', result);

// download-mp34 : download mp3, mp4 files
back.on('download-mp34', (datag)=>{
	let [movie_dir, music_dir, link_mp4, link_mp3] = datag.split("|");
	let data;
	// download
	data = movie_dir + "|" + link_mp4;
	download(data, 18, null);
	data = music_dir + "|" + link_mp3;
	download(data, 21, ()=>{
		back.send('download-return', 'success');
	});
});

// download-mp3  : download mp3 file
back.on('download-mp3', (data)=>{
	// 21, mp3
	download(data, 21, ()=>{
		back.send('download-return', 'success');
	});
});

// download-mp4  : download mp4 file
back.on('download-mp4', (data)=>{
	// 18, mp4
	download(data, 18, ()=>{
		back.send('download-return', 'success');
	});
});

function download(data, format_num, callback) {
	let [dir, link] = data.split("|");
	let format_ext = (format_num == 21) ? 'mp3' : 'mp4';
	try {
		error_log(dir);
		ytdl.getInfo(link).then(info=>{
			let fname = info.videoDetails.title.replace('/', '').replace('|', '').toString('utf8');
			let store_path = `${dir}/${fname}.${format_ext}`;
			ytdl(link, { format: format_ext })
				.pipe(fs.createWriteStream(store_path))
				.on('finish', () => {
					return callback();
			});
		});
	} catch (error) {
		error_log(`${error} | ${__line}`);
	}
}