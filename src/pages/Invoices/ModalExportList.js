import PropTypes from 'prop-types'
import React, {useState} from "react"
import {Col, Input, Label, Modal, ModalBody, Row} from "reactstrap"

const ModalExportList = ({ show, onClickTrue, onClickFalse, dateStart, dateEnd ,onCloseClick}) => {

  const [data, setData] = useState(true)

  const onChangeData = (data) => {
    setData(data)
  }

  const onClickSend = () => {
    onClickTrue()
  }

  return (
    <Modal size="md" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-email-send-outline"/>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">Are you sure you would like to email the customer an invoice?</p>
          <div className="position-relative">
            <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
              <div className="position-relative">
                <Row>
                  <Col>
                  <label htmlFor="search-bar-0" className="search-label">
                      <Input
                          type="date"
                          className="form-control"
                          autoComplete="off"
                          onChange={dateStart}
                      />
                      </label>
                    </Col>
                    <Col>
                  <label htmlFor="search-bar-0" className="search-label">
                      <Input
                          type="date"
                          className="form-control"
                          autoComplete="off"
                          onChange={dateEnd}
                      />
                      </label>
                    </Col>
                  </Row>
                </div>
            </div>
          </div>
          <div className="hstack gap-2 justify-content-center mb-0">
            <button type="button" className="btn btn-success" onClick={onClickSend}>Export</button>
            <button type="button" className="btn btn-danger" onClick={onCloseClick}>Cancel</button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalExportList.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalExportList