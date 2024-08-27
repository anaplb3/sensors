import { Form, Button } from "react-bootstrap";
import { useRef } from "react";

function FormCsvComponent({addDataFromCSV}) {
    const fileRef = useRef(null);

    const onSubmit = (event) => {
        event.preventDefault();

        if (fileRef.current) {
            console.log("enviando")
            addDataFromCSV(fileRef.current);
        }

    }

    const onChange = (event) => {
        fileRef.current = event.target.files[0];
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlID="formCsv" className="mb-3">
                <Form.Label> Selecione o arquivo CSV: </Form.Label>
                <Form.Control type="file" onChange={onChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Enviar
            </Button>
        </Form>
    );
}

export default FormCsvComponent;