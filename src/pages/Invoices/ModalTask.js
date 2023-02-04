import PropTypes from 'prop-types'
import React from "react"
import { Modal, ModalBody } from "reactstrap"

const ModalTask = ({ show, onClickTrue, onClickFalse, onCloseClick }) => {
  return (
    <Modal size="sm" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-download-box-outline"></i>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">Are you sure you want to add tax or no?</p>

          <div className="hstack gap-2 justify-content-center mb-0">
            <button type="button" className="btn btn-success" onClick={onClickTrue}>Yes Tax</button>
            <button type="button" className="btn btn-warning" onClick={onClickFalse}>No Tax</button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalTask.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalTask