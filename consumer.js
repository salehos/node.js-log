const { Kafka } = require('kafkajs')
const kafka = new Kafka({
OUR CONFIG. SO GET OUT!
})


async function consume_test() {
    const consumer = kafka.consumer({ groupId: '1' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'log-test', fromBeginning: true })
    await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            try {
                tx = JSON.parse(message.value.toString())
                console.log(tx)
            } catch (err) {
                console.log('da fuq')
            }
        }
    })
}




async function main() {

    await consume_test()
}

main()