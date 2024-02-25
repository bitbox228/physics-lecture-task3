import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Spinner} from 'react-bootstrap';

const View = ({
                  currents,
                  xRange,
                  yRange,
                  density,
                  setCurrents,
                  setXRange,
                  setYRange,
                  setDensity,
                  image,
                  handleLoadImage,
                  loading
              }) => {

    const handleXRangeChange = (index, value) => {
        const newXRange = [...xRange];
        newXRange[index] = parseFloat(value);
        setXRange(newXRange);
    };

    const handleYRangeChange = (index, value) => {
        const newYRange = [...yRange];
        newYRange[index] = parseFloat(value);
        setYRange(newYRange);
    };

    const handleDensityChange = (value) => {
        setDensity(parseInt(value));
    };

    const handleChange = (rowIndex, columnIndex, value) => {
        const newNumbers = currents.map((row, index) =>
            index === rowIndex ? [...row.slice(0, columnIndex), parseFloat(value), ...row.slice(columnIndex + 1)] : row
        );
        setCurrents(newNumbers);

    };

    const handleAddField = () => {
        setCurrents([...currents, [0, 0, 0]]);
    };

    const handleRemoveField = (index) => {
        const newNumbers = [...currents];
        newNumbers.splice(index, 1);
        setCurrents(newNumbers);
    };

    return (
        <div style={{display: "flex", justifyContent: 'space-around', padding: '20px'}}>
            <div style={{flex: 1, marginRight: '10px'}}>
                <Form style={{maxWidth: 500}}>
                    <Form.Group>
                        <Form.Label>Минимальный x:</Form.Label>
                        <Form.Control
                            type="number"
                            value={xRange[0]}
                            onChange={(e) => handleXRangeChange(0, e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Максимальный x:</Form.Label>
                        <Form.Control
                            type="number"
                            value={xRange[1]}
                            onChange={(e) => handleXRangeChange(1, e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Минимальный y:</Form.Label>
                        <Form.Control
                            type="number"
                            value={yRange[0]}
                            onChange={(e) => handleYRangeChange(0, e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Максимальный y:</Form.Label>
                        <Form.Control
                            type="number"
                            value={yRange[1]}
                            onChange={(e) => handleYRangeChange(1, e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="density">Интенсивность:</Form.Label>
                        <Form.Control
                            id="density"
                            type="range"
                            min="1"
                            max="10"
                            value={density}
                            onChange={(e) => handleDensityChange(e.target.value)}
                        />
                        <Form.Text>{density}</Form.Text>
                    </Form.Group>
                    <Button variant="primary" style={{
                        height: '50px',
                        width: '200px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: 'block'
                    }} onClick={handleLoadImage}>
                        {loading ? (
                            <Spinner animation="border" size="sm"/>
                        ) : (
                            'Построить график'
                        )}
                    </Button>
                </Form>
            </div>

            <div style={{flex: 2, marginRight: '10px', textAlign: 'center'}}>
                {image && <img src={image} alt='График' style={{maxWidth: '100%', maxHeight: '100%'}}/>}
            </div>

            <div style={{flex: 1}}>
                <h5>Токи (расположение и величина):</h5>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="d-flex" style={{alignItems: 'center', marginBottom: '10px'}}>
                        <div style={{marginRight: '5px'}}></div>
                        <div className="flex-fill" style={{marginRight: '5px'}}>x</div>
                        <div className="flex-fill" style={{marginRight: '5px'}}>y</div>
                        <div className="flex-fill">I</div>
                        <div style={{marginRight: '90px'}}></div>
                    </div>
                    {currents.map((row, rowIndex) => (
                        <div key={rowIndex} className="d-flex" style={{alignItems: 'center', marginBottom: '10px'}}>
                            {row.map((number, columnIndex) => (
                                <React.Fragment key={columnIndex}>
                                    <Form.Control
                                        type="number"
                                        value={number}
                                        onChange={(e) => handleChange(rowIndex, columnIndex, e.target.value)}
                                        className="flex-fill"
                                        style={{marginRight: '10px'}}
                                    />
                                </React.Fragment>
                            ))}
                            <Button variant="danger" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                                    onClick={() => handleRemoveField(rowIndex)}>Удалить</Button>
                        </div>
                    ))}
                    <Button variant="primary" style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                            onClick={handleAddField}>Добавить поле</Button>
                </div>
            </div>
        </div>
    );


}

export default View;