async function log(message, log_level, log_name) {
	var dateFormat = require('dateformat');
	const { createLogger, format, transports } = require('winston');
	const { combine, timestamp, label, printf } = format;
	var day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss:l");
	
	if(log_name === undefined){
			log_name = "log"
		}

	const myFormat = printf(({ level, message, label, timestamp }) => {
 	 	return `${timestamp} ${level} [${label}] : ${message}`;
	});

	
	const logger = createLogger({
	  	format: combine(
    		label({ label: 'right meow!' }),
    		timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
    		myFormat
  		),
	  	transports: [new transports.File({
      filename: log_name+".log",
    }),]
	});
	
	console.log("%s", log_name)
	if (log_level==="error"){
		logger.log('error',message);
	}
	else if (log_level === "warning"){
		logger.log('warning',message);
	}
	else if (log_level === "crit"){
		logger.log('crit',message);
	}
	else if (log_level === "debug"){
		logger.log('debug',message);
	}
	else if (log_level === "notice"){
		logger.log('notice' ,message);
	}
	else if (log_level === "emerg"){
		logger.log('emerg',message);
	}
	else{
		logger.log(level='info', message);
	}
}

log("hello")