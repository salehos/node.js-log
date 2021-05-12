const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: clientId,
    brokers: [ipaddress:port]
})
var dateFormat = require('dateformat');

async function producer(message, log_level) {
    const producer = kafka.producer()
    var day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss:l");
    await producer.connect()
    await producer.send({
        topic: 'log',
        log_level: log_level,
        module_name: global.process.mainModule.filename,
        messages: message,
    })
    await producer.disconnect()
}


async function log(message, log_level, log_name) {
	const { createLogger, format, transports } = require('winston');
	const { combine, timestamp, printf } = format;
	
	if(log_name === undefined){
			log_name = "log"
		}
	if(log_level === undefined){
			log_level = "info"
		}
	const myFormat = printf(({ level, message, timestamp }) => {
 	 	return `${timestamp} ${level} : ${message}`;
	});

	
	const logger = createLogger({
	  	format: combine(
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
	logger.log(level=log_level, message);
	producer(message, log_level)
}

log("hello", log_level="error")