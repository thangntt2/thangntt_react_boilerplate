/*

Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
module.exports = function Queue() {
  // initialise the queue and offset
  let queue = []
  let offset = 0

  // Returns the length of the queue.
  this.getLength = function () {
    return (queue.length - offset)
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function () {
    return (queue.length === 0)
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function (item) {
    queue.push(item)
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function () {
    // if the queue is empty, return immediately
    if (queue.length === 0) return undefined

    // store the item at the front of the queue
    const item = queue[offset]

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset)
      offset = 0
    }

    // return the dequeued item
    return item
  }

  this.dequeueAll = function () {
    return queue.splice(0, queue.length)
  }

  this.getLast = function () {
    return queue[queue.length - 1]
  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function () {
    return (queue.length > 0 ? queue[offset] : undefined)
  }
}
