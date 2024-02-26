class Rover {
   constructor(position, mode, generatorWatts){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
receiveMessage(message){
let response={
   message: message.name,
   results: []
   };
   for (let i=0; i< message.commands.length; i++) {
   if (message.commands[i].commandType === "STATUS_CHECK") {
      response.results.push({
      completed: true,
      roverStatus: 
   {
      position: this.position, 
      mode: this.mode, 
      generatorWatts: this.generatorWatts}
   }) 
} else if (message.commands[i].commandType === "MODE_CHANGE") {
   this.mode = message.commands[i].value;
   response.results.push({
   completed:true
 })
  } else if (message.commands[i].commandType === "MOVE") {
   if (this.mode === 'LOW_POWER'){
      response.results.push({
      completed:false
})
} else {
   this.position = message.commands[i].value;
   response.results.push({
   completed:true})
}
} else {
   response.results.push({
   completed:true
});
}
}
return response;
}
  
  }

module.exports = Rover;









/*let rover = new Rover(100);
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    */