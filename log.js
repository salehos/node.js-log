async function log(message, log_level, log_name) {
	var dateFormat = require('dateformat');
	const { createLogger, format, transports } = require('winston');
	var day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");

	if(log_name === undefined){
		log_name = "log"
	}

	const logger = createLogger({
	  format: format.combine(
	    format.splat(),
	    format.simple()
	  ),
	  transports: [new transports.File({
      filename: log_name+".log",
    }),]
	});
	
	console.log("%s", log_name)
	if (log_level==="error"){
		logger.log('error', 'at %s %s',day ,message);
	}
	else if (log_level === "warning"){
		logger.log('warning', 'at %s %s',day ,message);
	}
	else if (log_level === "crit"){
		logger.log('crit', 'at %s %s',day ,message);
	}
	else if (log_level === "debug"){
		logger.log('debug', 'at %s %s',day ,message);
	}
	else if (log_level === "notice"){
		logger.log('notice', 'at %s %s',day ,message);
	}
	else if (log_level === "emerg"){
		logger.log('emerg', 'at %s %s',day ,message);
	}
	else{
		logger.log('info', 'at %s %s',day ,message);
	}
}