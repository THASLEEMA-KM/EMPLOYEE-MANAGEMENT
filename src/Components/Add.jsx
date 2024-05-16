import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { addEmployeeAPI } from '../Services/allAPI'

function Add({setAddEmployeeResponse}) {

    const [employee,setEmployee] = useState(
        {
            uid:'', 
            name:'',
            email:'',
            status:""
          
        }
      )
      const addEmployee = async()=>
        {
            const {name,email,status} = employee
            if(name && email && status) 
                {
                    try {
                       const result = await addEmployeeAPI(employee)
                       if (result.status>=200 && result.status<300) 
                        {
                            console.log(result.data);
                            setAddEmployeeResponse(result.data)
                            setEmployee({
                                uid:'', 
                                name:'',
                                email:'',
                                status:""
                                
                            })
                            alert("New Employee is added ")
                            
                        } 
                        else 
                        {
                            console.log(result.response.data);
                        }


                    } catch (error) {
                        console.log(error);
                    }
                }
            else
            {
                alert("Please fill the form completely!!!")
            }
        }

  return (
    <div>
        <h1 className='text-center text-success py-5'>Add Employees Here</h1>
        <div className='container-fluid w-50 add'>
        <Form >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>USERID</Form.Label>
                    <Form.Control onChange={e=>setEmployee({...employee,uid:e.target.value})}  type="text" placeholder="User id " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={e=>setEmployee({...employee,name:e.target.value})}    type="text" placeholder="Employee name " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control onChange={e=>setEmployee({...employee,email:e.target.value})}   type="email" placeholder="Email " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Status</Form.Label>
                    {/* <Form.Control onChange={e=>setEmployee({...employee,status:e.target.value})}  as="textarea" rows={3} /> */}
                    <Form.Select onChange={(e)=>setEmployee({...employee,
                        status:e.target.value}
                        )} aria-label="Default select example">
                        <option hidden>Select Employee Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                       
                    </Form.Select>

                </Form.Group>

        
                </Form>
        </div>
        <div className='text-center justify-content-around'>
            <button onClick={()=>addEmployee()}  className='btn btn-success'>Add</button>
        </div>
    </div>
  )
}

export default Add