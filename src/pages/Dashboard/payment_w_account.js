import PropTypes from 'prop-types'
import React, {useState, useEffect} from "react"
import {Col, Input, Label, Modal, ModalBody, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../store/profile/actions";
import {Link} from "react-router-dom";

const PaymentWhiteAccount = () => {

  const dispatch = useDispatch()

  const state = useSelector(state => state.ProfileUser);

  let activ = false

  const onClickLogout = () =>{
    localStorage.clear();
    history.push("/logout")
  }

  if (state?.profile?.account_white && (state?.profile?.account_white?.status===null || state?.profile?.account_white?.status?.name!=="activ")){
    activ = true;
  }

  return (
    <Modal size="md" isOpen={activ} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-cash-check"/>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">Your organization account is inactive, please make a payment for subscription</p>
          <div className="hstack gap-2 justify-content-center mb-0">
            <Link type="button" className="btn btn-success" to="/">Home</Link>
            <button type="button" className="btn btn-danger" onClick={onClickLogout}>Logout</button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

PaymentWhiteAccount.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default PaymentWhiteAccount