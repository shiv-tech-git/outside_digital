const errorLog = (...text) => {
	console.log("ERROR:", ...text);
}

const log = (...text) => {
	console.log(...text);
}

module.exports = {
	errorLog,
	log,
}