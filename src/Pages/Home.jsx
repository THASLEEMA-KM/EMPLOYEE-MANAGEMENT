import React, { useEffect, useState } from 'react';
import { getAllEmployeeAPI, removeEmployeeAPI, updateEmployeeAPI } from '../Services/allAPI';
import { Button, Form, Modal } from 'react-bootstrap';

function Home({ addEmployeeResponse }) {
    const [deleteEmployeeResponse, setDeleteEmployeeResponse] = useState("");
    const [allEmployees, setAllEmployees] = useState([]);
    const [show, setShow] = useState(false);
    
    const [currentEmployee, setCurrentEmployee] = useState({
        
        uid:"",
        name:"",
        email:"",
        status:""
       
    })

    useEffect(() => {
        getAllEmployees();
        setCurrentEmployee({
            
            uid:allEmployees.uid,
            name:allEmployees.uName,
            email:allEmployees.Email,
            status:allEmployees.Status
        })
    }, [addEmployeeResponse, deleteEmployeeResponse]);

    const handleClose = () => setShow(false);
    const handleShow = (employee) => {
        setCurrentEmployee(employee);
        setShow(true);
    };

    const getAllEmployees = async () => {
        try {
            const result = await getAllEmployeeAPI();
            if (result.status >= 200 && result.status < 300) {
                setAllEmployees(result.data);
            } else {
                console.log(`Error fetching employees: ${result.statusText}`);
            }
        } catch (error) {
            console.log(`Error fetching employees: ${error}`);
        }
    };

    const deleteEmployee = async (empId) => {
        try {
            const result = await removeEmployeeAPI(empId);
            if (result.status >= 200 && result.status < 300) {
                setDeleteEmployeeResponse(result.data);
            } else {
                console.log(`Error deleting employee: ${result.statusText}`);
            }
        } catch (error) {
            console.log(`Error deleting employee: ${error}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(e.target);
    };


    // const handleSaveChanges = async() => {

    //    const result = await updateEmployeeAPI(empId,empDetails)


    //     // Call updateEmployeeAPI or equivalent here to save changes
    //     handleClose();
    // };
    const handleSaveChanges = async () => {

        
          updateEmployeeAPI(currentEmployee.id, currentEmployee);
      
          setAllEmployees(prevState =>
            prevState.map(emp => (emp.id === currentEmployee.id ? currentEmployee : emp))
        );
          alert("updated successfullly")
          handleClose();


        
        // handleClose();
    };

    return (
        <div className='container-fluid w-100 text-dark'>
            <h1 className='text-center text-info my-3'>ALL EMPLOYEES</h1>
            <table className='table border shadow rounded'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>userid</th>
                        <th>username</th>
                        <th>email</th>
                        <th>status</th>
                        <th>Edit</th>
                        <th><i className="fa-solid fa-ellipsis"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {allEmployees.length > 0 ? (
                        allEmployees.map((emp, index) => {
                            const status = typeof emp.status === 'object'
                            ? JSON.stringify(emp.status)
                            : emp.status;
                            return (
                                <tr key={emp?.id}>
                                    <td>{index + 1}</td>
                                    <td>{emp?.uid}</td>
                                    <td>{emp?.name}</td>
                                    <td>{emp?.email}</td>
                                    <td>{status}</td>
                                    <td>
                                        <button onClick={()=>handleShow(emp)} className='btn'>
                                            <i className="fa-solid fa-pen-to-square text-warning fs-5"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteEmployee(emp?.id)} className='btn'>
                                            <i className="fa-solid fa-trash text-danger fs-5"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-danger text-center fw-bolder">
                                NO MORE EMPLOYEES!!!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUserId">
                            <Form.Label>Userid</Form.Label>
                            <Form.Control
                                type="text"
                                name="uid"
                                value={currentEmployee?.uid }
                                onChange={handleInputChange}
                                placeholder="Userid"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentEmployee?.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={currentEmployee?.email }
                                onChange={handleInputChange}
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                             <Form.Select
                             type="text"
                             name="status"
                             value={currentEmployee?.status }
                             onChange={handleInputChange}
                             placeholder="Status"
                                aria-label="Default select example">
                        <option hidden>Select Employee Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                       
                    </Form.Select>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
