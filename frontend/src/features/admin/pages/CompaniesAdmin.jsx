import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import {
  getCompanies,
  postCompanies,
  updateCompany,
  deleteCompany,
} from "../services/companies.service";
//
export const CompaniesAdmin = () => {
  const [formErrors, setFormErrors] = useState({});
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentCompany, setCurrentCompany] = useState({
    id: null,
    name: "",
    nit: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Error al cargar compañías");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentCompany({
      id: null,
      name: "",
      nit: "",
      address: "",
      phone: "",
      email: "",
    });
    setShowModal(true);
  };

  const openEditModal = (company) => {
    setModalMode("edit");
    setCurrentCompany({ ...company });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    const isDuplicate = (field, value) => {
      return companies.some(
        (comp) =>
          comp[field].toLowerCase() === value.toLowerCase() &&
          comp.id !== currentCompany.id
      );
    };

    if (!currentCompany.name.trim()) {
      errors.name = "El nombre es obligatorio";
    } else if (isDuplicate("name", currentCompany.name)) {
      errors.name = "Ya existe una compañía con este nombre";
    }

    if (!currentCompany.nit.trim()) {
      errors.nit = "El NIT es obligatorio";
    } else if (!/^\d+-\d$/.test(currentCompany.nit)) {
      errors.nit =
        "El NIT debe tener el formato numérico con guion, por ejemplo: 123456789-0";
    } else if (isDuplicate("nit", currentCompany.nit)) {
      errors.nit = "Ya existe una compañía con este NIT";
    }

    if (!currentCompany.email.trim()) {
      errors.email = "El correo electrónico es obligatorio";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(currentCompany.email)) {
        errors.email = "El formato del correo no es válido";
      } else if (isDuplicate("email", currentCompany.email)) {
        errors.email = "Ya existe una compañía con este correo";
      }
    }

    if (currentCompany.phone && !/^\d{7,15}$/.test(currentCompany.phone)) {
      errors.phone = "El teléfono debe contener entre 7 y 15 dígitos";
    }
    if (isDuplicate("phone", currentCompany.phone)) {
      errors.phone = "Ya existe una compañía con este teléfono";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (modalMode === "create") {
        await postCompanies(currentCompany);
      } else {
        await updateCompany(currentCompany.id, currentCompany);
      }
      fetchCompanies();
      closeModal();
    } catch (err) {
      setError(err.message || "Error al guardar compañía");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta compañía?")) {
      try {
        await deleteCompany(id);
        fetchCompanies();
      } catch (err) {
        setError(err.message || "Error al eliminar compañía");
      }
    }
  };

  if (loading) {
    return <Container className="mt-4">Cargando compañías...</Container>;
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3 d-flex justify-content-between align-items-center">
        <Col xs={12} md="auto">
          <h2 className="mb-0">Gestión de Compañías</h2>
        </Col>
        <Col xs={12} md="auto" className="mt-2 mt-md-0">
          <Button
            variant="primary"
            onClick={openCreateModal}
            className="w-100 w-md-auto"
          >
            Crear Nueva Compañía
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th className="d-none d-md-table-cell">NIT</th>
              <th className="d-none d-md-table-cell">Dirección</th>
              <th className="d-none d-lg-table-cell">Teléfono</th>
              <th className="d-none d-lg-table-cell">Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td className="d-none d-md-table-cell">{company.nit}</td>
                <td className="d-none d-md-table-cell">{company.address}</td>
                <td className="d-none d-lg-table-cell">{company.phone}</td>
                <td className="d-none d-lg-table-cell">{company.email}</td>
                <td className="d-flex gap-2 flex-column flex-md-row flex-wrap">
                  <Button
                    variant="info"
                    size="sm"
                    className="mb-1 mb-md-0 w-100 w-md-auto"
                    onClick={() => openEditModal(company)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-1 mb-md-0 w-100 w-md-auto"
                    onClick={() => handleDelete(company.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create"
              ? "Crear Nueva Compañía"
              : "Editar Compañía"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Compañía</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentCompany.name}
                onChange={handleInputChange}
                isInvalid={!!formErrors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>NIT</Form.Label>
              <Form.Control
                type="text"
                name="nit"
                value={currentCompany.nit}
                onChange={handleInputChange}
                isInvalid={!!formErrors.nit}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.nit}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={currentCompany.address}
                onChange={handleInputChange}
                isInvalid={!!formErrors.address}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={currentCompany.phone}
                onChange={handleInputChange}
                isInvalid={!!formErrors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentCompany.email}
                onChange={handleInputChange}
                isInvalid={!!formErrors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {modalMode === "create" ? "Crear" : "Guardar Cambios"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
