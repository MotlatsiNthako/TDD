import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';



export default function ScoopOptions({ name, imagePath, udateItemCount}) {
  const handleChange = (event) => {

    updateItemCount(name, event.target.value);
  };
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ TextSAlign: 'center'}}>
        <img
            style={{ width: '75%'}}
            src ={`https://localhost:3030/${imagePath}`}
            alt={`${name} scoop`}
            />
    <Form.Group controlId={`${name}-count`}>
        as {Row}
        style={{ margin: '10px'}}

        
       <Form.Label column xs="6" style={{ TextSAlign: 'right'}}>{name}</Form.Label>
       <Col xs="5" style={{ TextSAlign: 'left'}}>

       <Form.control type="number" defaultValue={0} />
       <Form.Group>
        </Col>
    );
}