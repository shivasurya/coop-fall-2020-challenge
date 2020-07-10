class EventSourcer {

  constructor() {
    this.value = 0;
    this.undo_action_pointer = []
    this.redo_action_pointer = []

    this.ADD_ACTION = 1;
    this.SUB_ACTION = 2;
    // scale for actions in future
  }

  add(num) {
    this.value +=num
    this.undo_action_pointer.push({"ACTION": this.ADD_ACTION, "VALUE": num})
  }

  subtract(num) {
    this.value -=num
    this.undo_action_pointer.push({"ACTION": this.SUB_ACTION, "VALUE": num})
  }

  undo() {
    if(this.undo_action_pointer.length > 0)
    {
      let current_seek_pointer = this.undo_action_pointer.pop()
      if(current_seek_pointer.ACTION === this.ADD_ACTION)
      {
        this.value -=current_seek_pointer.VALUE
      }
      else if(current_seek_pointer.ACTION === this.SUB_ACTION)
      {
        this.value +=current_seek_pointer.VALUE
      }
      // scale in future for other actions
      this.redo_action_pointer.push(current_seek_pointer)
    }
  }

  redo() {
    if(this.redo_action_pointer.length > 0)
    {
      let current_seek_pointer = this.redo_action_pointer.pop()
      if(current_seek_pointer.ACTION === this.ADD_ACTION)
      {
        this.value +=current_seek_pointer.VALUE
      }
      else if(current_seek_pointer.ACTION === this.SUB_ACTION)
      {
        this.value -=current_seek_pointer.VALUE
      }
      this.undo_action_pointer.push(current_seek_pointer)
    }
  }

  bulk_undo(num) {
    while(num--)
    {
      this.undo()
    }
  }
  bulk_redo(num) {
    while(num--)
    {
      this.redo()
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
