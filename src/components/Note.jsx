import React, { Component } from 'react'
import Pin from './Pin'
import Resizer from './Resizer'


class Note extends Component {
  state = {
    title: '',
    content: ''
  }

  componentDidMount() {
    const {title, content} = this.props
    this.setState({
      title, content
    })
  }

  componentDidUpdate(prevProps) {
    const {title, content} = this.props
    if (prevProps.title !== title)
      this.setState({
        title
      })
    if (prevProps.content !== content)
      this.setState({
        content
      })
  }

  handleChange = (key, event) => {
    const { id, handleChange } = this.props
    handleChange(id, key, event.target.value)
  }

  handlePinClick = event => {
    const { id, startAction } = this.props
    startAction(id, event, 'move')
  }

  handleResizerClick = event => {
    const { id, startAction } = this.props
    startAction(id, event, 'resize')
  }

  handleFocus = event => {
    console.log('Element is under focus!')
    event.target.select()
  }

  handleDoubleClick = event => {
    event.stopPropagation()
    event.preventDefault()
  }

  render() {
    const { id, updated, hideNote, styleClass, ...style} = this.props
    const {title, content} = this.state
    const date = new Date(updated)
    const f = {
      date: Math.round(date.getDate()/10) === 0? '0' + date.getDate(): date.getDate(),
      month: date.getMonth(),
      year: date.getYear()%100,
      hour: date.getHours()%12,
      minute: date.getMinutes(),
      second: date.getSeconds(),
      meridiem: date.getHours/12 > 0?'am':'pm'
    }

    return (
      <div onDoubleClick={this.handleDoubleClick} id={`note-${id}`} style={{...style}} className={`note class-${styleClass}`}>
        <div className="pin" onDoubleClick={hideNote} onMouseDown={this.handlePinClick}><Pin /></div>
        <input className="note-header" onFocus={this.handleFocus} value={title} onChange={event => this.handleChange('title', event)}/>
        <textarea className="note-body" onFocus={this.handleFocus} value={content} onChange={event => this.handleChange('content', event)}/>
        <div className="note-footer">
          <span className="footer-text">{`${f.date}/${f.month}/${f.year} - ${f.hour}:${f.minute}:${f.second} ${f.meridiem}`}</span>
          <div className="resizer" onMouseDown={this.handleResizerClick}><Resizer /></div>
        </div>
      </div>
    )
  }
}

export default Note
