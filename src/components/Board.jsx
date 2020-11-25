import { Component } from 'react'
import Note from './Note'
import './components.scss'
import { getRandomNumber, updateLocalStorage } from '../utils/common_functions.js'

class Board extends Component {
  state = {
    count: 1,
    byIds: {
      0: {
        id: 0,
        title: "This is a Sticky Note",
        content: "You can add more notes if you want. Just double click the board. You can move by clicking on the pin, resize a note from the bottom right corner. You can delete a note by pressing alt and double clicking the pin(not this one). You can simply edit the title and content by clicking on them.",
        updated: 0,
        top: 50,
        left: 50,
        height: 300,
        width: 275,
        styleClass: 0,
        hidden: false
      }
    },
    allIds: [0],
    crosshair: {
      mouseX: 0,
      mouseY: 0,
      prevX: 0,
      prevY: 0
    },
    action: "",
    acting: false,
    active: -1
  }

  componentDidMount() {
    const allIds = JSON.parse(localStorage.getItem('allIds'))
    const byIds = JSON.parse(localStorage.getItem('byIds'))
    const count = JSON.parse(localStorage.getItem('count'))
    if (allIds === null || byIds === null || count === null) {
      updateLocalStorage('allIds', this.state.allIds)
      updateLocalStorage('byIds', this.state.byIds)
      updateLocalStorage('count', this.state.count)
      return
    }
    this.setState({allIds, byIds, count})
  }

  startAction = (id, event, type) => {
    event.preventDefault()
    const { acting, byIds } = this.state

    if(acting || event.button !== 0) return

    console.log(`Starting to ${type} item-${id}`)
    const item = byIds[id]

    this.setState({
      crosshair: {
        mouseX: event.clientX,
        mouseY: event.clientY,
        prevX: type === 'move'?item.left:item.width,
        prevY: type === 'move'?item.top:item.height
      },
      acting: true,
      action: type,
      active: id
    })
  }

  handleMouseMove = event => {
    event.preventDefault()
    const { action, acting, active, crosshair, byIds} = this.state

    if(!acting) return

    console.log(`Mapping mouse for item: ${active}`)

    const deltaX = crosshair.mouseX - event.clientX
    const deltaY = crosshair.mouseY - event.clientY

    const item = byIds[active]

    switch(action) {
      case "resize":
        item.height = crosshair.prevY - deltaY
        item.width = crosshair.prevX - deltaX
        break
      case "move":
        item.top = crosshair.prevY - deltaY
        item.left = crosshair.prevX - deltaX
        break
      default:
    }

    this.setState ({byIds: {...byIds, [active]: item}})
  }

  stopActionOnItem = event => {
    event.stopPropagation()
    const {acting, active, byIds} = this.state

    if(!acting) return
    console.log(`Done with item: ${active}`)

    this.setState({
      acting: false,
      action: '',
      crosshair: {
        mouseX: 0,
        mouseY: 0,
        prevX: 0,
        prevY: 0
      }
    })

    updateLocalStorage('byIds', byIds)
  }

  addNote = () => {
    console.log("Adding an element!")
    const { byIds, allIds, count } = this.state

    const date = new Date()
    const timestamp = date.getTime()
    const newNote =  {
      id: count,
      updated: timestamp,
      title: "Add a title here...",
      content: "Add content here...",
      top: getRandomNumber(100, 500),
      left: getRandomNumber(100, 800),
      height: 300,
      width: 275,
      hidden: false,
      styleClass: Math.round(getRandomNumber(0, 3))
    }

    allIds.push(count)
    this.setState({
      byIds: {...byIds, [count]: newNote},
      count: count + 1,
      active: count,
      allIds
    })

    updateLocalStorage('allIds', allIds)
    updateLocalStorage('byIds', byIds)
    updateLocalStorage('count', count + 1)
  }

  hideNote = (id, event) => {
    event.stopPropagation()
    console.log(event)
    if(id === 0 || !event.altKey) return

    console.log("Hiding an element!")
    this.handleChange(id, 'hidden', true)
  }

  handleChange = (id, key, value) => {
    if(id === 0) return
    const { byIds } = this.state
    const date = new Date()
    const timestamp = date.getTime()

    const note = byIds[id]
    note[key] = value
    note.updated = timestamp

    this.setState({
      byIds: {...byIds, [id]: note}
    })

    updateLocalStorage('byIds', byIds)
  }

  render() {
    const { byIds, allIds, active } = this.state
    let zIndex

    const notes = allIds.map(note_id => {
      const props = byIds[note_id]
      if (props.hidden) return false

      if (note_id === active) {
        zIndex = 1000
      } else {
        zIndex = note_id
      }

      return (<Note key={props.id} {...props} startAction={this.startAction} zIndex={zIndex} hideNote={(event) => this.hideNote(props.id, event)} handleChange={this.handleChange} />)
    })


    return (
      <div className="board" onDoubleClick={this.addNote} onMouseMove={this.handleMouseMove} onMouseUp={this.stopActionOnItem}>
        {notes}
      </div>
    )
  }
}

export default Board
