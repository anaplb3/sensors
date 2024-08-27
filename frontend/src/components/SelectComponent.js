import Form from 'react-bootstrap/Form';

function SelectComponent({getInfo}) {
    const handleOnSelect = (e) => {
        var index = e.target.selectedIndex;
        const timeLimitText = e.target[index].text
        getInfo(e.target.value, timeLimitText);
    }
    return (
        <Form.Select onChange={handleOnSelect}>
            <option>Selecione um período de tempo</option>
            <option value="24hr"> 24 horas </option>
            <option value="48hr"> 48 horas </option>
            <option value="1w"> 1 semana </option>
            <option value="1m"> 1 mês </option>
        </Form.Select>
    );
}

export default SelectComponent;