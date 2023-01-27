import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col, DropdownItem, DropdownMenu, DropdownToggle,
    Row, Table,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap"
import images from "assets/images"
import API_URL from "../../helpers/api_helper";
import wechat from "../../assets/images/companies/wechat.svg";

const TableInvoice = ({ item }) => {

  let status = '';
  let icon = '';
  if (item.status==='draft'){
    status = 'secondary';
    icon = "mdi mdi-alert-circle-outline me-2";
  }else if (item.status==='cancel'){
    status = 'danger';
    icon = "mdi mdi-block-helper me-2";
  }else if (item.status==='final'){
    status = 'success';
    icon = "mdi mdi-check-all me-2";
  }

  return (
    <React.Fragment>
        <td>
            <Badge color={status} className="w-auto">
                {item.status}
            </Badge>
        </td>
    </React.Fragment>
  )
}

TableInvoice.propTypes = {
  data: PropTypes.any,
}

export default TableInvoice
