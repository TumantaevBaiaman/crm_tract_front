import React, { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card invoice
import CardInvoice from "./card-invoice"
import { getInvoices as onGetInvoices } from "store/actions"

const MyDay = props => {
   //meta title
   document.title="My Day | Tract System";

  const dispatch = useDispatch()

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoices,
  }))

  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

          <Row>
            {map(invoices, (invoice, key) => (
              <CardInvoice data={invoice} key={"_invoice_" + key} />
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

MyDay.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(MyDay)
