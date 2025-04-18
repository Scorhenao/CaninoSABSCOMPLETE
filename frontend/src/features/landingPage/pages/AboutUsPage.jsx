import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const AboutUsPage = () => {
  const pastelBlue = '#d4e9f9';

  return (
    <>
      {/* Encabezado Principal */}
      <div style={{ backgroundColor: pastelBlue }} className="text-dark text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold mb-4">🐶 Conoce a Caninos SABS</h1>
          <p className="lead">Desde el corazón de Copacabana, una historia de amor y compromiso por los peluditos.</p>
          <p>Descubre cómo nació nuestra pasión y qué valores nos mueven día a día.</p>
        </Container>
      </div>

      {/* Nuestra Historia */}
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold text-primary fs-4">
                  <i className="bi bi-geo-alt-fill me-2"></i> Origen en Copacabana
                </Card.Title>
                <Card.Text className="text-muted">
                  En Copacabana, Antioquia, nació Caninos SABS con el sueño de transformar el cuidado canino. 
                  Un grupo de amantes de los animales fundó este proyecto con el corazón lleno de amor por los peludos.
                </Card.Text>
                <blockquote className="blockquote fst-italic text-info">
                  "Un compromiso inquebrantable con el bienestar de cada peludo amigo."
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <div className="ratio ratio-16x9">
              <img 
                src="https://limasabe.pe/wp-content/uploads/2021/10/pet-shop-en-lima.jpg" 
                alt="Historia Caninos SABS" 
                className="img-fluid rounded shadow-sm object-fit-cover" 
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Misión, Visión y Valores */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold text-success fs-4">
                  <i className="bi bi-bullseye me-2"></i> Nuestra Misión
                </Card.Title>
                <Card.Text className="text-muted">
                  En Caninos SABS queremos enriquecer la vida de los caninos, ofreciendo productos y servicios con amor, responsabilidad y calidad profesional.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold text-primary fs-4">
                  <i className="bi bi-eye-fill me-2"></i> Nuestra Visión
                </Card.Title>
                <Card.Text className="text-muted">
                  Ser la tienda y centro de servicios caninos de referencia en Antioquia, reconocida por su compromiso, calidez humana y amor por los animales.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold text-warning fs-4">
                  <i className="bi bi-stars me-2"></i> Nuestros Valores
                </Card.Title>
                <ul className="text-muted ps-3">
                  <li>❤️ Amor y Respeto Animal</li>
                  <li>✅ Calidad en cada producto</li>
                  <li>🌍 Compromiso con la comunidad</li>
                  <li>💬 Atención personalizada</li>
                  <li>🚀 Innovación constante</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Nuestro Equipo */}
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <div className="ratio ratio-16x9">
              <img 
                src="https://www.consumidorglobal.com/uploads/s1/41/77/67/perro-mascota.webp" 
                alt="Equipo Caninos SABS" 
                className="img-fluid rounded shadow-sm object-fit-cover" 
              />
            </div>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold text-info fs-4">
                  <i className="bi bi-people-fill me-2"></i> Nuestro Equipo
                </Card.Title>
                <Card.Text className="text-muted">
                  Contamos con un grupo apasionado de expertos en nutrición, cuidado estético, comportamiento y servicio. Todos comprometidos con el bienestar canino.
                </Card.Text>
                <blockquote className="blockquote fst-italic text-success">
                  "Dedicación y experiencia unidas por un amor genuino por los caninos."
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Final */}
      <Container className="text-center pb-5">
        <p className="fst-italic text-muted mb-3">
          Gracias por acompañarnos en este recorrido lleno de ladridos, colitas felices y mucho amor. 🐕
        </p>
        <Link to="/productos">
          <Button variant="outline-primary" size="lg" className="shadow">
            <i className="bi bi-bag-heart-fill me-2"></i> Conoce Nuestros Productos
          </Button>
        </Link>
      </Container>
    </>
  );
};