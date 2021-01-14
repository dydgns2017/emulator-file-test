const back = require('androidjs').back;
const fs = require('fs')
const youtubedl = require('youtube-dl')

// service define
// download-mp34 : download mp3, mp4 files
// download-mp3  : download mp3 file
// download-mp4  : download mp4 file

// if download result is ok return to service
// back.send('download-return', result);

back.on('download-mp34', (data)=>{
	let [movie_dir, music_dir, link_mp4, link_mp3] = data.split("|");
	let data;
	// download
	data = movie_dir + "|" + link_mp4;
	download(data, 18, null);
	data = music_dir + "|" + link_mp3;
	download(data, 21, ()=>{
		back.send('download-return', 'success');
	});
});

back.on('download-mp3'), (data)=>{
	// 21, mp3
	download(data, 21, ()=>{
		back.send('download-return', 'success');
	});
}
back.on('download-mp4'), (data)=>{
	// 18, mp4
	download(data, 18, ()=>{
		back.send('download-return', 'success');
	});
}

function download(data, format_num, callback){
	let [dir, link] = data.split("|");
	let format_ext = (format_num == 21) ? '.mp3' : '.mp4';
	let ytl = youtubedl(link, ['--format=' + format_num], { cwd: dir + '/'});
	let filename;
	ytl.on('info', function(info){
		filename = info._filename;
	});
	// end download
	ytl.on('end', function() {
		if ( callback != null )
			callback();
	});
	ytl.pipe(fs.createWriteStream(filename + format_ext));
}