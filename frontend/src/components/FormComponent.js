import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap'

function FormComponent({addInfo}) {

    const onSubmit = (event) => {
        event.preventDefault();
        event.persist();

        const equipmentId = event.target.formEquipmentId.value;
        const timestamp = event.target.formTimestamp.value;
        const value = event.target.formValue.value;

        addInfo(equipmentId, timestamp, value);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formEquipmentId">
                <Form.Label> Entre com o ID do equipamento: </Form.Label>
                <Form.Control name="controlEquipmentId" type="text" placeholder="EQ-12499"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTimestamp">
                <Form.Label> Entre com o timestamp: </Form.Label>
                <Form.Control name="controlTimestamp" type="text" placeholder="2024-08-18T01:30:00.000-05:00"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formValue">
                <Form.Label> Entre com o valor: </Form.Label>
                <Form.Control name="controlValue" type="text" placeholder="78.42"/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    );
};

export default FormComponent;