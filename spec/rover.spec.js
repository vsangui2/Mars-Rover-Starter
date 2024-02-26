const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(50);
    expect(rover.position).toBe(50);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).message).toBe(message.name);
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message).results[0];
    expect(actual).toEqual({completed: true, roverStatus: {position: 98382, mode: 'NORMAL', generatorWatts: 110}
  });
});
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message);
    expect(rover.mode).toBe('NORMAL');
    expect(actual.results[0].completed).toBe(true);
});
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 100)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let actual = rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
    expect(actual.results[1].completed).toBe(false);
});
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 100)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(123);
    rover.receiveMessage(message);
    expect(rover.position).toBe(100);
});
});