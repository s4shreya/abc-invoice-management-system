import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import "../App.css";

import InvoiceItems from "../components/InvoiceItems";
import InvoiceModal from "../components/InvoiceModal";
import { editInvoice } from "../actions/invoices";
import { useSelector } from "react-redux";

const EditInvoice = () => {
  const { id } = useParams();
  const invoiceList = useSelector((state) => state.invoices.invoices);
  let invoiceDetails = {};

  for (let key in invoiceList) {
    if (invoiceList[key].id === id) {
      invoiceDetails = invoiceList[key].data;
    }
  }
  console.log(`in editttt ${JSON.stringify(invoiceDetails)}`);

  const [invoice, setInvoice] = useState({
    currency: invoiceDetails.currency || "$",
    currentDate: invoiceDetails.currentDate,
    invoiceNumber: invoiceDetails.invoiceNumber,
    dateOfIssue: invoiceDetails.dateOfIssue,
    billTo: invoiceDetails.billTo,
    billToEmail: invoiceDetails.billToEmail,
    billToAddress: invoiceDetails.billToAddress,
    billFrom: invoiceDetails.billFrom,
    billFromEmail: invoiceDetails.billFromEmail,
    billFromAddress: invoiceDetails.billFromAddress,
    notes: invoiceDetails.notes,
    total: invoiceDetails.total,
    subTotal: invoiceDetails.subTotal,
    taxRate: invoiceDetails.taxRate,
    taxAmmount: invoiceDetails.taxAmmount,
    discountRate: invoiceDetails.discountRate,
    discountAmmount: invoiceDetails.discountAmmount,
    items: invoiceDetails.items || [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowDel = (items) => {
    let index = invoice.items.indexOf(items);
    let newItems = invoice.items.filter((item, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const handleAddEvent = (evt) => {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let item = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setInvoice({ ...invoice, items: [...invoice.items, item] });
  };

  const handleCalculateTotal = () => {
    let items = invoice.items;
    let subTotal = 0;

    items.map((items) => {
      subTotal = parseFloat(
        subTotal + parseFloat(items.price).toFixed(2) * parseInt(items.quantity)
      ).toFixed(2);
    });

    setInvoice({ ...invoice, subTotal: parseFloat(subTotal).toFixed(2) });
    let tax = parseFloat(
      parseFloat(subTotal) * (invoice.taxRate / 100)
    ).toFixed(2);
    let discount = parseFloat(
      parseFloat(subTotal) * (invoice.discountRate / 100)
    ).toFixed(2);
    let total =
      subTotal - invoice.discountAmmount + parseFloat(invoice.taxAmmount);
    setInvoice({
      ...invoice,
      taxAmmount: tax,
      discountAmmount: discount,
      total: total,
    });
  };

  const onItemizedItemEdit = (event) => {
    let item = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };
    let items = invoice.items.slice();
    let newItems = items.map((items) => {
      for (let key in items) {
        if (key === item.name && items.id === item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    setInvoice({ ...invoice, items: [...items, newItems] });
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsModalOpen(true);
    const updatedInvoice = {
      id: id,
      data: { ...invoice },
    };
    dispatch(editInvoice(updatedInvoice));
    navigate("/")
  };

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Form onSubmit={openModal}>
          <Row>
            <Col md={8} lg={9}>
              <Card className="p-4 p-xl-5 my-3 my-xl-4">
                <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                  <div className="d-flex flex-column">
                    <div className="d-flex flex-column">
                      <div className="mb-2">
                        <span className="fw-bold">
                          Current&nbsp;Date:&nbsp;
                        </span>
                        <span className="current-date">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <span className="fw-bold d-block me-2">
                        Due&nbsp;Date:
                      </span>
                      <Form.Control
                        type="date"
                        value={invoice.dateOfIssue}
                        name={"dateOfIssue"}
                        onChange={(event) =>
                          setInvoice({
                            ...invoice,
                            dateOfIssue: event.target.value,
                          })
                        }
                        style={{
                          maxWidth: "150px",
                        }}
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold me-2">
                      Invoice&nbsp;Number:&nbsp;
                    </span>
                    <Form.Control
                      type="number"
                      value={invoice.invoiceNumber}
                      name={"invoiceNumber"}
                      onChange={(event) =>
                        setInvoice({
                          ...invoice,
                          invoiceNumber: event.target.value,
                        })
                      }
                      min="1"
                      style={{
                        maxWidth: "70px",
                      }}
                      required="required"
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <Row className="mb-5">
                  <Col>
                    <Form.Label className="fw-bold">Bill to:</Form.Label>
                    <Form.Control
                      placeholder={"Who is invoice to?"}
                      rows={3}
                      value={invoice.billTo}
                      type="text"
                      name="billTo"
                      className="my-2"
                      onChange={(event) =>
                        setInvoice({ ...invoice, billTo: event.target.value })
                      }
                      autoComplete="name"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Email address"}
                      value={invoice.billToEmail}
                      type="email"
                      name="billToEmail"
                      className="my-2"
                      onChange={(event) =>
                        setInvoice({
                          ...invoice,
                          billToEmail: event.target.value,
                        })
                      }
                      autoComplete="email"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Billing address"}
                      value={invoice.billToAddress}
                      type="text"
                      name="billToAddress"
                      className="my-2"
                      autoComplete="address"
                      onChange={(event) =>
                        setInvoice({
                          ...invoice,
                          billToAddress: event.target.value,
                        })
                      }
                      required="required"
                    />
                  </Col>
                  <Col>
                    <Form.Label className="fw-bold">Bill from:</Form.Label>
                    <Form.Control
                      placeholder={"Who is invoice from?"}
                      rows={3}
                      value={invoice.billFrom}
                      type="text"
                      name="billFrom"
                      className="my-2"
                      onChange={(event) =>
                        setInvoice({ ...invoice, billFrom: event.target.value })
                      }
                      autoComplete="name"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Email address"}
                      value={invoice.billFromEmail}
                      type="email"
                      name="billFromEmail"
                      className="my-2"
                      onChange={(event) =>
                        setInvoice({
                          ...invoice,
                          billFromEmail: event.target.value,
                        })
                      }
                      autoComplete="email"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Billing address"}
                      value={invoice.billFromAddress}
                      type="text"
                      name="billFromAddress"
                      className="my-2"
                      autoComplete="address"
                      onChange={(event) =>
                        setInvoice({
                          ...invoice,
                          billFromAddress: event.target.value,
                        })
                      }
                      required="required"
                    />
                  </Col>
                </Row>
                <InvoiceItems
                  onItemizedItemEdit={onItemizedItemEdit}
                  onRowAdd={handleAddEvent}
                  onRowDel={handleRowDel}
                  currency={invoice.currency}
                  items={invoice.items}
                />
                <Row className="mt-4 justify-content-end">
                  <Col lg={6}>
                    <div className="d-flex flex-row align-items-start justify-content-between">
                      <span className="fw-bold">Subtotal:</span>
                      <span>
                        {invoice.currency}
                        {invoice.subTotal}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">Discount:</span>
                      <span>
                        <span className="small ">
                          ({invoice.discountRate || 0}%)
                        </span>
                        {invoice.currency}
                        {invoice.discountAmmount || 0}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">Tax:</span>
                      <span>
                        <span className="small ">
                          ({invoice.taxRate || 0}%)
                        </span>
                        {invoice.currency}
                        {invoice.taxAmmount || 0}
                      </span>
                    </div>
                    <hr />
                    <div
                      className="d-flex flex-row align-items-start justify-content-between"
                      style={{
                        fontSize: "1.125rem",
                      }}
                    >
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">
                        {invoice.currency}
                        {invoice.total || 0}
                      </span>
                    </div>
                  </Col>
                </Row>
                <hr className="my-4" />
                <Form.Label className="fw-bold">Notes:</Form.Label>
                <Form.Control
                  placeholder="Thanks for your business!"
                  name="notes"
                  value={invoice.notes}
                  onChange={(event) =>
                    setInvoice({ ...invoice, notes: event.target.value })
                  }
                  as="textarea"
                  className="my-2"
                  rows={1}
                />
              </Card>
            </Col>
            <Col md={4} lg={3}>
              <div className="sticky-top pt-md-3 pt-xl-4">
                <Button
                  letiant="primary"
                  type="submit"
                  className="d-block w-100"
                >
                  Submit Invoice
                </Button>
                <InvoiceModal
                  showModal={isModalOpen}
                  closeModal={() => setIsModalOpen(false)}
                  info={invoice}
                  items={invoice.items}
                  currency={invoice.currency}
                  subTotal={invoice.subTotal}
                  taxAmmount={invoice.taxAmmount}
                  discountAmmount={invoice.discountAmmount}
                  total={invoice.total}
                />
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Currency:</Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      setInvoice({ ...invoice, currency: event.target.value })
                    }
                    className="btn btn-light my-1"
                    aria-label="Change Currency"
                  >
                    <option value="₹">INR (Indian Rupee)</option>
                    <option value="$">USD (United States Dollar)</option>
                    <option value="£">GBP (British Pound Sterling)</option>
                    <option value="¥">JPY (Japanese Yen)</option>
                    <option value="$">CAD (Canadian Dollar)</option>
                    <option value="$">AUD (Australian Dollar)</option>
                    <option value="$">SGD (Signapore Dollar)</option>
                    <option value="¥">CNY (Chinese Renminbi)</option>
                    <option value="₿">BTC (Bitcoin)</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Tax rate:</Form.Label>
                  <InputGroup className="my-1 flex-nowrap">
                    <Form.Control
                      name="taxRate"
                      type="number"
                      value={invoice.taxRate}
                      onChange={(event) =>
                        setInvoice({ ...invoice, taxRate: event.target.value })
                      }
                      className="bg-white border"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="bg-light fw-bold text-secondary small">
                      %
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Discount rate:</Form.Label>
                  <InputGroup className="my-1 flex-nowrap">
                    <Form.Control
                      name="discountRate"
                      type="number"
                      value={invoice.discountRate}
                      onChange={(event) =>
                        setInvoice({
                          ...invoice,
                          discountRate: event.target.value,
                        })
                      }
                      className="bg-white border"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="bg-light fw-bold text-secondary small">
                      %
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};
export default EditInvoice;
