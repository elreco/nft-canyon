import React from 'react'
import { Modal } from 'react-bootstrap'

const CardModal = (props: {
  show: boolean
  onHide: any
  text?: string
  title?: string
}) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40 pt-3">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </Modal>
  )
}

export default CardModal
