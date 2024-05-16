import commonAPI from "./commonAPI"
import SERVER_URL from "./serverURL"

// adding employees
export const addEmployeeAPI = async (employees) =>
    {
        return await commonAPI("POST",`${SERVER_URL}/allEmployees`,employees)
    }

// get all employee 
export const getAllEmployeeAPI = async () =>
    {
        return await commonAPI("GET",`${SERVER_URL}/allEmployees`,"")
    }    

// remove employee
export const removeEmployeeAPI = async (empID) =>
    {
        return await commonAPI("DELETE",`${SERVER_URL}/allEmployees/${empID}`,{})
    }

    export const updateEmployeeAPI = async (empID,empDeatils) =>
        {
            return await commonAPI("PUT",`${SERVER_URL}/allEmployees/${empID}`,empDeatils)
        }       