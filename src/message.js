const { TextChannel, Collection, Snowflake, Message, DMChannel } = require("discord.js");

modules.exports = (message) => (
	channel: TextChannel | DMChannel,
	options: {
		// Your question 
		question: string;
		// The id of the user you want to prompt, if not defined the prompt will accept an answer from anyone.
    userId?: string;
    // How long to wait for a response in ms. Default: 30000
    timeout?: number;
    // Number of tries
    max?: number;
	},
) => {
  if (!channel) throw new Error('Missing channel');
  if (!options.question) throw new Error("Missing Question!");
  if (!options.timeout) options.timeout = 30000;
  if (!options.max) options.max = 1;
  
  // This function will return a promise that will resolve to a collection of message or false if the time ran out
  return new Promise<Collection<Snowflake, Message> | false>(resolve => {
    channel.send(options.question).then((msg: Message | Message[]) => {
      const message = msg instanceof Array ? msg[0] : msg;
      channel
        .awaitMessages(message.author.id, {
          max: options.max,
          time: options.timeout,
          errors: ['time'],
        })
        .then(collected => {
          resolve(collected);
        })
        .catch(collected => {
          
          if (!(channel instanceof DMChannel)) {
                resolve(collected);
          }
})
})
})
}
